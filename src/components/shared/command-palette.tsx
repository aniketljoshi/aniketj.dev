"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import {
  Search,
  FileText,
  Briefcase,
  FolderOpen,
  BookOpen,
  Award,
  Layers,
  ArrowRight,
  Download,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getSearchItems, searchItems, type SearchItem } from "@/lib/search";

const categoryIcons: Record<SearchItem["category"], React.ReactNode> = {
  page: <FileText className="h-4 w-4" />,
  project: <FolderOpen className="h-4 w-4" />,
  "case-study": <BookOpen className="h-4 w-4" />,
  blog: <FileText className="h-4 w-4" />,
  work: <Briefcase className="h-4 w-4" />,
  skill: <Layers className="h-4 w-4" />,
  certification: <Award className="h-4 w-4" />,
  action: <Sparkles className="h-4 w-4" />,
};

const categoryLabels: Record<SearchItem["category"], string> = {
  page: "Pages",
  project: "Projects",
  "case-study": "Case Studies",
  blog: "Blog",
  work: "Experience",
  skill: "Skills",
  certification: "Certifications",
  action: "Actions",
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const allItems = useMemo(() => getSearchItems(), []);

  const results = useMemo(() => {
    if (!query.trim()) return allItems.filter((i) => i.category === "page" || i.category === "action");
    return searchItems(query, allItems);
  }, [query, allItems]);

  useEffect(() => {
    setActiveIndex(0);
  }, [results]);

  const handleSelect = useCallback(
    (item: SearchItem) => {
      setOpen(false);
      setQuery("");
      if (item.action === "download") {
        const link = document.createElement("a");
        link.href = item.href;
        link.download = "";
        link.click();
      } else if (item.action === "ai-chat") {
        window.dispatchEvent(new CustomEvent("open-ai-chat"));
      } else {
        router.push(item.href);
      }
    },
    [router]
  );

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [open]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[activeIndex]) {
      e.preventDefault();
      handleSelect(results[activeIndex]);
    }
  }

  return (
    <>
      {/* Trigger button in header */}
      <button
        onClick={() => setOpen(true)}
        className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border/50 bg-muted/50 text-sm text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all group"
      >
        <Search className="h-3.5 w-3.5" />
        <span>Search...</span>
        <kbd className="ml-2 pointer-events-none select-none rounded-md border border-border/50 bg-background/50 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground/70 group-hover:border-primary/30">
          ⌘K
        </kbd>
      </button>

      {/* Mobile trigger */}
      <button
        onClick={() => setOpen(true)}
        className="sm:hidden flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </button>

      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-ending-style:opacity-0 data-starting-style:opacity-0 transition-opacity duration-150" />
          <DialogPrimitive.Popup className="fixed left-1/2 top-[20%] z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 rounded-2xl border border-border/50 bg-background/95 backdrop-blur-xl shadow-2xl data-ending-style:opacity-0 data-ending-style:scale-95 data-starting-style:opacity-0 data-starting-style:scale-95 transition-all duration-150">
            <DialogPrimitive.Title className="sr-only">
              Search
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="sr-only">
              Search across pages, projects, blog posts, and more
            </DialogPrimitive.Description>

            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-border/50 px-4 py-3">
              <Search className="h-5 w-5 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search pages, projects, skills..."
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
              />
              <kbd className="hidden sm:inline-block rounded-md border border-border/50 bg-muted/50 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground/60">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[320px] overflow-y-auto p-2">
              {results.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                  No results found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                <div className="space-y-1">
                  {results.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm transition-colors",
                        index === activeIndex
                          ? "bg-primary/10 text-foreground"
                          : "text-muted-foreground hover:bg-muted/50"
                      )}
                    >
                      <span
                        className={cn(
                          "flex items-center justify-center w-8 h-8 rounded-lg shrink-0",
                          index === activeIndex
                            ? "bg-primary/20 text-primary"
                            : "bg-muted/80 text-muted-foreground"
                        )}
                      >
                        {item.action === "download" ? (
                          <Download className="h-4 w-4" />
                        ) : item.action === "ai-chat" ? (
                          <Sparkles className="h-4 w-4" />
                        ) : (
                          categoryIcons[item.category]
                        )}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{item.title}</div>
                        <div className="text-xs text-muted-foreground/70 truncate">
                          {categoryLabels[item.category]}
                          {item.description && ` · ${item.description}`}
                        </div>
                      </div>
                      {index === activeIndex && (
                        <ArrowRight className="h-3.5 w-3.5 text-primary shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-border/50 px-4 py-2 text-[11px] text-muted-foreground/50">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-border/50 bg-muted/50 px-1 font-mono">↑↓</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-border/50 bg-muted/50 px-1 font-mono">↵</kbd>
                  select
                </span>
              </div>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-border/50 bg-muted/50 px-1 font-mono">esc</kbd>
                close
              </span>
            </div>
          </DialogPrimitive.Popup>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
}
