"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative rounded-full h-9 w-9 overflow-hidden hover:bg-transparent cursor-pointer"
    >
      <div className="flex items-center justify-center w-full h-full transition-transform duration-500 ease-in-out">
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 absolute text-foreground" />
        <Moon className="h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 absolute text-foreground" />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
