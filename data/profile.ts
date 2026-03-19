export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  title: string;
  color: string;
  skills: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  technologies: string[];
  current?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  architecture: string;
  technologies: string[];
  impact: string[];
  category: string;
  gradient: string;
  decisions: { choice: string; rationale: string }[];
}

export const profileData = {
  name: "Upamanyu Samal",
  title: "Strategic Builder · AI Systems · Cloud Architecture",
  email: "upamanyu.samal@email.com",
  linkedin: "https://linkedin.com/in/upamanyu-samal",
  github: "https://github.com/upamanyu92",
  location: "India",
  summary:
    "Strategic Builder and Technical Lead with 9+ years shipping production AI pipelines, cloud-native distributed systems, and agentic architectures. Currently owning end-to-end system design at Thomson Reuters — from Kafka ingestion through LLM enrichment to Grafana-monitored serving — processing 40M+ legal documents at 99.9% SLA.",
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Cloud & DevOps",
    color: "cyan",
    skills: [
      "AWS Lambda",
      "AWS ECS",
      "DynamoDB",
      "RDS",
      "CloudFormation",
      "Docker",
      "Kubernetes",
      "Jenkins",
      "Azure DevOps",
      "AWS CodePipeline",
      "Terraform",
      "S3",
    ],
  },
  {
    title: "Backend Systems",
    color: "purple",
    skills: [
      "Python",
      "FastAPI",
      "Java",
      "Spring Boot",
      "Hibernate",
      "Node.js",
      "REST APIs",
      "GraphQL",
      "Microservices",
      "gRPC",
    ],
  },
  {
    title: "AI & Data Engineering",
    color: "emerald",
    skills: [
      "ML Integration",
      "NLP",
      "Vector Databases",
      "Apache Kafka",
      "Elasticsearch",
      "Redis",
      "PostgreSQL",
      "LangChain",
      "OpenAI API",
      "Pinecone",
    ],
  },
  {
    title: "Architecture & Leadership",
    color: "orange",
    skills: [
      "System Design",
      "Distributed Systems",
      "Event-Driven Architecture",
      "Domain-Driven Design",
      "Team Leadership",
      "Technical Roadmap",
      "Agile / Scrum",
      "Code Reviews",
    ],
  },
];

export const experiences: Experience[] = [
  {
    id: "atl-tr",
    role: "Associate Technical Lead",
    company: "Thomson Reuters",
    period: "2022 – Present",
    location: "Hyderabad, India",
    current: true,
    description: [
      "Architected and deployed containerized content processing platform (FastAPI + Docker + ECS) processing 40M+ legal documents at 99.9% SLA",
      "Reduced AI pipeline latency by 60% by migrating batch Lambda jobs to streaming ECS workers backed by SQS",
      "Designed zero-downtime ETL migration of 40+ years of legacy legal data using AWS Glue and Step Functions",
      "Eliminated 80% of engineering rework through event-driven architecture patterns and domain-driven service boundaries",
      "Established Prometheus/Grafana observability stack enabling proactive SLA monitoring and on-call incident reduction",
      "Mentored and led cross-functional engineering teams across multiple time zones, driving 2× delivery throughput",
    ],
    technologies: ["AWS Lambda", "ECS", "DynamoDB", "Python", "FastAPI", "Elasticsearch", "Docker", "Kubernetes"],
  },
  {
    id: "sse-tr",
    role: "Senior Software Engineer",
    company: "Thomson Reuters",
    period: "2020 – 2022",
    location: "Hyderabad, India",
    description: [
      "Designed and deployed enterprise microservices for legal content platforms on AWS",
      "Implemented Redis distributed caching strategy reducing API p99 latency by 40%",
      "Led cross-functional delivery across 3 continents, coordinating feature releases with zero production incidents",
      "Contributed architectural decisions to system design reviews, accelerating migration from monolith",
    ],
    technologies: ["Java", "Spring Boot", "AWS", "Redis", "PostgreSQL", "React", "GraphQL"],
  },
  {
    id: "se-tr",
    role: "Software Engineer",
    company: "Thomson Reuters",
    period: "2018 – 2020",
    location: "Hyderabad, India",
    description: [
      "Full-stack development with Java Spring Boot and React powering legal workflow applications",
      "Database query optimization reducing read-heavy endpoint load by 50% through index tuning and materialized views",
      "Implemented CI/CD pipelines with Jenkins and AWS CodePipeline, cutting deployment cycle from days to hours",
      "Participated in Strangler Fig migration of monolithic legal workbench to microservices",
    ],
    technologies: ["Java", "Spring Boot", "React", "PostgreSQL", "Jenkins", "AWS"],
  },
  {
    id: "se-prev",
    role: "Software Engineer",
    company: "Infosys Limited",
    period: "2015 – 2018",
    location: "Bengaluru, India",
    description: [
      "Built and maintained Java-based backend services for banking clients serving 1M+ daily transactions",
      "Developed frontend interfaces with JavaScript and AngularJS for enterprise banking dashboards",
      "Introduced automated integration testing harness, reducing regression cycles by 30%",
      "Collaborated in agile teams using Scrum ceremonies and continuous delivery practices",
    ],
    technologies: ["Java", "AngularJS", "Oracle DB", "Spring MVC", "Maven"],
  },
];

export const projects: Project[] = [
  {
    id: "content-processing",
    title: "Content Processing System",
    description:
      "Deployed containerized FastAPI + Docker workers on ECS to process 40M+ legal documents — cutting pipeline latency 60% vs the prior Lambda-only batch approach.",
    longDescription:
      "I deployed a containerized event-driven content processing platform on AWS that ingests, transforms, enriches, and indexes 40M+ legal documents daily. The system exposes a FastAPI gateway fronting auto-scaling ECS Fargate workers coordinated through SQS FIFO queues. AI/ML enrichment layers apply NLP classification, entity extraction, and semantic embedding via Elasticsearch kNN. Prometheus metrics and Grafana dashboards provide real-time SLA visibility. I replaced the prior Lambda-only batch architecture with this streaming design after profiling showed cold-start overhead was responsible for 55% of end-to-end latency.",
    architecture: "API Gateway → SQS FIFO → ECS Fargate Workers → DynamoDB + Elasticsearch kNN",
    technologies: ["AWS Lambda", "ECS Fargate", "SQS FIFO", "DynamoDB", "Python", "FastAPI", "Elasticsearch", "Docker", "Prometheus", "Grafana"],
    impact: [
      "40M+ documents processed daily",
      "99.9% uptime SLA maintained",
      "60% latency reduction vs Lambda-batch",
      "80% infrastructure cost reduction",
    ],
    category: "Cloud Architecture",
    gradient: "from-cyan-500 to-blue-600",
    decisions: [
      {
        choice: "ECS Fargate over AWS Lambda for workers",
        rationale:
          "Lambda cold-starts added 800 ms+ per document at scale. ECS Fargate with warm containers eliminated this, reducing p99 latency from 4.2 s to 1.7 s. Lambda retained only for lightweight fan-out triggers.",
      },
      {
        choice: "SQS FIFO over Kinesis",
        rationale:
          "Legal documents require strict per-document ordering and exactly-once processing guarantees. SQS FIFO message groups provided this without the operational overhead of Kinesis shard management.",
      },
      {
        choice: "Elasticsearch kNN over Pinecone for semantic search",
        rationale:
          "The corpus already lived in Elasticsearch for full-text search. Adding kNN dense_vector fields avoided a second vector store, reducing infrastructure surface area and operational cost by ~40%.",
      },
    ],
  },
  {
    id: "athens-migration",
    title: "Athens Data Migration",
    description:
      "Designed and executed zero-downtime migration of 40+ years of legal content from on-premise legacy stores to AWS — achieving zero data loss across 500 M+ records.",
    longDescription:
      "I designed a multi-stage ETL pipeline using AWS Glue, Step Functions, and Python to migrate over 40 years of legal content, metadata, and relationship graphs from on-premise Oracle databases to a cloud-native data platform. The pipeline incorporated schema validation, deduplication, referential integrity checks, and cryptographic checksums at each stage. I implemented dual-write with live shadow reads to validate parity before cutover, enabling a fully zero-downtime production migration. Post-migration query performance doubled through DynamoDB single-table design and RDS query plan optimization.",
    architecture: "Oracle Source → AWS Glue ETL → Step Functions orchestration → DynamoDB / RDS → Verification layer",
    technologies: ["Python", "AWS Glue", "DynamoDB", "RDS", "CloudFormation", "Step Functions", "S3", "Apache Airflow"],
    impact: [
      "500M+ records migrated with zero data loss",
      "Zero downtime via dual-write cutover",
      "2× query performance post-migration",
      "40+ years of legal history preserved",
    ],
    category: "Data Engineering",
    gradient: "from-purple-500 to-indigo-600",
    decisions: [
      {
        choice: "AWS Glue over custom Spark on EMR",
        rationale:
          "Glue's serverless model eliminated cluster provisioning overhead. For a one-time migration the cost-to-ops ratio favored Glue; EMR would have required sustained cluster management for a ~6-week window.",
      },
      {
        choice: "Dual-write shadow mode over big-bang cutover",
        rationale:
          "Legal data carries regulatory retention requirements — any data loss would be a compliance violation. Dual-write with live read validation for 2 weeks before cutover allowed line-by-line parity verification with zero production risk.",
      },
      {
        choice: "DynamoDB single-table design over normalised RDS",
        rationale:
          "Document-retrieval access patterns were highly predictable (fetch by documentId + version). Single-table DynamoDB delivered sub-10 ms reads vs 45 ms for the equivalent RDS JOIN-heavy queries.",
      },
    ],
  },
  {
    id: "multimedia-repo",
    title: "Multimedia Repository Platform",
    description:
      "Built a containerised Java/Spring Boot microservices platform centralising 500K+ media assets with real-time Kafka ingestion and AI-powered tagging, achieving 70% search improvement.",
    longDescription:
      "I architected and deployed a digital asset management platform that centralises 500K+ media assets (images, videos, legal documents) through a microservices backend with Java Spring Boot. Real-time media ingestion flows through Apache Kafka topics into enrichment consumers that call computer-vision APIs for auto-tagging and OCR. Assets are stored in S3 with metadata indexed in Elasticsearch, providing sub-second faceted search. A React frontend with Infinite scroll handles the consumer-facing catalogue. The system replaced a single-node file server, improving search relevance by 70% and enabling 99.5% availability through multi-AZ deployment.",
    architecture: "API Gateway → Spring Boot Services → Kafka topics → S3 + Elasticsearch → React UI",
    technologies: ["Java", "Spring Boot", "AWS S3", "Elasticsearch", "React", "PostgreSQL", "Kafka", "Docker", "Kubernetes"],
    impact: [
      "500K+ media assets centralised",
      "70% search relevance improvement",
      "Real-time ingestion < 2 s end-to-end",
      "99.5% availability (multi-AZ)",
    ],
    category: "Platform Engineering",
    gradient: "from-emerald-500 to-teal-600",
    decisions: [
      {
        choice: "Kafka over AWS SNS/SQS for media events",
        rationale:
          "Media ingestion required replay capability for re-enrichment when AI tagging models were retrained. Kafka log retention provided this; SNS/SQS messages are deleted on consumption making replay impossible without additional storage.",
      },
      {
        choice: "Elasticsearch over OpenSearch / Solr",
        rationale:
          "Team already held deep Elasticsearch expertise from the content processing system. Reusing the same cluster reduced operational overhead and allowed shared index lifecycle management policies.",
      },
    ],
  },
  {
    id: "judicial-workbench",
    title: "Judicial Workbench Modernization",
    description:
      "Transformed a 15-year-old judicial monolith into cloud-native microservices using the Strangler Fig pattern — delivering 80% rework reduction and 3× throughput with zero migration downtime.",
    longDescription:
      "I led the end-to-end modernization of a mission-critical 15-year-old judicial workbench application used by legal professionals across multiple jurisdictions. Using the Strangler Fig pattern, I incrementally extracted bounded contexts (case management, document rendering, user authentication) as independent Spring Boot microservices behind an API gateway, while legacy Java EE code continued serving production traffic. Each extracted service was containerised with Docker, deployed on Kubernetes, and integrated into the CI/CD pipeline via Jenkins. The approach eliminated the risk of a big-bang rewrite while reducing technical debt by 60% over 18 months.",
    architecture: "Legacy Monolith → API Gateway proxy → Strangler Fig seams → Microservices on Kubernetes",
    technologies: ["Java", "Spring Boot", "React", "AWS", "PostgreSQL", "Docker", "Kubernetes", "Jenkins", "Terraform"],
    impact: [
      "80% engineering rework eliminated",
      "3× throughput improvement",
      "Zero migration downtime",
      "60% technical debt reduction",
    ],
    category: "System Modernization",
    gradient: "from-orange-500 to-red-600",
    decisions: [
      {
        choice: "Strangler Fig over big-bang rewrite",
        rationale:
          "A judicial system with 24/7 availability requirements and regulatory compliance obligations could not tolerate a multi-month freeze. Strangler Fig allowed incremental delivery of value while keeping production stable.",
      },
      {
        choice: "Kubernetes over ECS for service orchestration",
        rationale:
          "The organisation already had Kubernetes expertise and needed fine-grained control over pod scheduling, health checks, and rolling deployments. ECS would have required learning a new abstraction with less community tooling.",
      },
    ],
  },
  {
    id: "stocksense",
    title: "StockSense – AI Stock Prediction",
    description:
      "Shipped an end-to-end ML platform with Kafka ingestion, TensorFlow LSTM inference via FastAPI, Redis caching, and a React dashboard — achieving 73% directional accuracy on 500+ tickers.",
    longDescription:
      "I built and deployed StockSense as a full-stack ML platform demonstrating end-to-end pipeline ownership. Real-time market data is ingested via Kafka producers, consumed by Python workers that compute 30+ technical indicators, and fed into TensorFlow LSTM and Transformer models for next-day directional prediction. The FastAPI inference service serves predictions with Redis caching ensuring sub-100 ms API response times. I tracked all experiments in Weights & Biases, comparing LSTM vs Transformer architectures across 12 hyperparameter configurations before selecting the final ensemble. The React dashboard visualises signals with confidence intervals.",
    architecture: "Market Data → Kafka → Feature Engineering → TF Model (W&B tracked) → FastAPI + Redis → React Dashboard",
    technologies: ["Python", "TensorFlow", "FastAPI", "Redis", "PostgreSQL", "React", "Kafka", "Weights & Biases", "Docker"],
    impact: [
      "73% directional accuracy (validated OOS)",
      "Sub-100 ms API latency via Redis cache",
      "500+ tickers tracked in real-time",
      "12 model configs tracked in W&B",
    ],
    category: "AI/ML",
    gradient: "from-yellow-500 to-orange-600",
    decisions: [
      {
        choice: "LSTM + Transformer ensemble over pure Transformer",
        rationale:
          "W&B experiment logs showed the Transformer alone overfit on tickers with < 2 years of history. The LSTM captured local momentum patterns better on sparse data. Ensemble improved OOS accuracy by 4 percentage points.",
      },
      {
        choice: "Redis for prediction caching over in-memory",
        rationale:
          "Multiple dashboard clients poll the same ticker predictions. Redis shared cache avoids redundant model inference — cutting GPU compute cost by ~60% during market-hours peak load.",
      },
      {
        choice: "Weights & Biases over MLflow for experiment tracking",
        rationale:
          "W&B's hosted dashboard allowed sharing experiment results with collaborators without standing up an MLflow server. The built-in hyperparameter sweep UI accelerated comparison of 12 configs vs manual MLflow logging.",
      },
    ],
  },
  {
    id: "ai-agent",
    title: "AI Human Interaction Agent",
    description:
      "Deployed a production RAG pipeline (LangChain + OpenAI + Pinecone) behind a FastAPI gateway, handling 10K+ queries/day with < 2 s response time and 40% reduction in manual support load.",
    longDescription:
      "I designed and deployed a production RAG (Retrieval-Augmented Generation) conversational agent for enterprise knowledge-base interaction. The architecture uses LangChain for agent orchestration, OpenAI GPT-4 for reasoning, Pinecone for sub-50 ms vector similarity retrieval, and a FastAPI gateway with JWT authentication for enterprise integration. Document ingestion is automated through an Airflow DAG that chunks, embeds, and upserts into Pinecone on a scheduled cadence. I evaluated Pinecone vs pgvector before selecting Pinecone for its managed ANN index and superior recall@10 at production scale. The system processes 10K+ queries/day with p95 response time under 2 seconds.",
    architecture: "User → FastAPI (JWT auth) → LangChain agent → OpenAI GPT-4 + Pinecone → Enterprise APIs",
    technologies: ["Python", "LangChain", "OpenAI GPT-4", "Pinecone", "FastAPI", "React", "PostgreSQL", "Apache Airflow", "Docker"],
    impact: [
      "40% reduction in manual support load",
      "10K+ queries/day at p95 < 2 s",
      "95% user satisfaction score",
      "24/7 availability (containerised + auto-scale)",
    ],
    category: "Agentic AI",
    gradient: "from-pink-500 to-rose-600",
    decisions: [
      {
        choice: "Pinecone over pgvector for vector store",
        rationale:
          "pgvector recall@10 degraded to 82% at 2M+ vectors without HNSW tuning expertise. Pinecone's managed ANN index maintained 97% recall with zero operational tuning, justified by the production SLA requirement.",
      },
      {
        choice: "OpenAI GPT-4 over Llama-3 (self-hosted)",
        rationale:
          "Llama-3 70B on-premises required 4×A100 GPUs, adding $8K+/month in infrastructure. GPT-4 API at 10K queries/day cost ~$600/month. For the initial production deployment, managed API provided better TCO and reliability.",
      },
      {
        choice: "LangChain over a custom orchestration layer",
        rationale:
          "LangChain's tool-calling abstractions and community integrations accelerated MVP delivery by ~3 weeks. The tradeoff is framework lock-in, mitigated by keeping business logic in plain Python services that LangChain calls.",
      },
    ],
  },
];

export const chatbotQA = [
  {
    question: "Tell me about yourself",
    answer:
      "I'm Upamanyu Samal, a Strategic Builder and Technical Lead with 9+ years shipping production AI systems. At Thomson Reuters I own the full lifecycle — Kafka ingestion, LLM enrichment, FastAPI serving, and Grafana monitoring — for a platform processing 40M+ legal documents daily at 99.9% SLA.",
  },
  {
    question: "What are your skills?",
    answer:
      "Core skills: Cloud (AWS ECS/Lambda/DynamoDB), Backend (Python/FastAPI, Java/Spring Boot), AI/ML (LangChain, TensorFlow, OpenAI, Vector DBs), Data (Kafka, Elasticsearch, Airflow), and Architecture (Microservices, Event-Driven, DDD). I track experiments in Weights & Biases and monitor production systems with Prometheus/Grafana.",
  },
  {
    question: "What is your experience with time-series?",
    answer:
      "I built StockSense — an end-to-end time-series ML platform. I ingested real-time market data via Kafka, engineered 30+ technical indicators, and trained LSTM + Transformer ensembles using TensorFlow. All 12 model configurations were tracked in Weights & Biases. The final ensemble achieved 73% out-of-sample directional accuracy across 500+ tickers, served via FastAPI with Redis caching at sub-100 ms latency.",
  },
  {
    question: "How do you handle production failures?",
    answer:
      "I treat non-deterministic failures as first-class system requirements. My approach: (1) Instrument before you ship — Prometheus metrics and structured logging so anomalies surface before users notice. (2) Design for partial failure — circuit breakers, dead-letter queues, and idempotent retries mean one bad message never cascades. (3) Post-incident blameless review — I document root cause, detection gap, and architectural fix. For the content processing system, a Kafka consumer lag spike caused by a schema change taught me to add schema compatibility checks to CI, eliminating that failure class permanently.",
  },
  {
    question: "Tell me about your RAG / agentic AI work",
    answer:
      "I deployed a production RAG agent (LangChain + OpenAI GPT-4 + Pinecone) processing 10K+ queries/day at p95 < 2 s. Key decisions: chose Pinecone over pgvector because pgvector recall@10 dropped to 82% at 2M+ vectors without expert HNSW tuning; chose GPT-4 API over self-hosted Llama-3 based on TCO analysis ($600/month vs $8K+/month for 4×A100 GPUs). Document ingestion is automated via an Airflow DAG that chunks, embeds, and upserts on a scheduled cadence.",
  },
  {
    question: "What projects have you built?",
    answer:
      "Top projects: (1) Content Processing System — containerised FastAPI+ECS platform processing 40M+ legal docs, 60% latency cut vs Lambda-batch. (2) AI Human Interaction Agent — production RAG (LangChain+GPT-4+Pinecone), 10K queries/day. (3) Athens Data Migration — zero-downtime migration of 500M+ records using AWS Glue + dual-write. (4) StockSense — LSTM+Transformer ensemble, 73% accuracy, all experiments in Weights & Biases. (5) Judicial Workbench Modernization — Strangler Fig pattern, 80% rework reduction. (6) Multimedia Repository Platform — Kafka+Elasticsearch, 500K+ assets, 70% search improvement.",
  },
  {
    question: "How can I contact you?",
    answer:
      "Reach me at upamanyu.samal@email.com, connect on LinkedIn at linkedin.com/in/upamanyu-samal, or explore my code on GitHub at github.com/upamanyu92. The contact form on this page works too!",
  },
  {
    question: "Download resume",
    answer:
      "Sure! Click the button below to download my resume, or use the Download Resume button in the nav bar at the top.",
  },
];

