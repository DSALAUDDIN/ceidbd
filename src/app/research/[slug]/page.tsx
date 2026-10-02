import { notFound } from "next/navigation";
import { research } from "@/lib/data";
import { Eyebrow, TextLink, Button } from "@/components/ui";
export function generateStaticParams() {
  return research.map((r) => ({ slug: r.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = research.find((r) => r.slug === slug);
  return { title: r?.title, description: r?.summary };
}
export default async function ResearchDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = research.find((r) => r.slug === slug);
  if (!r) notFound();
  return (
    <>
      <section className="detail-hero">
        <div className="container">
          <TextLink href="/research">← Back to research</TextLink>
          <div className="detail-header">
            <Eyebrow>
              {r.status === "Research Briefs"
                ? "Research brief"
                : r.status + " research"}{" "}
              · {r.theme}
            </Eyebrow>
            <h1>{r.title}</h1>
            <p className="lead">{r.summary}</p>
          </div>
        </div>
      </section>
      <section className="container detail-content">
        <div className="editorial-grid">
          <div>
            <Eyebrow>Research overview</Eyebrow>
            <h2>
              People and experiences
              <br />
              <em>behind the question.</em>
            </h2>
          </div>
          <div className="prose">
            <p className="lead">{r.summary}</p>
            <p>
              This research theme sits within CEID’s commitment to understanding
              inequality through people’s lived experiences and connecting
              knowledge with inclusive practice.
            </p>
            <dl className="facts">
              <div>
                <dt>Research area</dt>
                <dd>{r.theme}</dd>
              </div>
              <div>
                <dt>Portfolio category</dt>
                <dd>{r.status}</dd>
              </div>
              <div>
                <dt>Organisation</dt>
                <dd>CEID</dd>
              </div>
            </dl>
            <div className="notice">
              <h3>
                {r.status === "Published"
                  ? "Publication information"
                  : "Further information"}
              </h3>
              <p>
                {r.status === "Published"
                  ? "The publication citation, authors and article link have not yet been added. Contact CEID to request the verified reference."
                  : "A full project description, methods and outputs are not yet available on this website. Contact CEID for the latest information."}
              </p>
            </div>
            <Button href="/contact">Enquire about this research</Button>
          </div>
        </div>
      </section>
    </>
  );
}
