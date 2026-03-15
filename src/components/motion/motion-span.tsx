"use client";

import { m } from "motion/react";
import type { HTMLMotionProps } from "motion/react";
import { forwardRef } from "react";

export const MotionSpan = forwardRef<HTMLSpanElement, HTMLMotionProps<"span">>(
  (props, ref) => <m.span ref={ref} {...props} />
);
MotionSpan.displayName = "MotionSpan";
