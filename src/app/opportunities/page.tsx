import { PageHero, Eyebrow, TextLink, Invitation } from "@/components/ui";
export const metadata = { title: "Opportunities" };
const routes = [
  [
    "Research collaboration",
    "Bring a question. Build a partnership.",
    "Joint studies, co-authored outputs and multidisciplinary partnerships with researchers, universities and organisations.",
  ],
  [
    "Research associates",
    "Develop your research practice.",
    "Express interest in future project-specific opportunities for early-career researchers. Roles will be shared when confirmed.",
  ],
  [
    "Volunteering & events",
    "Contribute your time and perspective.",
    "Explore future opportunities linked to workshops, events, community engagement and research communication.",
  ],
];
export default function Opportunities() {
  return (
    <>
      <PageHero
        label="Opportunities"
        title="There’s room for your perspective."
        description="Ways for students, researchers and institutions to learn, contribute and collaborate with CEID."
        image="workshop"
      />
      <section className="section container">
        <Eyebrow>Get involved</Eyebrow>
        <h2>
          Find your way
          <br />
          <em>to contribute.</em>
        </h2>
        <div className="three-cards opportunity-cards">
          {routes.map(([title, sub, body], i) => (
            <article key={title}>
              <span className="large-number">0{i + 1}</span>
              <h3>{title}</h3>
              <strong>{sub}</strong>
              <p>{body}</p>
              <TextLink href="/contact">Express interest</TextLink>
            </article>
          ))}
        </div>
        <div className="notice">
          <h3>Open to conversations.</h3>
          <p>
            No vacancies or application deadlines are currently listed.
            Expressions of interest are welcome and do not constitute an
            application for a confirmed position.
          </p>
        </div>
      </section>
      <Invitation />
    </>
  );
}
