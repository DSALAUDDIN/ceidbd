import Link from "next/link";
import {
  Users,
  ChartNoAxesCombined,
  Sprout,
  HeartHandshake,
  ArrowUpRight,
} from "lucide-react";
import { Button, Eyebrow, Photo, TextLink, Invitation } from "@/components/ui";
import { focusAreas, research } from "@/lib/data";
export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <Eyebrow>People · Evidence · Inclusive change</Eyebrow>
            <h1>
              A fairer, more
              <br />
              inclusive <em>tomorrow.</em>
            </h1>
            <p>
              We connect evidence, learning and action to create a world where
              everyone has the opportunity to thrive.
            </p>
            <div className="hero-actions">
              <Button href="/our-work">Explore our work</Button>
              <TextLink href="/about">Get to know CEID</TextLink>
            </div>
            <div className="hero-note">
              <span className="tiny-dot" />
              Rooted in communities. Open to collaboration.
            </div>
          </div>
          <div className="hero-visual">
            <Photo
              name="community"
              alt="Researchers listening to community members in an outdoor discussion"
              priority
            />
            <div className="image-corner">
              Research begins
              <br />
              with <em>listening.</em>
              <span>OUR COMMUNITY-FIRST APPROACH</span>
            </div>
            <div className="photo-index">
              <span>01 / PEOPLE & PERSPECTIVES</span>
              <ArrowUpRight size={18} />
            </div>
          </div>
        </div>
      </section>
      <section className="values-strip">
        <div className="container values-grid">
          {[
            {
              icon: Users,
              title: "People",
              text: "Lived experiences at the centre",
            },
            {
              icon: ChartNoAxesCombined,
              title: "Evidence",
              text: "Knowledge that informs action",
            },
            {
              icon: Sprout,
              title: "Development",
              text: "Opportunities that last",
            },
            {
              icon: HeartHandshake,
              title: "Inclusion",
              text: "Progress that reaches everyone",
            },
          ].map((v) => (
            <div className="value" key={v.title}>
              <v.icon strokeWidth={1.3} size={29} />
              <div>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="section container" id="focus-areas">
        <div className="section-heading">
          <div>
            <Eyebrow>Our focus areas</Eyebrow>
            <h2>
              Connected challenges.
              <br />
              <em>Shared possibilities.</em>
            </h2>
          </div>
          <div>
            <p>
              Health, education, wellbeing and opportunity are deeply connected.
              So is our work.
            </p>
            <TextLink href="/our-work">Discover our approach</TextLink>
          </div>
        </div>
        <div className="focus-grid">
          {focusAreas.map((f, i) => (
            <Link
              href={`/our-work/${f.slug}`}
              key={f.slug}
              className="focus-card"
            >
              <Photo name={f.image} alt={f.title + " community engagement"} />
              <div className="focus-card-body">
                <span className="focus-index">0{i + 1}</span>
                <h3>{f.title}</h3>
                <p>{f.tagline}</p>
                <span className="circle-arrow">
                  <ArrowUpRight size={19} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="about-home">
        <div className="container about-grid">
          <Photo
            name="wellbeing"
            alt="Women and researchers sharing perspectives in a community discussion"
          />
          <div>
            <Eyebrow>Who we are</Eyebrow>
            <h2>
              Better questions.
              <br />
              <em>Meaningful change.</em>
            </h2>
            <p>
              CEID is an independent, research and action-oriented organisation
              working to advance equity, inclusion and sustainable development.
            </p>
            <p>
              We bring researchers, practitioners and communities together to
              understand social challenges and turn knowledge into thoughtful
              action.
            </p>
            <TextLink href="/about">Learn more about us</TextLink>
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <Eyebrow>Research & perspectives</Eyebrow>
            <h2>
              Evidence with
              <br />
              <em>people at its heart.</em>
            </h2>
          </div>
          <div>
            <p>
              Explore the questions shaping our research and the lives at the
              centre of them.
            </p>
            <TextLink href="/research">Explore all research</TextLink>
          </div>
        </div>
        <div className="featured-grid">
          {["Published", "Completed", "Ongoing"]
            .flatMap((status) =>
              research.filter((r) => r.status === status).slice(0, 1),
            )
            .map((r) => (
              <Link
                className="featured-card"
                key={r.slug}
                href={`/research/${r.slug}`}
              >
                <Photo name={r.image} alt={r.theme} />
                <div>
                  <span className="mini-label">
                    {r.status} / {r.theme}
                  </span>
                  <h3>{r.title}</h3>
                  <p>{r.summary}</p>
                  <span className="text-link">
                    Read overview <ArrowUpRight size={17} />
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </section>
      <section className="learning-home container">
        <div>
          <Eyebrow>Learn with CEID</Eyebrow>
          <h2>
            Grow your skills.
            <br />
            <em>Broaden your perspective.</em>
          </h2>
          <p>
            Practical research learning for curious minds. Explore workshops,
            training programmes and conversations that connect knowledge with
            practice.
          </p>
          <Button href="/learning">Discover learning opportunities</Button>
        </div>
        <Photo
          name="learning"
          alt="An inclusive group of learners working together around a table"
        />
      </section>
      <Invitation />
    </>
  );
}
