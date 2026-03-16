import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Layers, Target, Cpu, BarChart3, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionContainer } from "@/components/shared/section-container";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { caseStudies } from "@/data/case-studies";
import { projects } from "@/data/projects";
import { ArchitectureDiagram } from "@/components/diagrams/architecture-diagram";
import { MotionDiv } from "@/components/motion";

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
    alternates: { canonical: `/case-studies/${slug}` },
    openGraph: {
      title: study.title,
      description: study.subtitle,
    },
    twitter: {
      card: "summary_large_image",
      title: study.title,
      description: study.subtitle,
    },
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
        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/case-studies"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-10 group"
          >
            <span className="flex items-center justify-center p-1.5 rounded-full border border-border/50 bg-card/50 mr-3 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
              <ArrowLeft className="h-4 w-4" />
            </span>
            Back to Case Studies
          </Link>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <header className="mb-14 relative">
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 to-transparent blur-3xl opacity-50 rounded-full" />
            <Badge variant="secondary" className="mb-4 rounded-full">
              {study.domain}
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">{study.title}</h1>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl">
              {study.subtitle}
            </p>
            <div className="mt-6 h-px bg-gradient-to-r from-primary/50 via-primary/20 to-transparent" />
          </header>
        </MotionDiv>

        <div className="space-y-8">
          <ScrollReveal direction="left">
            <div className="bento-card rounded-xl p-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-red-500/10 text-red-500">
                  <Target className="h-4.5 w-4.5" />
                </span>
                <h2 className="text-xl font-semibold">Challenge</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {study.challenge}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="bento-card rounded-xl p-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500">
                  <Layers className="h-4.5 w-4.5" />
                </span>
                <h2 className="text-xl font-semibold">Approach</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {study.approach}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left">
            <div className="bento-card rounded-xl p-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-violet-500/10 text-violet-500">
                  <Cpu className="h-4.5 w-4.5" />
                </span>
                <h2 className="text-xl font-semibold">Architecture</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {study.architecture}
              </p>
              {study.relatedProject && (
                <ArchitectureDiagram slug={study.relatedProject} className="mt-6" />
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="bento-card rounded-xl p-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <BarChart3 className="h-4.5 w-4.5" />
                </span>
                <h2 className="text-xl font-semibold">Outcomes</h2>
              </div>
              <ul className="space-y-3">
                {study.outcomes.map((outcome, i) => (
                  <li
                    key={i}
                    className="text-muted-foreground flex items-start gap-3"
                  >
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold mt-0.5 shrink-0">
                      {i + 1}
                    </span>
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left">
            <div className="bento-card rounded-xl p-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500">
                  <Wrench className="h-4.5 w-4.5" />
                </span>
                <h2 className="text-xl font-semibold">Tech Stack</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {study.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-sm px-3.5 py-1.5 rounded-full border border-border/50 bg-background/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Related Project */}
          {study.relatedProject && (() => {
            const proj = projects.find((p) => p.slug === study.relatedProject);
            if (!proj) return null;
            return (
              <ScrollReveal direction="up">
                <div className="mt-4">
                  <h2 className="text-xl font-semibold mb-4">Related Project</h2>
                  <Link href={`/projects/${proj.slug}`}>
                    <div className="group bento-card rounded-xl p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />
                      <div className="relative z-10">
                        <Badge variant="secondary" className="text-xs mb-3 rounded-full">{proj.domain}</Badge>
                        <h3 className="text-lg font-medium group-hover:text-primary transition-colors">{proj.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{proj.tagline}</p>
                        <span className="inline-flex items-center text-sm text-primary mt-4 font-medium group-hover:gap-2 gap-1 transition-all">
                          View project <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </ScrollReveal>
            );
          })()}
        </div>
      </SectionContainer>
    </>
  );
}
