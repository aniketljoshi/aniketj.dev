import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="relative text-center">
        <div className="absolute -inset-20 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl" />
        <div className="relative">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Search className="h-8 w-8 text-primary" />
            </div>
          </div>
          <p className="font-mono text-8xl font-bold text-gradient tracking-tighter">404</p>
          <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button className="mt-8 rounded-full px-8" render={<Link href="/" />}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
