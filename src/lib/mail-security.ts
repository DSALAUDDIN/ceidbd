import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
export const MAILBOX = "info@ceidbd.com";
export function seal(value: unknown, secret: string) {
  const key = Buffer.from(secret, "hex");
  if (key.length !== 32) throw new Error("Invalid session key");
  const iv = randomBytes(12),
    cipher = createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify(value)),
    cipher.final(),
  ]);
  return Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString(
    "base64url",
  );
}
export function unseal<T>(value: string, secret: string): T {
  const raw = Buffer.from(value, "base64url");
  const decipher = createDecipheriv(
    "aes-256-gcm",
    Buffer.from(secret, "hex"),
    raw.subarray(0, 12),
  );
  decipher.setAuthTag(raw.subarray(12, 28));
  return JSON.parse(
    Buffer.concat([
      decipher.update(raw.subarray(28)),
      decipher.final(),
    ]).toString(),
  );
}
export function validId(value: unknown): value is string {
  return typeof value === "string" && /^\d{1,30}$/.test(value);
}
export function allowedAccount(account: {
  type?: string;
  primaryEmailAddress?: string;
  mailboxAddress?: string;
}) {
  return (
    account.type === "ZOHO_ACCOUNT" &&
    account.primaryEmailAddress?.toLowerCase() === MAILBOX &&
    account.mailboxAddress?.toLowerCase() === MAILBOX
  );
}
export function parseZoho(text: string) {
  // Zoho sometimes sends IDs as numbers larger than JavaScript's safe integer range.
  return JSON.parse(
    text.replace(/("(?:accountId|folderId|messageId)"\s*:\s*)(\d+)/g, '$1"$2"'),
  );
}
export function validMessage(body: {
  to?: unknown;
  subject?: unknown;
  content?: unknown;
  replyId?: unknown;
}) {
  return (
    typeof body.to === "string" &&
    body.to.length <= 254 &&
    /^[^\s<>@,;]+@[^\s<>@,;]+\.[^\s<>@,;]+$/.test(body.to) &&
    typeof body.subject === "string" &&
    body.subject.trim().length > 0 &&
    body.subject.length <= 250 &&
    !/[\r\n]/.test(body.subject) &&
    typeof body.content === "string" &&
    body.content.trim().length > 0 &&
    body.content.length <= 50000 &&
    (body.replyId === undefined || validId(body.replyId))
  );
}
