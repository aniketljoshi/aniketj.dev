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
    number: "01",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description: "Azure, AWS, GCP - multi-cloud design and IaC",
    number: "02",
  },
  {
    icon: Server,
    title: "Backend Platforms",
    description: ".NET, Java, Spring Boot, Node.js, GraphQL",
    number: "03",
  },
  {
    icon: Shield,
    title: "Identity and Security",
    description: "Keycloak, OAuth2, OIDC, SSO, encryption, PCI compliance",
    number: "04",
  },
  {
    icon: Brain,
    title: "AI and Data Systems",
    description: "RAG pipelines, agentic AI, Databricks, vector search",
    number: "05",
  },
  {
    icon: Link2,
    title: "Web3 and Blockchain",
    description: "Solidity, Rust/Anchor, Solana, EVM, smart contracts",
    number: "06",
  },
  {
    icon: Cpu,
    title: "DevOps and Platform",
    description: "K8s, Docker, CI/CD, Bicep, Terraform, observability",
    number: "07",
  },
  {
    icon: Code2,
    title: "Product Engineering",
    description: "React, Next.js, Flutter, TypeScript - full-stack delivery",
    number: "08",
  },
];

export function ExpertiseGrid() {
  return (
    <SectionContainer>
      <SectionHeading
        title="Core Expertise"
        eyebrow="Skills"
        description="The domains and disciplines I work across"
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {expertise.map((item, i) => (
          <ScrollReveal key={item.title} delay={i * 0.05}>
            <div className="group bento-card relative rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="font-mono text-xs text-muted-foreground/40 group-hover:text-muted-foreground/70 transition-colors">
                  {item.number}
                </span>
              </div>
              <h3 className="font-semibold text-foreground text-sm tracking-tight mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                {item.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionContainer>
  );
}