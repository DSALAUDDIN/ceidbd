import { NextRequest, NextResponse } from "next/server";
import { randomBytes, timingSafeEqual } from "node:crypto";
import {
  config,
  cookieOptions,
  STATE_COOKIE,
  SESSION_COOKIE,
  saveSession,
  token,
  zoho,
  privateHeaders,
  session,
  removeSession,
} from "@/lib/zoho-mail";
import { unseal, allowedAccount, validId } from "@/lib/mail-security";
export const runtime = "nodejs";
export async function GET(request: NextRequest) {
  const c = config();
  const response = NextResponse.redirect(`${c.origin}/admin?error=connection`);
  response.cookies.set(STATE_COOKIE, "", cookieOptions(0));
  Object.entries(privateHeaders).forEach(([k, v]) =>
    response.headers.set(k, v),
  );
  try {
    const saved = unseal<{ state: string; expires: number }>(
      request.cookies.get(STATE_COOKIE)?.value || "",
      c.key,
    );
    const state = request.nextUrl.searchParams.get("state") || "",
      code = request.nextUrl.searchParams.get("code");
    if (
      saved.expires < Date.now() ||
      state.length !== saved.state.length ||
      !timingSafeEqual(Buffer.from(state), Buffer.from(saved.state)) ||
      !code
    )
      throw new Error("Invalid OAuth state");
    const t = await token({
      grant_type: "authorization_code",
      code,
      redirect_uri: c.redirect,
    });
    const accounts = await zoho(t.access_token, "/accounts");
    const account = Array.isArray(accounts)
      ? accounts.find(allowedAccount)
      : null;
    if (!account || !validId(account.accountId) || !t.refresh_token) {
      response.headers.set("Location", `${c.origin}/admin?error=account`);
      return response;
    }
    const previous = await session();
    if (previous) await removeSession(previous.id);
    const id = randomBytes(32).toString("hex");
    await saveSession(id, {
      accountId: account.accountId,
      access: t.access_token,
      refresh: t.refresh_token,
      accessExpires: Date.now() + Number(t.expires_in || 3600) * 1000,
      expires: Date.now() + 8 * 3600000,
    });
    response.cookies.set(SESSION_COOKIE, id, cookieOptions(8 * 3600));
    response.headers.set("Location", `${c.origin}/admin/mail`);
    return response;
  } catch {
    return response;
  }
}
