import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { projects } from "@/data/projects";

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <SectionContainer>
      <SectionHeading
        title="Featured Projects"
        description="Selected work across Web3, cloud, and enterprise systems"
      />
      <div className="grid gap-6">
        {featured.map((project, i) => (
          <ScrollReveal key={project.slug} delay={i * 0.1}>
            <Link href={`/projects/${project.slug}`}>
              <div className="group rounded-lg border bg-card p-6 transition-all hover:border-primary/30 hover:glow">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <Badge variant="secondary" className="text-xs">
                        {project.domain}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {project.tagline}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 6).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 6 && (
                        <span className="text-xs px-2 py-0.5 text-muted-foreground">
                          +{project.stack.length - 6}
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
      <div className="mt-8 text-center">
        <Link
          href="/projects"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          View all projects <ArrowRight className="ml-1 h-3 w-3" />
        </Link>
      </div>
    </SectionContainer>
  );
}
