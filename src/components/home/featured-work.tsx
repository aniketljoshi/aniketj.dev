import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TechIcon } from "@/components/shared/tech-icon";
import { projects } from "@/data/projects";
import { caseStudies } from "@/data/case-studies";

export function FeaturedWork() {
  const featured = projects.filter((p) => p.featured);

  return (
    <SectionContainer>
      <SectionHeading
        title="Featured Work"
        description="Selected projects with architecture deep-dives"
      />
      <div className="grid gap-6">
        {featured.map((project, i) => {
          const cs = caseStudies.find(
            (c) => c.relatedProject === project.slug || c.slug === project.relatedCaseStudy
          );
          return (
            <ScrollReveal key={project.slug} delay={i * 0.1}>
              <Link href="/work">
                <div className="group rounded-lg border bg-card p-6 transition-all hover:border-primary/30 hover:glow">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {project.image && (
                          <Image
                            src={project.image}
                            alt={project.title}
                            width={28}
                            height={28}
                            className="rounded-md shrink-0"
                            unoptimized={project.image.endsWith(".svg")}
                          />
                        )}
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {project.domain}
                        </Badge>
                        {cs && (
                          <Badge className="text-xs bg-primary/10 text-primary border-primary/20">
                            Case Study
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {project.tagline}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.stack.slice(0, 6).map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
                          >
                            <TechIcon name={tech} />
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
          );
        })}
      </div>
      <div className="mt-8 text-center">
        <Link
          href="/work"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          View all work <ArrowRight className="ml-1 h-3 w-3" />
        </Link>
      </div>
    </SectionContainer>
  );
}
