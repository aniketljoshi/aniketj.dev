import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { skills } from "@/data/skills";

export function TechStack() {
  return (
    <SectionContainer>
      <SectionHeading
        title="Tech Stack"
        description="Technologies and tools I work with regularly"
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {skills.map((category, i) => (
          <ScrollReveal key={category.category} delay={i * 0.05}>
            <div>
              <h3 className="font-mono text-xs text-primary uppercase tracking-wider mb-3">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2 py-1 rounded-md border bg-card text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionContainer>
  );
}
