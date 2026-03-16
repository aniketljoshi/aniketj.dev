import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";
import { socialLinks } from "@/data/social";
import { navigation } from "@/data/navigation";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  Linkedin,
  Twitter,
};

export function Footer() {
  return (
    <footer className="border-t border-border/50 mt-8">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid sm:grid-cols-[1fr_auto_auto] gap-10 sm:gap-16">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-mono text-sm font-bold tracking-tight text-foreground hover:text-primary transition-colors"
            >
              aniketj.dev
            </Link>
            <p className="mt-2.5 text-sm text-muted-foreground max-w-xs leading-relaxed">
              Software Architect building across cloud, distributed systems, AI,
              and Web3.
            </p>
            <div className="mt-5 flex gap-3">
              {socialLinks.slice(0, 3).map((link) => {
                const Icon = iconMap[link.icon];
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
                    aria-label={link.platform}
                  >
                    {Icon ? <Icon className="h-4 w-4" /> : null}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mb-4 font-mono">
              Pages
            </h4>
            <nav className="flex flex-col gap-2.5">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mb-4 font-mono">
              Contact
            </h4>
            <div className="flex flex-col gap-2.5">
              <Link
                href="/contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Send a message
              </Link>
              <a
                href="https://www.linkedin.com/in/aniketljoshi999"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/aniketjoshi9999"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/30 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-muted-foreground/50">
          <span>&copy; {new Date().getFullYear()} Aniket Joshi. All rights reserved.</span>
          <span className="font-mono">Built with Next.js + Tailwind</span>
        </div>
      </div>
    </footer>
  );
}