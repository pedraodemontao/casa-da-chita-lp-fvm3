/**
 * POST /api/admin/broadcast
 *
 * Dispara campanha de marketing pra lista de leads (broadcast).
 *
 * Auth: header `x-admin-secret: $ADMIN_PASSWORD`
 *
 * Body:
 * {
 *   "name": "lancamento_fvm3_v1",          // nome interno da campanha (único)
 *   "template": "lancamento_fvm3_base_quente",
 *   "vars_per_lead": {                     // params {{1}}, {{2}}, ... ordem importa
 *     "1": "firstName",                    // pega lead.firstName ou nome
 *     "2": "produto_anterior",
 *     "3": "lp_url"                        // pode ser literal ou referência a lead.*
 *   },
 *   "static_vars": {                       // valores fixos (sobrescreve por-lead)
 *     "lp_url": "https://lp-fvm-3.vercel.app/?utm_campaign=lancamento_v1"
 *   },
 *   "button_url_from": "lp_url",           // opcional
 *   "filter": "base800",                   // set de leads a usar (default: leads:base800)
 *   "dry_run": false                       // se true, só lista os primeiros 5 e não dispara
 * }
 *
 * Estratégia: enfileira como flow jobs (channel: whatsapp) com delays escalonados
 * pra não estourar rate-limit Meta. Cron processa.
 *
 * Por que escalonado: Meta WhatsApp Cloud API tem rate limits dinâmicos.
 * Disparar 800 mensagens em 1 burst = risco de soft-block. Escalonando em
 * 200/min, 800 leads = ~4min de envio.
 */

import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { adminAuthError } from "@/app/lib/admin-auth";
import { getRedis } from "@/app/lib/kv";

const BROADCAST_RATE_PER_MIN = 200; // 200 msgs/min = 3.3/s — conservador pro Cloud API

type BroadcastBody = {
  name: string;
  template: string;
  vars_per_lead?: Record<string, string>;
  static_vars?: Record<string, string>;
  button_url_from?: string;
  filter?: string;
  dry_run?: boolean;
};

export async function POST(req: NextRequest) {
  const authErr = adminAuthError(req);
  if (authErr) return authErr;

  let body: BroadcastBody;
  try {
    body = (await req.json()) as BroadcastBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.name || !body.template) {
    return NextResponse.json(
      { error: "Faltam campos: name, template" },
      { status: 400 }
    );
  }

  const redis = getRedis();
  const filterSet = body.filter ? `leads:${body.filter}` : "leads:base800";

  const phones = (await redis.smembers(filterSet)) as string[];
  if (phones.length === 0) {
    return NextResponse.json(
      { error: `Set ${filterSet} está vazio` },
      { status: 400 }
    );
  }

  // Checa se broadcast com esse nome já existe
  const existingStatus = await redis.hget(`broadcast:${body.name}`, "status");
  if (existingStatus && existingStatus !== "draft") {
    return NextResponse.json(
      { error: `Broadcast '${body.name}' já existe com status '${existingStatus}'` },
      { status: 409 }
    );
  }

  // Dry run: monta exemplo dos primeiros 5
  if (body.dry_run) {
    const sample = phones.slice(0, 5);
    const preview: Array<Record<string, unknown>> = [];
    for (const phone of sample) {
      const lead = (await redis.hgetall(`lead:${phone}`)) as Record<string, string>;
      const params = buildParams(body, lead);
      preview.push({
        phone,
        lead_data: lead,
        template: body.template,
        params,
        button_url: body.button_url_from
          ? resolveVar(body.button_url_from, lead, body.static_vars)
          : undefined,
      });
    }
    return NextResponse.json({
      ok: true,
      dry_run: true,
      total_to_send: phones.length,
      preview,
    });
  }

  // Enfileira no flow scheduler (cada lead vira 1 job)
  const startedAt = Date.now();
  const intervalMs = (60 * 1000) / BROADCAST_RATE_PER_MIN; // ~300ms entre msgs

  await redis.hset(`broadcast:${body.name}`, {
    name: body.name,
    template: body.template,
    status: "running",
    total: String(phones.length),
    sent: "0",
    failed: "0",
    started_at: String(startedAt),
  });

  let enqueued = 0;
  for (let i = 0; i < phones.length; i++) {
    const phone = phones[i];
    const lead = (await redis.hgetall(`lead:${phone}`)) as Record<string, string>;
    const scheduledAt = startedAt + i * intervalMs;

    // job id determinístico por (broadcast + phone)
    const id = createHash("sha1")
      .update(`broadcast:${body.name}:${phone}`)
      .digest("hex")
      .slice(0, 16);

    // Job de broadcast tem channel "whatsapp" mas usa um "flow" especial
    // que o cron sabe interpretar. Pra simplificar, criamos um job "raw"
    // direto na zset, com info do template/params embutida.
    const params = buildParams(body, lead);
    const buttonUrl = body.button_url_from
      ? resolveVar(body.button_url_from, lead, body.static_vars)
      : undefined;

    await redis.hset(`flow:${id}`, {
      id,
      flow: `broadcast:${body.name}`,
      step: body.template,
      channel: "whatsapp",
      contact_json: JSON.stringify({
        phone,
        name: lead.name,
        firstName: lead.name?.split(" ")[0] || lead.firstName,
        email: lead.email,
      }),
      vars_json: JSON.stringify({
        _broadcast_template: body.template,
        _broadcast_params: JSON.stringify(params),
        _broadcast_button_url: buttonUrl || "",
        _broadcast_name: body.name,
      }),
      scheduled_at: String(scheduledAt),
      status: "pending",
      attempts: "0",
    });
    await redis.zadd("flows:pending", { score: scheduledAt, member: id });
    enqueued++;
  }

  console.log(
    `[broadcast] '${body.name}' enqueued ${enqueued} jobs over ${Math.round((phones.length * intervalMs) / 60000)}min`
  );

  return NextResponse.json({
    ok: true,
    broadcast: body.name,
    enqueued,
    estimated_duration_min: Math.round((phones.length * intervalMs) / 60000),
    rate_per_min: BROADCAST_RATE_PER_MIN,
    status_endpoint: `/api/admin/broadcast?name=${encodeURIComponent(body.name)}`,
  });
}

export async function GET(req: NextRequest) {
  const authErr = adminAuthError(req);
  if (authErr) return authErr;

  const name = req.nextUrl.searchParams.get("name");
  if (!name) {
    return NextResponse.json({ error: "Faltou ?name= na query" }, { status: 400 });
  }

  const redis = getRedis();
  const status = (await redis.hgetall(`broadcast:${name}`)) as Record<string, string> | null;

  if (!status || !status.name) {
    return NextResponse.json({ error: "Broadcast não encontrado" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, broadcast: status });
}

function buildParams(
  body: BroadcastBody,
  lead: Record<string, string>
): string[] {
  if (!body.vars_per_lead) return [];

  const sortedKeys = Object.keys(body.vars_per_lead).sort(
    (a, b) => Number(a) - Number(b)
  );

  return sortedKeys.map((k) => {
    const ref = body.vars_per_lead![k];
    return resolveVar(ref, lead, body.static_vars) || "";
  });
}

function resolveVar(
  ref: string,
  lead: Record<string, string>,
  staticVars?: Record<string, string>
): string {
  // Ordem: static_vars > lead.<field> > firstName fallback
  if (staticVars && staticVars[ref]) return staticVars[ref];
  if (lead[ref]) return lead[ref];
  if (ref === "firstName" && lead.name) return lead.name.split(" ")[0];
  return ref; // literal fallback
}
