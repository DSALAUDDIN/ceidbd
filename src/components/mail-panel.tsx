"use client";
import { useEffect, useState } from "react";
type Folder = {
  folderId: string;
  folderName: string;
  path: string;
  folderType: string;
};
type Message = {
  messageId: string;
  folderId: string;
  subject: string;
  fromAddress: string;
  toAddress: string;
  summary?: string;
  receivedTime?: string;
};
async function api(url: string, init?: RequestInit) {
  const res = await fetch(url, { ...init, cache: "no-store" });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Mail request failed.");
  return data;
}
export function MailPanel() {
  const [folders, setFolders] = useState<Folder[]>([]),
    [folder, setFolder] = useState(""),
    [messages, setMessages] = useState<Message[]>([]),
    [start, setStart] = useState(1),
    [refresh, setRefresh] = useState(0);
  const [selected, setSelected] = useState<Message | null>(null),
    [content, setContent] = useState(""),
    [error, setError] = useState(""),
    [notice, setNotice] = useState(""),
    [loading, setLoading] = useState(true),
    [reading, setReading] = useState(false);
  const [compose, setCompose] = useState(false),
    [to, setTo] = useState(""),
    [subject, setSubject] = useState(""),
    [body, setBody] = useState(""),
    [replyId, setReplyId] = useState<string | undefined>(),
    [sending, setSending] = useState(false);
  useEffect(() => {
    const ac = new AbortController();
    api("/api/admin/mail", { signal: ac.signal })
      .then((data) => {
        if (ac.signal.aborted) return;
        const list = data.folders as Folder[];
        setFolders(list);
        setFolder(
          (list.find((f) => f.path === "/Inbox") || list[0])?.folderId || "",
        );
        setLoading(false);
      })
      .catch((e) => {
        if (!ac.signal.aborted) {
          setError(e.message);
          setLoading(false);
        }
      });
    return () => ac.abort();
  }, []);
  useEffect(() => {
    if (!folder) return;
    const ac = new AbortController();
    setLoading(true);
    setError("");
    setMessages([]);
    setSelected(null);
    api(`/api/admin/mail?folder=${folder}&start=${start}`, {
      signal: ac.signal,
    })
      .then((data) => {
        if (!ac.signal.aborted) setMessages(data.messages || []);
      })
      .catch((e) => {
        if (!ac.signal.aborted) setError(e.message);
      })
      .finally(() => {
        if (!ac.signal.aborted) setLoading(false);
      });
    return () => ac.abort();
  }, [folder, start, refresh]);
  useEffect(() => {
    if (!selected) return;
    const ac = new AbortController();
    setReading(true);
    setContent("");
    api(
      `/api/admin/mail?folder=${selected.folderId || folder}&message=${selected.messageId}`,
      { signal: ac.signal },
    )
      .then((data) => {
        if (!ac.signal.aborted) setContent(data.content);
      })
      .catch((e) => {
        if (!ac.signal.aborted) setError(e.message);
      })
      .finally(() => {
        if (!ac.signal.aborted) setReading(false);
      });
    return () => ac.abort();
  }, [selected, folder]);
  function write(reply = false) {
    if (compose && body && !window.confirm("Discard the current draft?"))
      return;
    setError("");
    setNotice("");
    setCompose(true);
    setBody("");
    setReplyId(reply ? selected?.messageId : undefined);
    const address = reply ? selected?.fromAddress || "" : "";
    setTo(address.match(/<([^>]+)>/)?.[1] || address);
    setSubject(
      reply ? `Re: ${(selected?.subject || "").replace(/^Re:\s*/i, "")}` : "",
    );
  }
  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError("");
    setNotice("");
    try {
      await api("/api/admin/mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, subject, content: body, replyId }),
      });
      setCompose(false);
      setBody("");
      setNotice("Email sent.");
      setRefresh((n) => n + 1);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Send failed.");
    } finally {
      setSending(false);
    }
  }
  return (
    <section className="section container mail-admin">
      <div className="mail-toolbar">
        <div>
          <span className="mini-label">ADMIN / MAIL</span>
          <h1>info@ceidbd.com</h1>
        </div>
        <div className="mail-actions">
          <button className="button" onClick={() => write()}>
            New email
          </button>
          <form action="/api/admin/logout" method="post">
            <button className="mail-secondary" type="submit">
              Sign out
            </button>
          </form>
        </div>
      </div>
      <div className="mail-actions">
        <label>
          Folder{" "}
          <select
            aria-label="Mail folder"
            value={folder}
            onChange={(e) => {
              setFolder(e.target.value);
              setStart(1);
            }}
          >
            {folders.map((f) => (
              <option key={f.folderId} value={f.folderId}>
                {f.folderName}
              </option>
            ))}
          </select>
        </label>
        <button
          className="mail-secondary"
          disabled={loading}
          onClick={() => setRefresh((n) => n + 1)}
        >
          Refresh
        </button>
        <a href="https://mail.zoho.com/" target="_blank" rel="noreferrer">
          Open Zoho Mail ↗
        </a>
      </div>
      {error && (
        <p role="alert" className="mail-error">
          {error} <a href="/api/admin/zoho/login">Reconnect Zoho</a>
        </p>
      )}
      {notice && (
        <p role="status" className="notice">
          {notice}
        </p>
      )}
      {compose && (
        <form onSubmit={send} className="mail-compose">
          <h2>{replyId ? "Reply" : "New email"}</h2>
          <p>From: info@ceidbd.com</p>
          <label>
            To
            <input
              type="email"
              required
              maxLength={254}
              value={to}
              onChange={(e) => setTo(e.target.value)}
              disabled={sending}
            />
          </label>
          <label>
            Subject
            <input
              required
              maxLength={250}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={sending}
            />
          </label>
          <label>
            Message
            <textarea
              required
              rows={10}
              maxLength={50000}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              disabled={sending}
            />
          </label>
          <div className="mail-actions">
            <button className="button" disabled={sending} type="submit">
              {sending ? "Sending…" : "Send email"}
            </button>
            <button
              className="mail-secondary"
              disabled={sending}
              type="button"
              onClick={() => {
                if (!body || window.confirm("Discard this draft?")) {
                  setCompose(false);
                  setBody("");
                }
              }}
            >
              Cancel
            </button>
          </div>
          <p className="mail-hint">For attachments, use Open Zoho Mail.</p>
        </form>
      )}
      <div className="mail-columns">
        <div>
          <h2>
            {folders.find((f) => f.folderId === folder)?.folderName ||
              "Mailbox"}
          </h2>
          {loading ? (
            <p role="status">Loading mail…</p>
          ) : !messages.length ? (
            <p>No messages to display.</p>
          ) : (
            <ul className="mail-list">
              {messages.map((m) => (
                <li key={m.messageId}>
                  <button
                    aria-pressed={selected?.messageId === m.messageId}
                    onClick={() => {
                      setSelected(m);
                      setError("");
                    }}
                  >
                    <strong>{m.subject || "(No subject)"}</strong>
                    <span>{m.fromAddress}</span>
                    <small>{m.summary}</small>
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="mail-actions">
            <button
              className="mail-secondary"
              disabled={loading || start === 1}
              onClick={() => setStart((n) => Math.max(1, n - 25))}
            >
              Previous
            </button>
            <span>Page {Math.floor((start - 1) / 25) + 1}</span>
            <button
              className="mail-secondary"
              disabled={loading || messages.length < 25}
              onClick={() => setStart((n) => n + 25)}
            >
              Next
            </button>
          </div>
        </div>
        <article className="mail-reader">
          {selected ? (
            <>
              <h2>{selected.subject || "(No subject)"}</h2>
              <p>From: {selected.fromAddress}</p>
              <p>To: {selected.toAddress}</p>
              <button className="mail-secondary" onClick={() => write(true)}>
                Reply
              </button>
              {reading ? (
                <p role="status">Loading message…</p>
              ) : (
                <pre>{content || "No text content."}</pre>
              )}
            </>
          ) : (
            <p>Select a message to read it.</p>
          )}
        </article>
      </div>
    </section>
  );
}
