import { Project } from '../types/projectTypes';

export const projects: Project[] = [
  {
    id: 1,
    slug: 'mdr',
    title: 'Master Data Repository & Governance Platform',
    subtitle: 'Enterprise Master Data Management and Governance Platform built on SAP BTP.',
    role: 'AI Engineer / Full-Stack Developer',
    domain: 'Enterprise Data Management',
    platform: 'SAP BTP',
    stackSummary: 'SAP CAP · Node.js · CDS · SAP HANA Cloud',
    heroImage: undefined,
    github: undefined,
    liveDemo: undefined,
    overview: [
      'An enterprise master-data governance platform engineered on SAP BTP for centralized data management, validation, approval, and downstream S/4HANA syndication.',
      'The platform handles multiple master-data entities (e.g., Business Partners, Materials, Cost Centers) through a single configurable architecture rather than building separate services for each entity.'
    ],
    problem: [
      'Decentralized master data across enterprise systems leading to inconsistent records, duplicate data, no standardized validation, no governed approval workflows, no audit trail, and difficulty syndicating clean data to downstream systems like S/4HANA.'
    ],
    goals: [
      'Centralize master-data management across entity types',
      'Implement configurable validation rules per entity',
      'Detect and prevent duplicate records',
      'Automate multi-stage approval workflows',
      'Ensure security with role-based access control',
      'Enable downstream syndication to S/4HANA',
      'Maintain full audit trail and version history'
    ],
    myRole: [
      'Designed the metadata-driven architecture',
      'Implemented the SAP CAP services using Node.js',
      'Built custom REST endpoints for dynamic query generation',
      'Implemented duplicate detection logic using Levenshtein distance, Sørensen–Dice similarity, and Soundex',
      'Integrated SAP Build Process Automation for governed multi-stage approvals',
      'Built bulk Excel processing pipelines (upload → parse → validate → detect duplicates → persist → approve)',
      'Implemented XSUAA authentication with role-based access control through AppRouter',
      'Exposed OData V4 endpoints for frontend consumption'
    ],
    architectureFlows: [
      {
        title: 'Application Layer',
        nodes: [
          { label: 'Frontend UI' },
          { label: 'SAP AppRouter' },
          { label: 'XSUAA Authentication' },
          { label: 'SAP CAP Services (Node.js)' },
          { label: 'CDS Data Model' },
          { label: 'SAP HANA Cloud' }
        ]
      },
      {
        title: 'Data Governance Pipeline',
        nodes: [
          { label: 'Master Data Input' },
          { label: 'Validation Engine' },
          { label: 'Duplicate Detection' },
          { label: 'Draft Management' },
          { label: 'SAP Build Process Automation' },
          { label: 'Approved Record' },
          { label: 'S/4HANA Syndication' }
        ]
      }
    ],
    technicalSections: [
      {
        title: 'Metadata-Driven Architecture',
        content: [
          'Instead of hard-coding each master-data entity into separate backend services, I used a metadata-driven approach. The system reads entity configurations at runtime — field definitions, validation rules, display properties, and relationship mappings — from a configuration layer. This means new master-data entities can be onboarded by defining metadata rather than modifying backend code.'
        ],
        codeExample: {
          language: 'javascript',
          label: 'Representative implementation',
          code: `// Runtime entity configuration resolver
async function resolveEntityConfig(entityName) {
  const config = await SELECT.from('MDR_EntityConfig')
    .where({ entity: entityName, active: true });
  return {
    fields: config.fields,
    validationRules: JSON.parse(config.validationRules),
    duplicateCheckFields: config.duplicateCheckFields.split(','),
    approvalStages: config.approvalStages
  };
}`,
          explanation: 'The configuration resolver loads entity-specific rules at runtime, enabling the same CAP service to handle Business Partners, Materials, or Cost Centers without code changes.'
        }
      },
      {
        title: 'Runtime Query Generation',
        content: [
          'Because each master-data entity can have different fields and structures, SQL queries cannot be hard-coded. I built a dynamic query generator that constructs CDS queries based on the entity configuration, supporting filters, sorting, pagination, and field projections at runtime.'
        ]
      },
      {
        title: 'Validation Engine',
        content: [
          'Each entity type has configurable validation rules — required fields, format patterns, referential integrity checks, and business-specific constraints. The validation engine evaluates incoming records against the entity\'s rule set before allowing persistence. Invalid records are rejected with specific field-level error messages.'
        ]
      },
      {
        title: 'Duplicate Detection',
        content: [
          'Duplicate detection runs multiple similarity algorithms against configurable fields. The system uses three complementary approaches: Levenshtein distance for character-level edit distance (catches typos), Sørensen–Dice coefficient for token-level similarity (catches reordered words), and Soundex for phonetic matching (catches names that sound similar but are spelled differently). Records exceeding configurable similarity thresholds are flagged for review.'
        ],
        codeExample: {
          language: 'javascript',
          label: 'Representative implementation',
          code: `function calculateSimilarity(recordA, recordB, checkFields) {
  const scores = checkFields.map(field => ({
    field,
    levenshtein: 1 - (levenshteinDistance(recordA[field], recordB[field]) /
      Math.max(recordA[field].length, recordB[field].length)),
    dice: diceCoefficient(recordA[field], recordB[field]),
    soundex: soundexMatch(recordA[field], recordB[field]) ? 1 : 0
  }));
  return {
    fields: scores,
    composite: scores.reduce((sum, s) =>
      sum + (s.levenshtein * 0.4 + s.dice * 0.4 + s.soundex * 0.2), 0) / scores.length
  };
}`,
          explanation: 'Each similarity algorithm targets a different class of duplicate — typos, word reordering, and phonetic similarity — and results are weighted into a composite score.'
        }
      },
      {
        title: 'Bulk Excel Processing',
        content: [
          'Enterprise users frequently manage master data in spreadsheets. The system accepts Excel uploads, parses them into structured records, validates each row against the entity\'s rules, runs duplicate detection across the batch and against existing data, reports row-level errors, persists valid records as drafts, and routes them through the approval workflow.'
        ]
      },
      {
        title: 'Workflow & Approvals',
        content: [
          'SAP Build Process Automation handles multi-stage approval workflows. When a record passes validation and duplicate detection, it enters a governed approval chain. Approvers can approve, reject, or request changes. The workflow configuration — number of stages, approver roles, escalation rules — is defined per entity type.'
        ]
      },
      {
        title: 'Security & Authentication',
        content: [
          'Authentication flows through SAP AppRouter to XSUAA. Role-based access control restricts operations per entity type — some users can only view, others can create and edit, and only designated approvers can approve records. API endpoints are authenticated and authorized at the service layer.'
        ]
      },
      {
        title: 'OData V4 & API Layer',
        content: [
          'The CAP framework exposes OData V4 endpoints for frontend consumption. Custom Node.js handlers extend the standard OData behavior for operations like duplicate checking, bulk processing, and workflow triggers.'
        ]
      },
      {
        title: 'Auditability & Governance',
        content: [
          'Every record change is tracked — who created it, who modified it, when, and what changed. Draft management allows records to be worked on without affecting production data. Version history provides a complete lineage for each master-data record.'
        ]
      }
    ],
    engineeringDecisions: [
      {
        question: 'Why metadata-driven architecture?',
        answer: 'Instead of hard-coding each master-data entity into separate backend services, a metadata-driven approach allows new entities and validation rules to be configured without modifying the core backend logic. This reduced the effort of onboarding new entity types from weeks of development to configuration changes.'
      },
      {
        question: 'Why SAP CAP with Node.js?',
        answer: 'SAP CAP provides built-in OData V4 support, CDS modeling, and native HANA Cloud integration. Node.js was chosen over Java for faster development cycles and simpler service handler implementations for this type of CRUD-heavy enterprise application.'
      },
      {
        question: 'Why multiple similarity algorithms for duplicate detection?',
        answer: 'A single algorithm misses entire classes of duplicates. Levenshtein catches character-level typos, Dice catches word reordering, and Soundex catches phonetic similarities. The composite score provides higher accuracy than any single method.'
      },
      {
        question: 'Why SAP Build Process Automation over custom workflow?',
        answer: 'Enterprise governance requires auditable, configurable approval chains with escalation. SAP Build Process Automation provides this with native SAP integration, reducing the need to build and maintain custom workflow infrastructure.'
      }
    ],
    challenges: [
      {
        challenge: 'Duplicate records can have slightly different spellings, word orders, or transliterations.',
        solution: 'Implemented multi-algorithm fuzzy matching combining Levenshtein distance, Sørensen–Dice similarity, and Soundex with configurable thresholds per entity type.'
      },
      {
        challenge: 'Each master-data entity has different fields, validation rules, and approval requirements.',
        solution: 'Designed a metadata-driven architecture where entity configurations are loaded at runtime, enabling a single service to handle multiple entity types.'
      },
      {
        challenge: 'Bulk Excel uploads with thousands of rows need validation and duplicate detection without blocking the user.',
        solution: 'Implemented row-level validation and batch duplicate detection with detailed error reporting, allowing users to fix and re-upload only failed rows.'
      },
      {
        challenge: 'Enterprise governance requires controlled, auditable approval workflows.',
        solution: 'Integrated SAP Build Process Automation for multi-stage approvals with role-based routing and full audit trail.'
      }
    ],
    endToEndFlow: [
      { label: 'User Authentication' },
      { label: 'Select Master-Data Entity' },
      { label: 'Enter or Upload Data' },
      { label: 'Validation Engine' },
      { label: 'Duplicate Detection' },
      { label: 'Draft Creation' },
      { label: 'Approval Workflow' },
      { label: 'Approved Record' },
      { label: 'HANA Cloud Persistence' },
      { label: 'Downstream S/4HANA Syndication' }
    ],
    techStack: [
      {
        category: 'Backend',
        items: ['SAP CAP', 'Node.js', 'CDS']
      },
      {
        category: 'Database',
        items: ['SAP HANA Cloud']
      },
      {
        category: 'Enterprise Integration',
        items: ['OData V4', 'SAP Build Process Automation', 'S/4HANA']
      },
      {
        category: 'Security',
        items: ['XSUAA', 'AppRouter', 'RBAC']
      },
      {
        category: 'Platform',
        items: ['SAP BTP']
      }
    ],
    outcome: [
      'Centralized master-data management across multiple entity types through a single configurable platform',
      'Automated validation and duplicate detection reduced manual data quality review',
      'Governed multi-stage approval workflows with full audit trail',
      'Metadata-driven architecture enabled onboarding new entity types without backend code changes',
      'Downstream syndication pipeline to S/4HANA for clean, validated master data'
    ],
    learnings: [
      'Enterprise applications require more than CRUD operations. Security, governance, validation, workflow, auditability, and integration need to be designed as first-class concerns from the start. A metadata-driven approach proved essential — the system handles entity types that did not exist when the original architecture was designed, without requiring backend modifications.'
    ]
  },
  {
    id: 2,
    slug: 'ceo-tower',
    title: 'CEO-Tower',
    subtitle: 'Enterprise Generative AI and Financial Intelligence Platform.',
    role: 'Full-Stack AI Engineer',
    domain: 'Financial Intelligence & Enterprise AI',
    platform: 'Web Application',
    stackSummary: 'React · TypeScript · Python · FastAPI · Llama.cpp',
    heroImage: '/images/ceo_chatbot.png',
    github: undefined,
    liveDemo: undefined,
    overview: [
      'A financial intelligence platform designed for executive-level decision support.',
      'The system integrates financial data from Zoho Books APIs, processes it through a local LLM inference pipeline, and provides contextual financial analysis through a conversational interface. Built with a React/TypeScript frontend, Python/FastAPI backend, and local Llama.cpp inference.'
    ],
    problem: [
      'Financial information spread across multiple systems (invoicing, expenses, accounts), executives needing quick financial insights without navigating multiple dashboards, need for AI-driven contextual analysis of financial data, privacy concerns with sending financial data to external LLM APIs, and high cost of commercial LLM API calls for frequent financial queries.'
    ],
    goals: [
      'Integrate financial data from Zoho Books APIs',
      'Run LLM inference locally for data privacy',
      'Provide contextual financial analysis through natural language',
      'Build a conversational interface with memory',
      'Implement RAG for retrieving relevant financial context',
      'Support real-time financial data retrieval'
    ],
    myRole: [
      'Designed and built the full-stack application end-to-end',
      'Built the React/TypeScript conversational interface with real-time streaming responses',
      'Implemented the FastAPI service layer that connects to Zoho Books APIs for financial data retrieval',
      'Built the RAG pipeline for contextual document retrieval',
      'Configured and optimized Llama.cpp for local LLM inference',
      'Implemented the conversation memory system using Supabase/PostgreSQL'
    ],
    architectureFlows: [
      {
        title: 'Application Architecture',
        nodes: [
          { label: 'React/TypeScript UI' },
          { label: 'FastAPI Backend' },
          { label: 'Zoho Books API Integration' },
          { label: 'Financial Data Processing' },
          { label: 'RAG Pipeline' },
          { label: 'Llama.cpp (Local LLM)' },
          { label: 'Streaming Response' }
        ]
      },
      {
        title: 'RAG Pipeline',
        nodes: [
          { label: 'Financial Documents' },
          { label: 'Text Extraction' },
          { label: 'Chunking' },
          { label: 'Embedding Generation' },
          { label: 'Vector Store' },
          { label: 'Semantic Search' },
          { label: 'Context Assembly' },
          { label: 'LLM Prompt' },
          { label: 'Generated Response' }
        ]
      }
    ],
    technicalSections: [
      {
        title: 'Local LLM Inference',
        content: [
          'Instead of relying on external API calls (OpenAI, Anthropic), the system runs inference locally using Llama.cpp. This eliminates per-token costs and keeps sensitive financial data within the deployment environment. The model is quantized to reduce memory requirements while maintaining acceptable response quality for financial analysis tasks.'
        ]
      },
      {
        title: 'Financial API Integration',
        content: [
          'The system connects to Zoho Books APIs to retrieve invoices, expenses, contacts, accounts, and financial reports. Data is normalized into a common schema and indexed for RAG retrieval. API responses are cached with configurable TTL to reduce redundant API calls.'
        ]
      },
      {
        title: 'RAG Pipeline',
        content: [
          'Financial documents and API responses are chunked, embedded, and stored in a vector database. When a user asks a financial question, the system performs semantic search to retrieve relevant financial context, assembles it into a prompt with the conversation history, and passes it to the local LLM for grounded response generation.'
        ]
      },
      {
        title: 'Conversational Memory',
        content: [
          'Conversation history is persisted in Supabase/PostgreSQL. The system maintains a sliding context window — recent messages are included in full, while older messages are summarized to fit within the model\'s context length. This allows multi-turn financial conversations without losing context.'
        ]
      },
      {
        title: 'Streaming Responses',
        content: [
          'The FastAPI backend streams LLM responses token-by-token to the React frontend using Server-Sent Events. This provides immediate feedback to users rather than waiting for the full response to generate.'
        ]
      }
    ],
    engineeringDecisions: [
      {
        question: 'Why local LLM instead of OpenAI API?',
        answer: 'Financial data is sensitive. Running inference locally with Llama.cpp eliminates the risk of sending financial records to external APIs and removes per-token cost constraints for frequent queries.'
      },
      {
        question: 'Why FastAPI over Flask?',
        answer: 'FastAPI provides native async support for streaming responses, automatic OpenAPI documentation, and Pydantic validation — all essential for a production API serving real-time financial data.'
      },
      {
        question: 'Why Supabase/PostgreSQL for conversation memory?',
        answer: 'PostgreSQL provides reliable structured storage for conversation history with transactional guarantees. Supabase adds real-time subscriptions and authentication without additional infrastructure.'
      },
      {
        question: 'Why RAG instead of fine-tuning?',
        answer: 'Financial data changes frequently. RAG allows the system to reference current financial records without retraining the model. Fine-tuning would require periodic retraining as financial data updates.'
      }
    ],
    challenges: [
      {
        challenge: 'Financial data from APIs updates frequently and needs to be reflected in AI responses.',
        solution: 'Implemented cached API integration with configurable TTL and re-indexing pipeline so RAG retrieval reflects current financial state.'
      },
      {
        challenge: 'Local LLM inference requires significant memory and compute.',
        solution: 'Used quantized models via Llama.cpp and optimized batch sizes to run inference within available hardware constraints.'
      },
      {
        challenge: 'Long financial conversations exceed the model\'s context window.',
        solution: 'Implemented sliding context window with summarization — recent messages in full, older messages compressed into summaries.'
      },
      {
        challenge: 'Users expect immediate responses but LLM generation is slow.',
        solution: 'Implemented Server-Sent Events for token-by-token streaming from FastAPI to React frontend.'
      }
    ],
    endToEndFlow: [
      { label: 'User Query' },
      { label: 'Conversation Context Assembly' },
      { label: 'Financial API Data Retrieval' },
      { label: 'Embedding & Semantic Search' },
      { label: 'Relevant Context Selection' },
      { label: 'Prompt Construction' },
      { label: 'Llama.cpp Inference' },
      { label: 'Token Streaming' },
      { label: 'Frontend Display' },
      { label: 'Conversation Persistence' }
    ],
    techStack: [
      {
        category: 'Frontend',
        items: ['React', 'TypeScript']
      },
      {
        category: 'Backend',
        items: ['Python', 'FastAPI']
      },
      {
        category: 'AI / ML',
        items: ['Llama.cpp', 'RAG']
      },
      {
        category: 'Database',
        items: ['Supabase', 'PostgreSQL']
      },
      {
        category: 'Integration',
        items: ['Zoho Books APIs']
      },
      {
        category: 'Infrastructure',
        items: ['Docker']
      }
    ],
    outcome: [
      'Local LLM inference enabling financial analysis without external API dependencies',
      'Integrated financial data from Zoho Books into a conversational AI interface',
      'RAG pipeline providing grounded, contextual responses from current financial data',
      'Streaming responses for responsive user experience',
      'Conversation memory for multi-turn financial discussions'
    ],
    learnings: [
      'Running LLMs locally changes the cost-performance equation significantly. For domain-specific applications with sensitive data, local inference with RAG can match or exceed API-based solutions while keeping data private. The key challenge is optimizing model quantization and context management to fit within hardware constraints without sacrificing response quality.'
    ]
  },
  {
    id: 3,
    slug: 'industrial-object-detection',
    title: 'Industrial Object Detection & Quality Inspection',
    subtitle: 'Real-time computer vision system for automated industrial defect detection and offline inspection.',
    role: 'Machine Learning Engineer',
    domain: 'Industrial Computer Vision',
    platform: 'AWS + Android Edge',
    stackSummary: 'YOLO · AWS SageMaker · TensorFlow Lite · Android',
    heroImage: '/images/industrial_detection.png',
    github: undefined,
    liveDemo: undefined,
    overview: [
      'An end-to-end computer vision pipeline for industrial quality inspection.',
      'The system trains object detection models on industrial defect datasets using YOLO, manages training and versioning through AWS SageMaker, converts trained models to TensorFlow Lite for edge deployment, and runs real-time inference on Android devices in factory environments without internet connectivity.'
    ],
    problem: [
      'Manual visual inspection in industrial environments is slow, inconsistent, and cannot scale. Human inspectors miss defects due to fatigue, and inspection data is not systematically recorded. Additionally, many factory floors have limited or no internet connectivity, making cloud-based inference impractical.'
    ],
    goals: [
      'Automate defect detection from camera feeds',
      'Train and version models using managed cloud infrastructure',
      'Deploy inference to edge devices (Android) for offline use',
      'Optimize model size and speed for mobile hardware',
      'Provide real-time visual feedback with detection overlays',
      'Enable inspection data logging for quality reporting'
    ],
    myRole: [
      'Built the complete ML pipeline from data preparation to edge deployment',
      'Prepared and annotated the industrial defect dataset',
      'Trained YOLO models on AWS SageMaker',
      'Optimized and converted models to TensorFlow Lite format',
      'Built the Android application for real-time camera inference',
      'Implemented post-processing for detection visualization',
      'Configured the deployment pipeline from training to edge'
    ],
    architectureFlows: [
      {
        title: 'Training Pipeline',
        nodes: [
          { label: 'Industrial Defect Dataset' },
          { label: 'Data Annotation' },
          { label: 'YOLO Training (AWS SageMaker)' },
          { label: 'Model Evaluation' },
          { label: 'Model Export' },
          { label: 'TensorFlow Lite Conversion' },
          { label: 'Quantization' },
          { label: 'Android Deployment Package' }
        ]
      },
      {
        title: 'Inference Pipeline (Edge)',
        nodes: [
          { label: 'Camera Feed' },
          { label: 'Frame Capture' },
          { label: 'Preprocessing' },
          { label: 'TFLite Inference' },
          { label: 'Detection Results' },
          { label: 'Post-processing & NMS' },
          { label: 'Bounding Box Overlay' },
          { label: 'Result Display' }
        ]
      }
    ],
    technicalSections: [
      {
        title: 'Model Training on SageMaker',
        content: [
          'YOLO models were trained on AWS SageMaker using custom training containers. SageMaker handles GPU provisioning, training job management, and model artifact storage. Training experiments are tracked with different hyperparameter configurations, and the best-performing model is selected for deployment.'
        ]
      },
      {
        title: 'TensorFlow Lite Conversion',
        content: [
          'The trained YOLO model is exported to ONNX format, then converted to TensorFlow Lite. Post-training quantization (INT8) reduces the model size significantly while maintaining acceptable detection accuracy for the target defect classes. The quantized model runs within the memory and compute constraints of Android devices.'
        ]
      },
      {
        title: 'Android Edge Inference',
        content: [
          'The Android application captures camera frames, preprocesses them (resize, normalize), runs TFLite inference, applies non-maximum suppression to filter overlapping detections, and overlays bounding boxes on the camera preview. The entire pipeline runs on-device without network connectivity.'
        ]
      },
      {
        title: 'Offline Operation',
        content: [
          'Factory environments may lack reliable internet. The system is designed to operate completely offline once the model is deployed to the device. Inspection results are stored locally and can be synced when connectivity is available.'
        ]
      }
    ],
    engineeringDecisions: [
      {
        question: 'Why YOLO over Faster R-CNN or SSD?',
        answer: 'YOLO provides the best speed-accuracy trade-off for real-time detection on mobile devices. Single-shot detection is critical when processing live camera feeds on limited mobile hardware.'
      },
      {
        question: 'Why TensorFlow Lite over ONNX Runtime Mobile?',
        answer: 'TFLite has mature Android support with GPU delegate, hardware acceleration, and well-documented quantization tooling. The Android ecosystem integration is more straightforward than ONNX Runtime Mobile.'
      },
      {
        question: 'Why AWS SageMaker?',
        answer: 'SageMaker provides managed training infrastructure with GPU instances, experiment tracking, and model versioning without maintaining custom training servers. It simplified the training-to-deployment pipeline.'
      },
      {
        question: 'Why on-device inference instead of edge server?',
        answer: 'Factory floor layouts change, and dedicated edge servers add infrastructure complexity. On-device inference on Android makes the system portable and eliminates network latency.'
      }
    ],
    challenges: [
      {
        challenge: 'Industrial environments may not have reliable internet connectivity.',
        solution: 'Optimized models with TensorFlow Lite and deployed inference directly on Android devices for fully offline operation.'
      },
      {
        challenge: 'TFLite models must be small enough for mobile memory while maintaining detection accuracy.',
        solution: 'Applied INT8 post-training quantization and evaluated accuracy trade-offs across different quantization levels to find the optimal balance.'
      },
      {
        challenge: 'Camera frame rates on Android need to support real-time inspection feedback.',
        solution: 'Optimized preprocessing pipeline and leveraged TFLite GPU delegate for hardware-accelerated inference on supported devices.'
      },
      {
        challenge: 'Model updates need to reach deployed devices without app store releases.',
        solution: 'Implemented model versioning with over-the-air model updates when devices connect to the network.'
      }
    ],
    endToEndFlow: [
      { label: 'Dataset Collection' },
      { label: 'Annotation' },
      { label: 'SageMaker Training' },
      { label: 'Model Evaluation' },
      { label: 'TFLite Conversion' },
      { label: 'Quantization' },
      { label: 'Android App Packaging' },
      { label: 'Device Deployment' },
      { label: 'Camera Capture' },
      { label: 'Inference' },
      { label: 'Detection Overlay' },
      { label: 'Local Result Storage' }
    ],
    techStack: [
      {
        category: 'AI / ML',
        items: ['YOLO', 'TensorFlow Lite', 'OpenCV']
      },
      {
        category: 'Cloud',
        items: ['AWS SageMaker']
      },
      {
        category: 'Mobile',
        items: ['Android (Kotlin/Java)']
      },
      {
        category: 'Languages',
        items: ['Python']
      }
    ],
    outcome: [
      'Automated defect detection replacing manual visual inspection',
      'Fully offline inference capability on Android devices',
      'Managed training pipeline with model versioning on SageMaker',
      'Quantized models running within mobile hardware constraints',
      'Real-time camera inference with visual detection overlays'
    ],
    learnings: [
      'Deploying a computer-vision model to an offline device requires thinking beyond model accuracy. Inference performance, model size, memory usage, and device constraints become primary engineering concerns. The model that works best in a notebook is rarely the model that deploys best to a phone.'
    ]
  },
  {
    id: 4,
    slug: 'multimodal-rag',
    title: 'Multimodal RAG Chatbot',
    subtitle: 'A document and image-aware retrieval-augmented generation system with conversational memory.',
    role: 'AI Engineer',
    domain: 'Document Intelligence & Conversational AI',
    platform: 'Local / Self-hosted',
    stackSummary: 'Ollama · Llama 2 7B · FAISS · LangGraph',
    heroImage: '/images/rag_chatbot.png',
    github: undefined,
    liveDemo: undefined,
    overview: [
      'A retrieval-augmented generation chatbot that processes both text documents (PDFs) and images.',
      'The system uses Ollama with Llama 2 7B for local inference, Nomic embeddings for semantic search, FAISS for vector storage, LangGraph for orchestrating the retrieval and generation pipeline, and SQLite for conversation persistence. OCR capabilities enable extraction and retrieval from image-based documents.'
    ],
    problem: [
      'Organizations accumulate documents in mixed formats — text PDFs, scanned documents, images with text, and structured reports. Standard text-only RAG systems cannot extract or retrieve information from image-based content. Additionally, users need multi-turn conversations that maintain context across questions, and sending document content to external APIs raises privacy concerns.'
    ],
    goals: [
      'Process and index both text-based and image-based documents',
      'Extract text from images using OCR',
      'Implement semantic search across multimodal content',
      'Maintain conversational memory across sessions',
      'Run entirely on local infrastructure (no external API calls)',
      'Reduce hallucination through retrieval grounding'
    ],
    myRole: [
      'Designed and built the complete multimodal RAG pipeline',
      'Implemented the document processing pipeline for PDFs and images',
      'Integrated OCR for text extraction from image-based documents',
      'Configured Nomic embeddings with FAISS for semantic search',
      'Orchestrated the retrieval-generation pipeline using LangGraph',
      'Implemented conversation memory with SQLite',
      'Configured Ollama with Llama 2 7B for local inference'
    ],
    architectureFlows: [
      {
        title: 'Document Ingestion',
        nodes: [
          { label: 'PDF/Image Upload' },
          { label: 'Format Detection' },
          { label: 'Text Extraction (PDF Parser / OCR)' },
          { label: 'Chunking' },
          { label: 'Nomic Embedding' },
          { label: 'FAISS Vector Index' }
        ]
      },
      {
        title: 'Query Pipeline',
        nodes: [
          { label: 'User Query' },
          { label: 'Query Embedding' },
          { label: 'FAISS Semantic Search' },
          { label: 'Relevant Chunks' },
          { label: 'Context Assembly' },
          { label: 'Conversation History (SQLite)' },
          { label: 'LangGraph Orchestration' },
          { label: 'Llama 2 7B (Ollama)' },
          { label: 'Grounded Response' }
        ]
      }
    ],
    technicalSections: [
      {
        title: 'Multimodal Document Processing',
        content: [
          'The ingestion pipeline detects document format and routes to the appropriate processor. Text-based PDFs are parsed directly. Image-based documents (scanned PDFs, photos of documents) are processed through OCR to extract text content. Both paths converge at the chunking stage, where extracted text is split into semantically meaningful segments.'
        ]
      },
      {
        title: 'Embedding & Vector Search',
        content: [
          'Document chunks are embedded using Nomic embedding models running locally. Embeddings are stored in a FAISS index for efficient approximate nearest-neighbor search. At query time, the user\'s question is embedded with the same model and searched against the index to retrieve the most semantically relevant document chunks.'
        ]
      },
      {
        title: 'LangGraph Orchestration',
        content: [
          'LangGraph manages the retrieval and generation workflow as a directed graph. Nodes handle query processing, retrieval, context ranking, prompt construction, and response generation. The graph structure allows conditional routing — for example, if initial retrieval returns low-confidence results, the system can reformulate the query and retry.'
        ]
      },
      {
        title: 'Conversation Memory',
        content: [
          'Conversation history is stored in SQLite. Each session maintains its thread of messages. When constructing the LLM prompt, recent conversation context is included so the model can reference previous questions and answers. This enables follow-up questions like "What about the second document?" without restating context.'
        ]
      },
      {
        title: 'Hallucination Reduction',
        content: [
          'By grounding responses in retrieved document chunks, the system constrains the LLM to information present in the indexed documents. The prompt template explicitly instructs the model to base responses on provided context and indicate when information is not available in the source documents.'
        ]
      }
    ],
    engineeringDecisions: [
      {
        question: 'Why Ollama with Llama 2 7B?',
        answer: 'Ollama simplifies local LLM deployment with model management and API compatibility. Llama 2 7B provides good performance on document Q&A tasks while running on consumer hardware without requiring enterprise GPU infrastructure.'
      },
      {
        question: 'Why FAISS over Pinecone or Chroma?',
        answer: 'FAISS runs locally with no external dependencies, provides excellent search performance for the target index size, and keeps the entire system self-contained without cloud vector database costs.'
      },
      {
        question: 'Why LangGraph over plain LangChain?',
        answer: 'LangGraph provides explicit graph-based workflow control with conditional routing and state management. This was necessary for implementing retry logic, query reformulation, and multi-step retrieval strategies.'
      },
      {
        question: 'Why SQLite for conversation memory?',
        answer: 'SQLite is zero-configuration, file-based, and sufficient for single-user or small-team conversation storage. It avoids the overhead of running a separate database server for a local deployment.'
      }
    ],
    challenges: [
      {
        challenge: 'OCR quality varies significantly across document types and scan quality.',
        solution: 'Implemented preprocessing (contrast adjustment, deskewing) before OCR and confidence-based filtering to discard low-quality extractions.'
      },
      {
        challenge: 'Maintaining conversation context without exceeding the model\'s context window.',
        solution: 'Implemented a context management strategy that includes recent messages in full and summarizes older messages when the total token count approaches the model limit.'
      },
      {
        challenge: 'Retrieval can return irrelevant chunks that mislead the LLM.',
        solution: 'Added relevance scoring and threshold filtering — only chunks above a configurable similarity score are included in the context.'
      },
      {
        challenge: 'Different document formats require different parsing approaches.',
        solution: 'Built a format detection router that directs documents to the appropriate parser (PDF text extraction, OCR, or structured data extraction).'
      }
    ],
    endToEndFlow: [
      { label: 'Document Upload' },
      { label: 'Format Detection' },
      { label: 'Text Extraction / OCR' },
      { label: 'Chunking' },
      { label: 'Embedding' },
      { label: 'FAISS Indexing' },
      { label: 'User Query' },
      { label: 'Query Embedding' },
      { label: 'Semantic Search' },
      { label: 'Context Ranking' },
      { label: 'Conversation History' },
      { label: 'Prompt Construction' },
      { label: 'Ollama / Llama 2' },
      { label: 'Grounded Response' },
      { label: 'Conversation Persistence' }
    ],
    techStack: [
      {
        category: 'AI / ML',
        items: ['Ollama', 'Llama 2 7B', 'Nomic Embeddings', 'LangGraph', 'OCR']
      },
      {
        category: 'Vector Store',
        items: ['FAISS']
      },
      {
        category: 'Database',
        items: ['SQLite']
      },
      {
        category: 'Languages',
        items: ['Python']
      }
    ],
    outcome: [
      'Multimodal document retrieval supporting both text and image-based content',
      'Locally-running inference with no external API dependencies',
      'Conversational memory enabling multi-turn document Q&A',
      'Reduced hallucination through retrieval grounding and source attribution',
      'Modular pipeline architecture supporting new document formats'
    ],
    learnings: [
      'Retrieval quality is often as important as model quality when building grounded AI systems. A well-tuned retrieval pipeline with proper chunking, embedding, and relevance filtering can make a smaller local model outperform a larger API-based model on domain-specific tasks. The effort should go into data pipeline engineering, not just model selection.'
    ]
  },
  {
    id: 5,
    slug: 'medical-chatbot',
    title: 'Medical Knowledge RAG Chatbot',
    subtitle: 'A retrieval-augmented medical question-answering system grounded in a large medical knowledge base.',
    role: 'AI Engineer',
    domain: 'Healthcare AI / Medical NLP',
    platform: 'AWS Cloud',
    stackSummary: 'GPT-4 · LangChain · Pinecone · Docker',
    heroImage: '/images/medical_chatbot.png',
    github: undefined,
    liveDemo: undefined,
    overview: [
      'A medical question-answering system that retrieves information from a large medical knowledge base and generates grounded, cited responses.',
      'Built with LangChain for pipeline orchestration, OpenAI GPT-4 for response generation, Pinecone for vector search, and Sentence Transformers for embedding generation. Deployed using Docker containers on AWS EC2 with CI/CD pipelines.'
    ],
    problem: [
      'Medical professionals and students need quick access to information from large medical textbooks and reference materials. Manual search through thousands of pages is time-consuming. General-purpose LLMs can generate plausible but incorrect medical information (hallucination), which is particularly dangerous in a medical context. The system needs to provide answers traceable to specific source documents.'
    ],
    goals: [
      'Index a large medical knowledge base for semantic retrieval',
      'Generate accurate, grounded medical answers',
      'Provide source citations with every response',
      'Minimize hallucination through retrieval grounding',
      'Deploy to production with containerized infrastructure',
      'Implement CI/CD for reliable deployment'
    ],
    myRole: [
      'Built the complete RAG pipeline and deployed it to production',
      'Processed the medical knowledge base into semantically chunked segments',
      'Generated embeddings using Sentence Transformers',
      'Indexed them in Pinecone',
      'Built the LangChain retrieval-generation pipeline with GPT-4',
      'Implemented source citation in responses',
      'Containerized the application with Docker',
      'Deployed to AWS EC2 with CI/CD automation'
    ],
    architectureFlows: [
      {
        title: 'Document Pipeline',
        nodes: [
          { label: 'Medical Knowledge Base' },
          { label: 'Document Processing' },
          { label: 'Semantic Chunking' },
          { label: 'Sentence Transformer Embedding' },
          { label: 'Pinecone Vector Index' }
        ]
      },
      {
        title: 'Query Pipeline',
        nodes: [
          { label: 'User Question' },
          { label: 'Query Embedding' },
          { label: 'Pinecone Semantic Search' },
          { label: 'Top-K Relevant Passages' },
          { label: 'LangChain Prompt Assembly' },
          { label: 'GPT-4 Generation' },
          { label: 'Cited Response' }
        ]
      }
    ],
    technicalSections: [
      {
        title: 'Medical Document Processing',
        content: [
          'The medical knowledge base is processed into semantically meaningful chunks. Medical text has unique structure — sections, subsections, clinical guidelines, drug interactions — that require domain-aware chunking rather than naive character-count splitting. Chunk boundaries are aligned with semantic sections to preserve medical context within each retrievable unit.'
        ]
      },
      {
        title: 'Embedding & Vector Search',
        content: [
          'Sentence Transformer models generate dense embeddings for each document chunk. These embeddings are stored in Pinecone, a managed vector database that provides fast approximate nearest-neighbor search at scale. At query time, the user\'s question is embedded and searched against the index to retrieve the most semantically relevant medical passages.'
        ]
      },
      {
        title: 'Source Citation',
        content: [
          'Every response includes citations pointing to the specific source passages that informed the answer. The LangChain pipeline passes retrieved passage metadata (document name, section, page) alongside the content, and the prompt template instructs GPT-4 to cite sources in the response. This allows users to verify the answer against the original material.'
        ]
      },
      {
        title: 'Containerized Deployment',
        content: [
          'The application is containerized with Docker — application code, dependencies, and configuration packaged into reproducible images. Containers are deployed to AWS EC2 instances. A CI/CD pipeline automates building, testing, and deploying new versions.'
        ]
      }
    ],
    engineeringDecisions: [
      {
        question: 'Why GPT-4 over a local model?',
        answer: 'Medical question-answering requires high reasoning capability and nuanced language understanding. GPT-4 provides the response quality necessary for medical content where accuracy is critical. The knowledge base doesn\'t contain sensitive patient data, so external API usage is acceptable.'
      },
      {
        question: 'Why Pinecone over FAISS?',
        answer: 'The medical knowledge base is large enough that a managed vector database with persistent storage, automatic scaling, and metadata filtering provides operational advantages over a local FAISS index.'
      },
      {
        question: 'Why Sentence Transformers for embeddings?',
        answer: 'Sentence Transformer models provide high-quality semantic embeddings optimized for passage retrieval. Models like all-MiniLM-L6-v2 offer good accuracy with fast inference, suitable for both indexing and real-time query embedding.'
      },
      {
        question: 'Why Docker + AWS EC2?',
        answer: 'Containerization ensures environment consistency between development and production. EC2 provides flexible compute without the complexity of Kubernetes for a single-service deployment.'
      }
    ],
    challenges: [
      {
        challenge: 'General LLMs can hallucinate medical information, which is dangerous.',
        solution: 'Grounded responses using retrieval-augmented generation with mandatory source citations, allowing users to verify answers against source material.'
      },
      {
        challenge: 'Medical text has domain-specific structure that naive chunking breaks.',
        solution: 'Implemented domain-aware chunking that respects medical document structure — sections, subsections, and clinical guidelines stay intact within chunks.'
      },
      {
        challenge: 'Embedding model must handle medical terminology accurately.',
        solution: 'Evaluated multiple Sentence Transformer models on medical text retrieval tasks and selected the model with the best recall on domain-specific queries.'
      },
      {
        challenge: 'Production deployment needs to be reproducible and reliable.',
        solution: 'Containerized the application with Docker and implemented CI/CD pipelines for automated testing and deployment to AWS EC2.'
      }
    ],
    endToEndFlow: [
      { label: 'Medical Knowledge Base' },
      { label: 'Document Processing' },
      { label: 'Chunking' },
      { label: 'Embedding' },
      { label: 'Pinecone Index' },
      { label: 'User Query' },
      { label: 'Query Embedding' },
      { label: 'Semantic Search' },
      { label: 'Passage Retrieval' },
      { label: 'LangChain Prompt' },
      { label: 'GPT-4 Generation' },
      { label: 'Cited Response' },
      { label: 'User' }
    ],
    techStack: [
      {
        category: 'AI / ML',
        items: ['GPT-4', 'LangChain', 'Sentence Transformers']
      },
      {
        category: 'Vector Store',
        items: ['Pinecone']
      },
      {
        category: 'Cloud',
        items: ['AWS EC2']
      },
      {
        category: 'Infrastructure',
        items: ['Docker', 'CI/CD']
      },
      {
        category: 'Languages',
        items: ['Python']
      }
    ],
    outcome: [
      'Medical question-answering system grounded in verified knowledge base',
      'Every response includes traceable source citations',
      'Reduced hallucination through retrieval grounding and citation requirements',
      'Production deployment with containerized infrastructure and CI/CD',
      'Semantic search across a large medical knowledge base'
    ],
    learnings: [
      'In medical AI, traceability is as important as accuracy. Users need to verify AI-generated answers against source material, especially in healthcare contexts. Building source citation into the pipeline from the start — not as an afterthought — makes the system trustworthy for professional use.'
    ]
  },
  {
    id: 6,
    slug: 'virtual-kiosk',
    title: 'Virtual Kiosk — Offline Learning Platform',
    subtitle: 'An offline-first educational platform for content delivery in low-connectivity environments.',
    role: 'Software Engineer',
    domain: 'EdTech & Offline Computing',
    platform: 'Desktop / Standalone',
    stackSummary: 'Angular · Node.js · Express.js · pkg',
    heroImage: '/images/virtual_kiosk.png',
    github: undefined,
    liveDemo: 'https://lnkd.in/dqASa_6E',
    overview: [
      'An offline-first educational platform designed to deliver learning content in environments with limited or no internet connectivity.',
      'The system packages an Angular frontend with a Node.js/Express.js backend into a standalone executable using pkg, enabling deployment on any machine without requiring an internet connection, Node.js installation, or server configuration. Content navigation uses a JSON-based routing system for flexible, configurable learning paths.'
    ],
    problem: [
      'Educational institutions in rural and low-connectivity areas cannot reliably depend on web-based learning platforms. Standard web applications require internet access, server infrastructure, and technical setup. Students and educators need access to structured learning content on standalone machines — desktops, kiosks, or shared computers — without technical prerequisites.'
    ],
    goals: [
      'Deliver educational content without internet dependency',
      'Package the entire application as a single executable',
      'Support configurable content and learning paths',
      'Require zero technical setup for deployment',
      'Provide responsive UI across different screen sizes',
      'Enable content updates through simple file replacement'
    ],
    myRole: [
      'Developed the frontend using Angular with responsive UI components',
      'Built the Node.js/Express.js backend for local content serving',
      'Implemented JSON-based routing for configurable content navigation',
      'Packaged the complete application into a standalone executable using pkg for zero-install deployment'
    ],
    architectureFlows: [
      {
        title: 'Application Architecture',
        nodes: [
          { label: 'pkg Executable' },
          { label: 'Node.js/Express.js Server (localhost)' },
          { label: 'Static Angular Frontend' },
          { label: 'JSON Route Configuration' },
          { label: 'Content Modules' }
        ]
      },
      {
        title: 'Content Delivery',
        nodes: [
          { label: 'User Navigation' },
          { label: 'JSON Route Lookup' },
          { label: 'Content Module Resolution' },
          { label: 'Angular Component Rendering' },
          { label: 'Local Asset Loading' }
        ]
      }
    ],
    technicalSections: [
      {
        title: 'Offline-First Architecture',
        content: [
          'The entire application — server, frontend, content, and assets — is bundled into a single executable. When launched, it starts a local Express.js server and serves the Angular application to the user\'s browser on localhost. No internet connection, cloud server, or database is required.'
        ]
      },
      {
        title: 'JSON-Based Routing',
        content: [
          'Learning paths and content structure are defined in JSON configuration files. This allows educators to modify content organization, add new modules, or restructure learning paths by editing JSON files rather than modifying application code. The Angular frontend reads these route definitions at runtime and generates navigation accordingly.'
        ]
      },
      {
        title: 'Executable Packaging with pkg',
        content: [
          'The Node.js application is compiled into a standalone executable using pkg. This bundles the Node.js runtime, Express.js server, Angular build output, and all content assets into a single file that runs on any compatible machine without prerequisites.'
        ]
      },
      {
        title: 'Responsive Content Display',
        content: [
          'The Angular frontend adapts to different screen sizes — from full desktop monitors to smaller kiosk displays. Content modules use responsive layouts that maintain readability across display configurations.'
        ]
      }
    ],
    engineeringDecisions: [
      {
        question: 'Why pkg for packaging?',
        answer: 'pkg bundles Node.js into a standalone executable, eliminating the need for users to install Node.js, npm, or any dependencies. A single .exe file can be distributed and launched on any machine.'
      },
      {
        question: 'Why JSON routing instead of database?',
        answer: 'JSON files are human-readable, easily editable, and require no database server. Educators can update content structure without technical knowledge or database tools.'
      },
      {
        question: 'Why Angular for the frontend?',
        answer: 'Angular provides a structured framework for building complex content navigation with built-in routing, component architecture, and responsive layout support.'
      },
      {
        question: 'Why local Express.js server?',
        answer: 'Express.js serves both the Angular frontend and content assets from localhost. This provides a standard HTTP architecture without requiring internet connectivity.'
      }
    ],
    challenges: [
      {
        challenge: 'Users have no technical background and cannot install Node.js or configure servers.',
        solution: 'Packaged the entire application into a single executable with pkg — double-click to launch, no installation or configuration required.'
      },
      {
        challenge: 'Content needs to be updatable without rebuilding the application.',
        solution: 'Used JSON-based routing and external content directories so new content can be added by copying files without recompiling.'
      },
      {
        challenge: 'Kiosk displays vary in size from small screens to large monitors.',
        solution: 'Built responsive Angular components that adapt content layout and font sizes based on viewport dimensions.'
      },
      {
        challenge: 'Application needs to work identically with and without internet.',
        solution: 'Designed the architecture with zero external dependencies — all assets, content, and runtime are bundled locally.'
      }
    ],
    endToEndFlow: [
      { label: 'Launch Executable' },
      { label: 'Start Local Express Server' },
      { label: 'Load Angular Frontend' },
      { label: 'Read JSON Routes' },
      { label: 'Display Content Navigation' },
      { label: 'User Selects Module' },
      { label: 'Load Content from Local Assets' },
      { label: 'Render in Angular' },
      { label: 'User Interaction' }
    ],
    techStack: [
      {
        category: 'Frontend',
        items: ['Angular']
      },
      {
        category: 'Backend',
        items: ['Node.js', 'Express.js']
      },
      {
        category: 'Packaging',
        items: ['pkg']
      },
      {
        category: 'Routing',
        items: ['JSON Configuration']
      }
    ],
    outcome: [
      'Zero-install offline educational platform deployed as a single executable',
      'JSON-configurable content and learning paths editable by non-technical users',
      'Responsive UI supporting various display sizes from kiosks to desktops',
      'No dependency on internet connectivity, databases, or server infrastructure'
    ],
    learnings: [
      'Offline-first design forces you to think about every dependency. When there is no server, no CDN, no database connection, every asset and every piece of logic must be self-contained. This constraint produces simpler, more portable applications — packaging the entire stack into a single executable eliminated the most common deployment failure: setup and configuration.'
    ]
  }
];
