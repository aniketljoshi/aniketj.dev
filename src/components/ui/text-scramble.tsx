"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TextScrambleProps {
  children: string;
  className?: string;
  trigger?: boolean;
  speed?: number;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export function TextScramble({
  children,
  className,
  trigger = true,
  speed = 30,
}: TextScrambleProps) {
  const [display, setDisplay] = useState(children);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!trigger || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scramble();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  function scramble() {
    const target = children;
    let iteration = 0;
    const maxIterations = target.length;

    const interval = setInterval(() => {
      setDisplay(
        target
          .split("")
          .map((char, i) => {
            if (i < iteration) return target[i];
            if (char === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iteration += 1 / 2;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplay(target);
        setHasAnimated(true);
      }
    }, speed);
  }

  return (
    <span ref={ref} className={cn("font-mono", className)}>
      {display}
    </span>
  );
}
