import { cn } from "@/lib/utils";

interface TerminalBlockProps {
  lines: { label: string; value: string }[];
  className?: string;
}

export function TerminalBlock({ lines, className }: TerminalBlockProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card p-5 font-mono text-sm",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="h-3 w-3 rounded-full bg-red-500/70" />
        <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
        <div className="h-3 w-3 rounded-full bg-green-500/70" />
        <span className="ml-2 text-xs text-muted-foreground">terminal</span>
      </div>
      <div className="space-y-1.5">
        {lines.map((line) => (
          <div key={line.label}>
            <span className="text-muted-foreground">{">"} </span>
            <span className="text-primary">{line.label}</span>
            <span className="text-muted-foreground">: </span>
            <span className="text-foreground">{line.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
