import { PageHero, Eyebrow, Invitation } from "@/components/ui";
import { ResearchExplorer } from "@/components/research-explorer";
export const metadata = { title: "Research" };
export default function Research() {
  return (
    <>
      <PageHero
        label="Research"
        title="Research for real change."
        description="Evidence to understand social challenges, inform practice and contribute to more equitable, people-centred solutions."
        image="community"
      />
      <section className="section container">
        <div className="section-heading">
          <div>
            <Eyebrow>Our research portfolio</Eyebrow>
            <h2>
              Explore our questions.
              <br />
              <em>Discover new perspectives.</em>
            </h2>
          </div>
          <p>
            Browse research themes and project overviews. Full publication
            references and research outputs will be added as they become
            available.
          </p>
        </div>
        <ResearchExplorer />
      </section>
      <Invitation />
    </>
  );
}
