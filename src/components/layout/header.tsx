"use client";

import Link from "next/link";
import { navigation } from "@/data/navigation";
import { NavLink } from "./nav-link";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { ScrollProgressBar } from "./scroll-progress";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { m, AnimatePresence } from "motion/react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastY && y > 120);
      setLastY(y);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  return (
    <>
      <ScrollProgressBar />
      <AnimatePresence>
        <m.header
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
        >
          <div className={cn(
            "flex h-14 items-center justify-between px-5 rounded-2xl w-full max-w-4xl transition-all duration-500",
            scrolled
              ? "glass-panel shadow-lg shadow-black/5 dark:shadow-black/30"
              : "bg-transparent border border-transparent"
          )}>
            {/* Logo */}
            <Link
              href="/"
              className="group relative flex items-center gap-2"
            >
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shrink-0 shadow-sm">
                <span className="text-[10px] font-black text-primary-foreground tracking-tighter">AJ</span>
              </div>
              <span className="font-mono text-sm font-semibold tracking-tight group-hover:text-primary transition-colors duration-200">
                aniketj.dev
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <NavLink key={item.href} href={item.href}>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <MobileNav />
            </div>
          </div>
        </m.header>
      </AnimatePresence>
    </>
  );
}
