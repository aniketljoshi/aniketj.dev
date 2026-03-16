import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { caseStudies } from "@/data/case-studies";
import { skills } from "@/data/skills";
import { certifications } from "@/data/certifications";

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  href: string;
  category: "project" | "blog" | "case-study" | "page" | "work" | "skill" | "certification" | "action";
  tags?: string[];
  action?: "download" | "ai-chat";
}

const pages: SearchItem[] = [
  { id: "action-ai-chat", title: "AI Assistant", description: "Ask Aniket's AI assistant about his experience, projects, or skills", href: "#", category: "action", tags: ["ai", "chat", "assistant", "ask", "help"], action: "ai-chat" },
  { id: "action-resume-web2", title: "Download Resume (Web2)", description: "Download Aniket's Web2 resume as PDF", href: "/resume/aniket-joshi-web2.pdf", category: "action", tags: ["resume", "cv", "download", "pdf"], action: "download" },
  { id: "action-resume-web3", title: "Download Resume (Web3)", description: "Download Aniket's Web3 resume as PDF", href: "/resume/aniket-joshi-web3.pdf", category: "action", tags: ["resume", "cv", "download", "pdf", "blockchain"], action: "download" },
  { id: "page-home", title: "Home", description: "Portfolio homepage", href: "/", category: "page" },
  { id: "page-about", title: "About", description: "About Aniket Joshi — background, philosophy, experience", href: "/about", category: "page" },
  { id: "page-work", title: "Work Experience", description: "Professional experience and career history", href: "/work", category: "page" },
  { id: "page-projects", title: "Projects", description: "Featured projects and side work", href: "/projects", category: "page" },
  { id: "page-blog", title: "Blog", description: "Technical articles and architecture deep-dives", href: "/blog", category: "page" },
  { id: "page-case-studies", title: "Case Studies", description: "Architecture case studies and system design", href: "/case-studies", category: "page" },
  { id: "page-contact", title: "Contact", description: "Get in touch with Aniket", href: "/contact", category: "page" },
];

export function getSearchItems(): SearchItem[] {
  const items: SearchItem[] = [...pages];

  for (const p of projects) {
    items.push({
      id: `project-${p.slug}`,
      title: p.title,
      description: p.tagline,
      href: `/projects/${p.slug}`,
      category: "project",
      tags: p.stack,
    });
  }

  for (const cs of caseStudies) {
    items.push({
      id: `case-study-${cs.slug}`,
      title: cs.title,
      description: cs.subtitle,
      href: `/case-studies/${cs.slug}`,
      category: "case-study",
      tags: cs.stack,
    });
  }

  for (const e of experience) {
    items.push({
      id: `work-${e.company}`,
      title: `${e.role} at ${e.company}`,
      description: e.period,
      href: "/work",
      category: "work",
      tags: e.stack,
    });
  }

  for (const cat of skills) {
    items.push({
      id: `skill-${cat.category}`,
      title: cat.category,
      description: cat.skills.join(", "),
      href: "/about",
      category: "skill",
      tags: cat.skills,
    });
  }

  for (const cert of certifications) {
    items.push({
      id: `cert-${cert.code}`,
      title: cert.name,
      description: `${cert.issuer} — ${cert.code}`,
      href: "/about",
      category: "certification",
    });
  }

  return items;
}

export function searchItems(query: string, items: SearchItem[]): SearchItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return items
    .map((item) => {
      let score = 0;
      const titleLower = item.title.toLowerCase();
      const descLower = item.description.toLowerCase();

      if (titleLower === q) score += 100;
      else if (titleLower.startsWith(q)) score += 80;
      else if (titleLower.includes(q)) score += 60;

      if (descLower.includes(q)) score += 30;

      if (item.tags) {
        for (const tag of item.tags) {
          if (tag.toLowerCase().includes(q)) {
            score += 20;
            break;
          }
        }
      }

      return { item, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((r) => r.item);
}
