import { notFound } from "next/navigation";
import { learning } from "@/lib/data";
import { PageHero, Eyebrow, Button, TextLink } from "@/components/ui";
export function generateStaticParams() {
  return learning.map((l) => ({ slug: l.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return { title: learning.find((l) => l.slug === slug)?.title };
}
export default async function LearningDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const l = learning.find((l) => l.slug === slug);
  if (!l) notFound();
  return (
    <>
      <PageHero
        label={l.title}
        title={l.eyebrow + "."}
        description={l.description}
        image={l.image}
      />
      <section className="section container editorial-grid">
        <div>
          <Eyebrow>Explore the possibilities</Eyebrow>
          <h2>
            {l.slug === "resources"
              ? "A growing library."
              : "Learning with purpose."}
          </h2>
          <p>
            {l.slug === "resources"
              ? "Resources are being prepared. Contact us to discuss the materials you need."
              : "Dates, formats and enrolment details will be shared when programmes are confirmed. Contact us to express interest in an area."}
          </p>
          <Button href="/contact">
            {l.slug === "resources"
              ? "Ask about resources"
              : "Express your interest"}
          </Button>
          <p>
            <TextLink href="/learning">All learning opportunities</TextLink>
          </p>
        </div>
        <div className="topic-list">
          {l.topics.map((t, i) => (
            <article key={t}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{t}</h3>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
