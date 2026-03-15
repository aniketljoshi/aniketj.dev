"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TechIcon } from "@/components/shared/tech-icon";
import { skills } from "@/data/skills";

const INITIAL_COUNT = 4;

export function TechStack() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? skills : skills.slice(0, INITIAL_COUNT);

  return (
    <SectionContainer>
      <SectionHeading
        title="Tech Stack"
        description="Technologies and tools I work with regularly"
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visible.map((category, i) => (
          <ScrollReveal key={category.category} delay={i * 0.05}>
            <div className="glass-panel p-5 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 h-full">
              <h3 className="font-mono text-xs text-primary uppercase tracking-wider mb-4 font-semibold">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md border border-border/50 bg-background/40 backdrop-blur-md text-muted-foreground hover:text-primary hover:border-primary/50 hover:shadow-[0_0_15px_-3px_rgba(var(--primary),0.3)] transition-all duration-300"
                  >
                    <TechIcon name={skill} />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
      {skills.length > INITIAL_COUNT && (
        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                Show less <ChevronUp className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                Show all {skills.length} categories{" "}
                <ChevronDown className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </SectionContainer>
  );
}
