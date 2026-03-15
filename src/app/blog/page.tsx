import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { SectionContainer } from "@/components/shared/section-container";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on software architecture, distributed systems, AI, and Web3.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <PageHeader
        title="Blog"
        description="Writing about architecture, systems design, AI, and Web3."
      />
      <SectionContainer className="pt-0">
        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet. Check back soon.</p>
        ) : (
          <div className="grid gap-4">
            {posts.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 0.05}>
                <Link href={`/blog/${post.slug}`}>
                  <article className="group rounded-lg border bg-card p-6 transition-all hover:border-primary/30 hover:glow">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1">
                        <h2 className="text-lg font-semibold group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                          {post.description}
                        </p>
                        <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                          <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </time>
                          <span>&middot;</span>
                          <span>{post.readingTime}</span>
                        </div>
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                    </div>
                  </article>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}
      </SectionContainer>
    </>
  );
}
