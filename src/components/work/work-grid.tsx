"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, ChevronUp, ExternalLink, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TechIcon } from "@/components/shared/tech-icon";
import type { Project, CaseStudy, Domain } from "@/types";

interface WorkGridProps {
  projects: Project[];
  caseStudies: CaseStudy[];
}

type FilterDomain = Domain | "All";

export function WorkGrid({ projects, caseStudies }: WorkGridProps) {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterDomain>("All");

  const domains: FilterDomain[] = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.domain))),
  ];

  const filtered = filter === "All"
    ? projects
    : projects.filter((p) => p.domain === filter);

  const getCaseStudy = (slug: string) =>
    caseStudies.find((cs) => cs.slug === slug);

  // Also find case study by relatedProject matching the project slug
  const getCaseStudyForProject = (projectSlug: string) =>
    caseStudies.find((cs) => cs.relatedProject === projectSlug);

  return (
    <div>
      {/* Domain filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Filter className="h-4 w-4 text-muted-foreground mt-1.5 mr-1" />
        {domains.map((d) => (
          <Button
            key={d}
            variant={filter === d ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(d)}
            className="text-xs"
          >
            {d}
          </Button>
        ))}
      </div>

      <div className="grid gap-4">
        {filtered.map((project, i) => {
          const cs =
            (project.relatedCaseStudy && getCaseStudy(project.relatedCaseStudy)) ||
            getCaseStudyForProject(project.slug);
          const isExpanded = expandedSlug === project.slug;

          return (
            <ScrollReveal key={project.slug} delay={i * 0.03}>
              <div className="rounded-lg border bg-card transition-all hover:border-primary/30">
                {/* Card header — always visible */}
                <div
                  className="p-6 cursor-pointer"
                  onClick={() =>
                    setExpandedSlug(isExpanded ? null : project.slug)
                  }
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        {project.image && (
                          <Image
                            src={project.image}
                            alt={project.title}
                            width={28}
                            height={28}
                            className="rounded-md shrink-0"
                          />
                        )}
                        <h2 className="text-lg font-semibold">
                          {project.title}
                        </h2>
                        <Badge variant="secondary" className="text-xs">
                          {project.domain}
                        </Badge>
                        {cs && (
                          <Badge className="text-xs bg-primary/10 text-primary border-primary/20">
                            Case Study
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {project.role} &middot; {project.duration}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {project.tagline}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {(project.liveUrl) && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {/* Tech badges — always visible */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.stack.slice(0, 8).map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
                      >
                        <TechIcon name={tech} />
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 8 && (
                      <span className="text-xs px-2 py-0.5 text-muted-foreground">
                        +{project.stack.length - 8}
                      </span>
                    )}
                  </div>
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="border-t px-6 py-6 space-y-6">
                    {/* Problem */}
                    <div>
                      <h3 className="text-sm font-semibold mb-2">The Problem</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {project.problem}
                      </p>
                    </div>

                    {/* Overview */}
                    <div>
                      <h3 className="text-sm font-semibold mb-2">Overview</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Architecture */}
                    {(cs || project.architectureNotes) && (
                      <div>
                        <h3 className="text-sm font-semibold mb-2">Architecture</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {cs ? cs.architecture : project.architectureNotes}
                        </p>
                      </div>
                    )}

                    {/* Case Study: Challenge + Approach */}
                    {cs && (
                      <>
                        <div>
                          <h3 className="text-sm font-semibold mb-2">Challenge</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {cs.challenge}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold mb-2">Approach</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {cs.approach}
                          </p>
                        </div>
                      </>
                    )}

                    {/* Outcomes */}
                    {cs && (
                      <div>
                        <h3 className="text-sm font-semibold mb-2">Outcomes</h3>
                        <ul className="space-y-1.5">
                          {cs.outcomes.map((o, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-muted-foreground flex items-start gap-2"
                            >
                              <span className="text-primary mt-0.5 shrink-0">&bull;</span>
                              {o}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Highlights (when no case study) */}
                    {!cs && project.highlights.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold mb-2">Key Highlights</h3>
                        <ul className="space-y-1.5">
                          {project.highlights.map((h, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-muted-foreground flex items-start gap-2"
                            >
                              <span className="text-primary mt-0.5 shrink-0">&bull;</span>
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Full tech stack */}
                    <div>
                      <h3 className="text-sm font-semibold mb-2">Full Stack</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md border bg-card text-muted-foreground"
                          >
                            <TechIcon name={tech} />
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Related blog post link */}
                    {project.relatedBlog && (
                      <Link
                        href={`/blog/${project.relatedBlog}`}
                        className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        Read the deep-dive <ArrowRight className="h-3 w-3" />
                      </Link>
                    )}

                    {/* Action links */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      {project.liveUrl && (
                        <Button
                          size="sm"
                          render={
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            />
                          }
                        >
                          <ExternalLink className="mr-2 h-3 w-3" /> Live Site
                        </Button>
                      )}
                      {project.repoUrl && (
                        <Button
                          variant="outline"
                          size="sm"
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
                  </div>
                )}
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
