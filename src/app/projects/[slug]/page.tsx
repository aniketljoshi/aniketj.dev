import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/shared/section-container";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TechIcon } from "@/components/shared/tech-icon";
import { projects } from "@/data/projects";
import { caseStudies } from "@/data/case-studies";

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
        <Link
          href="/projects"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="mr-1 h-3 w-3" /> Back to Projects
        </Link>

        <ScrollReveal>
          <div className="flex items-center gap-3 mb-2">
            {project.image && (
              <Image
                src={project.image}
                alt={project.title}
                width={40}
                height={40}
                className="rounded-lg shrink-0"
              />
            )}
            <h1 className="text-4xl font-bold tracking-tight">
              {project.title}
            </h1>
            <Badge variant="secondary">{project.domain}</Badge>
          </div>
          <p className="text-lg text-muted-foreground mt-2">
            {project.tagline}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {project.role}
            {project.company && ` at ${project.company}`} &middot;{" "}
            {project.duration}
          </p>
        </ScrollReveal>

        {/* Problem */}
        <ScrollReveal>
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-3">The Problem</h2>
            <p className="text-muted-foreground leading-relaxed">
              {project.problem}
            </p>
          </div>
        </ScrollReveal>

        {/* Description */}
        <ScrollReveal>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3">Overview</h2>
            <p className="text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>
        </ScrollReveal>

        {/* Architecture Notes */}
        {project.architectureNotes && (
          <ScrollReveal>
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-3">Architecture</h2>
              <p className="text-muted-foreground leading-relaxed">
                {project.architectureNotes}
              </p>
            </div>
          </ScrollReveal>
        )}

        {/* Highlights */}
        <ScrollReveal>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3">Key Highlights</h2>
            <ul className="space-y-2">
              {project.highlights.map((h, i) => (
                <li
                  key={i}
                  className="text-muted-foreground flex items-start gap-2"
                >
                  <span className="text-primary mt-1 shrink-0">&bull;</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        {/* Tech Stack */}
        <ScrollReveal>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 text-sm px-3 py-1 rounded-md border bg-card text-muted-foreground"
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
          <ScrollReveal>
            <div className="mt-8 flex gap-3">
              {project.liveUrl && (
                <Button
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
                  render={
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  View Source
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
            <ScrollReveal>
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-3">Related Case Study</h2>
                <Link href={`/case-studies/${cs.slug}`}>
                  <div className="group rounded-lg border bg-card p-5 transition-all hover:border-primary/30 hover:glow">
                    <Badge variant="secondary" className="text-xs mb-2">{cs.domain}</Badge>
                    <h3 className="font-medium group-hover:text-primary transition-colors">{cs.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{cs.subtitle}</p>
                    <span className="inline-flex items-center text-xs text-primary mt-3">
                      Read case study <ArrowRight className="ml-1 h-3 w-3" />
                    </span>
                  </div>
                </Link>
              </div>
            </ScrollReveal>
          );
        })()}
      </SectionContainer>
    </>
  );
}
