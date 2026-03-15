"use client";

import type { IconType } from "react-icons";
import {
  SiSharp,
  SiJavascript,
  SiTypescript,
  SiRust,
  SiSolidity,
  SiPython,
  SiDotnet,
  SiSpringboot,
  SiNodedotjs,
  SiExpress,
  SiGraphql,
  SiDocker,
  SiKubernetes,
  SiHelm,
  SiTerraform,
  SiPulumi,
  SiGooglecloud,
  SiJenkins,
  SiArgo,
  SiSonar,
  SiDatabricks,
  SiRedis,
  SiApachecassandra,
  SiPostgresql,
  SiSolana,
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiFlutter,
  SiTailwindcss,
  SiApachekafka,
  SiRabbitmq,
} from "react-icons/si";
import { FaAws, FaMicrosoft } from "react-icons/fa6";
import { DiJava, DiDatabase } from "react-icons/di";
import {
  TbSql,
  TbBrain,
  TbRobot,
  TbLink,
  TbShieldLock,
  TbApi,
  TbCurrencyEthereum,
  TbCube,
  TbSettings,
  TbServer,
  TbCode,
} from "react-icons/tb";

const iconMap: Record<string, IconType> = {
  // Languages
  "C#": SiSharp,
  Java: DiJava,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Rust: SiRust,
  Solidity: SiSolidity,
  Python: SiPython,
  SQL: TbSql,

  // Backend & Frameworks
  ".NET 8": SiDotnet,
  "Spring Boot": SiSpringboot,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  "GraphQL (HotChocolate)": SiGraphql,
  MediatR: TbSettings,
  DDD: TbCube,
  Microservices: TbServer,

  // Cloud & Infrastructure
  Azure: FaMicrosoft,
  AWS: FaAws,
  GCP: SiGooglecloud,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  Helm: SiHelm,
  EKS: FaAws,
  Bicep: FaMicrosoft,
  Terraform: SiTerraform,
  Pulumi: SiPulumi,

  // DevOps & Tooling
  "Azure DevOps": FaMicrosoft,
  Jenkins: SiJenkins,
  ArgoCD: SiArgo,
  Spinnaker: TbSettings,
  "CI/CD": TbSettings,
  SonarQube: SiSonar,
  Veracode: TbShieldLock,
  Checkmarx: TbShieldLock,
  Trivy: TbShieldLock,

  // Data & AI
  Databricks: SiDatabricks,
  "Unity Catalog": DiDatabase,
  "RAG Pipelines": TbBrain,
  "Microsoft AI Services": TbRobot,
  "Agentic AI": TbRobot,
  CosmosDB: DiDatabase,
  DynamoDB: DiDatabase,
  Redis: SiRedis,
  Cassandra: SiApachecassandra,
  PostgreSQL: SiPostgresql,

  // Web3 & Blockchain
  "Rust (Anchor)": SiRust,
  Solana: SiSolana,
  EVM: TbCurrencyEthereum,
  "Web3.js": TbCurrencyEthereum,
  HardHat: TbCurrencyEthereum,
  Truffle: TbCurrencyEthereum,
  "Smart Contracts": TbLink,
  DLT: TbLink,
  Tokenization: TbLink,

  // Frontend & Mobile
  React: SiReact,
  "Next.js": SiNextdotjs,
  Angular: SiAngular,
  Flutter: SiFlutter,
  "Tailwind CSS": SiTailwindcss,

  // Messaging & Integration
  Kafka: SiApachekafka,
  RabbitMQ: SiRabbitmq,
  "Azure Service Bus": FaMicrosoft,
  "Pub/Sub": SiGooglecloud,
  SQS: FaAws,
  gRPC: TbApi,
  Dapr: TbCode,
  APIM: TbApi,
};

export function TechIcon({ name }: { name: string }) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon className="size-3.5 shrink-0 text-muted-foreground/60" />;
}
