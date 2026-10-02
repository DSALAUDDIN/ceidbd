import { NextResponse } from "next/server";
import { convert } from "html-to-text";
import {
  session,
  accessToken,
  zoho,
  sameOrigin,
  privateHeaders,
} from "@/lib/zoho-mail";
import { MAILBOX, validId, validMessage } from "@/lib/mail-security";
export const runtime = "nodejs";
const json = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: privateHeaders });
export async function GET(request: Request) {
  const s = await session();
  if (!s) return json({ error: "Please sign in again." }, 401);
  try {
    const access = await accessToken(s),
      q = new URL(request.url).searchParams,
      folder = q.get("folder"),
      message = q.get("message");
    const base = `/accounts/${s.accountId}`;
    if (message) {
      if (!validId(message) || !validId(folder))
        return json({ error: "Invalid message." }, 400);
      const data = await zoho(
        access,
        `${base}/folders/${folder}/messages/${message}/content?includeBlockContent=true`,
      );
      return json({
        content: convert(String(data.content || ""), {
          wordwrap: false,
          selectors: [{ selector: "img", format: "skip" }],
        }),
      });
    }
    if (folder) {
      if (!validId(folder)) return json({ error: "Invalid folder." }, 400);
      const start = Number(q.get("start") || 1);
      if (!Number.isInteger(start) || start < 1 || start > 100000)
        return json({ error: "Invalid page." }, 400);
      return json({
        messages: await zoho(
          access,
          `${base}/messages/view?folderId=${folder}&start=${start}&limit=25`,
        ),
      });
    }
    return json({ folders: await zoho(access, `${base}/folders`) });
  } catch {
    return json(
      {
        error:
          "Zoho could not load your mail. Reconnect or check your account’s API access.",
      },
      502,
    );
  }
}
// This single-instance VPS guard also prevents concurrent duplicate submissions.
const sends = new Map<string, number>();
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return json({ error: "Request origin not allowed." }, 403);
  const s = await session();
  if (!s) return json({ error: "Please sign in again." }, 401);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return json({ error: "JSON required." }, 400);
  const raw = await request.text();
  if (raw.length > 60000) return json({ error: "Message too large." }, 413);
  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: "Invalid message." }, 400);
  }
  if (!body || !validMessage(body))
    return json(
      { error: "Enter one valid recipient, subject and message." },
      400,
    );
  const now = Date.now();
  for (const [key, time] of sends) {
    if (time < now - 60000) sends.delete(key);
  }
  if ((sends.get(s.id) || 0) > now - 5000)
    return json(
      { error: "Please wait a few seconds before sending again." },
      429,
    );
  sends.set(s.id, now);
  try {
    const access = await accessToken(s);
    await zoho(
      access,
      `/accounts/${s.accountId}/messages${body.replyId ? `/${body.replyId}` : ""}`,
      {
        fromAddress: MAILBOX,
        toAddress: body.to,
        subject: body.subject,
        content: body.content,
        mailFormat: "plaintext",
        ...(body.replyId ? { action: "reply" } : {}),
      },
    );
    return json({ sent: true });
  } catch {
    return json(
      {
        error:
          "Zoho did not confirm sending. Check Sent before retrying to avoid a duplicate.",
      },
      502,
    );
  }
}
