import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
        <div className="grid md:grid-cols-2 gap-6">
          {caseStudies.map((study, i) => (
            <ScrollReveal key={study.slug} delay={i * 0.05} direction={i % 2 === 0 ? "left" : "right"}>
              <Link href={`/case-studies/${study.slug}`}>
                <div className="group bento-card rounded-xl p-7 h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-500" />
                  <div className="relative z-10">
                    <Badge variant="secondary" className="text-xs mb-4 rounded-full">
                      {study.domain}
                    </Badge>
                    <h2 className="text-xl font-semibold group-hover:text-primary transition-colors mb-2">
                      {study.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-3">
                      {study.subtitle}
                    </p>
                    <p className="text-sm text-muted-foreground/80 line-clamp-3 mb-5">
                      {study.challenge}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {study.stack.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2.5 py-1 rounded-full bg-muted/80 text-muted-foreground border border-border/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center text-sm font-medium text-primary group-hover:gap-2 gap-1 transition-all">
                      Read case study <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </SectionContainer>
    </>
  );
}
