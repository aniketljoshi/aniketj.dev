"use client";

import Link from "next/link";
import { m, useScroll, useTransform } from "motion/react";
import { ArrowRight, Mail, MoveDownLeft } from "lucide-react";
import { ArchitectureVisual } from "./architecture-visual";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Magnetic } from "@/components/ui/magnetic";
import { TextReveal } from "@/components/ui/text-reveal";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { useRef } from "react";

const stats = [
  { value: "12+", label: "Years building" },
  { value: "6x", label: "Azure certified" },
  { value: "9", label: "Products shipped" },
];

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col overflow-hidden">
      <AuroraBackground />

      {/* Main content */}
      <m.div
        style={{ opacity, y, scale }}
        className="flex-1 mx-auto max-w-7xl px-6 w-full flex items-center pt-32 pb-16"
      >
        <div className="grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_480px] gap-20 items-center w-full">

          {/* Left - text */}
          <div className="space-y-10">
            {/* Eyebrow */}
            <m.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="floating-badge">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                Software Architect
              </span>
            </m.div>

            {/* Name - Kinetic Typography */}
            <div className="space-y-2">
              <m.h1
                className="display-text text-[clamp(4rem,10vw,8rem)] leading-[0.9] tracking-[-0.05em]"
              >
                <m.span
                  className="block overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <m.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Aniket
                  </m.span>
                </m.span>
                <m.span
                  className="block overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                >
                  <m.span
                    className="block text-gradient-vibrant"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Joshi
                  </m.span>
                </m.span>
              </m.h1>
            </div>

            {/* Description */}
            <m.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl"
            >
              I design and build{" "}
              <span className="text-foreground font-medium">distributed systems</span>,{" "}
              <span className="text-foreground font-medium">cloud platforms</span>,{" "}
              <span className="text-foreground font-medium">AI pipelines</span>, and{" "}
              <span className="text-foreground font-medium">Web3 applications</span>.{" "}
              12+ years architecting production systems across healthcare, logistics, banking, and blockchain.
            </m.p>

            {/* CTAs */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65, ease: "easeOut" }}
              className="flex flex-wrap gap-4"
            >
              <Magnetic>
                <Link
                  href="/work"
                  className="group relative inline-flex items-center gap-2.5 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/20 transition-all duration-500 hover:shadow-primary/40 hover:scale-[1.03]"
                >
                  <span className="relative z-10 flex items-center gap-2.5">
                    View my Work
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-primary to-ring opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 rounded-full border border-border/50 bg-card/40 backdrop-blur-xl px-7 py-3.5 text-sm font-semibold transition-all duration-500 hover:border-primary/40 hover:bg-card/80 hover:scale-[1.03] gradient-border"
                >
                  <Mail className="h-4 w-4" />
                  Get in Touch
                </Link>
              </Magnetic>
            </m.div>

            {/* Stats */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-wrap gap-10 pt-4"
            >
              {stats.map((stat, i) => (
                <m.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + i * 0.12 }}
                  className="flex flex-col group"
                >
                  <AnimatedCounter
                    value={stat.value}
                    className="text-3xl font-bold tracking-tight text-gradient"
                  />
                  <span className="text-[11px] text-muted-foreground font-mono mt-1 tracking-wide">{stat.label}</span>
                  <div className="h-px w-0 bg-gradient-to-r from-primary to-transparent mt-2 group-hover:w-full transition-all duration-500" />
                </m.div>
              ))}
              <m.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="flex flex-col group"
              >
                <span className="text-3xl font-bold tracking-tight text-gradient">Arch.</span>
                <span className="text-[11px] text-muted-foreground font-mono mt-1 tracking-wide">@ Vanderlande</span>
                <div className="h-px w-0 bg-gradient-to-r from-primary to-transparent mt-2 group-hover:w-full transition-all duration-500" />
              </m.div>
            </m.div>
          </div>

          {/* Right - architecture diagram */}
          <m.div
            initial={{ opacity: 0, scale: 0.85, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-8 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-ring/10 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
              <div className="relative rounded-2xl border border-border/40 bg-card/20 backdrop-blur-2xl p-6 shadow-2xl glass-panel gradient-border">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/30">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground ml-2">system.architecture</span>
                </div>
                <ArchitectureVisual />
              </div>
            </div>
          </m.div>
        </div>
      </m.div>

      {/* Scroll indicator */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="flex justify-center pb-12"
      >
        <m.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground/40"
        >
          <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/20 flex justify-center pt-1">
            <m.div
              animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 rounded-full bg-primary/60"
            />
          </div>
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase">scroll</span>
        </m.div>
      </m.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />
    </section>
  );
}
