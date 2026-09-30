import { PageHero, Eyebrow, TextLink, Button } from "@/components/ui";
export const metadata = { title: "Events & Conversations" };
export default function Events() {
  return (
    <>
      <PageHero
        label="Events & conversations"
        title="A space to exchange ideas."
        description="Workshops, seminars and research conversations that bring people together to learn, question and connect."
        image="workshop"
      />
      <section className="section container editorial-grid">
        <div>
          <Eyebrow>Upcoming events</Eyebrow>
          <h2>
            Our next conversation
            <br />
            <em>is taking shape.</em>
          </h2>
          <p>
            Confirmed dates, speakers and registration information will be
            published here. No events are open for registration at the moment.
          </p>
          <Button href="/contact">Ask about future events</Button>
        </div>
        <div className="event-list">
          {[
            "Research methods orientation",
            "Community wellbeing research conversation",
            "Knowledge-sharing sessions",
          ].map((t) => (
            <article key={t}>
              <span className="badge">In development</span>
              <h3>{t}</h3>
              <p>Date and format to be confirmed</p>
              <TextLink href="/contact">Express interest</TextLink>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
