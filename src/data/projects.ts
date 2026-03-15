import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "satyastack",
    title: "SatyaStack",
    tagline:
      "Privacy-preserving zero-knowledge compliance infrastructure for India",
    description:
      "Built to verify regulatory compliance (KYC, sanctions, solvency) without exposing PII, addressing the conflict between India's DPDP Act and AML/KYC requirements. Uses PLONK/KZG proofs with Noir circuits for on-chain and off-chain verification.",
    problem:
      "India's Digital Personal Data Protection Act conflicts with AML/KYC requirements — businesses must verify compliance without storing or exposing personal data. Traditional solutions leak PII across trust boundaries.",
    role: "Founder & Software Architect",
    duration: "2025 — Present",
    stack: [
      "Noir",
      "Rust",
      "Spring Boot",
      "Flutter",
      "AWS",
      "Terraform",
      "DynamoDB",
      "QLDB",
      "WASM",
    ],
    domain: "Web3",
    highlights: [
      "Designed ZK circuit architecture using PLONK (KZG) with Noir for KYC membership, sanctions, and age-range proofs",
      "Built issuer service (Java/Spring Boot) and verifier service (Rust/Axum) with strict PII isolation",
      "Implemented mobile credential vault in Flutter with native FFI to Rust prover",
      "Multi-language SDK suite (TypeScript, Java, C#, Python) auto-generated from OpenAPI specs",
      "Infrastructure provisioned via Terraform across dev/stage/prod AWS environments",
    ],
    architectureNotes:
      "Trust boundary model with zero PII crossing verification boundary. Dual Sparse Merkle Tree for revocation, QLDB for audit trail, DynamoDB for state. Path-triggered CI/CD with per-service deployments.",
    image: "/projects/satyastack.png",
    liveUrl: "https://www.satyastack.com",
    featured: true,
    relatedBlog: "zk-proof-architecture-satyastack",
  },
  {
    slug: "artistskonnect",
    title: "ArtistsKonnect",
    tagline:
      "Platform connecting artists and clients for bookings with real-time chat",
    description:
      "Full-stack artist booking platform with role-based authentication, S3/Cloudflare R2 storage integration, real-time chat via SignalR, and cross-platform mobile apps.",
    problem:
      "Artists and clients lack a unified platform for discovery, booking, and communication. Existing marketplaces don't cater to the unique workflow of artist bookings with portfolio management and real-time coordination.",
    role: "Founder & Software Architect",
    duration: "2025 — Present",
    stack: [
      ".NET 10",
      "Next.js",
      "Flutter",
      "PostgreSQL",
      "Supabase Auth",
      "Cloudflare R2",
      "SignalR",
      "Docker",
    ],
    domain: "Ecommerce",
    highlights: [
      "Architected clean architecture backend with .NET 10 (API, Application, Domain, Infrastructure layers)",
      "Built real-time chat using SignalR with message persistence",
      "Integrated Cloudflare R2 via S3-compatible presigned URLs for portfolio uploads",
      "Implemented Supabase Auth with JWT validation in both shared-secret and JWKS modes",
      "Cross-platform mobile app in Flutter with OTP-based authentication",
    ],
    architectureNotes:
      "Clean architecture with DDD. Backend exposes REST API + SignalR hubs. Supabase handles auth, R2 handles media storage with presigned URLs. Docker Compose for local dev with MinIO and InBucket emulators.",
    image: "/projects/artistskonnect.png",
    liveUrl: "https://www.artistskonnect.com",
    featured: true,
  },
  {
    slug: "audel-medical-logistics",
    title: "Audel Medical Logistics",
    tagline:
      "Medical logistics and delivery app with offline capabilities and real-time tracking",
    description:
      "Comprehensive medical logistics application for delivery agents to manage routes, parcels, and deliveries with offline capabilities, real-time tracking, and camera/geolocation integration.",
    problem:
      "Medical delivery agents need reliable route management and parcel tracking that works in areas with poor connectivity, while maintaining audit trails for regulated medical supplies.",
    role: "Software Architect",
    duration: "2025 — Present",
    stack: [
      "Java",
      "React",
      "Vite",
      "TypeScript",
      "Flutter",
      "Supabase",
      "Radix UI",
    ],
    domain: "Healthcare",
    highlights: [
      "Designed multi-platform architecture: Java backend, React web dashboard, Flutter mobile app",
      "Built offline-first mobile app with camera and geolocation integration for delivery verification",
      "Created web admin dashboard with React/Vite for route and fleet management",
      "Implemented real-time delivery tracking with Supabase real-time subscriptions",
    ],
    architectureNotes:
      "Multi-platform architecture with shared API. Offline-first mobile design with local-first data sync. Figma-driven design system for consistent UI across web and mobile.",
    image: "/projects/audel.png",
    featured: true,
  },
  {
    slug: "walletweaver",
    title: "WalletWeaver",
    tagline:
      "Real-time blockchain monitoring platform for wallet clustering and trade intelligence",
    description:
      "WalletWeaver clusters wallets by funding patterns and cabals, tracks buy/sell activities with PnL insights, and delivers customizable alerts across multiple chains. Built for traders, analysts, and institutions.",
    problem:
      "Fragmented blockchain data makes it nearly impossible for traders and analysts to identify wallet relationships, track funding patterns, and monitor on-chain activity in real time across multiple chains.",
    role: "Software Architect & Full-Stack Engineer",
    duration: "2024 — Present",
    stack: [
      "TypeScript",
      "Next.js",
      "Web3.js",
      "Python",
      "Pulumi",
      "AWS",
      "Cognito",
      "PostgreSQL",
      "ECS",
      "Lambda",
      "Helius RPC",
    ],
    domain: "Web3",
    highlights: [
      "Designed full-stack system architecture with TypeScript/Next.js frontend and Python backend services",
      "Implemented transaction history, address book, and seamless RPC switching using Helius for Solana indexing",
      "Provisioned infrastructure via Pulumi with AWS Cognito auth, PostgreSQL persistence, ECS/S3/Lambda deployment",
      "Built background job orchestration, webhook notifications, and monitoring pipelines",
    ],
    architectureNotes:
      "Event-driven architecture with background job orchestration. Multi-chain data ingestion through RPC providers, with webhook-based alerting and real-time monitoring pipelines.",
    image: "/projects/walletweaver-logo.svg",
    liveUrl: "https://www.walletweaver.com",
    featured: false,
    relatedBlog: "building-blockchain-intelligence-walletweaver",
  },
  {
    slug: "bitcoin-india-conference",
    title: "Bitcoin India Conference Platform",
    tagline:
      "High-scale event platform handling 200K+ signups per minute for India's largest Bitcoin conference",
    description:
      "Architected the registration and authentication platform for the Bitcoin India Conference 2026 — 50,000+ global attendees, 150+ international speakers, 200+ partners.",
    problem:
      "The original Vercel + Supabase stack couldn't handle the spike of 200K+ signups per minute during the initial announcement. Needed a migration to a more resilient architecture without losing existing data.",
    role: "Solutions Architect",
    duration: "2024 — Present",
    stack: [
      "React",
      "Vite",
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
    domain: "Web3",
    highlights: [
      "Migrated from Vercel + Supabase to a hybrid AWS + Supabase stack for high throughput",
      "Implemented distributed OTP services using Lambda, API Gateway, Redis, SQS, and SES",
      "Built observability stack with CloudWatch and Grafana",
      "Integrated Cloudflare Turnstile CAPTCHA for bot protection with linear scalability",
    ],
    architectureNotes:
      "Hybrid architecture retaining Supabase for verified user persistence and analytics, with AWS handling the high-throughput OTP and registration flow. Queue-based processing with SQS for reliable delivery.",
    featured: false,
    relatedCaseStudy: "high-scale-registration",
    relatedBlog: "scaling-200k-signups-per-minute",
  },
  {
    slug: "cryptowala-exchange",
    title: "CryptoWala Exchange",
    tagline:
      "Compliant P2P crypto-fiat exchange for USDT to INR conversion in India",
    description:
      "An on-ramp/off-ramp P2P exchange enabling seamless USDT (TRC20) to INR conversion with custodial wallets, tiered KYC, and full regulatory compliance.",
    problem:
      "Indian users needed a compliant way to convert between crypto (USDT) and INR with proper KYC, custody, and travel rule compliance — all in a seamless mobile and web experience.",
    role: "Software Architect & Lead Engineer",
    duration: "2023 — Present",
    stack: [
      "Flutter",
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "MySQL",
      "BitGo",
      "Signzy",
      "TRM Labs",
      "Shyft Network",
    ],
    domain: "Web3",
    highlights: [
      "Built mobile apps in Flutter (Android & iOS) and Admin Panel in React (Next.js)",
      "Backend powered by Node.js/Express with MySQL across multi-environment setups",
      "Integrated BitGo (custody), Signzy (KYC), TRM Labs (KYT), Shyft Network (Travel Rule), SprintNXT (UPI/IMPS)",
      "Implemented audit-grade transaction logs, tiered KYC, MFA, and automated wallet/bank whitelisting",
    ],
    architectureNotes:
      "Multi-service architecture with dedicated custody, compliance, and payment rail integrations. Audit-grade logging and tiered identity verification for regulatory compliance.",
    featured: false,
    relatedCaseStudy: "p2p-exchange-architecture",
    relatedBlog: "p2p-exchange-compliance-architecture",
  },
  {
    slug: "ai-documentation-search",
    title: "GenAI Documentation Search",
    tagline:
      "Intelligent document search system using RAG pipelines for enterprise knowledge",
    description:
      "A Generative AI-powered documentation search system enabling intelligent, context-aware querying across technical documents at Vanderlande.",
    problem:
      "Engineers needed fast, context-aware access to vast technical documentation. Traditional keyword search was insufficient for understanding complex technical queries.",
    role: "Architect / Specialist Software Engineering",
    company: "Vanderlande",
    duration: "2023 — Present",
    stack: [
      "Java",
      "Spring Boot",
      "Azure Functions",
      "Databricks",
      "Unity Catalog",
      "RAG",
      "Microsoft AI Services",
    ],
    domain: "AI",
    highlights: [
      "Designed RAG pipeline architecture for document ingestion, vectorization, and semantic search",
      "Built backend services in Java for secure document processing",
      "Integrated Azure Functions with Unity Catalog for secure data access",
      "Automated infrastructure via Bicep for reproducible deployments",
    ],
    featured: false,
    relatedCaseStudy: "rag-documentation-search",
    relatedBlog: "rag-pipeline-design-enterprise",
  },
  {
    slug: "keycloak-migration",
    title: "Keycloak IAM Migration",
    tagline:
      "Enterprise identity platform migration from Keycloak v16 to v22 on Azure",
    description:
      "Led the migration of the identity and access management platform from Keycloak v16 to v22, containerized on Azure App Service with MSSQL backend.",
    problem:
      "Legacy Keycloak v16 deployment lacked modern security features, container support, and observability. Needed a zero-downtime migration path.",
    role: "Architect / Specialist Software Engineering",
    company: "Vanderlande",
    duration: "2023 — 2024",
    stack: [
      "Keycloak",
      "Azure App Service",
      "Docker",
      "MSSQL",
      "Application Insights",
      "Bicep",
    ],
    domain: "Cloud",
    highlights: [
      "Migrated Keycloak v16 to v22 with containerized MSSQL backend on Azure App Service (Linux)",
      "Integrated Application Insights for observability",
      "Automated infrastructure provisioning with Bicep templates",
    ],
    featured: false,
    relatedCaseStudy: "keycloak-identity-migration",
    relatedBlog: "keycloak-migration-zero-downtime",
  },
  {
    slug: "encryption-suite",
    title: "Enterprise Encryption Suite",
    tagline: "BYOK encryption platform serving 5 enterprise clients",
    description:
      "An encryption suite with UI/SDK supporting Bring Your Own Key (BYOK) and key management, deployed across 5 enterprise clients at JPMorgan Chase.",
    problem:
      "Enterprise clients required customizable encryption with their own key management — standard solutions didn't offer the flexibility needed for PCI compliance.",
    role: "Sr. Full Stack Software Developer",
    company: "Tavisca / JPMorgan Chase & Co",
    duration: "2019 — 2021",
    stack: [".NET", "Angular", "Kubernetes", "PCI", "BYOK", "Key Management"],
    domain: "Banking",
    highlights: [
      "Developed encryption suite with UI/SDK for BYOK and key management",
      "Deployed across 5 enterprise clients with PCI compliance",
      "Created PCI UI as a standalone product",
      "Migrated Monotone to Nextgen-Monotone on Kubernetes",
    ],
    featured: false,
  },
];
