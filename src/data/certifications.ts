import type { Certification } from "@/types";

export const certifications: Certification[] = [
  {
    name: "Azure Solutions Architect Expert",
    code: "AZ-305",
    issuer: "Microsoft",
    badgeImage: "/certifications/AZ-305.png",
    credentialUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/azure-solutions-architect/",
  },
  {
    name: "Azure DevOps Engineer Expert",
    code: "AZ-400",
    issuer: "Microsoft",
    badgeImage: "/certifications/AZ-400.png",
    credentialUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/devops-engineer/",
  },
  {
    name: "Azure Developer Associate",
    code: "AZ-204",
    issuer: "Microsoft",
    badgeImage: "/certifications/AZ-204.png",
    credentialUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/azure-developer/",
  },
  {
    name: "Azure AI Engineer Associate",
    code: "AI-102",
    issuer: "Microsoft",
    badgeImage: "/certifications/AI-102.png",
    credentialUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-engineer/",
  },
  {
    name: "Azure Administrator",
    code: "AZ-104",
    issuer: "Microsoft",
    badgeImage: "/certifications/AZ-104.png",
    credentialUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/",
  },
  {
    name: "Azure AI Fundamentals",
    code: "AI-900",
    issuer: "Microsoft",
    badgeImage: "/certifications/AI-900.png",
    credentialUrl:
      "https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/",
  },
  {
    name: "Databricks Fundamentals Accreditation",
    code: "Databricks",
    issuer: "Databricks",
    credentialUrl: "https://www.databricks.com/learn/certification",
  },
  {
    name: "Certified Kubernetes Administrator",
    code: "CKA",
    issuer: "CNCF / Udemy",
    credentialUrl: "https://www.cncf.io/training/certification/cka/",
  },
];
