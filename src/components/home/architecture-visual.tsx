"use client";

import { MotionDiv } from "@/components/motion";
import { m } from "motion/react";

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
        <defs>
          <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.72 0.22 270)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="oklch(0.72 0.22 270)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {edges.map(([from, to], i) => {
          const a = getNode(from);
          const b = getNode(to);
          return (
            <MotionDiv
              key={`${from}-${to}`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.35 }}
              transition={{ duration: 1, delay: 0.8 + i * 0.1, ease: "easeOut" }}
              // @ts-expect-error motion renders as svg child
              render={
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="url(#edge-gradient)"
                  strokeWidth="0.3"
                  strokeDasharray="1.5 1"
                />
              }
            />
          );
        })}
        {/* Animated pulse dots */}
        <circle r="0.8" fill="oklch(0.72 0.22 270)" opacity="0.9">
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            path={`M ${getNode("client").x} ${getNode("client").y} L ${getNode("gateway").x} ${getNode("gateway").y} L ${getNode("services").x} ${getNode("services").y} L ${getNode("db").x} ${getNode("db").y} L ${getNode("cloud").x} ${getNode("cloud").y}`}
          />
        </circle>
        <circle r="0.6" fill="oklch(0.7 0.2 230)" opacity="0.7">
          <animateMotion
            dur="5s"
            repeatCount="indefinite"
            begin="1.5s"
            path={`M ${getNode("client").x} ${getNode("client").y} L ${getNode("gateway").x} ${getNode("gateway").y} L ${getNode("queue").x} ${getNode("queue").y} L ${getNode("services").x} ${getNode("services").y} L ${getNode("ai").x} ${getNode("ai").y}`}
          />
        </circle>
        <circle r="0.5" fill="oklch(0.75 0.18 320)" opacity="0.6">
          <animateMotion
            dur="6s"
            repeatCount="indefinite"
            begin="3s"
            path={`M ${getNode("gateway").x} ${getNode("gateway").y} L ${getNode("auth").x} ${getNode("auth").y} L ${getNode("db").x} ${getNode("db").y} L ${getNode("cloud").x} ${getNode("cloud").y}`}
          />
        </circle>
      </svg>

      {/* Nodes */}
      {nodes.map((node, i) => (
        <m.div
          key={node.id}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.15, zIndex: 10 }}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 cursor-default"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <div className="h-10 w-10 rounded-xl border border-primary/25 bg-card/90 backdrop-blur-md flex items-center justify-center text-sm shadow-lg shadow-primary/5 hover:border-primary/40 hover:shadow-primary/15 transition-all duration-300">
            {node.icon}
          </div>
          <span className="text-[8px] font-mono text-muted-foreground/60 whitespace-nowrap tracking-wide">
            {node.label}
          </span>
        </m.div>
      ))}
    </div>
  );
}
