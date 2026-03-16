"use client";

import { m } from "motion/react";
import { cn } from "@/lib/utils";

interface GridBeamProps {
  className?: string;
}

export function GridBeam({ className }: GridBeamProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden -z-10", className)}>
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid-pattern"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-border/30"
            />
          </pattern>
          <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.68 0.22 260)" stopOpacity="0" />
            <stop offset="50%" stopColor="oklch(0.68 0.22 260)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="oklch(0.68 0.22 260)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>

      {/* Vertical beam */}
      <m.div
        className="absolute left-1/4 w-px h-40 bg-gradient-to-b from-transparent via-primary/50 to-transparent"
        animate={{ y: ["-100%", "300%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 0 }}
      />
      <m.div
        className="absolute left-3/4 w-px h-32 bg-gradient-to-b from-transparent via-ring/40 to-transparent"
        animate={{ y: ["300%", "-100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 2 }}
      />

      {/* Horizontal beam */}
      <m.div
        className="absolute top-1/3 h-px w-40 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        animate={{ x: ["-100%", "300%"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 1 }}
      />
    </div>
  );
}
