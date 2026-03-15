"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MotionDiv, MotionSpan } from "@/components/motion";
import { ArrowRight, Mail } from "lucide-react";
import { ArchitectureVisual } from "./architecture-visual";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden grid-dot-bg">
      {/* Animated glowing orbs in the background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] mix-blend-screen animate-float opacity-50 dark:opacity-30" />
        <div className="absolute top-[20%] -right-[15%] w-[40%] h-[60%] rounded-full bg-ring/20 blur-[130px] mix-blend-screen animate-float opacity-40 dark:opacity-20" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[40%] rounded-full bg-primary/10 blur-[100px] mix-blend-screen animate-float opacity-50 dark:opacity-30" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-24 z-10 w-full">
        <div className="grid lg:grid-cols-[1fr,auto] gap-12 items-center">
          <div>
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <p className="font-mono text-sm tracking-wider text-primary uppercase font-bold mb-4 drop-shadow-sm">
                Software Architect
              </p>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.05] bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
                Aniket Joshi
              </h1>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="mt-6 max-w-2xl"
            >
              <p className="text-xl text-muted-foreground leading-relaxed">
                I design and build{" "}
                <MotionSpan
                  className="text-foreground font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  distributed systems
                </MotionSpan>
                ,{" "}
                <MotionSpan
                  className="text-foreground font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  cloud platforms
                </MotionSpan>
                ,{" "}
                <MotionSpan
                  className="text-foreground font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  AI pipelines
                </MotionSpan>
                , and{" "}
                <MotionSpan
                  className="text-foreground font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  Web3 applications
                </MotionSpan>
                . 12+ years architecting production systems across healthcare,
                logistics, banking, and blockchain.
              </p>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Button size="lg" className="rounded-full shadow-lg hover:shadow-primary/25 transition-all glow-hover" render={<Link href="/work" />}>
                View Work <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full backdrop-blur-md glass-panel hover:bg-muted/50 transition-all border-border/50" render={<Link href="/contact" />}>
                <Mail className="mr-2 h-4 w-4" /> Get in Touch
              </Button>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-16 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground font-mono"
            >
              <span>6x Azure Certified</span>
              <span className="text-border">|</span>
              <span>12+ Years</span>
              <span className="text-border">|</span>
              <span>Architect @ Vanderlande</span>
            </MotionDiv>
          </div>

          {/* Architecture visualization — hidden on mobile */}
          <div className="hidden lg:block">
            <ArchitectureVisual />
          </div>
        </div>
      </div>

      {/* Gradient fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
