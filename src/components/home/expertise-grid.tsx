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
            <div className="group relative rounded-xl border border-border/50 bg-card/30 backdrop-blur-md p-6 transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:bg-card/50 hover:shadow-[0_0_30px_-5px_rgba(var(--primary),0.3)] overflow-hidden h-full flex flex-col justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <item.icon className="h-6 w-6 text-primary mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:text-ring" />
                <h3 className="font-semibold text-foreground tracking-tight">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionContainer>
  );
}
