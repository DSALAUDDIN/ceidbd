import { notFound } from "next/navigation";
import { focusAreas, research } from "@/lib/data";
import { PageHero, Eyebrow, TextLink, Invitation } from "@/components/ui";
export function generateStaticParams() {
  return focusAreas.map((f) => ({ slug: f.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: focusAreas.find((f) => f.slug === slug)?.title || "Our work",
  };
}
export default async function Focus({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const f = focusAreas.find((f) => f.slug === slug);
  if (!f) notFound();
  return (
    <>
      <PageHero
        label={f.title}
        title={f.tagline}
        description={f.description}
        image={f.image}
      />
      <section className="section container editorial-grid">
        <div>
          <Eyebrow>What we focus on</Eyebrow>
          <h2>
            Understanding the
            <br />
            <em>conditions for change.</em>
          </h2>
          <p>{f.closing}</p>
          <TextLink href="/our-work">All focus areas</TextLink>
        </div>
        <div className="topic-list">
          {f.topics.map((t, i) => (
            <article key={t}>
              <span>0{i + 1}</span>
              <h3>{t}</h3>
            </article>
          ))}
        </div>
      </section>
      <section className="tinted section">
        <div className="container">
          <Eyebrow>Connected research</Eyebrow>
          <h2>Questions that matter.</h2>
          <div className="three-cards">
            {research
              .filter((r) => r.theme === f.title)
              .slice(0, 3)
              .map((r) => (
                <article key={r.slug}>
                  <span className="badge">{r.status}</span>
                  <h3>{r.title}</h3>
                  <p>{r.summary}</p>
                  <TextLink href={`/research/${r.slug}`}>
                    Read overview
                  </TextLink>
                </article>
              ))}
          </div>
        </div>
      </section>
      <Invitation />
    </>
  );
}
