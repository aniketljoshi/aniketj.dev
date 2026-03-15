import {
  Server,
  Cloud,
  Brain,
  Link2,
  Layers,
  Shield,
  Code2,
  Cpu,
} from "lucide-react";
import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const expertise = [
  {
    icon: Layers,
    title: "Software Architecture",
    description: "Distributed systems, DDD, microservices, and API design",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description: "Azure, AWS, GCP — multi-cloud design and IaC",
  },
  {
    icon: Server,
    title: "Backend Platforms",
    description: ".NET, Java, Spring Boot, Node.js, GraphQL",
  },
  {
    icon: Shield,
    title: "Identity & Security",
    description: "Keycloak, OAuth2, OIDC, SSO, encryption, PCI compliance",
  },
  {
    icon: Brain,
    title: "AI & Data Systems",
    description: "RAG pipelines, agentic AI, Databricks, vector search",
  },
  {
    icon: Link2,
    title: "Web3 & Blockchain",
    description: "Solidity, Rust/Anchor, Solana, EVM, smart contracts",
  },
  {
    icon: Cpu,
    title: "DevOps & Platform",
    description: "K8s, Docker, CI/CD, Bicep, Terraform, observability",
  },
  {
    icon: Code2,
    title: "Product Engineering",
    description: "React, Next.js, Flutter, TypeScript — full-stack delivery",
  },
];

export function ExpertiseGrid() {
  return (
    <SectionContainer>
      <SectionHeading
        title="Core Expertise"
        description="The domains and disciplines I work across"
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {expertise.map((item, i) => (
          <ScrollReveal key={item.title} delay={i * 0.05}>
            <div className="group rounded-lg border bg-card p-5 transition-all hover:border-primary/30 hover:glow">
              <item.icon className="h-5 w-5 text-primary mb-3" />
              <h3 className="font-medium text-sm">{item.title}</h3>
              <p className="text-xs text-muted-foreground mt-1.5">
                {item.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionContainer>
  );
}
