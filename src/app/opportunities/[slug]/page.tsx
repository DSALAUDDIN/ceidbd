import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { opportunities } from "@/lib/opportunities";
import { Eyebrow, TextLink } from "@/components/ui";
export function generateStaticParams() {
  return opportunities.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return { title: opportunities.find((item) => item.slug === slug)?.heading };
}
export default async function Opportunity({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = opportunities.find((item) => item.slug === slug);
  if (!item) notFound();
  const email = `mailto:info@ceidbd.com?subject=${encodeURIComponent(item.subject)}`;
  return (
    <section className="section container opportunity-detail">
      <TextLink href="/opportunities">← All opportunities</TextLink>
      <Eyebrow>Get involved</Eyebrow>
      <h1>{item.heading}</h1>
      <div className="prose">
        {item.paragraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
        <p>{item.listIntro}</p>
        <ul className="submission-list">
          {item.requirements.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
        {item.after.map((text) => (
          <p key={text}>{text}</p>
        ))}
        <div className="notice">
          <h2>Email your enquiry</h2>
          <p>
            <strong>To:</strong>{" "}
            <a href="mailto:info@ceidbd.com">info@ceidbd.com</a>
          </p>
          <p>
            <strong>Subject:</strong> {item.subject}
          </p>
          <a className="button" href={email}>
            {item.button}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
