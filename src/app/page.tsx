import { Hero } from "@/components/home/hero";
import { AboutSummary } from "@/components/home/about-summary";
import { ExpertiseGrid } from "@/components/home/expertise-grid";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { CaseStudiesPreview } from "@/components/home/case-studies-preview";
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
      <FeaturedProjects />
      <Separator />
      <div className="bg-card/30">
        <CaseStudiesPreview />
      </div>
      <Separator />
      <TechStack />
      <Separator />
      <ContactCta />
    </>
  );
}
