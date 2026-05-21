/**
 * Cliente Redis (Upstash via Vercel Marketplace).
 *
 * As env vars KV_REST_API_URL / KV_REST_API_TOKEN são populadas
 * automaticamente quando o usuário habilita Upstash Redis no projeto Vercel.
 *
 * Schema usado:
 * - contact:{phone}             hash com dados do contato
 * - flow:{uuid}                 hash com mensagem agendada
 * - flows:pending               zset { score: scheduled_at_unix, member: flow_uuid }
 * - contact-flows:{phone}       set de flow ids ativos (pra cancelar em refund)
 * - broadcast:{name}            hash de progresso
 * - broadcast:{name}:queue      list de phones pendentes
 * - leads:base800               set de phones da base original
 */

import { Redis } from "@upstash/redis";

let _redis: Redis | null = null;

export function getRedis(): Redis {
  if (_redis) return _redis;

  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error(
      "Redis não configurado. Faltam KV_REST_API_URL / KV_REST_API_TOKEN (ou as equivalentes UPSTASH_*)."
    );
  }

  _redis = new Redis({ url, token });
  return _redis;
}

/**
 * Wrapper safe pra contextos que NÃO podem quebrar se Redis falhar
 * (ex: webhook do Cakto não pode retornar 500 só porque Redis tá fora).
 * Loga o erro e retorna fallback.
 */
export async function redisSafe<T>(
  fn: (redis: Redis) => Promise<T>,
  fallback: T,
  context = "redis-op"
): Promise<T> {
  try {
    return await fn(getRedis());
  } catch (err) {
    console.error(`[${context}] Redis error:`, err);
    return fallback;
  }
}
