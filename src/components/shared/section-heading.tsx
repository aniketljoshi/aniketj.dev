import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  description?: string;
  className?: string;
  eyebrow?: string;
}

export function SectionHeading({
  title,
  description,
  eyebrow,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12", className)}>
      {eyebrow && (
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-6 bg-primary" />
          <span className="section-label">{eyebrow}</span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-muted-foreground max-w-2xl">{description}</p>
      )}
    </div>
  );
}
