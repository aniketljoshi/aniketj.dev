import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight } from "lucide-react";
import { SectionContainer } from "@/components/shared/section-container";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export function ContactCta() {
  return (
    <SectionContainer>
      <ScrollReveal>
        <div className="rounded-lg border bg-card p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Let&apos;s architect something together
          </h2>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">
            Looking for a Software Architect or want to discuss systems,
            blockchain, or AI? I&apos;d love to connect.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button size="lg" render={<Link href="/contact" />}>
              <Mail className="mr-2 h-4 w-4" /> Get in Touch
            </Button>
            <Button
              variant="outline"
              size="lg"
              render={
                <a
                  href="https://www.linkedin.com/in/aniketljoshi999"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              LinkedIn <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </ScrollReveal>
    </SectionContainer>
  );
}
