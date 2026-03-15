import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { experience } from "@/data/experience";
import { certifications } from "@/data/certifications";

export const metadata: Metadata = {
  title: "About",
  description:
    "Software Architect with 11+ years building distributed systems across healthcare, logistics, banking, and blockchain.",
};

const principles = [
  {
    title: "Simplicity at Scale",
    description:
      "The best architectures are the simplest ones that still meet the requirements. Complexity is a cost — I minimize it deliberately.",
  },
  {
    title: "Cloud-Native First",
    description:
      "Design for elasticity, observability, and automated deployment from day one. Infrastructure-as-Code is non-negotiable.",
  },
  {
    title: "Product Thinking",
    description:
      "Architecture decisions should serve product outcomes. I connect backend systems to user value, not just technical elegance.",
  },
  {
    title: "Pragmatic Tradeoffs",
    description:
      "Every decision is a tradeoff. I make them explicitly, document them, and revisit when constraints change.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About"
        description="Software Architect bridging enterprise systems, cloud infrastructure, AI, and Web3."
      />

      {/* Philosophy */}
      <SectionContainer className="py-12">
        <SectionHeading title="How I Think About Architecture" />
        <div className="grid sm:grid-cols-2 gap-4">
          {principles.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 0.05}>
              <div className="rounded-lg border bg-card p-5">
                <h3 className="font-medium text-sm">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {p.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionContainer>

      {/* Experience Timeline */}
      <SectionContainer className="py-12">
        <SectionHeading title="Experience" />
        <div className="space-y-8">
          {experience.map((exp, i) => (
            <ScrollReveal key={`${exp.company}-${exp.period}`} delay={i * 0.05}>
              <div className="relative pl-6 border-l border-border">
                {exp.current && (
                  <div className="absolute left-[-5px] top-1 h-2.5 w-2.5 rounded-full bg-primary" />
                )}
                {!exp.current && (
                  <div className="absolute left-[-4px] top-1.5 h-2 w-2 rounded-full bg-muted-foreground/50" />
                )}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                  <h3 className="font-medium">{exp.role}</h3>
                  {exp.current && (
                    <Badge variant="secondary" className="text-xs w-fit">
                      Current
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-primary">{exp.company}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {exp.period} &middot; {exp.location}
                </p>
                {exp.highlights.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {exp.highlights.map((h, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-primary mt-1.5 shrink-0">
                          &bull;
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
                {exp.stack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {exp.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionContainer>

      {/* Certifications */}
      <SectionContainer className="py-12">
        <SectionHeading title="Certifications" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {certifications.map((cert, i) => (
            <ScrollReveal key={cert.code} delay={i * 0.03}>
              <div className="rounded-lg border bg-card p-4">
                <p className="font-mono text-xs text-primary">{cert.code}</p>
                <p className="text-sm font-medium mt-1">{cert.name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {cert.issuer}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </SectionContainer>

      {/* Education */}
      <SectionContainer className="py-12">
        <SectionHeading title="Education" />
        <ScrollReveal>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">
                Master of Science, Computer Engineering
              </h3>
              <p className="text-sm text-muted-foreground">
                Pune University &middot; 2014 — 2016
              </p>
            </div>
            <div>
              <h3 className="font-medium">
                Bachelor of Science, Computer Engineering
              </h3>
              <p className="text-sm text-muted-foreground">
                Pune University &middot; 2011 — 2014
              </p>
            </div>
          </div>
        </ScrollReveal>
      </SectionContainer>
    </>
  );
}
