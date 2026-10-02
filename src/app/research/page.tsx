import { PageHero, Invitation } from "@/components/ui";
import { ResearchExplorer } from "@/components/research-explorer";
export const metadata = { title: "Our Research" };
export default function Research() {
  return (
    <>
      <PageHero
        label="Research"
        title="Our Research"
        description="Our research explores social, environmental and development issues affecting communities in Bangladesh and beyond. Through rigorous, contextual and people-centred research, we generate evidence to inform policy, practice and meaningful social change."
        image="research-illustration"
      />
      <ResearchExplorer />
      <Invitation />
    </>
  );
}
