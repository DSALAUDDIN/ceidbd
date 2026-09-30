import {
  PageHero,
  Eyebrow,
  Photo,
  TextLink,
  Invitation,
} from "@/components/ui";
import { learning } from "@/lib/data";
export const metadata = { title: "Learning & Training" };
export default function Learning() {
  return (
    <>
      <PageHero
        label="Learning & training"
        title="Knowledge grows when we share it."
        description="Practical research learning for students, early-career researchers and professionals. Bring your curiosity. Build your confidence."
        image="learning"
      />
      <section className="section container">
        <div className="section-heading">
          <div>
            <Eyebrow>Learn with CEID</Eyebrow>
            <h2>
              Ideas into skills.
              <br />
              <em>Skills into practice.</em>
            </h2>
          </div>
          <p>
            From focused workshops to structured training, our learning approach
            connects thoughtful discussion with practical work.
          </p>
        </div>
        <div className="learning-grid">
          {learning.map((l) => (
            <article key={l.slug}>
              <Photo name={l.image} alt={l.title} />
              <div>
                <Eyebrow>{l.eyebrow}</Eyebrow>
                <h3>{l.title}</h3>
                <p>{l.description}</p>
                <TextLink href={`/learning/${l.slug}`}>
                  Explore {l.title.toLowerCase()}
                </TextLink>
              </div>
            </article>
          ))}
        </div>
        <div className="notice learning-notice">
          <h3>Be part of the next learning opportunity.</h3>
          <p>
            Programme dates and registration details will be announced when
            confirmed. You can express your interest today.
          </p>
          <TextLink href="/contact">Express your interest</TextLink>
        </div>
      </section>
      <Invitation />
    </>
  );
}
