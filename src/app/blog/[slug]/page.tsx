import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { SectionContainer } from "@/components/shared/section-container";
import { MermaidDiagram } from "@/components/shared/mermaid-diagram";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { remarkMermaid } from "@/lib/remark-mermaid";
import rehypePrettyCode from "rehype-pretty-code";
import { MotionDiv } from "@/components/motion";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: "article",
      publishedTime: post.meta.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.title,
      description: post.meta.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <SectionContainer className="py-16">
        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-10 group"
          >
            <span className="flex items-center justify-center p-1.5 rounded-full border border-border/50 bg-card/50 mr-3 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
              <ArrowLeft className="h-4 w-4" />
            </span>
            Back to Articles
          </Link>
        </MotionDiv>

        <article>
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <header className="mb-12 relative">
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 to-transparent blur-3xl opacity-50 rounded-full" />
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-foreground mb-6">
                {post.meta.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-sm text-muted-foreground bg-card/40 backdrop-blur-md glass-panel px-6 py-4 rounded-2xl w-fit">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <time dateTime={post.meta.date}>
                    {new Date(post.meta.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{post.meta.readingTime}</span>
                </div>
              </div>
              
              {post.meta.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {post.meta.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center text-xs px-3 py-1 pb-1.5 rounded-full border border-border/50 bg-background/50 hover:border-primary/50 hover:text-primary transition-colors cursor-default"
                    >
                      <Tag className="h-3 w-3 mr-1.5 opacity-50" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="prose prose-base sm:prose-lg max-w-[75ch] prose-zinc dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-pre:bg-card/50 prose-pre:backdrop-blur-xl prose-pre:border-border/50 prose-pre:shadow-sm prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-strong:text-foreground">
              <MDXContent source={post.content} />
            </div>
          </MotionDiv>
        </article>
      </SectionContainer>
    </>
  );
}

const mdxComponents = {
  Mermaid: MermaidDiagram,
  p: (props: any) => (
    <p className="leading-relaxed [&:not(:first-child)]:mt-6 text-foreground/90 font-medium text-[1.05rem]" {...props} />
  ),
  table: (props: any) => (
    <div className="my-8 w-full overflow-hidden rounded-2xl glass-panel relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="w-full overflow-y-auto">
        <table className="w-full text-sm" {...props} />
      </div>
    </div>
  ),
  tr: (props: any) => (
    <tr className="m-0 border-b border-border/50 p-0 last:border-0 hover:bg-muted/30 transition-colors" {...props} />
  ),
  th: (props: any) => (
    <th className="px-5 py-4 text-left font-semibold text-foreground bg-muted/40 backdrop-blur-md border-b-2 border-border/80" {...props} />
  ),
  td: (props: any) => (
    <td className="px-5 py-4 text-left text-muted-foreground align-top" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote className="my-8 border-l-4 border-primary bg-primary/5 px-6 py-5 rounded-r-2xl italic text-muted-foreground shadow-sm relative overflow-hidden group" {...props}>
      <div className="absolute top-0 left-0 w-24 h-24 bg-primary/20 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
      <div className="relative z-10">{props.children}</div>
    </blockquote>
  ),
  ul: (props: any) => <ul className="my-6 ml-6 list-disc space-y-2 text-foreground/90 marker:text-primary" {...props} />,
  ol: (props: any) => <ol className="my-6 ml-6 list-decimal space-y-2 text-foreground/90 marker:text-primary/70" {...props} />,
  li: (props: any) => <li className="pl-2" {...props} />,
  hr: (props: any) => <hr className="my-10 border-border/50" {...props} />,
};

async function MDXContent({ source }: { source: string }) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMermaid],
        rehypePlugins: [[rehypePrettyCode, { theme: "github-dark-dimmed" }]],
      },
    },
  });
  return content;
}
