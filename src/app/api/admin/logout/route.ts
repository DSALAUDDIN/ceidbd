import { NextResponse } from "next/server";
import {
  config,
  session,
  removeSession,
  cookieOptions,
  SESSION_COOKIE,
  sameOrigin,
  privateHeaders,
} from "@/lib/zoho-mail";
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return new Response(null, { status: 403, headers: privateHeaders });
  const s = await session();
  if (s) await removeSession(s.id);
  const res = NextResponse.redirect(`${config().origin}/admin`, 303);
  res.cookies.set(SESSION_COOKIE, "", cookieOptions(0));
  return res;
}
