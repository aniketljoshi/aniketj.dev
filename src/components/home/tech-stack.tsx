"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { TechIcon } from "@/components/shared/tech-icon";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Marquee } from "@/components/ui/marquee";
import { skills } from "@/data/skills";
import { m } from "motion/react";

const INITIAL_COUNT = 4;

export function TechStack() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? skills : skills.slice(0, INITIAL_COUNT);

  // Flatten all skills for marquee
  const allSkills = skills.flatMap((c) => c.skills);
  const half = Math.ceil(allSkills.length / 2);
  const row1 = allSkills.slice(0, half);
  const row2 = allSkills.slice(half);

  return (
    <SectionContainer>
      <SectionHeading
        title="Tech Stack"
        eyebrow="Tools"
        description="Technologies and tools I work with regularly"
      />

      {/* Marquee preview */}
      <ScrollReveal>
        <div className="mb-10 -mx-6 overflow-hidden">
          <Marquee speed={50} className="mb-3">
            {row1.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-border/30 bg-card/30 backdrop-blur-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 whitespace-nowrap"
              >
                <TechIcon name={skill} />
                {skill}
              </span>
            ))}
          </Marquee>
          <Marquee speed={45} reverse className="mb-3">
            {row2.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-border/30 bg-card/30 backdrop-blur-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 whitespace-nowrap"
              >
                <TechIcon name={skill} />
                {skill}
              </span>
            ))}
          </Marquee>
        </div>
      </ScrollReveal>

      <div className="space-y-4">
        {visible.map((category, i) => (
          <ScrollReveal key={category.category} delay={i * 0.05}>
            <div className="bento-card rounded-xl p-6">
              <p className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] mb-4 font-semibold">
                {category.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, j) => (
                  <m.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: j * 0.02, duration: 0.3 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border border-border/40 bg-background/40 backdrop-blur-sm text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors duration-300 cursor-default"
                  >
                    <TechIcon name={skill} />
                    {skill}
                  </m.span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {skills.length > INITIAL_COUNT && (
        <div className="mt-8 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="text-muted-foreground hover:text-foreground gap-2 hover:bg-primary/5 transition-all duration-300"
          >
            {expanded ? (
              <>Show less <ChevronUp className="h-3.5 w-3.5" /></>
            ) : (
              <>Show all {skills.length} categories <ChevronDown className="h-3.5 w-3.5" /></>
            )}
          </Button>
        </div>
      )}
    </SectionContainer>
  );
}