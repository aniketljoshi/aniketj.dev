import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function SectionContainer({
  children,
  className,
  id,
}: SectionContainerProps) {
  return (
    <section id={id} className={cn("mx-auto max-w-7xl px-6 py-28", className)}>
      {children}
    </section>
  );
}
