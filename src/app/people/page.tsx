import { PageHero, Eyebrow, TextLink, Invitation } from "@/components/ui";
import { people } from "@/lib/data";
export const metadata = { title: "Our People" };
export default function People() {
  return (
    <>
      <PageHero
        label="Our people"
        title="Different perspectives. Shared purpose."
        description="Meet the people coordinating our research, building partnerships and shaping CEID’s work."
      />
      <section className="section container">
        <Eyebrow>Our leadership</Eyebrow>
        <h2>
          People behind
          <br />
          <em>the purpose.</em>
        </h2>
        <div className="people-grid">
          {people.map((p) => (
            <article key={p.slug} className="person-card">
              <div className="person-initials" aria-hidden="true">
                {p.initials}
                <span>CEID / LEADERSHIP</span>
              </div>
              <div>
                <span className="mini-label">{p.role}</span>
                <h3>{p.name}</h3>
                <p>{p.responsibility}</p>
                <TextLink href={`/people/${p.slug}`}>
                  Meet {p.name.split(" ")[0] === "Md" ? "Mahfuzur" : "Nafiul"}
                </TextLink>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Invitation />
    </>
  );
}
