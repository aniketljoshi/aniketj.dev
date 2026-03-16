"use client";

import { m, useScroll, useSpring } from "motion/react";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 150, damping: 25 });

  return (
    <>
      <m.div
        style={{ scaleX, transformOrigin: "left" }}
        className="fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left"
      >
        <div className="h-full w-full bg-gradient-to-r from-primary via-ring to-primary/60" />
        <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-r from-transparent to-primary/80 blur-sm" />
      </m.div>
    </>
  );
}
