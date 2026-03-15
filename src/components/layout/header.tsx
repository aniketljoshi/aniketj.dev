"use client";

import Link from "next/link";
import { navigation } from "@/data/navigation";
import { NavLink } from "./nav-link";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-4 z-50 w-full transition-all duration-300 px-4 flex justify-center",
      )}
    >
      <div className={cn(
        "flex h-14 items-center justify-between px-6 rounded-full w-full max-w-5xl transition-all duration-300",
        scrolled
          ? "glass-panel shadow-lg border-border/40"
          : "bg-transparent border border-transparent"
      )}>
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight hover:text-primary transition-colors"
        >
          aniketj.dev
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
