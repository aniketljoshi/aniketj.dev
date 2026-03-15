"use client";

import type { IconType } from "react-icons";
import {
  SiRust,
  SiSpringboot,
  SiFlutter,
  SiDotnet,
  SiNextdotjs,
  SiPostgresql,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiRedis,
  SiMysql,
  SiDocker,
  SiTypescript,
  SiPython,
  SiTerraform,
  SiApachekafka,
  SiDatabricks,
  SiAngular,
  SiKubernetes,
  SiPulumi,
  SiGraphql,
} from "react-icons/si";
import { FaAws, FaMicrosoft } from "react-icons/fa6";
import { DiJava, DiDatabase } from "react-icons/di";
import {
  TbShieldLock,
  TbBrain,
  TbApi,
  TbServer,
  TbMail,
  TbUsers,
  TbDeviceMobile,
  TbWorld,
  TbCloudComputing,
  TbLock,
  TbCurrencyDollar,
  TbEye,
  TbFileText,
  TbKey,
  TbBrandSupabase,
} from "react-icons/tb";

/* ─── Shared Types ──────────────────────────────────────────── */

interface DiagramNode {
  id: string;
  label: string;
  icon: IconType;
  x: number;
  y: number;
  color?: string; // oklch color for icon accent
}

interface DiagramEdge {
  from: string;
  to: string;
  animated?: boolean;
}

interface DiagramConfig {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  pulses?: { path: string[]; dur: string; delay?: string }[];
}

/* ─── Color Palette (oklch) ─────────────────────────────────── */

const C = {
  blue: "oklch(0.623 0.214 259.815)",    // primary
  cyan: "oklch(0.72 0.15 210)",
  green: "oklch(0.72 0.17 155)",
  orange: "oklch(0.75 0.16 55)",
  purple: "oklch(0.65 0.2 300)",
  red: "oklch(0.65 0.2 25)",
  yellow: "oklch(0.82 0.15 85)",
  pink: "oklch(0.7 0.18 340)",
};

/* ─── Diagram Configs per Project ───────────────────────────── */

const configs: Record<string, DiagramConfig> = {
  /* 1. SatyaStack ─ ZK Compliance */
  satyastack: {
    nodes: [
      { id: "mobile", label: "Mobile Vault", icon: SiFlutter, x: 15, y: 15, color: C.cyan },
      { id: "digilocker", label: "DigiLocker", icon: TbShieldLock, x: 50, y: 10, color: C.green },
      { id: "issuer", label: "Issuer Service", icon: SiSpringboot, x: 85, y: 15, color: C.green },
      { id: "circuits", label: "Noir Circuits", icon: SiRust, x: 15, y: 45, color: C.orange },
      { id: "verifier", label: "Verifier (Rust)", icon: SiRust, x: 85, y: 45, color: C.red },
      { id: "smt", label: "Sparse Merkle Tree", icon: TbLock, x: 50, y: 45, color: C.purple },
      { id: "dynamo", label: "DynamoDB", icon: DiDatabase, x: 30, y: 75, color: C.orange },
      { id: "qldb", label: "QLDB Audit", icon: DiDatabase, x: 70, y: 75, color: C.yellow },
      { id: "aws", label: "AWS Infra", icon: FaAws, x: 50, y: 92, color: C.orange },
    ],
    edges: [
      { from: "mobile", to: "digilocker" },
      { from: "digilocker", to: "issuer" },
      { from: "mobile", to: "circuits", animated: true },
      { from: "circuits", to: "smt" },
      { from: "smt", to: "verifier" },
      { from: "issuer", to: "verifier" },
      { from: "verifier", to: "qldb" },
      { from: "circuits", to: "dynamo" },
      { from: "dynamo", to: "aws" },
      { from: "qldb", to: "aws" },
    ],
    pulses: [
      { path: ["mobile", "circuits", "smt", "verifier", "qldb"], dur: "5s" },
      { path: ["digilocker", "issuer", "verifier"], dur: "4s", delay: "1.5s" },
    ],
  },

  /* 2. ArtistsKonnect ─ Booking Platform */
  artistskonnect: {
    nodes: [
      { id: "web", label: "Next.js Web", icon: SiNextdotjs, x: 20, y: 12, color: C.blue },
      { id: "mobile", label: "Flutter App", icon: SiFlutter, x: 80, y: 12, color: C.cyan },
      { id: "api", label: ".NET 10 API", icon: SiDotnet, x: 50, y: 35, color: C.purple },
      { id: "signalr", label: "SignalR Hub", icon: TbApi, x: 85, y: 48, color: C.green },
      { id: "auth", label: "Supabase Auth", icon: TbBrandSupabase, x: 15, y: 48, color: C.green },
      { id: "db", label: "PostgreSQL", icon: SiPostgresql, x: 35, y: 70, color: C.blue },
      { id: "r2", label: "Cloudflare R2", icon: TbCloudComputing, x: 65, y: 70, color: C.orange },
      { id: "docker", label: "Docker", icon: SiDocker, x: 50, y: 92, color: C.cyan },
    ],
    edges: [
      { from: "web", to: "api" },
      { from: "mobile", to: "api" },
      { from: "mobile", to: "signalr", animated: true },
      { from: "web", to: "signalr" },
      { from: "api", to: "auth" },
      { from: "api", to: "db" },
      { from: "api", to: "r2" },
      { from: "signalr", to: "api" },
      { from: "db", to: "docker" },
      { from: "r2", to: "docker" },
    ],
    pulses: [
      { path: ["web", "api", "db"], dur: "4s" },
      { path: ["mobile", "signalr", "api"], dur: "3.5s", delay: "1s" },
    ],
  },

  /* 3. Audel Medical Logistics */
  "audel-medical-logistics": {
    nodes: [
      { id: "dashboard", label: "React Dashboard", icon: SiReact, x: 20, y: 12, color: C.cyan },
      { id: "mobile", label: "Flutter Mobile", icon: SiFlutter, x: 80, y: 12, color: C.cyan },
      { id: "api", label: "Java Backend", icon: DiJava, x: 50, y: 35, color: C.red },
      { id: "offline", label: "Offline Sync", icon: TbDeviceMobile, x: 85, y: 48, color: C.orange },
      { id: "realtime", label: "Realtime Events", icon: TbBrandSupabase, x: 15, y: 48, color: C.green },
      { id: "supabase", label: "Supabase DB", icon: TbBrandSupabase, x: 35, y: 72, color: C.green },
      { id: "geo", label: "Geolocation", icon: TbWorld, x: 65, y: 72, color: C.blue },
      { id: "fleet", label: "Fleet Mgmt", icon: TbServer, x: 50, y: 92, color: C.purple },
    ],
    edges: [
      { from: "dashboard", to: "api" },
      { from: "mobile", to: "api" },
      { from: "mobile", to: "offline" },
      { from: "api", to: "realtime", animated: true },
      { from: "api", to: "supabase" },
      { from: "mobile", to: "geo" },
      { from: "supabase", to: "fleet" },
      { from: "geo", to: "fleet" },
      { from: "realtime", to: "supabase" },
    ],
    pulses: [
      { path: ["mobile", "api", "supabase", "fleet"], dur: "5s" },
      { path: ["mobile", "geo", "fleet"], dur: "4s", delay: "2s" },
    ],
  },

  /* 4. WalletWeaver ─ Blockchain Intelligence */
  walletweaver: {
    nodes: [
      { id: "web", label: "Next.js Frontend", icon: SiNextdotjs, x: 50, y: 8, color: C.blue },
      { id: "cognito", label: "AWS Cognito", icon: FaAws, x: 15, y: 25, color: C.orange },
      { id: "api", label: "API Layer", icon: SiTypescript, x: 50, y: 30, color: C.blue },
      { id: "python", label: "Python Services", icon: SiPython, x: 85, y: 25, color: C.yellow },
      { id: "helius", label: "Helius RPC", icon: TbApi, x: 15, y: 52, color: C.purple },
      { id: "lambda", label: "Lambda Jobs", icon: FaAws, x: 50, y: 55, color: C.orange },
      { id: "webhooks", label: "Webhook Alerts", icon: TbMail, x: 85, y: 52, color: C.green },
      { id: "pg", label: "PostgreSQL", icon: SiPostgresql, x: 35, y: 78, color: C.blue },
      { id: "ecs", label: "ECS / S3", icon: FaAws, x: 65, y: 78, color: C.orange },
      { id: "pulumi", label: "Pulumi IaC", icon: SiPulumi, x: 50, y: 95, color: C.purple },
    ],
    edges: [
      { from: "web", to: "api" },
      { from: "cognito", to: "api" },
      { from: "api", to: "python" },
      { from: "helius", to: "lambda", animated: true },
      { from: "lambda", to: "api" },
      { from: "lambda", to: "webhooks" },
      { from: "api", to: "pg" },
      { from: "lambda", to: "ecs" },
      { from: "pg", to: "pulumi" },
      { from: "ecs", to: "pulumi" },
    ],
    pulses: [
      { path: ["helius", "lambda", "api", "pg"], dur: "4.5s" },
      { path: ["lambda", "webhooks"], dur: "3s", delay: "2s" },
    ],
  },

  /* 5. Bitcoin India Conference ─ High-Scale Registration */
  "bitcoin-india-conference": {
    nodes: [
      { id: "users", label: "200K Users/min", icon: TbUsers, x: 50, y: 8, color: C.yellow },
      { id: "cf", label: "Cloudflare", icon: TbShieldLock, x: 50, y: 25, color: C.orange },
      { id: "apigw", label: "API Gateway", icon: TbApi, x: 50, y: 42, color: C.blue },
      { id: "lambda-reg", label: "Lambda (Reg)", icon: FaAws, x: 20, y: 55, color: C.orange },
      { id: "lambda-otp", label: "Lambda (OTP)", icon: FaAws, x: 80, y: 55, color: C.orange },
      { id: "redis", label: "Redis", icon: SiRedis, x: 80, y: 75, color: C.red },
      { id: "sqs", label: "SQS Queue", icon: FaAws, x: 20, y: 75, color: C.orange },
      { id: "ses", label: "SES Email", icon: TbMail, x: 50, y: 75, color: C.green },
      { id: "supabase", label: "Supabase DB", icon: TbBrandSupabase, x: 35, y: 93, color: C.green },
      { id: "grafana", label: "Grafana", icon: TbEye, x: 65, y: 93, color: C.orange },
    ],
    edges: [
      { from: "users", to: "cf", animated: true },
      { from: "cf", to: "apigw" },
      { from: "apigw", to: "lambda-reg" },
      { from: "apigw", to: "lambda-otp" },
      { from: "lambda-otp", to: "redis" },
      { from: "lambda-reg", to: "sqs" },
      { from: "lambda-otp", to: "ses" },
      { from: "sqs", to: "supabase" },
      { from: "lambda-reg", to: "grafana" },
      { from: "redis", to: "grafana" },
    ],
    pulses: [
      { path: ["users", "cf", "apigw", "lambda-reg", "sqs", "supabase"], dur: "5s" },
      { path: ["users", "cf", "apigw", "lambda-otp", "redis"], dur: "4s", delay: "1s" },
    ],
  },

  /* 6. CryptoWala Exchange ─ P2P Compliance */
  "cryptowala-exchange": {
    nodes: [
      { id: "flutter", label: "Flutter Apps", icon: SiFlutter, x: 20, y: 10, color: C.cyan },
      { id: "admin", label: "Admin Panel", icon: SiNextdotjs, x: 80, y: 10, color: C.blue },
      { id: "backend", label: "Node.js API", icon: SiNodedotjs, x: 50, y: 30, color: C.green },
      { id: "kyc", label: "KYC (Signzy)", icon: TbShieldLock, x: 15, y: 50, color: C.purple },
      { id: "kyt", label: "KYT (TRM)", icon: TbEye, x: 40, y: 50, color: C.red },
      { id: "custody", label: "BitGo Custody", icon: TbLock, x: 65, y: 50, color: C.orange },
      { id: "travel", label: "Travel Rule", icon: TbWorld, x: 90, y: 50, color: C.yellow },
      { id: "mysql", label: "MySQL", icon: SiMysql, x: 30, y: 75, color: C.blue },
      { id: "upi", label: "UPI / IMPS", icon: TbCurrencyDollar, x: 70, y: 75, color: C.green },
      { id: "audit", label: "Audit Logs", icon: TbFileText, x: 50, y: 93, color: C.yellow },
    ],
    edges: [
      { from: "flutter", to: "backend" },
      { from: "admin", to: "backend" },
      { from: "backend", to: "kyc" },
      { from: "backend", to: "kyt", animated: true },
      { from: "backend", to: "custody" },
      { from: "backend", to: "travel" },
      { from: "backend", to: "mysql" },
      { from: "backend", to: "upi" },
      { from: "mysql", to: "audit" },
      { from: "upi", to: "audit" },
    ],
    pulses: [
      { path: ["flutter", "backend", "kyc"], dur: "3.5s" },
      { path: ["flutter", "backend", "custody", "travel"], dur: "4.5s", delay: "1s" },
    ],
  },

  /* 7. GenAI Documentation Search ─ RAG */
  "ai-documentation-search": {
    nodes: [
      { id: "docs", label: "Document Sources", icon: TbFileText, x: 15, y: 12, color: C.yellow },
      { id: "ingest", label: "Java Ingestion", icon: SiSpringboot, x: 50, y: 12, color: C.green },
      { id: "databricks", label: "Databricks", icon: SiDatabricks, x: 85, y: 12, color: C.red },
      { id: "vectors", label: "Vector Index", icon: DiDatabase, x: 85, y: 42, color: C.purple },
      { id: "unity", label: "Unity Catalog", icon: TbLock, x: 50, y: 42, color: C.orange },
      { id: "functions", label: "Azure Functions", icon: FaMicrosoft, x: 15, y: 42, color: C.blue },
      { id: "ai", label: "AI Services", icon: TbBrain, x: 50, y: 70, color: C.pink },
      { id: "query", label: "User Query", icon: TbUsers, x: 15, y: 70, color: C.cyan },
      { id: "bicep", label: "Bicep IaC", icon: FaMicrosoft, x: 85, y: 70, color: C.blue },
      { id: "response", label: "Cited Response", icon: TbMail, x: 15, y: 93, color: C.green },
    ],
    edges: [
      { from: "docs", to: "ingest" },
      { from: "ingest", to: "databricks" },
      { from: "databricks", to: "vectors" },
      { from: "vectors", to: "unity" },
      { from: "query", to: "functions", animated: true },
      { from: "functions", to: "unity" },
      { from: "unity", to: "ai" },
      { from: "ai", to: "response" },
      { from: "functions", to: "bicep" },
    ],
    pulses: [
      { path: ["docs", "ingest", "databricks", "vectors"], dur: "4.5s" },
      { path: ["query", "functions", "unity", "ai", "response"], dur: "5s", delay: "1.5s" },
    ],
  },

  /* 8. Keycloak IAM Migration */
  "keycloak-migration": {
    nodes: [
      { id: "apps", label: "Client Apps", icon: TbWorld, x: 50, y: 8, color: C.cyan },
      { id: "frontdoor", label: "Azure Front Door", icon: FaMicrosoft, x: 50, y: 25, color: C.blue },
      { id: "kc-old", label: "Keycloak v16", icon: TbKey, x: 20, y: 45, color: C.red },
      { id: "kc-new", label: "Keycloak v22", icon: TbKey, x: 80, y: 45, color: C.green },
      { id: "docker", label: "Docker Container", icon: SiDocker, x: 80, y: 65, color: C.cyan },
      { id: "mssql", label: "MSSQL", icon: DiDatabase, x: 35, y: 72, color: C.yellow },
      { id: "vault", label: "Key Vault", icon: TbLock, x: 65, y: 72, color: C.purple },
      { id: "insights", label: "App Insights", icon: TbEye, x: 85, y: 90, color: C.orange },
      { id: "bicep", label: "Bicep IaC", icon: FaMicrosoft, x: 50, y: 93, color: C.blue },
    ],
    edges: [
      { from: "apps", to: "frontdoor" },
      { from: "frontdoor", to: "kc-old" },
      { from: "frontdoor", to: "kc-new", animated: true },
      { from: "kc-new", to: "docker" },
      { from: "kc-old", to: "mssql" },
      { from: "kc-new", to: "mssql" },
      { from: "kc-new", to: "vault" },
      { from: "docker", to: "insights" },
      { from: "mssql", to: "bicep" },
      { from: "vault", to: "bicep" },
    ],
    pulses: [
      { path: ["apps", "frontdoor", "kc-new", "docker", "insights"], dur: "5s" },
      { path: ["apps", "frontdoor", "kc-new", "mssql"], dur: "4s", delay: "2s" },
    ],
  },

  /* 9. Enterprise Encryption Suite */
  "encryption-suite": {
    nodes: [
      { id: "ui", label: "Angular PCI UI", icon: SiAngular, x: 20, y: 12, color: C.red },
      { id: "sdk", label: "Encryption SDK", icon: TbLock, x: 80, y: 12, color: C.purple },
      { id: "api", label: ".NET API", icon: SiDotnet, x: 50, y: 32, color: C.purple },
      { id: "kms", label: "Key Management", icon: TbKey, x: 20, y: 52, color: C.yellow },
      { id: "byok", label: "BYOK Engine", icon: TbShieldLock, x: 80, y: 52, color: C.orange },
      { id: "pci", label: "PCI Compliance", icon: TbShieldLock, x: 50, y: 55, color: C.green },
      { id: "k8s", label: "Kubernetes", icon: SiKubernetes, x: 35, y: 78, color: C.blue },
      { id: "clients", label: "Enterprise Clients", icon: TbUsers, x: 65, y: 78, color: C.cyan },
      { id: "vault", label: "HSM Vault", icon: TbLock, x: 50, y: 95, color: C.red },
    ],
    edges: [
      { from: "ui", to: "api" },
      { from: "sdk", to: "api" },
      { from: "api", to: "kms" },
      { from: "api", to: "byok", animated: true },
      { from: "api", to: "pci" },
      { from: "kms", to: "k8s" },
      { from: "byok", to: "clients" },
      { from: "k8s", to: "vault" },
      { from: "clients", to: "vault" },
    ],
    pulses: [
      { path: ["ui", "api", "kms", "k8s", "vault"], dur: "5s" },
      { path: ["sdk", "api", "byok", "clients"], dur: "4s", delay: "1.5s" },
    ],
  },
};

/* ─── Renderer ──────────────────────────────────────────────── */

function getNode(nodes: DiagramNode[], id: string) {
  return nodes.find((n) => n.id === id)!;
}

function Diagram({ config }: { config: DiagramConfig }) {
  const { nodes, edges, pulses } = config;

  return (
    <div className="relative w-full aspect-[4/3] max-w-lg mx-auto select-none">
      {/* Glow background */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />

      {/* SVG layer — edges + pulses */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="glow-line">
            <feGaussianBlur stdDeviation="0.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Edge lines */}
        {edges.map(({ from, to, animated }) => {
          const a = getNode(nodes, from);
          const b = getNode(nodes, to);
          return (
            <line
              key={`${from}-${to}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={C.blue}
              strokeWidth="0.25"
              strokeOpacity={animated ? 0.5 : 0.2}
              strokeDasharray={animated ? undefined : "1.2 0.8"}
              filter={animated ? "url(#glow-line)" : undefined}
            />
          );
        })}

        {/* Animated pulse dots traveling along paths */}
        {pulses?.map((pulse, pi) => {
          const pathPoints = pulse.path.map((id) => {
            const n = getNode(nodes, id);
            return `${n.x} ${n.y}`;
          });
          const d = `M ${pathPoints[0]} ${pathPoints.slice(1).map((p) => `L ${p}`).join(" ")}`;
          return (
            <circle
              key={pi}
              r="0.7"
              fill={C.blue}
              opacity="0.9"
              filter="url(#glow-line)"
            >
              <animateMotion
                dur={pulse.dur}
                repeatCount="indefinite"
                begin={pulse.delay ?? "0s"}
                path={d}
              />
            </circle>
          );
        })}
      </svg>

      {/* Node icons */}
      {nodes.map((node) => {
        const Icon = node.icon;
        return (
          <div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5 group"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <div
              className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg border border-border/60 bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-sm transition-transform group-hover:scale-110"
              style={{ borderColor: `${node.color ?? C.blue}33`, boxShadow: `0 0 8px ${node.color ?? C.blue}15` }}
            >
              <Icon className="size-3.5 sm:size-4" style={{ color: node.color ?? C.blue }} />
            </div>
            <span className="text-[7px] sm:text-[8px] font-mono text-muted-foreground whitespace-nowrap leading-none mt-0.5">
              {node.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Exported Component ────────────────────────────────────── */

interface ArchitectureDiagramProps {
  slug: string;
  className?: string;
}

export function ArchitectureDiagram({ slug, className }: ArchitectureDiagramProps) {
  const config = configs[slug];
  if (!config) return null;

  return (
    <div className={className}>
      <Diagram config={config} />
    </div>
  );
}

/** Check if a diagram exists for a given project slug */
export function hasDiagram(slug: string): boolean {
  return slug in configs;
}
