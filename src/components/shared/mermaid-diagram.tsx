"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface MermaidDiagramProps {
  chart: string;
}

let mermaidCounter = 0;

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  if (!chart) {
    return null;
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let cancelled = false;

    async function renderChart() {
      try {
        const mermaid = (await import("mermaid")).default;

        mermaid.initialize({
          startOnLoad: false,
          theme: resolvedTheme === "dark" ? "dark" : "default",
          themeVariables:
            resolvedTheme === "dark"
              ? {
                  primaryColor: "#7c3aed",
                  primaryTextColor: "#e2e8f0",
                  primaryBorderColor: "#6d28d9",
                  lineColor: "#6d28d9",
                  secondaryColor: "#1e1b4b",
                  tertiaryColor: "#0f172a",
                  background: "#0a0a0a",
                  mainBkg: "#1a1625",
                  nodeBorder: "#6d28d9",
                  clusterBkg: "#1e1b4b",
                  titleColor: "#e2e8f0",
                  edgeLabelBackground: "#1a1625",
                }
              : {
                  primaryColor: "#7c3aed",
                  primaryTextColor: "#1e293b",
                  primaryBorderColor: "#8b5cf6",
                  lineColor: "#8b5cf6",
                  secondaryColor: "#ede9fe",
                  tertiaryColor: "#f5f3ff",
                  background: "#ffffff",
                  mainBkg: "#f5f3ff",
                  nodeBorder: "#8b5cf6",
                  clusterBkg: "#ede9fe",
                  titleColor: "#1e293b",
                  edgeLabelBackground: "#f5f3ff",
                },
          fontFamily: "inherit",
          fontSize: 14,
          flowchart: {
            htmlLabels: false,
            curve: "basis",
            padding: 16,
          },
          securityLevel: "loose",
        });

        // Each render call needs a globally unique ID
        const uniqueId = `mermaid-${Date.now()}-${++mermaidCounter}`;

        const { svg: rendered } = await mermaid.render(
          uniqueId,
          chart.trim()
        );
        if (!cancelled) {
          setSvg(rendered);
          setError("");
        }
      } catch (e: any) {
        if (!cancelled) {
          console.error("Mermaid render error:", e);
          setError(e?.message || "Failed to render diagram");
          setSvg("");
        }
      }
    }

    renderChart();
    return () => {
      cancelled = true;
    };
  }, [chart, resolvedTheme, mounted]);

  if (error) {
    return (
      <div className="my-8 rounded-xl bento-card p-6">
        <pre className="text-xs text-muted-foreground overflow-x-auto whitespace-pre-wrap font-mono">{chart.trim()}</pre>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="my-8 rounded-xl bento-card p-8 flex items-center justify-center min-h-[200px]">
        <div className="flex items-center gap-3 text-muted-foreground text-sm">
          <div className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          Loading diagram...
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 rounded-xl bento-card p-6 overflow-x-auto group relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div
        ref={containerRef}
        className="relative z-10 flex justify-center [&_svg]:max-w-full [&_svg]:h-auto"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}
