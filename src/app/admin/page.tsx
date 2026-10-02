import { redirect } from "next/navigation";
import { session, config } from "@/lib/zoho-mail";
import { Eyebrow } from "@/components/ui";
export default async function Admin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await session()) redirect("/admin/mail");
  let configured = true;
  try {
    config();
  } catch {
    configured = false;
  }
  const { error } = await searchParams;
  return (
    <section className="section container admin-login">
      <Eyebrow>CEID administration</Eyebrow>
      <h1>
        Your organisation.
        <br />
        <em>Your mailbox.</em>
      </h1>
      <p>
        Sign in with the Zoho account for <strong>info@ceidbd.com</strong> to
        read and send mail.
      </p>
      {error && (
        <p className="mail-error" role="alert">
          {error === "account"
            ? "Only the info@ceidbd.com Zoho mailbox can access this panel. Sign in with that account and grant the requested permissions."
            : "Zoho connection was not completed. Try again and allow the requested mail permissions. Your account must support Zoho Mail API access."}
        </p>
      )}
      {configured ? (
        <a className="button" href="/api/admin/zoho/login">
          Sign in with Zoho →
        </a>
      ) : (
        <p className="notice">
          Mail setup is pending. The site administrator needs to configure the
          Zoho connection.
        </p>
      )}
    </section>
  );
}
