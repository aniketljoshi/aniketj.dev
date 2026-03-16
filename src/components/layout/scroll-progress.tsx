"use client";

import { m, useScroll, useSpring } from "motion/react";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <m.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-ring to-primary/50 z-[9999] origin-left"
    />
  );
}
