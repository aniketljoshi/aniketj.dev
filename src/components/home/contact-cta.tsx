import Link from "next/link";
import { Mail, ArrowRight, Sparkles } from "lucide-react";
import { SectionContainer } from "@/components/shared/section-container";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export function ContactCta() {
  return (
    <SectionContainer>
      <ScrollReveal>
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card/50 to-ring/10 p-10 sm:p-16 text-center glass-panel">
          {/* Background glow */}
          <div className="absolute inset-0 -z-10">
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full"
              style={{
                background: "radial-gradient(ellipse, oklch(0.68 0.22 260 / 0.15) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
          </div>

          <div className="flex justify-center mb-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-mono text-primary">
              <Sparkles className="h-3 w-3" />
              Available for opportunities
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            Let&apos;s architect something together
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Looking for a Software Architect or want to discuss systems,
            blockchain, or AI? I&apos;d love to connect.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-primary/40 hover:scale-[1.02] hover:-translate-y-0.5"
            >
              <Mail className="h-4 w-4" /> Get in Touch
            </Link>
            <a
              href="https://www.linkedin.com/in/aniketljoshi999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 backdrop-blur-md px-6 py-3 text-sm font-semibold transition-all duration-300 hover:border-primary/50 hover:scale-[1.02] hover:-translate-y-0.5"
            >
              LinkedIn <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </ScrollReveal>
    </SectionContainer>
  );
}