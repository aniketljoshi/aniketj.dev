"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="relative text-center">
        <div className="absolute -inset-20 rounded-full bg-gradient-to-br from-destructive/10 to-transparent blur-3xl" />
        <div className="relative">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </div>
          <p className="font-mono text-7xl font-bold text-gradient tracking-tighter">Error</p>
          <h1 className="mt-4 text-2xl font-bold">Something went wrong</h1>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto leading-relaxed">
            {error.message || "An unexpected error occurred."}
          </p>
          <Button className="mt-8 rounded-full px-8" onClick={reset}>
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
