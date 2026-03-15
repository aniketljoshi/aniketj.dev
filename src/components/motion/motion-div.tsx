"use client";

import { m } from "motion/react";
import type { HTMLMotionProps } from "motion/react";
import { forwardRef } from "react";

export const MotionDiv = forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  (props, ref) => <m.div ref={ref} {...props} />
);
MotionDiv.displayName = "MotionDiv";
