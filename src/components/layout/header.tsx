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
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
        >
          <div className={cn(
            "flex h-14 items-center justify-between px-6 rounded-2xl w-full max-w-4xl transition-all duration-700",
            scrolled
              ? "glass-panel shadow-lg shadow-black/5 dark:shadow-black/30 gradient-border"
              : "bg-transparent border border-transparent"
          )}>
            {/* Logo */}
            <Link
              href="/"
              className="group relative flex items-center gap-2.5"
            >
              <m.div
                className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary via-primary/80 to-ring flex items-center justify-center shrink-0 shadow-md shadow-primary/20"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <span className="text-[10px] font-black text-primary-foreground tracking-tighter">AJ</span>
              </m.div>
              <span className="font-mono text-sm font-semibold tracking-tight group-hover:text-primary transition-colors duration-300">
                aniketj.dev
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0.5">
              {navigation.map((item) => (
                <NavLink key={item.href} href={item.href}>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-1">
              <ThemeToggle />
              <MobileNav />
            </div>
          </div>
        </m.header>
      </AnimatePresence>
    </>
  );
}
