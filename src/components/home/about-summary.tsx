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

const highlights = [
  { value: "12+", label: "Years of experience" },
  { value: "6x", label: "Azure certifications" },
  { value: "9", label: "Products shipped" },
  { value: "4", label: "Industry domains" },
];

export function AboutSummary() {
  return (
    <SectionContainer id="about">
      <SectionHeading title="About Me" eyebrow="Background" />
      <div className="grid md:grid-cols-2 gap-14 items-start">

        {/* Left - text + stats */}
        <ScrollReveal>
          <div className="space-y-6">
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
                Outside of work, I build Web3 products from blockchain monitoring
                tools to compliant crypto exchanges.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-medium transition-colors mt-2"
              >
                Read more <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {highlights.map((h) => (
                <div
                  key={h.label}
                  className="bento-card p-4 rounded-xl flex flex-col gap-0.5"
                >
                  <span className="text-2xl font-bold tracking-tight text-gradient">{h.value}</span>
                  <span className="text-xs text-muted-foreground">{h.label}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Right - terminal */}
        <ScrollReveal delay={0.15} className="h-full">
          <div className="relative rounded-xl overflow-hidden">
            <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-primary/20 via-transparent to-ring/10" />
            <div className="relative glass-panel rounded-xl p-0.5 h-full">
              <TerminalBlock lines={terminalLines} />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </SectionContainer>
  );
}
