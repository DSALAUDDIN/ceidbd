import Link from "next/link";
import { PageHero, Eyebrow, TextLink, Invitation } from "@/components/ui";
import { opportunities, membershipUrl } from "@/lib/opportunities";
export const metadata = { title: "Opportunities" };
const cards = [
  [
    "research-collaboration",
    "Research Collaboration",
    "Bring a question. Build a partnership.",
    "Joint studies, co-authored outputs and multidisciplinary partnerships with researchers, universities and organisations.",
  ],
  [
    "research-guidance",
    "Research Mentorship & Expert Guidance",
    "Get guidance for your research journey.",
    "Support on research design, methodology, analysis, academic writing, publication planning and project development.",
  ],
  [
    "ethics-review",
    "Research Ethics Review",
    "Seek support for ethical and responsible research.",
    "Guidance on ethical protocols, informed consent, participant protection and preparing research ethics applications.",
  ],
  [
    "assistantships-internships",
    "Research Assistantships & Internships",
    "Build practical research experience.",
    "Opportunities related to fieldwork, literature review, data management, analysis, research communication and project support.",
  ],
  [
    "membership",
    "Membership",
    "Become part of the CEID community.",
    "Join as a General, Student or Professional Member and engage with our research, learning and organisational activities.",
  ],
  [
    "volunteering-events",
    "Volunteering & Events",
    "Contribute your time, skills and perspective.",
    "Participate in seminars, workshops, community activities, research events and outreach initiatives.",
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
          {cards.map(([slug, title, subtitle, body], index) => {
            const href =
              slug === "membership" ? membershipUrl : `/opportunities/${slug}`;
            const cta =
              opportunities.find((item) => item.slug === slug)?.cta ||
              "Register for membership";
            return (
              <article key={slug}>
                <span className="large-number">0{index + 1}</span>
                <h3>
                  <Link href={href}>{title}</Link>
                </h3>
                <strong>{subtitle}</strong>
                <p>{body}</p>
                <TextLink href={href}>{cta}</TextLink>
              </article>
            );
          })}
        </div>
        <div className="notice">
          <h3>Open to conversations.</h3>
          <p>
            Expressions of interest are welcome. Current vacancies, internships,
            assistantships and application deadlines will be announced
            separately when available.
          </p>
        </div>
        <div className="notice membership-notice">
          <h3>Join CEID</h3>
          <p>
            Membership registration is currently open for individuals who share
            CEID’s commitment to equity, inclusion, research and sustainable
            development.
          </p>
          <p>
            Applications are reviewed by CEID, and approved applicants will
            receive further information regarding membership confirmation and
            payment procedures by email.
          </p>
          <TextLink href={membershipUrl}>Register for membership</TextLink>
        </div>
      </section>
      <Invitation />
    </>
  );
}
