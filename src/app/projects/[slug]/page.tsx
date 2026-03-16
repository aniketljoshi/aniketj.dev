import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, ArrowUpRight, Lightbulb, FileText, Cpu, Star, Wrench, Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/shared/section-container";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TechIcon } from "@/components/shared/tech-icon";
import { projects } from "@/data/projects";
import { caseStudies } from "@/data/case-studies";
import { ArchitectureDiagram } from "@/components/diagrams/architecture-diagram";
import { MotionDiv } from "@/components/motion";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: project.title,
      description: project.tagline,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.tagline,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <SectionContainer className="py-16">
        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-10 group"
          >
            <span className="flex items-center justify-center p-1.5 rounded-full border border-border/50 bg-card/50 mr-3 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
              <ArrowLeft className="h-4 w-4" />
            </span>
            Back to Projects
          </Link>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <header className="mb-14 relative">
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 to-transparent blur-3xl opacity-50 rounded-full" />
            <div className="flex items-center gap-4 mb-3">
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.title}
                  width={48}
                  height={48}
                  className="rounded-xl shrink-0 ring-2 ring-border/50"
                  unoptimized={project.image.endsWith(".svg")}
                />
              )}
              <Badge variant="secondary" className="rounded-full">{project.domain}</Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              {project.title}
            </h1>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl">
              {project.tagline}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-sm text-muted-foreground bg-card/40 backdrop-blur-md glass-panel px-5 py-3 rounded-2xl w-fit">
              <span>{project.role}{project.company && ` at ${project.company}`}</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>{project.duration}</span>
            </div>
            <div className="mt-6 h-px bg-gradient-to-r from-primary/50 via-primary/20 to-transparent" />
          </header>
        </MotionDiv>

        <div className="space-y-8">
          {/* Problem */}
          <ScrollReveal direction="left">
            <div className="bento-card rounded-xl p-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-red-500/10 text-red-500">
                  <Lightbulb className="h-4.5 w-4.5" />
                </span>
                <h2 className="text-xl font-semibold">The Problem</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {project.problem}
              </p>
            </div>
          </ScrollReveal>

          {/* Description */}
          <ScrollReveal direction="right">
            <div className="bento-card rounded-xl p-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500">
                  <FileText className="h-4.5 w-4.5" />
                </span>
                <h2 className="text-xl font-semibold">Overview</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>
          </ScrollReveal>

          {/* Architecture Notes */}
          {project.architectureNotes && (
            <ScrollReveal direction="left">
              <div className="bento-card rounded-xl p-7">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-violet-500/10 text-violet-500">
                    <Cpu className="h-4.5 w-4.5" />
                  </span>
                  <h2 className="text-xl font-semibold">Architecture</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {project.architectureNotes}
                </p>
                <ArchitectureDiagram slug={project.slug} className="mt-6" />
              </div>
            </ScrollReveal>
          )}

          {/* Highlights */}
          <ScrollReveal direction="right">
            <div className="bento-card rounded-xl p-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <Star className="h-4.5 w-4.5" />
                </span>
                <h2 className="text-xl font-semibold">Key Highlights</h2>
              </div>
              <ul className="space-y-3">
                {project.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="text-muted-foreground flex items-start gap-3"
                  >
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold mt-0.5 shrink-0">
                      {i + 1}
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Tech Stack */}
          <ScrollReveal direction="left">
            <div className="bento-card rounded-xl p-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500">
                  <Wrench className="h-4.5 w-4.5" />
                </span>
                <h2 className="text-xl font-semibold">Tech Stack</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 text-sm px-3.5 py-1.5 rounded-full border border-border/50 bg-background/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
                  >
                    <TechIcon name={tech} />
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Links */}
          {(project.liveUrl || project.repoUrl) && (
            <ScrollReveal direction="up">
              <div className="flex gap-3">
                {project.liveUrl && (
                  <Button
                    className="rounded-full"
                    render={
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    }
                  >
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Site
                  </Button>
                )}
                {project.repoUrl && (
                  <Button
                    variant="outline"
                    className="rounded-full"
                    render={
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    }
                  >
                    <Code2 className="mr-2 h-4 w-4" /> View Source
                  </Button>
                )}
              </div>
            </ScrollReveal>
          )}

          {/* Related Case Study */}
          {project.relatedCaseStudy && (() => {
            const cs = caseStudies.find((c) => c.slug === project.relatedCaseStudy);
            if (!cs) return null;
            return (
              <ScrollReveal direction="up">
                <div className="mt-4">
                  <h2 className="text-xl font-semibold mb-4">Related Case Study</h2>
                  <Link href={`/case-studies/${cs.slug}`}>
                    <div className="group bento-card rounded-xl p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />
                      <div className="relative z-10">
                        <Badge variant="secondary" className="text-xs mb-3 rounded-full">{cs.domain}</Badge>
                        <h3 className="text-lg font-medium group-hover:text-primary transition-colors">{cs.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{cs.subtitle}</p>
                        <span className="inline-flex items-center text-sm text-primary mt-4 font-medium group-hover:gap-2 gap-1 transition-all">
                          Read case study <ArrowUpRight className="h-3.5 w-3.5" />
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
