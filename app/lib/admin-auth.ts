/**
 * Auth para endpoints admin.
 * Header esperado: `x-admin-secret: $ADMIN_PASSWORD`
 */

import { NextRequest, NextResponse } from "next/server";
import { safeCompare } from "./cakto";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export function adminAuthError(req: NextRequest): NextResponse | null {
  if (!ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD não configurado no servidor" },
      { status: 500 }
    );
  }
  const provided = req.headers.get("x-admin-secret") || "";
  if (!provided || !safeCompare(provided, ADMIN_PASSWORD)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
