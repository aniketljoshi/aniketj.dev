import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionContainer } from "@/components/shared/section-container";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { caseStudies } from "@/data/case-studies";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((cs) => cs.slug === slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.subtitle,
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((cs) => cs.slug === slug);
  if (!study) notFound();

  return (
    <>
      <SectionContainer className="py-16">
        <Link
          href="/case-studies"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="mr-1 h-3 w-3" /> Back to Case Studies
        </Link>

        <ScrollReveal>
          <Badge variant="secondary" className="mb-3">
            {study.domain}
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight">{study.title}</h1>
          <p className="text-lg text-muted-foreground mt-2">
            {study.subtitle}
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-3">Challenge</h2>
            <p className="text-muted-foreground leading-relaxed">
              {study.challenge}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3">Approach</h2>
            <p className="text-muted-foreground leading-relaxed">
              {study.approach}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3">Architecture</h2>
            <p className="text-muted-foreground leading-relaxed">
              {study.architecture}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3">Outcomes</h2>
            <ul className="space-y-2">
              {study.outcomes.map((outcome, i) => (
                <li
                  key={i}
                  className="text-muted-foreground flex items-start gap-2"
                >
                  <span className="text-primary mt-1 shrink-0">&bull;</span>
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {study.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-sm px-3 py-1 rounded-md border bg-card text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </SectionContainer>
    </>
  );
}
