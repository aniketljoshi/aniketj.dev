import { Hero } from "@/components/home/hero";
import { AboutSummary } from "@/components/home/about-summary";
import { ExpertiseGrid } from "@/components/home/expertise-grid";
import { FeaturedWork } from "@/components/home/featured-work";
import { TechStack } from "@/components/home/tech-stack";
import { ContactCta } from "@/components/home/contact-cta";

export default function Home() {
  return (
    <>
      <Hero />

      <div className="relative">
        {/* Subtle section divider with gradient */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <AboutSummary />
      </div>

      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="bg-card/20">
          <ExpertiseGrid />
        </div>
      </div>

      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <FeaturedWork />
      </div>

      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <TechStack />
      </div>

      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <ContactCta />
      </div>
    </>
  );
}
