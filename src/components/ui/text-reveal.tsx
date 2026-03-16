"use client";

import { m, useInView } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  by?: "word" | "character";
}

export function TextReveal({
  children,
  className,
  delay = 0,
  by = "word",
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const units = by === "word" ? children.split(" ") : children.split("");

  return (
    <span ref={ref} className={cn("inline-block", className)}>
      {units.map((unit, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <m.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : {}}
            transition={{
              duration: 0.5,
              delay: delay + i * (by === "word" ? 0.04 : 0.02),
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {unit}
            {by === "word" && i < units.length - 1 ? "\u00A0" : ""}
          </m.span>
        </span>
      ))}
    </span>
  );
}
