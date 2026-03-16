"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { m, AnimatePresence } from "motion/react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function NavLink({ href, children, className, onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative px-3 py-1.5 text-sm font-medium transition-colors duration-200",
        isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
        className
      )}
    >
      {children}
      <AnimatePresence>
        {isActive && (
          <m.span
            layoutId="nav-active"
            className="absolute bottom-0 left-3 right-3 h-px bg-primary"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
        )}
      </AnimatePresence>
    </Link>
  );
}
