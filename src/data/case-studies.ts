import type { CaseStudy } from "@/types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "high-scale-registration",
    title: "Architecting for 200K Signups per Minute",
    subtitle: "Bitcoin India Conference Platform",
    domain: "Web3",
    challenge:
      "The original stack (Vercel + Supabase) buckled under the load of 200K+ simultaneous signup attempts during the conference announcement. We needed to migrate to a resilient architecture without losing existing user data or changing the frontend experience significantly.",
    approach:
      "Designed a hybrid architecture that retained Supabase for verified user persistence and analytics while offloading the high-throughput registration and OTP flow to AWS. Implemented a queue-based processing model with SQS for reliable message delivery, Redis for OTP state management, and Lambda functions for stateless compute.",
    architecture:
      "The system uses API Gateway as the entry point, routing to Lambda functions for OTP generation and verification. SQS queues decouple the registration flow from downstream processing. Redis handles OTP state with TTL-based expiry. SES delivers OTP emails. Verified users are persisted to Supabase. CloudWatch and Grafana provide real-time observability. Cloudflare Turnstile provides bot protection at the edge.",
    outcomes: [
      "Handled 200K+ signups per minute during peak announcement periods",
      "Achieved linear scalability with predictable per-request costs",
      "Zero data loss during migration from original Supabase-only stack",
      "Built comprehensive observability with CloudWatch and Grafana dashboards",
    ],
    stack: [
      "AWS Lambda",
      "API Gateway",
      "Redis",
      "SQS",
      "SES",
      "Supabase",
      "CloudWatch",
      "Grafana",
      "Cloudflare Turnstile",
    ],
    featured: true,
  },
  {
    slug: "rag-documentation-search",
    title: "Building an Enterprise RAG Search System",
    subtitle: "GenAI-Powered Documentation Intelligence",
    domain: "AI",
    challenge:
      "Vanderlande's engineering teams needed to query vast technical documentation intelligently. Traditional keyword search failed on complex, context-dependent questions about system specifications, maintenance procedures, and integration guides.",
    approach:
      "Designed a Retrieval-Augmented Generation pipeline that ingests technical documents, vectorizes them using embedding models, and stores them in a searchable index. At query time, relevant document chunks are retrieved and fed to an LLM for context-aware response generation.",
    architecture:
      "Documents are ingested through Java backend services that handle parsing, chunking, and vectorization. Embeddings are stored in Unity Catalog via Databricks. Azure Functions serve as the orchestration layer, coordinating between the search index and Microsoft AI Services for response generation. Infrastructure is fully automated with Bicep templates.",
    outcomes: [
      "Enabled context-aware querying across thousands of technical documents",
      "Reduced time-to-answer for engineering queries significantly",
      "Built secure integration patterns between Azure Functions and Unity Catalog",
      "Fully automated infrastructure provisioning via Bicep",
    ],
    stack: [
      "Java",
      "Spring Boot",
      "Databricks",
      "Unity Catalog",
      "Azure Functions",
      "Microsoft AI Services",
      "Bicep",
      "RAG",
    ],
    featured: true,
  },
  {
    slug: "keycloak-identity-migration",
    title: "Enterprise Identity Platform Migration",
    subtitle: "Keycloak v16 to v22 on Azure",
    domain: "Cloud",
    challenge:
      "The existing Keycloak v16 deployment was running on legacy infrastructure without container support, modern security features, or proper observability. A zero-downtime migration was critical as the identity platform served all production applications.",
    approach:
      "Planned a phased migration strategy — containerizing Keycloak v22 on Azure App Service (Linux), migrating the MSSQL backend, integrating Application Insights for observability, and automating the entire infrastructure with Bicep for reproducibility.",
    architecture:
      "Keycloak v22 runs as a containerized application on Azure App Service (Linux) with a dedicated MSSQL backend. Application Insights provides telemetry and performance monitoring. The entire stack is defined as Bicep templates — App Service, Key Vault for secrets, container registry, and networking configuration.",
    outcomes: [
      "Migrated from Keycloak v16 to v22 with zero downtime",
      "Containerized deployment on Azure App Service for easier scaling and updates",
      "Full observability via Application Insights integration",
      "Infrastructure-as-Code via Bicep for reproducible deployments",
    ],
    stack: [
      "Keycloak",
      "Azure App Service",
      "Docker",
      "MSSQL",
      "Application Insights",
      "Bicep",
      "Key Vault",
    ],
    featured: true,
  },
  {
    slug: "p2p-exchange-architecture",
    title: "Designing a Compliant P2P Crypto Exchange",
    subtitle: "CryptoWala — USDT/INR On-Ramp",
    domain: "Web3",
    challenge:
      "Building a crypto-fiat exchange in India requires navigating complex regulatory requirements — KYC/KYT compliance, travel rule adherence, custody security, and banking rail integration — while delivering a seamless user experience on mobile and web.",
    approach:
      "Architected a multi-service platform with dedicated integrations for custody (BitGo), identity verification (Signzy), transaction monitoring (TRM Labs), travel rule compliance (Shyft Network), and banking rails (SprintNXT for UPI/IMPS). Tiered KYC levels control access to features and transaction limits.",
    architecture:
      "The backend (Node.js/Express) orchestrates between compliance services, custody APIs, and banking rails. Flutter mobile apps (Android/iOS) and a React/Next.js admin panel serve as the frontend layer. MySQL handles transactional data with audit-grade logging. Multi-environment deployment supports staging and production isolation.",
    outcomes: [
      "Launched compliant USDT (TRC20) to INR conversion with custodial wallets",
      "Integrated 5 third-party compliance and custody services",
      "Implemented tiered KYC, MFA, and automated wallet/bank whitelisting",
      "Audit-grade transaction logging for regulatory compliance",
    ],
    stack: [
      "Node.js",
      "Express",
      "Flutter",
      "React",
      "Next.js",
      "MySQL",
      "BitGo",
      "Signzy",
      "TRM Labs",
    ],
    featured: false,
  },
];
