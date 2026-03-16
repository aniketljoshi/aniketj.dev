"use client";

import { m } from "motion/react";
import { cn } from "@/lib/utils";

export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden -z-10", className)}>
      {/* Animated gradient orbs */}
      <m.div
        className="absolute w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full opacity-[0.15] dark:opacity-[0.08]"
        style={{
          background:
            "radial-gradient(ellipse, oklch(0.72 0.25 280) 0%, oklch(0.65 0.22 250) 30%, transparent 70%)",
          filter: "blur(80px)",
          top: "-20%",
          left: "-10%",
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <m.div
        className="absolute w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full opacity-[0.12] dark:opacity-[0.06]"
        style={{
          background:
            "radial-gradient(ellipse, oklch(0.68 0.2 220) 0%, oklch(0.6 0.22 200) 30%, transparent 70%)",
          filter: "blur(100px)",
          top: "10%",
          right: "-15%",
        }}
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 30, -50, 0],
          scale: [1, 0.9, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <m.div
        className="absolute w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full opacity-[0.1] dark:opacity-[0.05]"
        style={{
          background:
            "radial-gradient(ellipse, oklch(0.75 0.18 320) 0%, oklch(0.65 0.2 290) 30%, transparent 70%)",
          filter: "blur(90px)",
          bottom: "-10%",
          left: "20%",
        }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.05, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* Grain overlay */}
      <div className="absolute inset-0 noise opacity-30 pointer-events-none" />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-bg opacity-40 dark:opacity-20" />
    </div>
  );
}
