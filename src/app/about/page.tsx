import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    "Software Architect with 12+ years building distributed systems across healthcare, logistics, banking, and blockchain.",
  alternates: { canonical: "/about" },
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

      {/* Profile */}
      <SectionContainer className="py-12">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <ScrollReveal>
            <Image
              src="/images/aniket.jpg"
              alt="Aniket Joshi"
              width={200}
              height={200}
              className="rounded-xl border shrink-0"
              priority
            />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                I&apos;m a Software Architect with over a decade of experience
                building production systems across healthcare, logistics, banking,
                ecommerce, and blockchain. My work sits at the intersection of
                backend architecture, cloud infrastructure, and product
                engineering.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Currently at Vanderlande, I lead AI-driven features on enterprise
                platforms using RAG pipelines, Databricks, and Azure services.
                Outside of work, I build Web3 products — from zero-knowledge
                compliance infrastructure to compliant crypto exchanges.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  render={
                    <a href="/resume/aniket-joshi-web2.pdf" download />
                  }
                >
                  <Download className="mr-2 h-4 w-4" /> Resume (Web2)
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  render={
                    <a href="/resume/aniket-joshi-web3.pdf" download />
                  }
                >
                  <Download className="mr-2 h-4 w-4" /> Resume (Web3)
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </SectionContainer>

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
                <div className="flex items-center gap-2">
                  {exp.companyLogo && (
                    <Image
                      src={exp.companyLogo}
                      alt={exp.company}
                      width={20}
                      height={20}
                      className="rounded shrink-0"
                    />
                  )}
                  <p className="text-sm text-primary">{exp.company}</p>
                </div>
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
          {certifications.map((cert, i) => {
            const content = (
              <div className="rounded-lg border bg-card p-4 h-full transition-colors hover:border-primary/30 group">
                <div className="flex items-center gap-3">
                  {cert.badgeImage && (
                    <Image
                      src={cert.badgeImage}
                      alt={cert.name}
                      width={48}
                      height={48}
                      className="shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-xs text-primary">{cert.code}</p>
                      {cert.credentialUrl && (
                        <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                      )}
                    </div>
                    <p className="text-sm font-medium mt-1">{cert.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {cert.issuer}
                    </p>
                  </div>
                </div>
              </div>
            );
            return (
              <ScrollReveal key={cert.code} delay={i * 0.03}>
                {cert.credentialUrl ? (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </ScrollReveal>
            );
          })}
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
