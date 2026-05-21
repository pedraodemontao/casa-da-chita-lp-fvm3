/**
 * Agendador de fluxos de mensagens.
 *
 * Conceito:
 *   - enqueueFlow(flow, contact, vars) → cria N "flow jobs" (1 por step) no Redis
 *   - Cada job tem scheduled_at = now + step.delayMs
 *   - Cron processa flows:pending zset (score = scheduled_at) e dispara mensagens
 *   - Idempotência: job_id = sha(contact_phone:flow:step) — não duplica
 *   - cancelContactFlows(phone) → remove todos os jobs pendentes do contato (refund)
 */

import { createHash } from "crypto";
import { getRedis, redisSafe } from "./kv";
import { FLOWS, type FlowContext } from "./flows";

const PENDING_KEY = "flows:pending";

export type FlowJob = {
  id: string;
  flow: string;
  step: string;
  channel: "whatsapp" | "email";
  contact: FlowContext["contact"];
  vars: Record<string, string>;
  scheduled_at: number; // unix ms
  status: "pending" | "sent" | "failed" | "cancelled";
  attempts: number;
  last_error?: string;
  sent_at?: number;
  sent_message_id?: string;
};

function jobId(flow: string, stepName: string, contactPhone: string): string {
  return createHash("sha1")
    .update(`${flow}:${stepName}:${contactPhone}`)
    .digest("hex")
    .slice(0, 16);
}

/**
 * Enfileira um fluxo completo (todos os steps) pra um contato.
 *
 * - Idempotente por (flow + step + contact.phone)
 * - Se um job já existe, NÃO duplica (mas atualiza vars se mudar)
 */
export async function enqueueFlow(opts: {
  flow: keyof typeof FLOWS | string;
  contact: FlowContext["contact"];
  vars?: Record<string, string>;
}): Promise<{ enqueued: number; skipped: number }> {
  const steps = FLOWS[opts.flow as keyof typeof FLOWS];
  if (!steps) {
    console.warn(`[scheduler] flow desconhecido: ${opts.flow}`);
    return { enqueued: 0, skipped: 0 };
  }

  const phone = opts.contact.phone;
  if (!phone) {
    console.warn(`[scheduler] contact sem phone — fluxo ${opts.flow} ignorado`);
    return { enqueued: 0, skipped: 0 };
  }

  const now = Date.now();
  let enqueued = 0;
  let skipped = 0;

  await redisSafe(
    async (redis) => {
      // Salva/atualiza dados do contato
      await redis.hset(`contact:${phone}`, {
        ...opts.contact,
        last_event: opts.flow,
        last_event_at: String(now),
      });

      for (const step of steps) {
        const id = jobId(opts.flow, step.name, phone);
        const exists = await redis.exists(`flow:${id}`);

        if (exists) {
          skipped++;
          continue;
        }

        const scheduled_at = now + step.delayMs;
        const job: FlowJob = {
          id,
          flow: opts.flow,
          step: step.name,
          channel: step.channel,
          contact: opts.contact,
          vars: opts.vars || {},
          scheduled_at,
          status: "pending",
          attempts: 0,
        };

        // hset não aceita objetos aninhados — flatten contact e vars como JSON
        await redis.hset(`flow:${id}`, {
          id: job.id,
          flow: job.flow,
          step: job.step,
          channel: job.channel,
          contact_json: JSON.stringify(job.contact),
          vars_json: JSON.stringify(job.vars),
          scheduled_at: String(scheduled_at),
          status: job.status,
          attempts: "0",
        });

        await redis.zadd(PENDING_KEY, { score: scheduled_at, member: id });
        await redis.sadd(`contact-flows:${phone}`, id);

        enqueued++;
      }

      return null;
    },
    null,
    "enqueueFlow"
  );

  console.log(
    `[scheduler] enqueueFlow(${opts.flow}) → ${phone}: ${enqueued} novos, ${skipped} já existentes`
  );

  return { enqueued, skipped };
}

/**
 * Cancela todos os jobs pendentes de um contato (ex: chargeback, refund).
 */
export async function cancelContactFlows(phone: string): Promise<number> {
  return await redisSafe(
    async (redis) => {
      const ids = (await redis.smembers(`contact-flows:${phone}`)) as string[];
      if (ids.length === 0) return 0;

      let cancelled = 0;
      for (const id of ids) {
        const status = await redis.hget(`flow:${id}`, "status");
        if (status === "pending") {
          await redis.hset(`flow:${id}`, { status: "cancelled" });
          await redis.zrem(PENDING_KEY, id);
          cancelled++;
        }
      }

      console.log(`[scheduler] cancelContactFlows(${phone}): ${cancelled} cancelados`);
      return cancelled;
    },
    0,
    "cancelContactFlows"
  );
}

/**
 * Lê jobs pendentes vencidos (scheduled_at <= now).
 * @param limit  máximo de jobs por batch
 */
export async function pickDueJobs(limit = 50): Promise<FlowJob[]> {
  return await redisSafe(
    async (redis) => {
      const now = Date.now();
      // zrange com BYSCORE pega membros com score <= now
      const ids = (await redis.zrange(PENDING_KEY, 0, now, {
        byScore: true,
        offset: 0,
        count: limit,
      })) as string[];

      if (ids.length === 0) return [];

      const jobs: FlowJob[] = [];
      for (const id of ids) {
        const raw = (await redis.hgetall(`flow:${id}`)) as Record<string, string> | null;
        if (!raw || !raw.id) continue;
        jobs.push({
          id: raw.id,
          flow: raw.flow,
          step: raw.step,
          channel: raw.channel as "whatsapp" | "email",
          contact: JSON.parse(raw.contact_json || "{}"),
          vars: JSON.parse(raw.vars_json || "{}"),
          scheduled_at: Number(raw.scheduled_at),
          status: raw.status as FlowJob["status"],
          attempts: Number(raw.attempts || 0),
        });
      }

      return jobs;
    },
    [],
    "pickDueJobs"
  );
}

/**
 * Marca um job como enviado com sucesso.
 */
export async function markJobSent(id: string, messageId?: string): Promise<void> {
  await redisSafe(
    async (redis) => {
      await redis.hset(`flow:${id}`, {
        status: "sent",
        sent_at: String(Date.now()),
        sent_message_id: messageId || "",
      });
      await redis.zrem(PENDING_KEY, id);
      return null;
    },
    null,
    "markJobSent"
  );
}

/**
 * Marca um job como falho. Incrementa attempts.
 * Se attempts >= maxAttempts, marca como "failed" definitivo.
 * Senão, reagenda em backoff exponencial (5min, 25min, 2h).
 */
export async function markJobFailed(
  id: string,
  error: string,
  maxAttempts = 3
): Promise<void> {
  await redisSafe(
    async (redis) => {
      const job = (await redis.hgetall(`flow:${id}`)) as Record<string, string> | null;
      if (!job) return null;

      const attempts = Number(job.attempts || 0) + 1;

      if (attempts >= maxAttempts) {
        await redis.hset(`flow:${id}`, {
          status: "failed",
          attempts: String(attempts),
          last_error: error.slice(0, 500),
        });
        await redis.zrem(PENDING_KEY, id);
        console.error(`[scheduler] job ${id} failed após ${attempts} tentativas: ${error}`);
        return null;
      }

      // Backoff: 5min * 5^(attempts-1) → 5min, 25min, 125min (~2h)
      const backoffMs = 5 * 60 * 1000 * Math.pow(5, attempts - 1);
      const newScheduledAt = Date.now() + backoffMs;

      await redis.hset(`flow:${id}`, {
        attempts: String(attempts),
        scheduled_at: String(newScheduledAt),
        last_error: error.slice(0, 500),
      });
      await redis.zadd(PENDING_KEY, { score: newScheduledAt, member: id });

      console.warn(
        `[scheduler] job ${id} falhou (tentativa ${attempts}/${maxAttempts}), reagendado em ${Math.round(backoffMs / 60000)}min`
      );
      return null;
    },
    null,
    "markJobFailed"
  );
}

/**
 * Para visualização/diagnóstico: conta jobs pendentes.
 */
export async function countPending(): Promise<number> {
  return await redisSafe(
    async (redis) => (await redis.zcard(PENDING_KEY)) as number,
    0,
    "countPending"
  );
}
