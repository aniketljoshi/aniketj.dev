"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { MotionDiv } from "@/components/motion";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function NavLink({ href, children, className, onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
        isActive ? "text-foreground" : "text-muted-foreground",
        isHovered && !isActive ? "text-foreground" : "",
        className
      )}
    >
      {isHovered && (
        <MotionDiv
          layoutId="nav-hover"
          className="absolute inset-0 -z-10 rounded-full bg-accent"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </Link>
  );
}
