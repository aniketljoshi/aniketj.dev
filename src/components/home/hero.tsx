"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MotionDiv, MotionSpan } from "@/components/motion";
import { ArrowRight, Mail } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center grid-dot-bg">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="font-mono text-sm text-primary mb-4">
            Software Architect
          </p>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
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
            . 11+ years architecting production systems across healthcare,
            logistics, banking, and blockchain.
          </p>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <Button size="lg" render={<Link href="/projects" />}>
            View Projects <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" render={<Link href="/contact" />}>
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
          <span>11+ Years</span>
          <span className="text-border">|</span>
          <span>Architect @ Vanderlande</span>
        </MotionDiv>
      </div>

      {/* Gradient fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
