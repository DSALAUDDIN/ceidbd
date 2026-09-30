import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero, Eyebrow, Photo, Invitation } from "@/components/ui";
import { focusAreas } from "@/lib/data";
export const metadata = { title: "Our Work" };
export default function Work() {
  return (
    <>
      <PageHero
        label="Our work"
        title="Building inclusive futures."
        description="Four connected areas. One shared purpose: to understand inequalities and contribute to practical, inclusive and sustainable change."
        image="learning"
      />
      <section className="section container" id="focus-areas">
        <Eyebrow>Our focus areas</Eyebrow>
        <div className="work-list">
          {focusAreas.map((f, i) => (
            <Link
              href={`/our-work/${f.slug}`}
              className="work-item"
              key={f.slug}
            >
              <span className="work-number">0{i + 1}</span>
              <div>
                <h2>{f.title}</h2>
                <p>{f.description}</p>
                <span className="text-link">
                  Explore {f.title.toLowerCase()}
                  <ArrowUpRight size={18} />
                </span>
              </div>
              <Photo name={f.image} alt={f.title} />
            </Link>
          ))}
        </div>
      </section>
      <Invitation />
    </>
  );
}
