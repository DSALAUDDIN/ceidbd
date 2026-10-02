import { redirect } from "next/navigation";
import { session } from "@/lib/zoho-mail";
import { MailPanel } from "@/components/mail-panel";
export default async function MailPage() {
  if (!(await session())) redirect("/admin");
  return <MailPanel />;
}
