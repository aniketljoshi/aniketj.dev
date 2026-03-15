import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { SectionContainer } from "@/components/shared/section-container";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TechIcon } from "@/components/shared/tech-icon";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects spanning Web3, cloud infrastructure, AI systems, and enterprise platforms.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        title="Projects"
        description="Selected work across Web3, cloud architecture, AI, and enterprise systems."
      />
      <SectionContainer className="pt-0">
        <div className="grid gap-4">
          {projects.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 0.05}>
              <Link href={`/projects/${project.slug}`}>
                <div className="group rounded-lg border bg-card p-6 transition-all hover:border-primary/30 hover:glow">
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
                        <h2 className="text-lg font-semibold group-hover:text-primary transition-colors">
                          {project.title}
                        </h2>
                        <Badge variant="secondary" className="text-xs">
                          {project.domain}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {project.role} &middot; {project.duration}
                      </p>
                      <p className="text-sm text-muted-foreground mb-3">
                        {project.tagline}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
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
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </SectionContainer>
    </>
  );
}
