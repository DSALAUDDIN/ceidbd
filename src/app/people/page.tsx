import {
  PageHero,
  Eyebrow,
  TextLink,
  Invitation,
  Photo,
} from "@/components/ui";
import { people, associates, assistants, interns } from "@/lib/data";
export const metadata = { title: "Our People" };
function initials(name: string) {
  if (name === "Md Mahfuzur Rahman Khan") return "MK";
  if (name === "Abdullah Al Mamun") return "AM";
  return name
    .split(" ")
    .filter((word) => word !== "Md")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
}
export default function People() {
  const leadership = ["ridoy-talukder", "mahfuzur-rahman-khan"].flatMap(
    (slug) => people.filter((person) => person.slug === slug),
  );
  return (
    <>
      <PageHero
        label="Our people"
        title="People Behind the Purpose"
        description="Meet the people behind CEID’s research, learning and development initiatives."
      />
      <section
        className="section container"
        aria-label="People behind the purpose"
      >
        <div className="people-grid">
          {leadership.map((person) => (
            <article key={person.slug} className="person-card">
              <div className="person-initials" aria-hidden="true">
                {person.initials}
                <span>CEID / PEOPLE</span>
              </div>
              <div>
                <h2 className="team-person-name">{person.name}</h2>
                <TextLink href={`/people/${person.slug}`}>
                  View profile
                </TextLink>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section
        className="section team-associates"
        aria-labelledby="associates-heading"
      >
        <div className="container">
          <Eyebrow>Our team</Eyebrow>
          <h2 id="associates-heading">Research Associates</h2>
          <p className="team-intro">
            Our Research Associates contribute to CEID’s research, learning and
            development initiatives, bringing diverse expertise and perspectives
            to advance our mission.
          </p>
          <div className="associate-grid">
            {associates.map((person) => (
              <article className="associate-card" key={person.name}>
                <div className="associate-initials" aria-hidden="true">
                  {initials(person.name)}
                </div>
                <h3>{person.name}</h3>
                <p>{person.role}</p>
                {person.slug && (
                  <TextLink href={`/people/${person.slug}`}>
                    View profile
                  </TextLink>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="page-hero with-photo">
        <div className="container page-hero-inner">
          <div>
            <Eyebrow>Our team</Eyebrow>
            <h2>Research Support Team</h2>
            <p>
              Our Research Assistants and Interns support CEID’s research,
              learning and development work, contributing to our mission through
              dedication, curiosity and collaboration.
            </p>
          </div>
          <Photo name="community" alt="Riverine community in Bangladesh" />
        </div>
      </section>
      <section
        className="section container support-grid"
        aria-label="Research support team"
      >
        {[
          { title: "Research Assistants", names: assistants },
          { title: "Research Interns", names: interns },
        ].map((group) => (
          <div key={group.title}>
            <h2>{group.title}</h2>
            <ul className="support-list">
              {group.names.map((name) => (
                <li key={name}>
                  <span className="support-initials" aria-hidden="true">
                    {initials(name)}
                  </span>
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <Invitation />
    </>
  );
}
