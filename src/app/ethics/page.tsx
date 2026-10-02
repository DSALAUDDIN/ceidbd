import { PageHero, Eyebrow, TextLink } from "@/components/ui";
export const metadata = { title: "Research Ethics & Integrity" };
export default function Ethics() {
  return (
    <>
      <PageHero
        label="Research ethics & integrity"
        title="Respect is the starting point."
        description="Research should protect participants, respect communities and support responsible scholarship."
      />
      <section className="section container editorial-grid">
        <div>
          <Eyebrow>Our commitments</Eyebrow>
          <h2>
            Responsible questions.
            <br />
            <em>Respectful practice.</em>
          </h2>
          <p>
            CEID aims to build research practices grounded in dignity and
            accountability.
          </p>
          <TextLink href="/contact">Discuss a research question</TextLink>
        </div>
        <div className="prose">
          {[
            [
              "Informed consent",
              "Participation should be voluntary and based on a clear understanding of the study, its purpose and the right to withdraw.",
            ],
            [
              "Confidentiality & data care",
              "Personal information should be handled carefully, with appropriate safeguards and clear limits on access.",
            ],
            [
              "Dignity & inclusion",
              "Research should respect people’s experiences, avoid discrimination and consider the needs of participants and communities.",
            ],
            [
              "Integrity & transparency",
              "Researchers should disclose conflicts of interest, represent findings honestly and acknowledge the contributions of others.",
            ],
          ].map(([h, p]) => (
            <article key={h}>
              <h3>{h}</h3>
              <p>{p}</p>
            </article>
          ))}
          <div className="notice">
            <h3>Ethics review</h3>
            <p>
              CEID’s Research Ethics Committee reviews research involving human
              participants to support ethical, responsible and
              participant-centred research practice.
            </p>
            <TextLink href="/opportunities/ethics-review">
              Apply for ethics review
            </TextLink>
          </div>
        </div>
      </section>
    </>
  );
}
