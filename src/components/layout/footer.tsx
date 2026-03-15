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
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <Link
              href="/"
              className="font-mono text-sm font-semibold tracking-tight"
            >
              aniketj.dev
            </Link>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs">
              Software Architect building across cloud, distributed systems, AI,
              and Web3.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8">
            <div>
              <h4 className="text-sm font-medium mb-3">Pages</h4>
              <nav className="flex flex-col gap-2">
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

            <div>
              <h4 className="text-sm font-medium mb-3">Connect</h4>
              <div className="flex gap-3">
                {socialLinks.slice(0, 3).map((link) => {
                  const Icon = iconMap[link.icon];
                  return (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={link.platform}
                    >
                      {Icon ? <Icon className="h-5 w-5" /> : null}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Aniket Joshi. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
