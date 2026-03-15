export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  role: string;
  company?: string;
  duration: string;
  stack: string[];
  domain: Domain;
  highlights: string[];
  architectureNotes?: string;
  image?: string;
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  domain: Domain;
  challenge: string;
  approach: string;
  architecture: string;
  outcomes: string[];
  stack: string[];
  diagramUrl?: string;
  featured: boolean;
}

export interface Experience {
  company: string;
  companyDescription?: string;
  companyLogo?: string;
  role: string;
  location: string;
  period: string;
  description?: string;
  highlights: string[];
  stack: string[];
  current?: boolean;
}

export interface Certification {
  name: string;
  code: string;
  issuer: string;
  year?: number;
  credentialUrl?: string;
  badgeImage?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  username: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
  readingTime: string;
}

export type Domain =
  | "Healthcare"
  | "Logistics"
  | "Banking"
  | "Ecommerce"
  | "Web3"
  | "Cloud"
  | "AI";

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  email: string;
  location: string;
}
