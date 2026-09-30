import { PageHero, TextLink } from "@/components/ui";
export const metadata = { title: "Privacy" };
export default function Privacy() {
  return (
    <>
      <PageHero
        label="Privacy"
        title="Your information, handled thoughtfully."
        description="How this website handles information when you explore our work or prepare an enquiry."
      />
      <section className="section container narrow prose">
        <h2>Browsing this website</h2>
        <p>
          This version of the website does not use analytics trackers,
          advertising cookies or a visitor account system. Your hosting provider
          may process standard technical request logs when the site is deployed.
        </p>
        <h2>Contact enquiries</h2>
        <p>
          The contact form prepares a draft in your own email application. It
          does not submit or store your message on this website. Your details
          are sent only when you send the email. Share only information needed
          for your enquiry.
        </p>
        <h2>Questions about your information</h2>
        <p>
          Contact CEID if you have a question about information shared by email
          or wish to request its correction or deletion.
        </p>
        <TextLink href="/contact">Contact CEID</TextLink>
      </section>
    </>
  );
}
