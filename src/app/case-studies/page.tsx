import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { SectionContainer } from "@/components/shared/section-container";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { caseStudies } from "@/data/case-studies";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Architecture deep-dives into system design decisions, tradeoffs, and outcomes.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHeader
        title="Case Studies"
        description="Deep dives into architectural decisions, system design tradeoffs, and outcomes."
      />
      <SectionContainer className="pt-0">
        <div className="grid md:grid-cols-2 gap-4">
          {caseStudies.map((study, i) => (
            <ScrollReveal key={study.slug} delay={i * 0.05}>
              <Link href={`/case-studies/${study.slug}`}>
                <div className="group rounded-lg border bg-card p-6 h-full transition-all hover:border-primary/30 hover:glow">
                  <Badge variant="secondary" className="text-xs mb-3">
                    {study.domain}
                  </Badge>
                  <h2 className="text-lg font-semibold group-hover:text-primary transition-colors mb-1">
                    {study.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-3">
                    {study.subtitle}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {study.challenge}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {study.stack.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center text-xs text-primary">
                    Read case study <ArrowRight className="ml-1 h-3 w-3" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </SectionContainer>
    </>
  );
}
