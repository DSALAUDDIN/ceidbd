import { notFound } from "next/navigation";
import { people } from "@/lib/data";
import { Eyebrow, TextLink, Button } from "@/components/ui";
export function generateStaticParams() {
  return people.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return { title: people.find((p) => p.slug === slug)?.name };
}
export default async function Person({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = people.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <section className="section container">
      <TextLink href="/people">← All people</TextLink>
      <div className="profile-grid">
        <div className="person-initials large" aria-hidden="true">
          {p.initials}
          <span>CEID / LEADERSHIP</span>
        </div>
        <div>
          <Eyebrow>{p.role}</Eyebrow>
          <h1>{p.name}</h1>
          <p className="lead">{p.description}</p>
          <p>{p.responsibility}</p>
          <h3>
            Areas of {p.slug === "nafiul-muid" ? "interest" : "responsibility"}
          </h3>
          <div className="tags">
            {p.areas.map((a) => (
              <span key={a}>{a}</span>
            ))}
          </div>
          <Button href="/contact">Get in touch</Button>
        </div>
      </div>
    </section>
  );
}
