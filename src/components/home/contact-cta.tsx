"use client";

import Link from "next/link";
import { Mail, ArrowRight, Sparkles } from "lucide-react";
import { SectionContainer } from "@/components/shared/section-container";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { m } from "motion/react";

export function ContactCta() {
  return (
    <SectionContainer>
      <ScrollReveal>
        <SpotlightCard
          className="relative overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/[0.06] via-card/40 to-ring/[0.06] glass-panel"
          spotlightColor="oklch(0.72 0.22 270 / 0.12)"
        >
          <div className="relative p-12 sm:p-20 text-center">
            {/* Background glow orbs */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <m.div
                className="absolute left-1/4 top-0 w-[300px] h-[300px] rounded-full"
                style={{
                  background: "radial-gradient(ellipse, oklch(0.72 0.22 270 / 0.12) 0%, transparent 70%)",
                  filter: "blur(60px)",
                }}
                animate={{
                  x: [0, 30, 0],
                  y: [0, -20, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <m.div
                className="absolute right-1/4 bottom-0 w-[250px] h-[250px] rounded-full"
                style={{
                  background: "radial-gradient(ellipse, oklch(0.68 0.2 230 / 0.1) 0%, transparent 70%)",
                  filter: "blur(50px)",
                }}
                animate={{
                  x: [0, -20, 0],
                  y: [0, 20, 0],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              />
            </div>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-6"
            >
              <span className="floating-badge">
                <Sparkles className="h-3 w-3" />
                Available for opportunities
              </span>
            </m.div>

            <m.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight"
            >
              Let&apos;s architect something{" "}
              <span className="text-gradient-vibrant">together</span>
            </m.h2>
            <m.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 text-muted-foreground max-w-lg mx-auto leading-relaxed text-[15px]"
            >
              Looking for a Software Architect or want to discuss systems,
              blockchain, or AI? I&apos;d love to connect.
            </m.p>
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <Magnetic>
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center gap-2.5 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/20 transition-all duration-500 hover:shadow-primary/40 hover:scale-[1.03] overflow-hidden"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-primary to-ring opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 flex items-center gap-2.5">
                    <Mail className="h-4 w-4" /> Get in Touch
                  </span>
                </Link>
              </Magnetic>
              <Magnetic>
                <a
                  href="https://www.linkedin.com/in/aniketljoshi999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-full border border-border/50 bg-background/30 backdrop-blur-xl px-7 py-3.5 text-sm font-semibold transition-all duration-500 hover:border-primary/40 hover:scale-[1.03] gradient-border"
                >
                  LinkedIn <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Magnetic>
            </m.div>
          </div>
        </SpotlightCard>
      </ScrollReveal>
    </SectionContainer>
  );
}