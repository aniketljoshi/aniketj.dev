import { SectionContainer } from "./section-container";

interface PageHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
}

export function PageHeader({ title, description, eyebrow }: PageHeaderProps) {
  return (
    <SectionContainer className="py-20 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-0 left-0 w-[50%] h-[100%] rounded-full"
          style={{
            background: "radial-gradient(ellipse at top left, oklch(0.68 0.22 260 / 0.08) 0%, transparent 60%)",
            filter: "blur(40px)",
          }}
        />
      </div>
      {eyebrow && (
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-6 bg-primary" />
          <span className="section-label">{eyebrow}</span>
        </div>
      )}
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl leading-tight">
        {title}
      </h1>
      {description && (
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </SectionContainer>
  );
}