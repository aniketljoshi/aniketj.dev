"use client";

import { m } from "motion/react";
import type { HTMLMotionProps } from "motion/react";
import { forwardRef } from "react";

export const MotionSection = forwardRef<
  HTMLElement,
  HTMLMotionProps<"section">
>((props, ref) => <m.section ref={ref} {...props} />);
MotionSection.displayName = "MotionSection";
