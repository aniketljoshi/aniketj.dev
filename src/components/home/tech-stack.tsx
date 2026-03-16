"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
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
        eyebrow="Tools"
        description="Technologies and tools I work with regularly"
      />

      <div className="space-y-4">
        {visible.map((category) => (
          <div key={category.category} className="bento-card rounded-xl p-5">
            <p className="font-mono text-[10px] text-primary uppercase tracking-widest mb-4 font-semibold">
              {category.category}
            </p>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border border-border/50 bg-background/40 backdrop-blur-sm text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 cursor-default"
                >
                  <TechIcon name={skill} />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {skills.length > INITIAL_COUNT && (
        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="text-muted-foreground hover:text-foreground gap-1.5"
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