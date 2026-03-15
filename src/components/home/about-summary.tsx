import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { TerminalBlock } from "@/components/shared/terminal-block";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const terminalLines = [
  { label: "name", value: "Aniket Joshi" },
  { label: "role", value: "Software Architect" },
  { label: "location", value: "Pune, India" },
  { label: "experience", value: "12+ years" },
  { label: "certifications", value: "6x Azure + Databricks + K8s" },
  { label: "focus", value: "Architecture, Cloud, AI, Web3" },
];

export function AboutSummary() {
  return (
    <SectionContainer id="about">
      <SectionHeading title="About" />
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <ScrollReveal>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I&apos;m a Software Architect with over a decade of experience
              building production systems across healthcare, logistics, banking,
              ecommerce, and blockchain.
            </p>
            <p>
              My work sits at the intersection of backend architecture, cloud
              infrastructure, and product engineering. I architect distributed
              systems, design API platforms, build AI-powered workflows, and
              develop decentralized applications.
            </p>
            <p>
              Currently at Vanderlande, I lead AI-driven features on enterprise
              platforms using RAG pipelines, Databricks, and Azure services.
              Outside of work, I build Web3 products — from blockchain monitoring
              tools to compliant crypto exchanges.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center text-sm text-primary hover:underline mt-2"
            >
              Read more <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <TerminalBlock lines={terminalLines} />
        </ScrollReveal>
      </div>
    </SectionContainer>
  );
}
