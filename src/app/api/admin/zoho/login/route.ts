import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import {
  config,
  cookieOptions,
  STATE_COOKIE,
  privateHeaders,
} from "@/lib/zoho-mail";
import { seal } from "@/lib/mail-security";
export const runtime = "nodejs";
export async function GET() {
  try {
    const c = config(),
      state = randomBytes(32).toString("hex");
    const query = new URLSearchParams({
      client_id: c.clientId,
      redirect_uri: c.redirect,
      response_type: "code",
      access_type: "offline",
      prompt: "consent",
      scope:
        "ZohoMail.accounts.READ,ZohoMail.folders.READ,ZohoMail.messages.READ,ZohoMail.messages.CREATE",
      state,
    });
    const response = NextResponse.redirect(
      `https://accounts.zoho.com/oauth/v2/auth?${query}`,
    );
    response.cookies.set(
      STATE_COOKIE,
      seal({ state, expires: Date.now() + 600000 }, c.key),
      cookieOptions(600),
    );
    Object.entries(privateHeaders).forEach(([k, v]) =>
      response.headers.set(k, v),
    );
    return response;
  } catch {
    return NextResponse.json(
      { error: "Admin mail is not configured yet." },
      { status: 503, headers: privateHeaders },
    );
  }
}
