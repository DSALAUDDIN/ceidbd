import {
  PageHero,
  Eyebrow,
  Photo,
  TextLink,
  Invitation,
} from "@/components/ui";
export const metadata = { title: "About CEID" };
export default function About() {
  return (
    <>
      <PageHero
        label="About CEID"
        title="A shared belief in a fairer future."
        description="Independent thinking. Respectful engagement. Research that contributes to more equitable and inclusive societies."
        image="about-fieldwork"
      />
      <section className="section container editorial-grid">
        <div>
          <Eyebrow>Who we are</Eyebrow>
          <h2>
            Small beginnings.
            <br />
            <em>A focused purpose.</em>
          </h2>
        </div>
        <div className="prose">
          <p className="lead">
            CEID is an independent, research and action-oriented organisation
            working to advance equity, inclusion and sustainable development.
          </p>
          <p>
            We bring together researchers, practitioners, communities and
            partners to understand social challenges, generate evidence and
            translate knowledge into meaningful action.
          </p>
          <p>
            Our work crosses social science, public health, education and
            inclusive development. We believe the strongest questions begin with
            a willingness to listen.
          </p>
          <TextLink href="/people">Meet our people</TextLink>
        </div>
      </section>
      <section className="tinted section">
        <div className="container two-cards">
          <article>
            <Eyebrow>Our mission</Eyebrow>
            <h2>
              Knowledge that
              <br />
              opens opportunities.
            </h2>
            <p>
              Advance equitable and inclusive development through rigorous
              research, practical learning and respectful community engagement.
            </p>
          </article>
          <article>
            <Eyebrow>Our vision</Eyebrow>
            <h2>
              Communities shaped
              <br />
              by equity.
            </h2>
            <p>
              A society where everyone has fairer access to services, knowledge
              and participation, regardless of their social or economic
              circumstances.
            </p>
          </article>
        </div>
      </section>
      <section className="section container about-grid">
        <Photo
          name="community"
          alt="Listening to the experiences of community members"
        />
        <div>
          <Eyebrow>Our approach</Eyebrow>
          <h2>
            Listen carefully.
            <br />
            <em>Work together.</em>
          </h2>
          <p>
            Our approach combines rigorous research with community engagement,
            learning and collaboration. We seek to understand lived realities
            and identify the structural barriers behind inequality.
          </p>
          <div className="steps">
            {[
              "Understand people’s lived experiences",
              "Generate and share credible evidence",
              "Connect knowledge with practice",
              "Learn with communities and partners",
            ].map((t, i) => (
              <div key={t}>
                <span>0{i + 1}</span>
                {t}
              </div>
            ))}
          </div>
          <TextLink href="/ethics">
            Our commitment to research integrity
          </TextLink>
        </div>
      </section>
      <Invitation />
    </>
  );
}
