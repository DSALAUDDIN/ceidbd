import "server-only";
import { cookies } from "next/headers";
import { randomBytes } from "node:crypto";
import { mkdir, readFile, writeFile, rename, unlink } from "node:fs/promises";
import path from "node:path";
import { seal, unseal, parseZoho, validId } from "./mail-security";
export const SESSION_COOKIE = "ceid_mail_session",
  STATE_COOKIE = "ceid_zoho_state";
export function config() {
  const origin = process.env.ADMIN_ORIGIN || "https://ceidbd.com";
  if (
    !/^https:\/\/[^/]+$/.test(origin) &&
    !/^http:\/\/localhost:\d+$/.test(origin)
  )
    throw new Error("Invalid admin origin");
  const clientId = process.env.ZOHO_CLIENT_ID,
    clientSecret = process.env.ZOHO_CLIENT_SECRET,
    key = process.env.MAIL_SESSION_KEY;
  if (!clientId || !clientSecret || !key || !/^[a-f0-9]{64}$/i.test(key))
    throw new Error("Mail configuration missing");
  return {
    origin,
    clientId,
    clientSecret,
    key,
    redirect: `${origin}/api/admin/zoho/callback`,
  };
}
export function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: config().origin.startsWith("https:"),
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}
export type Session = {
  accountId: string;
  access: string;
  refresh: string;
  accessExpires: number;
  expires: number;
};
const directory = () =>
  process.env.MAIL_SESSION_DIR || path.join(process.cwd(), ".private-mail");
export async function saveSession(id: string, session: Session) {
  if (!/^[a-f0-9]{64}$/.test(id)) throw new Error("Invalid session");
  await mkdir(directory(), { recursive: true, mode: 0o700 });
  const target = path.join(/* turbopackIgnore: true */ directory(), id),
    temp = target + "." + randomBytes(6).toString("hex");
  await writeFile(temp, seal(session, config().key), { mode: 0o600 });
  await rename(temp, target);
}
export async function session() {
  const id = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!id || !/^[a-f0-9]{64}$/.test(id)) return null;
  try {
    const value = unseal<Session>(
      await readFile(
        /* turbopackIgnore: true */ path.join(
          /* turbopackIgnore: true */ directory(),
          id,
        ),
        "utf8",
      ),
      config().key,
    );
    if (value.expires < Date.now() || !validId(value.accountId)) {
      await removeSession(id);
      return null;
    }
    return { id, ...value };
  } catch {
    return null;
  }
}
export async function removeSession(id: string) {
  if (/^[a-f0-9]{64}$/.test(id))
    await unlink(path.join(/* turbopackIgnore: true */ directory(), id)).catch(() => {});
}
export async function token(fields: Record<string, string>) {
  const c = config();
  const res = await fetch("https://accounts.zoho.com/oauth/v2/token", {
    method: "POST",
    body: new URLSearchParams({
      client_id: c.clientId,
      client_secret: c.clientSecret,
      ...fields,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });
  const data = await res.json();
  if (!res.ok || typeof data.access_token !== "string")
    throw new Error("Zoho authorization failed");
  return data as {
    access_token: string;
    refresh_token?: string;
    expires_in: number;
  };
}
export async function zoho(access: string, route: string, body?: unknown) {
  const res = await fetch(`https://mail.zoho.com/api${route}`, {
    method: body ? "POST" : "GET",
    headers: {
      Authorization: `Zoho-oauthtoken ${access}`,
      "Content-Type": "application/json",
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    cache: "no-store",
    signal: AbortSignal.timeout(20000),
  });
  const data = parseZoho(await res.text());
  if (!res.ok || (data.status?.code && Number(data.status.code) >= 400))
    throw new Error("Zoho request failed");
  return data.data;
}
const refreshing = new Map<string, Promise<string>>();
export async function accessToken(s: Session & { id: string }) {
  if (s.accessExpires > Date.now() + 60000) return s.access;
  let task = refreshing.get(s.id);
  if (!task) {
    task = (async () => {
      const t = await token({
        grant_type: "refresh_token",
        refresh_token: s.refresh,
      });
      await saveSession(s.id, {
        ...s,
        access: t.access_token,
        accessExpires: Date.now() + Number(t.expires_in || 3600) * 1000,
      });
      return t.access_token;
    })();
    refreshing.set(s.id, task);
  }
  try {
    return await task;
  } finally {
    refreshing.delete(s.id);
  }
}
export const privateHeaders = {
  "Cache-Control": "private, no-store, max-age=0",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  "X-Robots-Tag": "noindex, nofollow",
};
export function sameOrigin(request: Request) {
  return request.headers.get("origin") === config().origin;
}
