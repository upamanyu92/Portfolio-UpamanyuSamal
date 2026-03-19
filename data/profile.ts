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
}

export const profileData = {
  name: "Upamanyu Samal",
  title: "Software Architect | Technical Lead | Cloud Solution Architect",
  email: "upamanyu.samal@email.com",
  linkedin: "https://linkedin.com/in/upamanyu-samal",
  github: "https://github.com/upamanyu92",
  location: "India",
  summary:
    "Software Architect and Technical Lead with 9+ years of experience designing and building large-scale distributed systems, cloud-native architectures, and AI-powered pipelines. Currently driving enterprise-scale transformation at Thomson Reuters, processing 40M+ legal documents with cutting-edge cloud and ML technologies.",
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
      "Led architecture of large-scale content processing systems handling 40M+ legal documents",
      "Migrated 40+ years of legacy legal data with zero downtime using modern ETL pipelines",
      "Built AI-driven content pipelines that reduced processing latency by 60%",
      "Reduced system rework by 80% through architectural improvements and best practices",
      "Designed AWS-native microservices with Lambda, ECS, DynamoDB, and SQS",
      "Mentored and led cross-functional engineering teams across multiple time zones",
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
      "Designed and built enterprise microservices for legal content platforms",
      "Implemented distributed caching strategies improving API response times by 40%",
      "Led cross-functional teams across 3 continents for large-scale feature delivery",
      "Contributed to system design reviews and architecture decisions",
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
      "Full-stack development with Java Spring Boot and React",
      "Database optimization and query performance tuning reducing load by 50%",
      "CI/CD pipeline implementation using Jenkins and AWS CodePipeline",
      "Participated in migration of monolithic services to microservices architecture",
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
      "Foundational software engineering experience building enterprise applications",
      "Built and maintained Java-based backend services for banking clients",
      "Worked on frontend development with JavaScript and AngularJS",
      "Collaborated in agile teams to deliver high-quality software products",
    ],
    technologies: ["Java", "AngularJS", "Oracle DB", "Spring MVC", "Maven"],
  },
];

export const projects: Project[] = [
  {
    id: "content-processing",
    title: "Content Processing System",
    description: "Enterprise-scale AWS AI pipeline processing 40M+ legal documents",
    longDescription:
      "A cloud-native, event-driven content processing platform built on AWS that ingests, transforms, enriches, and indexes 40M+ legal documents. The system uses serverless compute with Lambda and containerized workloads on ECS, orchestrated through SQS and SNS message queues. AI/ML enrichment provides intelligent tagging, classification, and semantic search capabilities via Elasticsearch.",
    architecture: "Lambda → SQS → ECS Workers → DynamoDB + Elasticsearch",
    technologies: ["AWS Lambda", "ECS", "SQS", "DynamoDB", "Python", "FastAPI", "Elasticsearch", "Docker"],
    impact: ["40M+ documents processed", "99.9% uptime SLA", "60% faster processing vs legacy", "80% cost reduction"],
    category: "Cloud Architecture",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    id: "athens-migration",
    title: "Athens Data Migration",
    description: "Migration of 40+ years of legal data to modern cloud systems",
    longDescription:
      "A massive-scale ETL migration project that moved over 40 years of legal content, metadata, and relationships from legacy on-premise systems to a modern cloud-native data platform. The migration used a sophisticated pipeline with validation, transformation, deduplication, and verification stages to ensure zero data loss.",
    architecture: "Source → AWS Glue ETL → Validation → DynamoDB/RDS → Verification",
    technologies: ["Python", "AWS Glue", "DynamoDB", "RDS", "CloudFormation", "Step Functions", "S3"],
    impact: ["40+ years of data migrated", "Zero data loss", "Zero downtime migration", "2x query performance"],
    category: "Data Engineering",
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    id: "multimedia-repo",
    title: "Multimedia Repository Platform",
    description: "Enterprise media management platform with AI-powered tagging",
    longDescription:
      "A comprehensive digital asset management platform that centralizes over 500K media assets (images, videos, documents) with intelligent AI tagging and advanced search capabilities. Built with a microservices architecture using Java Spring Boot, the platform provides real-time event-driven processing for media ingestion and enrichment.",
    architecture: "API Gateway → Spring Boot Services → Kafka → S3 + Elasticsearch",
    technologies: ["Java", "Spring Boot", "AWS S3", "Elasticsearch", "React", "PostgreSQL", "Kafka"],
    impact: ["500K+ media assets centralized", "70% search improvement", "Real-time processing", "99.5% availability"],
    category: "Platform Engineering",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: "judicial-workbench",
    title: "Judicial Workbench Modernization",
    description: "Legacy judicial system transformation using strangler fig pattern",
    longDescription:
      "A comprehensive modernization effort transforming a 15-year-old monolithic judicial workbench application into a modern, scalable microservices-based platform. Using the Strangler Fig pattern, the legacy system was incrementally replaced with cloud-native services while maintaining 100% availability for production users.",
    architecture: "Legacy Monolith → Strangler Fig → Microservices → Cloud-Native",
    technologies: ["Java", "Spring Boot", "React", "AWS", "PostgreSQL", "Docker", "Kubernetes"],
    impact: ["80% rework reduction", "3x performance improvement", "Zero migration downtime", "60% less tech debt"],
    category: "System Modernization",
    gradient: "from-orange-500 to-red-600",
  },
  {
    id: "stocksense",
    title: "StockSense – AI Stock Prediction",
    description: "ML-powered stock market analysis and prediction platform",
    longDescription:
      "An intelligent stock market analysis platform that combines real-time financial data ingestion, technical indicator computation, and machine learning models to generate actionable trading signals. The system processes market data streams in real-time, applying LSTM and transformer-based models for price prediction and sentiment analysis on financial news.",
    architecture: "Market Data → Kafka → ML Inference (TensorFlow) → Redis → Dashboard",
    technologies: ["Python", "TensorFlow", "FastAPI", "Redis", "PostgreSQL", "React", "Kafka"],
    impact: ["73% prediction accuracy", "Real-time analysis", "Sub-second latency", "Support for 500+ stocks"],
    category: "AI/ML",
    gradient: "from-yellow-500 to-orange-600",
  },
  {
    id: "ai-agent",
    title: "AI Human Interaction Agent",
    description: "Intelligent conversational agent for enterprise automation",
    longDescription:
      "An advanced conversational AI system built on RAG (Retrieval-Augmented Generation) architecture that enables natural language interaction with enterprise knowledge bases and workflows. The agent uses LangChain for orchestration, OpenAI's GPT models for reasoning, Pinecone for vector similarity search, and a custom API gateway for enterprise system integrations.",
    architecture: "User → FastAPI Gateway → LangChain → OpenAI GPT + Pinecone → Enterprise APIs",
    technologies: ["Python", "LangChain", "OpenAI", "Pinecone", "FastAPI", "React", "PostgreSQL"],
    impact: ["40% reduction in manual processes", "95% user satisfaction", "24/7 availability", "10K+ queries/day"],
    category: "AI/ML",
    gradient: "from-pink-500 to-rose-600",
  },
];

export const chatbotQA = [
  {
    question: "Tell me about yourself",
    answer:
      "I'm Upamanyu Samal, a Software Architect and Technical Lead with 9+ years of experience. I currently work at Thomson Reuters where I lead the architecture of large-scale content processing systems that handle 40M+ legal documents. I specialize in cloud-native architectures, AI/ML pipelines, and distributed systems.",
  },
  {
    question: "What are your skills?",
    answer:
      "My core skills span Cloud (AWS Lambda, ECS, DynamoDB), Backend (Python/FastAPI, Java/Spring Boot), AI/ML (LangChain, TensorFlow, Vector DBs), and Architecture (Microservices, Event-Driven, DDD). I'm proficient in Docker, Kubernetes, Kafka, Elasticsearch, and leading engineering teams.",
  },
  {
    question: "What projects have you built?",
    answer:
      "Key projects include: (1) Content Processing System – 40M+ document AI pipeline on AWS, (2) Athens Data Migration – 40+ years of legal data with zero downtime, (3) Multimedia Repository Platform – 500K+ assets with AI tagging, (4) Judicial Workbench Modernization – 80% rework reduction, (5) StockSense – 73% accuracy ML stock prediction, (6) AI Human Interaction Agent – RAG-based enterprise chatbot.",
  },
  {
    question: "How can I contact you?",
    answer:
      "You can reach me at upamanyu.samal@email.com, connect on LinkedIn at linkedin.com/in/upamanyu-samal, or check my code on GitHub at github.com/upamanyu92. Feel free to use the contact form on this page!",
  },
  {
    question: "Download resume",
    answer:
      "Sure! Click the button below to download my resume. You can also find the download button in the navigation bar at the top of the page.",
  },
];
