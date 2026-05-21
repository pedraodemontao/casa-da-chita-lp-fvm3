/**
 * POST /api/admin/upload-leads
 *
 * Recebe CSV de leads (base de 800 compradores antigos) e salva no Redis.
 *
 * Auth: header `x-admin-secret: $ADMIN_PASSWORD`
 *
 * Aceita 2 formatos:
 *
 * 1. JSON: { leads: [{ phone, name?, email?, produto_anterior? }, ...] }
 * 2. multipart/form-data com field `file` contendo CSV (header obrigatório).
 *    Colunas esperadas: phone (obrigatória), name, email, produto_anterior
 *
 * Salva:
 * - lead:{phone}      hash com dados
 * - leads:base800     set com todos os phones
 *
 * Idempotente — phones repetidos sobrescrevem dados, set não duplica.
 */

import { NextRequest, NextResponse } from "next/server";
import { parse } from "csv-parse/sync";
import { adminAuthError } from "@/app/lib/admin-auth";
import { getRedis } from "@/app/lib/kv";
import { normalizePhone } from "@/app/lib/whatsapp";

type Lead = {
  phone: string;
  name?: string;
  email?: string;
  produto_anterior?: string;
};

function isValidPhone(phone: string): boolean {
  return phone.length >= 12 && phone.length <= 13 && /^\d+$/.test(phone);
}

export async function POST(req: NextRequest) {
  const authErr = adminAuthError(req);
  if (authErr) return authErr;

  const contentType = req.headers.get("content-type") || "";
  let leads: Lead[] = [];

  try {
    if (contentType.includes("application/json")) {
      const body = (await req.json()) as { leads?: Lead[] };
      leads = body.leads || [];
    } else if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      if (!file) {
        return NextResponse.json({ error: "Falta field 'file' no multipart" }, { status: 400 });
      }
      const text = await file.text();
      leads = parse(text, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
      }) as Lead[];
    } else {
      return NextResponse.json(
        { error: "Content-Type deve ser application/json ou multipart/form-data" },
        { status: 400 }
      );
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Parse falhou: ${msg}` }, { status: 400 });
  }

  if (leads.length === 0) {
    return NextResponse.json({ error: "Nenhum lead recebido" }, { status: 400 });
  }

  const redis = getRedis();
  let saved = 0;
  let invalid = 0;
  const invalidExamples: string[] = [];

  for (const lead of leads) {
    const phone = normalizePhone(lead.phone || "");
    if (!isValidPhone(phone)) {
      invalid++;
      if (invalidExamples.length < 5) invalidExamples.push(lead.phone || "<vazio>");
      continue;
    }

    const data: Record<string, string> = { phone };
    if (lead.name) data.name = lead.name;
    if (lead.email) data.email = lead.email;
    if (lead.produto_anterior) data.produto_anterior = lead.produto_anterior;

    await redis.hset(`lead:${phone}`, data);
    await redis.sadd("leads:base800", phone);
    saved++;
  }

  const total = (await redis.scard("leads:base800")) as number;

  console.log(`[upload-leads] saved: ${saved} | invalid: ${invalid} | total na base: ${total}`);

  return NextResponse.json({
    ok: true,
    received: leads.length,
    saved,
    invalid,
    invalid_examples: invalidExamples,
    total_in_base: total,
  });
}

export async function GET(req: NextRequest) {
  const authErr = adminAuthError(req);
  if (authErr) return authErr;

  const redis = getRedis();
  const total = (await redis.scard("leads:base800")) as number;

  return NextResponse.json({ ok: true, total_in_base: total });
}
