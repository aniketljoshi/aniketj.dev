import type { Metadata } from "next";
import { Mail, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { SectionContainer } from "@/components/shared/section-container";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig } from "@/data/site";
import { socialLinks } from "@/data/social";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch — let's discuss architecture, systems, or collaboration.",
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  Linkedin,
  Twitter,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact"
        description="Let's connect. Whether it's architecture consulting, collaboration, or just a technical conversation."
      />
      <SectionContainer className="pt-0">
        <div className="grid md:grid-cols-2 gap-12">
          <ScrollReveal>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-1">Email</h3>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  {siteConfig.email}
                </a>
              </div>

              <div>
                <h3 className="font-medium mb-1">Location</h3>
                <p className="text-muted-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {siteConfig.location}
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-3">Social</h3>
                <div className="flex flex-col gap-2">
                  {socialLinks.map((link) => {
                    const Icon = iconMap[link.icon];
                    return (
                      <a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm"
                      >
                        {Icon && <Icon className="h-4 w-4" />}
                        {link.platform}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <ContactForm />
          </ScrollReveal>
        </div>
      </SectionContainer>
    </>
  );
}
