import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { SectionContainer } from "@/components/shared/section-container";
import { WorkGrid } from "@/components/work/work-grid";
import { projects } from "@/data/projects";
import { caseStudies } from "@/data/case-studies";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Architecture deep-dives, projects, and case studies across Web3, cloud infrastructure, AI, and enterprise platforms.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        title="Work"
        description="Projects and architecture case studies — from system design to production outcomes."
      />
      <SectionContainer className="pt-0">
        <WorkGrid projects={projects} caseStudies={caseStudies} />
      </SectionContainer>
    </>
  );
}
