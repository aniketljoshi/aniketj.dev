import { caseStudies } from "@/data/case-studies";
import { certifications } from "@/data/certifications";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { skills } from "@/data/skills";
import { socialLinks } from "@/data/social";
import type {
  CaseStudy,
  Certification,
  Experience,
  Project,
  SkillCategory,
} from "@/types";

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "about",
  "can",
  "do",
  "does",
  "for",
  "from",
  "he",
  "her",
  "him",
  "his",
  "how",
  "i",
  "in",
  "is",
  "me",
  "my",
  "of",
  "on",
  "or",
  "show",
  "tell",
  "the",
  "their",
  "them",
  "they",
  "to",
  "what",
  "which",
  "who",
  "with",
  "work",
]);

const FEATURED_PROJECTS = projects.filter((project) => project.featured);
const CURRENT_ROLE = experience.find((item) => item.current) ?? experience[0];
const DOMAINS = Array.from(
  new Set(
    [...projects, ...caseStudies]
      .map((item) => item.domain)
      .filter(Boolean),
  ),
);

type Match<T> = {
  item: T;
  score: number;
};

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value: string): string[] {
  return normalize(value)
    .split(" ")
    .filter((token) => token && !STOP_WORDS.has(token));
}

function containsAny(query: string, phrases: string[]): boolean {
  return phrases.some((phrase) => query.includes(normalize(phrase)));
}

function joinList(values: string[], limit = values.length): string {
  const items = values.slice(0, limit);

  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;

  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function scoreText(query: string, queryTokens: string[], value: string): number {
  const candidate = normalize(value);

  if (!candidate) return 0;

  let score = 0;

  if (query === candidate) score += 18;
  if (query.includes(candidate) && candidate.length > 3) score += 9;
  if (candidate.includes(query) && query.length > 3) score += 7;

  const words = candidate.split(" ");

  for (const token of queryTokens) {
    if (token.length < 2) continue;

    if (words.includes(token)) score += 4;
    else if (candidate.includes(token)) score += 2;
  }

  return score;
}

function findBestMatch<T>(
  query: string,
  queryTokens: string[],
  items: T[],
  getFields: (item: T) => Array<{ value: string; weight: number }>,
): Match<T> | null {
  let bestMatch: Match<T> | null = null;

  for (const item of items) {
    let score = 0;

    for (const field of getFields(item)) {
      score += scoreText(query, queryTokens, field.value) * field.weight;
    }

    if (!bestMatch || score > bestMatch.score) {
      bestMatch = { item, score };
    }
  }

  return bestMatch && bestMatch.score > 0 ? bestMatch : null;
}

function getProjectMatch(query: string, queryTokens: string[]): Match<Project> | null {
  return findBestMatch(query, queryTokens, projects, (project) => [
    { value: project.title, weight: 5 },
    { value: project.slug.replace(/-/g, " "), weight: 5 },
    { value: project.tagline, weight: 3 },
    { value: project.description, weight: 2 },
    { value: project.problem, weight: 2 },
    { value: project.role, weight: 2 },
    { value: project.company ?? "", weight: 2 },
    { value: project.domain, weight: 2 },
    { value: project.stack.join(" "), weight: 3 },
    { value: project.highlights.join(" "), weight: 2 },
    { value: project.architectureNotes ?? "", weight: 2 },
  ]);
}

function getCaseStudyMatch(
  query: string,
  queryTokens: string[],
): Match<CaseStudy> | null {
  return findBestMatch(query, queryTokens, caseStudies, (caseStudy) => [
    { value: caseStudy.title, weight: 5 },
    { value: caseStudy.slug.replace(/-/g, " "), weight: 5 },
    { value: caseStudy.subtitle, weight: 3 },
    { value: caseStudy.challenge, weight: 2 },
    { value: caseStudy.approach, weight: 2 },
    { value: caseStudy.architecture, weight: 2 },
    { value: caseStudy.domain, weight: 2 },
    { value: caseStudy.stack.join(" "), weight: 3 },
    { value: caseStudy.outcomes.join(" "), weight: 2 },
  ]);
}

function getExperienceMatch(
  query: string,
  queryTokens: string[],
): Match<Experience> | null {
  return findBestMatch(query, queryTokens, experience, (item) => [
    { value: item.company, weight: 5 },
    { value: item.role, weight: 4 },
    { value: item.location, weight: 2 },
    { value: item.period, weight: 2 },
    { value: item.companyDescription ?? "", weight: 2 },
    { value: item.stack.join(" "), weight: 3 },
    { value: item.highlights.join(" "), weight: 2 },
  ]);
}

function getCertificationMatch(
  query: string,
  queryTokens: string[],
): Match<Certification> | null {
  return findBestMatch(query, queryTokens, certifications, (certification) => [
    { value: certification.name, weight: 5 },
    { value: certification.code, weight: 5 },
    { value: certification.issuer, weight: 3 },
  ]);
}

function getSkillCategoryMatch(
  query: string,
  queryTokens: string[],
): Match<SkillCategory> | null {
  return findBestMatch(query, queryTokens, skills, (category) => [
    { value: category.category, weight: 5 },
    { value: category.skills.join(" "), weight: 3 },
  ]);
}

function buildGreetingReply(): string {
  return "Hi! I can help with Aniket's projects, experience, skills, certifications, contact details, and site search. Try asking about WalletWeaver, Azure certifications, or his current role at Vanderlande.";
}

function buildSearchReply(): string {
  return "Use the site search in the header or press Ctrl/Cmd+K. It searches pages, projects, case studies, skills, certifications, resume actions, and can also open the assistant.";
}

function buildAboutReply(): string {
  return `Aniket Joshi is a software architect based in ${siteConfig.location} with 12+ years of experience across distributed systems, cloud platforms, AI systems, and Web3 products. He currently works at ${CURRENT_ROLE.company} and has shipped projects across ${joinList(DOMAINS)}.`;
}

function buildCurrentRoleReply(): string {
  return `Aniket is currently ${CURRENT_ROLE.role} at ${CURRENT_ROLE.company} in ${CURRENT_ROLE.location} (${CURRENT_ROLE.period}). His recent work there includes AI features on MyVanderlande, an enterprise RAG documentation search system, and a Keycloak migration on Azure.`;
}

function buildExperienceReply(): string {
  const companies = experience.slice(0, 5).map((item) => item.company);

  return `He has 12+ years of experience across ${joinList(DOMAINS)}. Recent roles include ${joinList(companies, 5)}, and his current position is ${CURRENT_ROLE.role} at ${CURRENT_ROLE.company}.`;
}

function buildContactReply(): string {
  return `You can reach Aniket at ${siteConfig.email}. His public profiles include GitHub (${socialLinks[0]?.username}), LinkedIn (${socialLinks[1]?.username}), X (${socialLinks[2]?.username}), and Stack Overflow (${socialLinks[3]?.username}).`;
}

function buildResumeReply(): string {
  return "Use the search shortcut Ctrl/Cmd+K and choose Download Resume (Web2) or Download Resume (Web3). Those actions are already wired into the site search.";
}

function buildDomainsReply(): string {
  return `His work spans ${joinList(DOMAINS)}. A lot of the portfolio leans into AI, cloud architecture, and Web3 platforms with strong enterprise and systems-design depth.`;
}

function buildSkillsReply(query: string, skillMatch: Match<SkillCategory> | null): string {
  if (skillMatch && skillMatch.score >= 20) {
    return `${skillMatch.item.category}: ${joinList(skillMatch.item.skills, 6)}.`;
  }

  const languages = skills.find((item) => item.category === "Languages");
  const backend = skills.find((item) => item.category === "Backend & Frameworks");
  const cloud = skills.find((item) => item.category === "Cloud & Infrastructure");
  const data = skills.find((item) => item.category === "Data & AI");
  const frontend = skills.find((item) => item.category === "Frontend & Mobile");

  if (containsAny(query, ["frontend", "mobile", "ui"])) {
    return `${frontend?.category}: ${joinList(frontend?.skills ?? [], 6)}.`;
  }

  if (containsAny(query, ["backend", "api", "services"])) {
    return `${backend?.category}: ${joinList(backend?.skills ?? [], 6)}.`;
  }

  if (containsAny(query, ["cloud", "infra", "devops", "kubernetes", "docker"])) {
    return `${cloud?.category}: ${joinList(cloud?.skills ?? [], 6)}.`;
  }

  if (containsAny(query, ["ai", "data", "rag", "databricks"])) {
    return `${data?.category}: ${joinList(data?.skills ?? [], 6)}.`;
  }

  return `His stack spans ${joinList(languages?.skills ?? [], 5)} for languages, ${joinList(backend?.skills ?? [], 4)} for backend, ${joinList(cloud?.skills ?? [], 5)} in cloud, ${joinList(data?.skills ?? [], 4)} for data and AI, and ${joinList(frontend?.skills ?? [], 4)} on frontend and mobile.`;
}

function buildProjectsReply(): string {
  const featuredTitles = FEATURED_PROJECTS.map((project) => project.title);

  return `Featured projects include ${joinList(featuredTitles, 3)}. The wider portfolio also covers WalletWeaver, CryptoWala Exchange, enterprise RAG search, Keycloak migration, and an encryption platform for JPMorgan Chase.`;
}

function buildProjectReply(project: Project, query: string): string {
  const wantsTech = containsAny(query, [
    "architecture",
    "build",
    "built",
    "how",
    "stack",
    "tech",
    "technology",
    "used",
  ]);

  const wantsProblem = containsAny(query, ["problem", "why", "challenge"]);

  let response = `${project.title} is ${project.tagline.toLowerCase()}. Aniket worked on it as ${project.role}`;

  if (project.company) {
    response += ` for ${project.company}`;
  }

  response += `.`;

  if (wantsProblem) {
    response += ` It addresses this problem: ${project.problem}`;
  } else if (wantsTech || project.stack.length > 0) {
    response += ` The stack includes ${joinList(project.stack, 6)}.`;
  }

  if (project.highlights.length > 0) {
    response += ` A standout detail is that he ${project.highlights[0].charAt(0).toLowerCase()}${project.highlights[0].slice(1)}.`;
  }

  return response;
}

function buildCaseStudiesReply(): string {
  const featuredTitles = caseStudies
    .filter((caseStudy) => caseStudy.featured)
    .map((caseStudy) => caseStudy.title);

  return `Case studies on the site include ${joinList(featuredTitles, 3)} plus a compliant P2P exchange architecture deep dive. They focus on real systems, scale, compliance, and deployment tradeoffs.`;
}

function buildCaseStudyReply(caseStudy: CaseStudy, query: string): string {
  const wantsArchitecture = containsAny(query, [
    "architecture",
    "approach",
    "design",
    "stack",
    "tech",
  ]);

  let response = `${caseStudy.title} covers ${caseStudy.subtitle.toLowerCase()}.`;

  if (wantsArchitecture) {
    response += ` The architecture uses ${joinList(caseStudy.stack, 6)} and focuses on ${caseStudy.approach.toLowerCase()}`;
  } else {
    response += ` The core challenge was ${caseStudy.challenge.toLowerCase()}`;
  }

  response += ".";

  if (caseStudy.outcomes.length > 0) {
    response += ` One key outcome: ${caseStudy.outcomes[0]}.`;
  }

  return response;
}

function buildCertificationsReply(): string {
  return `He lists ${certifications.length} certifications, including six Microsoft Azure credentials, Databricks Fundamentals, and Certified Kubernetes Administrator (CKA).`;
}

function buildCertificationReply(certification: Certification): string {
  return `${certification.name} (${certification.code}) is issued by ${certification.issuer}. It is one of the certifications highlighted on Aniket's profile.`;
}

function buildFallbackReply(): string {
  return "I can answer questions about Aniket's projects, case studies, skills, certifications, work history, contact details, and site search. Try asking about SatyaStack, the Azure certifications, or his current role.";
}

export function getPortfolioAssistantReply(input: string): string {
  const query = normalize(input);

  if (!query) {
    return buildGreetingReply();
  }

  const queryTokens = tokenize(input);
  const projectMatch = getProjectMatch(query, queryTokens);
  const caseStudyMatch = getCaseStudyMatch(query, queryTokens);
  const experienceMatch = getExperienceMatch(query, queryTokens);
  const certificationMatch = getCertificationMatch(query, queryTokens);
  const skillMatch = getSkillCategoryMatch(query, queryTokens);

  if (containsAny(query, ["hello", "hey", "hi"])) {
    return buildGreetingReply();
  }

  if (containsAny(query, ["search", "find", "navigate", "where is", "shortcut"])) {
    return buildSearchReply();
  }

  if (containsAny(query, ["contact", "email", "linkedin", "github", "reach", "hire"])) {
    return buildContactReply();
  }

  if (containsAny(query, ["resume", "cv", "download"])) {
    return buildResumeReply();
  }

  if (containsAny(query, ["who is", "about", "background", "summary"])) {
    return buildAboutReply();
  }

  if (containsAny(query, ["current role", "where does he work", "current company", "present role"])) {
    return buildCurrentRoleReply();
  }

  if (containsAny(query, ["experience", "career", "years"])) {
    return buildExperienceReply();
  }

  if (containsAny(query, ["domain", "industry", "industries"])) {
    return buildDomainsReply();
  }

  if (certificationMatch && certificationMatch.score >= 24) {
    return buildCertificationReply(certificationMatch.item);
  }

  if (projectMatch && projectMatch.score >= 28) {
    return buildProjectReply(projectMatch.item, query);
  }

  if (caseStudyMatch && caseStudyMatch.score >= 28) {
    return buildCaseStudyReply(caseStudyMatch.item, query);
  }

  if (experienceMatch && experienceMatch.score >= 24) {
    return `${experienceMatch.item.role} at ${experienceMatch.item.company} (${experienceMatch.item.period}) is one of Aniket's roles. Key focus areas there included ${joinList(experienceMatch.item.stack, 5)}.`;
  }

  if (containsAny(query, ["certification", "certified", "azure", "cka", "databricks"])) {
    return buildCertificationsReply();
  }

  if (containsAny(query, ["skill", "stack", "tech", "technology", "languages", "frontend", "backend", "cloud", "devops", "ai"])) {
    return buildSkillsReply(query, skillMatch);
  }

  if (containsAny(query, ["case study", "architecture"])) {
    return buildCaseStudiesReply();
  }

  if (containsAny(query, ["project", "projects", "portfolio", "built"])) {
    return buildProjectsReply();
  }

  return buildFallbackReply();
}
