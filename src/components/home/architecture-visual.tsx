"use client";

import { MotionDiv } from "@/components/motion";

const nodes = [
  { id: "client", label: "Client", x: 50, y: 20, icon: "📱" },
  { id: "gateway", label: "API Gateway", x: 50, y: 38, icon: "🔀" },
  { id: "auth", label: "Auth / IAM", x: 15, y: 55, icon: "🔐" },
  { id: "services", label: "Microservices", x: 50, y: 58, icon: "⚙️" },
  { id: "queue", label: "Event Queue", x: 85, y: 55, icon: "📨" },
  { id: "db", label: "Data Layer", x: 30, y: 78, icon: "🗄️" },
  { id: "ai", label: "AI / ML", x: 70, y: 78, icon: "🧠" },
  { id: "cloud", label: "Cloud Infra", x: 50, y: 95, icon: "☁️" },
];

const edges: [string, string][] = [
  ["client", "gateway"],
  ["gateway", "auth"],
  ["gateway", "services"],
  ["gateway", "queue"],
  ["services", "db"],
  ["services", "ai"],
  ["auth", "db"],
  ["queue", "services"],
  ["db", "cloud"],
  ["ai", "cloud"],
];

function getNode(id: string) {
  return nodes.find((n) => n.id === id)!;
}

export function ArchitectureVisual() {
  return (
    <div className="relative w-full max-w-md aspect-square mx-auto">
      {/* SVG edges */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        {edges.map(([from, to], i) => {
          const a = getNode(from);
          const b = getNode(to);
          return (
            <MotionDiv
              key={`${from}-${to}`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 1, delay: 0.8 + i * 0.1, ease: "easeOut" }}
              // @ts-expect-error motion renders as svg child
              render={
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="oklch(0.623 0.214 259.815)"
                  strokeWidth="0.3"
                  strokeDasharray="1.5 1"
                />
              }
            />
          );
        })}
        {/* Animated pulse dot traveling along first edge */}
        <circle r="0.8" fill="oklch(0.623 0.214 259.815)" opacity="0.8">
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            path={`M ${getNode("client").x} ${getNode("client").y} L ${getNode("gateway").x} ${getNode("gateway").y} L ${getNode("services").x} ${getNode("services").y} L ${getNode("db").x} ${getNode("db").y} L ${getNode("cloud").x} ${getNode("cloud").y}`}
          />
        </circle>
        <circle r="0.8" fill="oklch(0.623 0.214 259.815)" opacity="0.6">
          <animateMotion
            dur="5s"
            repeatCount="indefinite"
            begin="1.5s"
            path={`M ${getNode("client").x} ${getNode("client").y} L ${getNode("gateway").x} ${getNode("gateway").y} L ${getNode("queue").x} ${getNode("queue").y} L ${getNode("services").x} ${getNode("services").y} L ${getNode("ai").x} ${getNode("ai").y}`}
          />
        </circle>
      </svg>

      {/* Nodes */}
      {nodes.map((node, i) => (
        <MotionDiv
          key={node.id}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease: "easeOut" }}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <div className="h-9 w-9 rounded-lg border border-primary/30 bg-card/80 backdrop-blur-sm flex items-center justify-center text-sm shadow-sm shadow-primary/10">
            {node.icon}
          </div>
          <span className="text-[9px] font-mono text-muted-foreground whitespace-nowrap">
            {node.label}
          </span>
        </MotionDiv>
      ))}
    </div>
  );
}
