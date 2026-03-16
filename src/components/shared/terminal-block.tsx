"use client";

import { cn } from "@/lib/utils";
import { m, useInView } from "motion/react";
import { useRef } from "react";

interface TerminalBlockProps {
  lines: { label: string; value: string }[];
  className?: string;
}

export function TerminalBlock({ lines, className }: TerminalBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-border/40 bg-card/80 backdrop-blur-xl p-6 font-mono text-sm",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-5 pb-3 border-b border-border/30" aria-hidden="true">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-400/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
          <div className="h-3 w-3 rounded-full bg-green-400/80" />
        </div>
        <span className="ml-2 text-[10px] text-muted-foreground/60 font-mono">~/aniketj.dev</span>
      </div>
      <div className="space-y-2">
        {lines.map((line, i) => (
          <m.div
            key={line.label}
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
          >
            <span className="text-muted-foreground/50">{"❯"} </span>
            <span className="text-primary font-semibold">{line.label}</span>
            <span className="text-muted-foreground/40">{" → "}</span>
            <span className="text-foreground">{line.value}</span>
          </m.div>
        ))}
        <m.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: lines.length * 0.08 + 0.3 }}
          className="mt-2"
        >
          <span className="text-muted-foreground/50">{"❯"} </span>
          <span className="inline-block w-2 h-4 bg-primary/60 animate-pulse" />
        </m.div>
      </div>
    </div>
  );
}
