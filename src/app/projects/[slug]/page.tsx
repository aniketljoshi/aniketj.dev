import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/shared/section-container";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { projects } from "@/data/projects";

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
                  className="text-sm px-3 py-1 rounded-md border bg-card text-muted-foreground"
                >
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
      </SectionContainer>
    </>
  );
}
