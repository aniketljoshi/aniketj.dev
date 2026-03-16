"use client";

import Link from "next/link";
import { m } from "motion/react";
import { ArrowRight, Mail, MoveDownLeft } from "lucide-react";
import { ArchitectureVisual } from "./architecture-visual";

const stats = [
  { value: "12+", label: "Years building" },
  { value: "6x", label: "Azure certified" },
  { value: "9", label: "Products shipped" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 dot-bg opacity-60" />
        <div
          className="absolute top-[-30%] left-[-10%] w-[60%] h-[60%] rounded-full"
          style={{
            background: "radial-gradient(ellipse, oklch(0.68 0.22 260 / 0.18) 0%, transparent 70%)",
            filter: "blur(60px)",
            animation: "float 12s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-[10%] right-[-15%] w-[50%] h-[50%] rounded-full"
          style={{
            background: "radial-gradient(ellipse, oklch(0.7 0.18 220 / 0.12) 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "float-delayed 15s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] rounded-full"
          style={{
            background: "radial-gradient(ellipse, oklch(0.65 0.2 280 / 0.1) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 mx-auto max-w-6xl px-6 w-full flex items-center pt-28 pb-16">
        <div className="grid lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_440px] gap-16 items-center w-full">

          {/* Left - text */}
          <div className="space-y-8">
            {/* Eyebrow */}
            <m.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3"
            >
              <div className="h-px w-8 bg-primary" />
              <span className="section-label">Software Architect</span>
            </m.div>

            {/* Name */}
            <m.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="display-text text-[clamp(3.5rem,9vw,7rem)] leading-[0.95] tracking-[-0.05em]"
            >
              <span className="block">Aniket</span>
              <span className="block text-gradient">Joshi</span>
            </m.h1>

            {/* Description */}
            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
              className="text-lg text-muted-foreground leading-relaxed max-w-xl"
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
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-primary/40 hover:scale-[1.02] hover:-translate-y-0.5"
              >
                View my Work
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 backdrop-blur-md px-6 py-3 text-sm font-semibold transition-all duration-300 hover:border-primary/50 hover:bg-card hover:scale-[1.02] hover:-translate-y-0.5"
              >
                <Mail className="h-4 w-4" />
                Get in Touch
              </Link>
            </m.div>

            {/* Stats */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-8 pt-2"
            >
              {stats.map((stat, i) => (
                <m.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                  className="flex flex-col"
                >
                  <span className="text-2xl font-bold tracking-tight text-gradient">{stat.value}</span>
                  <span className="text-xs text-muted-foreground font-mono mt-0.5">{stat.label}</span>
                </m.div>
              ))}
              <m.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.9 }}
                className="flex flex-col"
              >
                <span className="text-2xl font-bold tracking-tight text-gradient">Arch.</span>
                <span className="text-xs text-muted-foreground font-mono mt-0.5">@ Vanderlande</span>
              </m.div>
            </m.div>
          </div>

          {/* Right - architecture diagram */}
          <m.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-ring/10 blur-2xl" />
              <div className="relative rounded-2xl border border-border/50 bg-card/30 backdrop-blur-xl p-6 shadow-2xl glass-panel">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/50">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground ml-1">system.architecture</span>
                </div>
                <ArchitectureVisual />
              </div>
            </div>
          </m.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="flex justify-center pb-10"
      >
        <div className="flex flex-col items-center gap-1 text-muted-foreground/50">
          <MoveDownLeft className="h-3.5 w-3.5 animate-bounce" />
          <span className="text-[10px] font-mono tracking-widest uppercase">scroll</span>
        </div>
      </m.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
