/**
 * Cron — processa fluxos pendentes.
 *
 * Configurado em `vercel.json` pra rodar a cada 5min.
 * Auth: header `Authorization: Bearer $CRON_SECRET`.
 *
 * Estratégia:
 * 1. Pega até 50 jobs vencidos do Redis
 * 2. Pra cada job: dispara WhatsApp ou Email
 * 3. Marca como sent/failed
 * 4. Continua até limite ou fim da fila
 *
 * Pra evitar timeout Vercel (60s default no plano Hobby, 300s Pro),
 * processa no máximo 50 jobs por execução.
 */

import { NextRequest, NextResponse } from "next/server";
import {
  pickDueJobs,
  markJobSent,
  markJobFailed,
  countPending,
} from "@/app/lib/flow-scheduler";
import { FLOWS, resolveParams, resolveButtonUrl, renderEmail, type WhatsAppStep, type EmailStep } from "@/app/lib/flows";
import { sendTemplate } from "@/app/lib/whatsapp";
import { send as sendEmail } from "@/app/lib/email";

const CRON_SECRET = process.env.CRON_SECRET;
const MAX_PER_RUN = 50;

function checkAuth(req: NextRequest): boolean {
  if (!CRON_SECRET) {
    console.warn("[cron] CRON_SECRET não configurado — autenticação desligada");
    return true;
  }
  const auth = req.headers.get("authorization") || "";
  return auth === `Bearer ${CRON_SECRET}`;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const startedAt = Date.now();
  const jobs = await pickDueJobs(MAX_PER_RUN);

  if (jobs.length === 0) {
    return NextResponse.json({
      ok: true,
      processed: 0,
      pending: await countPending(),
      duration_ms: Date.now() - startedAt,
    });
  }

  let sent = 0;
  let failed = 0;
  const errors: Array<{ id: string; flow: string; step: string; error: string }> = [];

  for (const job of jobs) {
    // ─── Jobs de broadcast (não vivem em FLOWS — vars carregam tudo) ───
    if (job.flow.startsWith("broadcast:")) {
      try {
        const template = job.vars._broadcast_template;
        const params = JSON.parse(job.vars._broadcast_params || "[]") as string[];
        const buttonUrl = job.vars._broadcast_button_url || undefined;

        const result = await sendTemplate({
          templateName: template,
          to: job.contact.phone || "",
          params,
          buttonUrl: buttonUrl || undefined,
        });

        if (result.ok) {
          await markJobSent(job.id, result.messageId);
          // Atualiza contador no hash broadcast:<name>
          const broadcastName = job.vars._broadcast_name;
          if (broadcastName) {
            const { getRedis } = await import("@/app/lib/kv");
            await getRedis().hincrby(`broadcast:${broadcastName}`, "sent", 1);
          }
          sent++;
        } else {
          await markJobFailed(job.id, result.error || "unknown error");
          const broadcastName = job.vars._broadcast_name;
          if (broadcastName) {
            const { getRedis } = await import("@/app/lib/kv");
            await getRedis().hincrby(`broadcast:${broadcastName}`, "failed", 1);
          }
          failed++;
          errors.push({
            id: job.id,
            flow: job.flow,
            step: job.step,
            error: result.error || "unknown",
          });
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        await markJobFailed(job.id, msg);
        failed++;
        errors.push({ id: job.id, flow: job.flow, step: job.step, error: msg });
      }
      continue;
    }

    // ─── Jobs de fluxos definidos em flows.ts ───
    const flowDef = FLOWS[job.flow as keyof typeof FLOWS];
    const stepDef = flowDef?.find((s) => s.name === job.step);

    if (!stepDef) {
      await markJobFailed(job.id, `Step não existe: ${job.flow}.${job.step}`, 1);
      failed++;
      errors.push({
        id: job.id,
        flow: job.flow,
        step: job.step,
        error: "step não encontrado",
      });
      continue;
    }

    const ctx = { contact: job.contact, vars: job.vars };

    try {
      if (stepDef.channel === "whatsapp") {
        const ws = stepDef as WhatsAppStep & { name: string; delayMs: number };
        const result = await sendTemplate({
          templateName: ws.template,
          to: job.contact.phone || "",
          params: resolveParams(ws, ctx),
          buttonUrl: resolveButtonUrl(ws, ctx),
        });

        if (result.ok) {
          await markJobSent(job.id, result.messageId);
          sent++;
        } else {
          await markJobFailed(job.id, result.error || "unknown error");
          failed++;
          errors.push({
            id: job.id,
            flow: job.flow,
            step: job.step,
            error: result.error || "unknown",
          });
        }
      } else if (stepDef.channel === "email") {
        const es = stepDef as EmailStep & { name: string; delayMs: number };
        const to = job.contact.email;
        if (!to) {
          await markJobFailed(job.id, "contact sem email", 1);
          failed++;
          continue;
        }

        const html = renderEmail(es, ctx);
        const result = await sendEmail({
          to,
          subject: es.subject,
          html,
        });

        if (result.ok) {
          await markJobSent(job.id, result.messageId);
          sent++;
        } else {
          await markJobFailed(job.id, result.error || "unknown error");
          failed++;
          errors.push({
            id: job.id,
            flow: job.flow,
            step: job.step,
            error: result.error || "unknown",
          });
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      await markJobFailed(job.id, msg);
      failed++;
      errors.push({ id: job.id, flow: job.flow, step: job.step, error: msg });
    }
  }

  const pending = await countPending();
  const duration = Date.now() - startedAt;

  console.log(
    `[cron] processed: ${jobs.length} | sent: ${sent} | failed: ${failed} | still pending: ${pending} | duration: ${duration}ms`
  );

  return NextResponse.json({
    ok: true,
    processed: jobs.length,
    sent,
    failed,
    pending,
    duration_ms: duration,
    errors: errors.length > 0 ? errors : undefined,
  });
}
