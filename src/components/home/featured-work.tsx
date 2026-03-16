"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { TechIcon } from "@/components/shared/tech-icon";
import { projects } from "@/data/projects";
import { caseStudies } from "@/data/case-studies";
import { m } from "motion/react";

export function FeaturedWork() {
  const featured = projects.filter((p) => p.featured);

  return (
    <SectionContainer>
      <SectionHeading
        title="Featured Work"
        eyebrow="Portfolio"
        description="Selected projects with architecture deep-dives"
      />
      <div className="grid gap-5">
        {featured.map((project, i) => {
          const cs = caseStudies.find(
            (c) => c.relatedProject === project.slug || c.slug === project.relatedCaseStudy
          );
          return (
            <ScrollReveal key={project.slug} delay={i * 0.1}>
              <Link href="/work">
                <SpotlightCard className="group bento-card rounded-2xl overflow-hidden">
                  <div className="relative p-7 sm:p-9">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-ring/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-3 flex-wrap">
                          {project.image && (
                            <m.div
                              whileHover={{ scale: 1.15, rotate: 5 }}
                              transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            >
                              <Image
                                src={project.image}
                                alt={project.title}
                                width={32}
                                height={32}
                                className="rounded-lg shrink-0"
                                unoptimized={project.image.endsWith(".svg")}
                              />
                            </m.div>
                          )}
                          <h3 className="text-lg font-bold group-hover:text-primary transition-colors duration-300">
                            {project.title}
                          </h3>
                          <Badge variant="secondary" className="text-xs font-medium">
                            {project.domain}
                          </Badge>
                          {cs && (
                            <Badge className="text-xs bg-primary/10 text-primary border-primary/20 font-medium">
                              Case Study
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {project.tagline}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.stack.slice(0, 6).map((tech) => (
                            <span
                              key={tech}
                              className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border border-border/40 bg-background/40 backdrop-blur-sm text-muted-foreground group-hover:border-primary/20 group-hover:text-foreground transition-all duration-300"
                            >
                              <TechIcon name={tech} />
                              {tech}
                            </span>
                          ))}
                          {project.stack.length > 6 && (
                            <span className="text-xs px-2.5 py-1.5 text-muted-foreground/60">
                              +{project.stack.length - 6}
                            </span>
                          )}
                        </div>
                      </div>
                      <m.div
                        className="shrink-0 mt-1"
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      >
                        <ArrowUpRight className="h-5 w-5 text-muted-foreground/40 group-hover:text-primary transition-colors duration-300" />
                      </m.div>
                    </div>
                  </div>
                </SpotlightCard>
              </Link>
            </ScrollReveal>
          );
        })}
      </div>
      <div className="mt-10 text-center">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
        >
          View all work
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </SectionContainer>
  );
}
