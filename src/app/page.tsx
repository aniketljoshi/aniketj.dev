import { Hero } from "@/components/home/hero";
import { AboutSummary } from "@/components/home/about-summary";
import { ExpertiseGrid } from "@/components/home/expertise-grid";
import { FeaturedWork } from "@/components/home/featured-work";
import { TechStack } from "@/components/home/tech-stack";
import { ContactCta } from "@/components/home/contact-cta";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSummary />
      <Separator />
      <div className="bg-card/30">
        <ExpertiseGrid />
      </div>
      <Separator />
      <FeaturedWork />
      <Separator />
      <TechStack />
      <Separator />
      <ContactCta />
    </>
  );
}
