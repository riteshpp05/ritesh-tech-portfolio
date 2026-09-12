import type { ArchitectureTreeNode } from '../types/projectTypes';

export const projectArchitectureTrees: Record<string, ArchitectureTreeNode> = {
  mdr: {
    name: 'Master Data Repository & Governance System (SAP BTP)',
    badge: 'System Root',
    description: 'Enterprise master data management and multi-entity syndication platform',
    children: [
      {
        name: 'Client & Ingestion Layer',
        badge: 'Presentation',
        description: 'Multi-channel data ingestion and user interaction',
        children: [
          {
            name: 'SAP Fiori / UI5 Web Portal',
            badge: 'UI Application',
            description: 'Standardized enterprise portal for record creation, editing, and approval task execution',
          },
          {
            name: 'Bulk Excel Ingestion Engine',
            badge: 'Batch Processing',
            description: 'Streamed spreadsheet upload, schema validation, and row-level error reporting',
          },
          {
            name: 'OData V4 Gateway Endpoints',
            badge: 'REST API',
            description: 'Type-safe protocol endpoints for external consumer queries and integrations',
          },
        ],
      },
      {
        name: 'Security & Access Perimeter',
        badge: 'Zero Trust',
        description: 'Identity propagation and role-based access control',
        children: [
          {
            name: 'SAP AppRouter Reverse Proxy',
            badge: 'API Gateway',
            description: 'Perimeter gateway handling routing, session cookies, and CSRF protection',
          },
          {
            name: 'SAP XSUAA Service',
            badge: 'Authentication',
            description: 'OAuth2/JWT token exchange, tenant isolation, and granular RBAC evaluation',
          },
        ],
      },
      {
        name: 'Core Governance Services (SAP CAP / Node.js)',
        badge: 'Business Engine',
        description: 'Metadata-driven microservices running on Cloud Foundry runtime',
        children: [
          {
            name: 'Runtime Metadata Resolver',
            badge: 'Dynamic Config',
            description: 'Loads entity schemas, field rules, and display behaviors at runtime without redeployment',
          },
          {
            name: 'Dynamic CDS Query Generator',
            badge: 'Query Engine',
            description: 'Constructs dynamic CDS/SQL statements for custom entity types on the fly',
          },
          {
            name: 'Configurable Validation Engine',
            badge: 'Rule Engine',
            description: 'Evaluates required fields, regular expressions, referential integrity, and business logic',
          },
          {
            name: 'Tri-Algorithm Duplicate Detection',
            badge: 'Fuzzy Matching',
            description: 'Composite matching score: Levenshtein (typos) + Sørensen-Dice (word order) + Soundex (phonetics)',
          },
          {
            name: 'Draft State & Version Management',
            badge: 'Lifecycle',
            description: 'Isolated draft tables enabling staging and review before committing to golden records',
          },
        ],
      },
      {
        name: 'Process Orchestration & Workflow',
        badge: 'Governance',
        description: 'Automated multi-stage approval workflows and compliance audit',
        children: [
          {
            name: 'SAP Build Process Automation',
            badge: 'Workflow Service',
            description: 'Configurable multi-level approval matrices, escalation rules, and status sync',
          },
          {
            name: 'Audit Trail & Lineage Logger',
            badge: 'Compliance',
            description: 'Immutable change tracking with user identity, timestamp, and field-level diffs',
          },
        ],
      },
      {
        name: 'Persistence & Downstream Syndication',
        badge: 'Data & ERP',
        description: 'Relational data store and enterprise ERP integration',
        children: [
          {
            name: 'SAP HANA Cloud',
            badge: 'Columnar Database',
            description: 'In-memory relational storage with Core Data Services (CDS) entity modeling',
          },
          {
            name: 'S/4HANA Syndication Pipeline',
            badge: 'ERP Integration',
            description: 'Replication of validated, approved golden master records into downstream SAP S/4HANA',
          },
        ],
      },
    ],
  },

  'ceo-tower': {
    name: 'CEO-Tower Executive Intelligence Platform',
    badge: 'System Root',
    description: 'Local LLM-driven conversational financial intelligence platform',
    children: [
      {
        name: 'Presentation & Interaction Layer',
        badge: 'Frontend',
        description: 'Real-time conversational executive cockpit',
        children: [
          {
            name: 'React + TypeScript Web UI',
            badge: 'SPA',
            description: 'Modern executive interface with conversational prompt view and financial KPI widgets',
          },
          {
            name: 'Server-Sent Events (SSE) Streamer',
            badge: 'Streaming',
            description: 'Consumes real-time token stream from backend for instant latency-free feedback',
          },
        ],
      },
      {
        name: 'API & Orchestration Layer (FastAPI)',
        badge: 'Backend',
        description: 'Asynchronous service layer handling context and routing',
        children: [
          {
            name: 'FastAPI Async Server',
            badge: 'REST Engine',
            description: 'High-throughput async Python service handling query processing and SSE generation',
          },
          {
            name: 'Sliding Context Window & Summarizer',
            badge: 'Memory Mgmt',
            description: 'Rolling context maintainer that compresses older conversation turns into summaries',
          },
          {
            name: 'Prompt Construction & Guardrails',
            badge: 'Prompt Engine',
            description: 'Assembles retrieved financial figures, system constraints, and conversation history',
          },
        ],
      },
      {
        name: 'Local AI & Retrieval-Augmented Generation (RAG)',
        badge: 'Intelligence Layer',
        description: 'Privacy-preserving on-premise local inference pipeline',
        children: [
          {
            name: 'Llama.cpp Runtime (Quantized GGUF)',
            badge: 'Local LLM',
            description: 'Local model execution keeping sensitive corporate financial records strictly on-premise',
          },
          {
            name: 'Financial Document Parser & Chunker',
            badge: 'Data Prep',
            description: 'Segments financial statements, invoices, and ledger tables into structured semantic chunks',
          },
          {
            name: 'Vector Search & Similarity Ranker',
            badge: 'Vector Index',
            description: 'Retrieves relevant financial context based on semantic distance to the user prompt',
          },
        ],
      },
      {
        name: 'Data Sources & Persistence',
        badge: 'Data Layer',
        description: 'ERP financial integration and state persistence',
        children: [
          {
            name: 'Zoho Books REST APIs',
            badge: 'External API',
            description: 'Live sync of invoices, expenses, accounts, and financial reports with TTL caching',
          },
          {
            name: 'Supabase / PostgreSQL',
            badge: 'Database',
            description: 'Relational storage for conversation memory, user sessions, and audit history',
          },
        ],
      },
    ],
  },

  'industrial-object-detection': {
    name: 'Industrial Object Detection & Defect Inspection System',
    badge: 'System Root',
    description: 'Edge computer vision quality control system with cloud training pipeline',
    children: [
      {
        name: 'Cloud Model Engineering (AWS)',
        badge: 'Training Pipeline',
        description: 'Cloud training, evaluation, and edge conversion pipeline',
        children: [
          {
            name: 'Defect Dataset & Label Repository',
            badge: 'Dataset',
            description: 'Annotated high-resolution imagery of industrial product surface anomalies',
          },
          {
            name: 'AWS SageMaker GPU Training Jobs',
            badge: 'Cloud Compute',
            description: 'Distributed training of YOLO architecture with automated experiment tracking',
          },
          {
            name: 'Model Benchmark & Metric Evaluation',
            badge: 'Validation',
            description: 'Precision, recall, and mAP evaluation across defect severity classes',
          },
          {
            name: 'TensorFlow Lite INT8 Quantizer',
            badge: 'Model Optimization',
            description: 'Post-training quantization reducing model size for smooth execution on mobile chipsets',
          },
        ],
      },
      {
        name: 'Edge Inspection Application (Android)',
        badge: 'Edge Runtime',
        description: 'Completely offline on-device inference for factory floor workers',
        children: [
          {
            name: 'Camera Frame Stream & Capture',
            badge: 'Sensor Input',
            description: 'High-speed camera video stream capture with resolution stabilization',
          },
          {
            name: 'Frame Preprocessing Pipeline',
            badge: 'Computer Vision',
            description: 'Frame resize, color channel normalization, and tensor conversion',
          },
          {
            name: 'TFLite Runtime + GPU Delegate',
            badge: 'Edge Inference',
            description: 'Hardware-accelerated neural network inference executing on mobile GPU/NPU',
          },
          {
            name: 'Non-Maximum Suppression (NMS) Engine',
            badge: 'Post-Processing',
            description: 'Eliminates overlapping redundant candidate bounding boxes based on IoU thresholds',
          },
          {
            name: 'Real-Time Canvas Detection Overlay',
            badge: 'UI Visualization',
            description: 'Overlays bounding boxes, defect classifications, and confidence scores onto live preview',
          },
          {
            name: 'Local SQLite Defect Logger',
            badge: 'Offline Storage',
            description: 'Logs defect timestamps, defect counts, and inspection batches locally without internet',
          },
        ],
      },
    ],
  },

  'multimodal-rag': {
    name: 'Multimodal Document Intelligence RAG System',
    badge: 'System Root',
    description: 'Locally hosted retrieval-augmented generation for mixed text and image documents',
    children: [
      {
        name: 'Document & Image Ingestion Pipeline',
        badge: 'Ingestion Layer',
        description: 'Multi-format extraction for PDFs, scans, and diagram images',
        children: [
          {
            name: 'Format Detection & Routing Engine',
            badge: 'Router',
            description: 'Identifies file types and directs to PDF parser or OCR engine accordingly',
          },
          {
            name: 'Native PDF Text Parser',
            badge: 'Parser',
            description: 'Extracts formatted text blocks and hierarchical headings from digital PDFs',
          },
          {
            name: 'OCR Optical Character Recognition',
            badge: 'Vision Engine',
            description: 'Extracts embedded textual data from scanned pages and photo attachments',
          },
          {
            name: 'Semantic Content Chunker',
            badge: 'Text Segmentation',
            description: 'Divides documents into semantically coherent chunks with overlap preservation',
          },
        ],
      },
      {
        name: 'Vector Representation & Semantic Search',
        badge: 'Vector Engine',
        description: 'Local embeddings and vector similarity indexing',
        children: [
          {
            name: 'Nomic Embedding Models',
            badge: 'Local Embedder',
            description: 'Produces high-dimensional dense vector embeddings without external API requests',
          },
          {
            name: 'FAISS Vector Database',
            badge: 'Vector Index',
            description: 'Self-hosted approximate nearest neighbor search index for sub-millisecond retrieval',
          },
          {
            name: 'Relevance Score & Confidence Gate',
            badge: 'Relevance Filter',
            description: 'Filters out low-similarity chunks to prevent LLM hallucinations',
          },
        ],
      },
      {
        name: 'Reasoning & Orchestration (LangGraph)',
        badge: 'Orchestration',
        description: 'Stateful directed graph pipeline managing context and retrieval',
        children: [
          {
            name: 'LangGraph State Graph Controller',
            badge: 'State Machine',
            description: 'Coordinates conditional query rewriting, retrieval loops, and prompt assembly',
          },
          {
            name: 'Ollama Runtime (Llama 2 7B)',
            badge: 'Local LLM',
            description: 'Local open-weights language model generating grounded responses from retrieved context',
          },
        ],
      },
      {
        name: 'Session Memory & Storage',
        badge: 'Persistence',
        description: 'Zero-configuration local database',
        children: [
          {
            name: 'SQLite Database',
            badge: 'Local DB',
            description: 'Stores conversational turn history and user session parameters',
          },
        ],
      },
    ],
  },

  'medical-chatbot': {
    name: 'Medical Knowledge Grounded QA Platform',
    badge: 'System Root',
    description: 'Evidence-based clinical retrieval-augmented generation with verifiable citations',
    children: [
      {
        name: 'Clinical Knowledge Ingestion Pipeline',
        badge: 'Ingestion Layer',
        description: 'Processes authoritative medical textbooks and clinical references',
        children: [
          {
            name: 'Verified Medical Knowledge Base',
            badge: 'Source Data',
            description: 'Comprehensive medical references, pharmacology databases, and clinical guidelines',
          },
          {
            name: 'Domain-Aware Semantic Chunker',
            badge: 'Preprocessing',
            description: 'Preserves critical clinical boundaries, contraindication notices, and section metadata',
          },
          {
            name: 'Sentence Transformers (all-MiniLM-L6-v2)',
            badge: 'Embeddings',
            description: 'High-accuracy dense embeddings tailored for clinical passage retrieval',
          },
          {
            name: 'Pinecone Managed Vector Database',
            badge: 'Vector Store',
            description: 'Production vector index supporting metadata filtering and fast top-k similarity search',
          },
        ],
      },
      {
        name: 'Query Processing & Citation Engine',
        badge: 'Inference Layer',
        description: 'Clinical question answering grounded strictly in verified passages',
        children: [
          {
            name: 'Clinical Query Normalizer',
            badge: 'Query Engine',
            description: 'Embeds user queries and resolves clinical synonyms before retrieval',
          },
          {
            name: 'Pinecone Top-K Passage Retrieval',
            badge: 'Similarity Search',
            description: 'Fetches the most relevant clinical source passages with associated metadata',
          },
          {
            name: 'LangChain Prompt Assembler & Guardrails',
            badge: 'Orchestrator',
            description: 'Constructs strict grounding prompt enforcing mandatory inline citation tags',
          },
          {
            name: 'OpenAI GPT-4 Reasoning Engine',
            badge: 'LLM Synthesis',
            description: 'Produces accurate clinical synthesis strictly grounded in the retrieved excerpts',
          },
        ],
      },
      {
        name: 'Production Cloud Infrastructure',
        badge: 'Infrastructure',
        description: 'Reliable, reproducible cloud hosting environment',
        children: [
          {
            name: 'Dockerized Application Image',
            badge: 'Containerization',
            description: 'Packages service dependencies, runtime, and configurations reproducibly',
          },
          {
            name: 'AWS EC2 Production Instances',
            badge: 'Cloud Host',
            description: 'Dedicated cloud computing instances with automated monitoring',
          },
          {
            name: 'Automated CI/CD Deployment Pipeline',
            badge: 'Automation',
            description: 'Automated test suite execution and continuous deployment upon code merge',
          },
        ],
      },
    ],
  },

  'virtual-kiosk': {
    name: 'Virtual Kiosk Offline-First Learning Platform',
    badge: 'System Root',
    description: 'Completely offline learning system distributed as a single standalone executable',
    children: [
      {
        name: 'Standalone Binary Distribution',
        badge: 'Packaging',
        description: 'Single-file distribution requiring zero prerequisite installations',
        children: [
          {
            name: 'pkg Binary Packaging Engine',
            badge: 'Compiler',
            description: 'Compiles Node.js runtime, Express backend, Angular SPA, and assets into an executable',
          },
          {
            name: 'Zero-Install Portable Binary (.exe)',
            badge: 'Executable',
            description: 'Double-click portable launch on rural school PCs without Node.js or admin privileges',
          },
        ],
      },
      {
        name: 'Local Application Server',
        badge: 'Local Backend',
        description: 'Internal server operating exclusively on localhost',
        children: [
          {
            name: 'Express.js HTTP Server',
            badge: 'Web Server',
            description: 'Serves Angular client code and handles internal content API requests on localhost',
          },
          {
            name: 'Local Media & Asset Streamer',
            badge: 'Content Server',
            description: 'Streams educational videos, PDFs, and interactive exercises from local disk',
          },
        ],
      },
      {
        name: 'Configurable Course Engine',
        badge: 'Routing Layer',
        description: 'Dynamic content structure editable without rebuilding code',
        children: [
          {
            name: 'JSON Route Registry',
            badge: 'Configuration',
            description: 'Human-readable JSON files defining learning modules, prerequisites, and lesson paths',
          },
          {
            name: 'External Content Hot-Swap Loader',
            badge: 'Content Loader',
            description: 'Enables educators to add new lessons by copying folders onto disk without recompilation',
          },
        ],
      },
      {
        name: 'Client Presentation Layer',
        badge: 'Frontend',
        description: 'Responsive, accessible learning interface',
        children: [
          {
            name: 'Angular Framework Frontend',
            badge: 'Client SPA',
            description: 'Modular component architecture with interactive navigation and state management',
          },
          {
            name: 'Adaptive Display Layouts',
            badge: 'Responsive UI',
            description: 'Fluid layout adjusting seamlessly across small touch kiosks to large desktop monitors',
          },
        ],
      },
    ],
  },
};
