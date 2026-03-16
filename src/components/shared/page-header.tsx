"use client";

import { m } from "motion/react";
import { SectionContainer } from "./section-container";
import { AuroraBackground } from "@/components/ui/aurora-background";

interface PageHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
}

export function PageHeader({ title, description, eyebrow }: PageHeaderProps) {
  return (
    <SectionContainer className="py-24 pb-10 relative overflow-hidden">
      <AuroraBackground className="opacity-40" />
      {eyebrow && (
        <m.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-5"
        >
          <div className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
          <span className="section-label">{eyebrow}</span>
        </m.div>
      )}
      <m.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
      >
        {title}
      </m.h1>
      {description && (
        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          className="mt-5 text-lg text-muted-foreground max-w-2xl leading-relaxed"
        >
          {description}
        </m.p>
      )}
      <m.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 h-px bg-gradient-to-r from-primary/50 via-border to-transparent origin-left"
      />
    </SectionContainer>
  );
}