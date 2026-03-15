import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { caseStudies } from "@/data/case-studies";

export function CaseStudiesPreview() {
  const featured = caseStudies.filter((cs) => cs.featured);

  return (
    <SectionContainer>
      <SectionHeading
        title="Architecture Case Studies"
        description="Deep dives into system design decisions and tradeoffs"
      />
      <div className="grid md:grid-cols-3 gap-4">
        {featured.map((study, i) => (
          <ScrollReveal key={study.slug} delay={i * 0.1}>
            <Link href={`/case-studies/${study.slug}`}>
              <div className="group rounded-lg border bg-card p-5 h-full transition-all hover:border-primary/30 hover:glow">
                <Badge variant="secondary" className="text-xs mb-3">
                  {study.domain}
                </Badge>
                <h3 className="font-medium text-sm group-hover:text-primary transition-colors mb-2">
                  {study.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {study.challenge}
                </p>
                <div className="mt-3 flex items-center text-xs text-primary">
                  Read case study <ArrowRight className="ml-1 h-3 w-3" />
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </SectionContainer>
  );
}
