# CEID admin mail

Visit `/admin` and sign in with the Zoho account whose primary address and mailbox address are both `info@ceidbd.com`. There is no separate website password. Other accounts, aliases and external IMAP accounts are rejected. Zoho grants access using its consent screen; API availability must be verified against the actual subscription.

## Server configuration

Create a private `.env.local` in the project directory (mode 600). Never commit it:

```dotenv
ADMIN_ORIGIN=https://ceidbd.com
ZOHO_CLIENT_ID=your-client-id
ZOHO_CLIENT_SECRET=your-client-secret
MAIL_SESSION_KEY=64-hex-characters
```

Generate the encryption key with `openssl rand -hex 32`. Register `https://ceidbd.com/api/admin/zoho/callback` in the Zoho API Console. For local testing, also register `http://localhost:3100/api/admin/zoho/callback` and set `ADMIN_ORIGIN=http://localhost:3100`. This integration uses the existing US (.com) Zoho data centre. Neither client credentials nor mailbox passwords are sent to the frontend.

Run `npm ci`, `npm run build`, then restart only the `ceidbd` PM2 process. Open `/admin`, sign in and grant the requested mail scopes. A real inbox-read check is necessary before treating the integration as operational; sending a test message requires the user's chosen recipient.

## Behaviour

- Inbox, Sent and other folders, 25 messages per page, manual refresh.
- Read message content as plain text; original HTML, scripts and remote tracking images are never rendered.
- Compose and reply as info@ceidbd.com, one recipient at a time. No mail is sent until the user clicks Send email.
- Drafts are browser state only; attachments and rich formatting use the linked Zoho webmail.
- Read permissions do not mark messages read in Zoho. No deletion, forwarding or attachment endpoints are exposed.
- Sessions expire after eight hours and are removed on logout. OAuth tokens are AES-256-GCM encrypted in `.private-mail/`, with mode 600 files in a mode 700 directory. Protect this directory and the environment file in server backups. Rotating the session key invalidates existing sessions.
- Single-instance VPS design: keep one PM2 instance, preserve the runtime directory on deploy, and do not cache `/admin*` or `/api/admin*` in Nginx or Cloudflare. An alternative writable session directory may be set with `MAIL_SESSION_DIR`.
- Periodically remove expired, unused session files (older than one day) from the private runtime directory. These files are not a mail archive.

## Validation

`node --experimental-strip-types --test tests/mail-security.test.ts` covers tamper rejection, mailbox identity, ID precision and send validation. Production build checks TypeScript. Local HTTP checks cover unauthenticated access, cross-origin mutation denial and OAuth state rejection. Browser tests can use mock mail; they do not prove real Zoho API entitlement or delivery.
