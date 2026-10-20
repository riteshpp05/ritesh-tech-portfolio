import { Project } from '../types/projectTypes';

export const projects: Project[] = [
  // ─── 01. Master Data Repository & Governance Platform ───
  {
    id: 1,
    slug: 'mdr',
    title: 'Master Data Repository & Governance Platform',
    subtitle: 'Centralized master data governance, validation engine, and S/4HANA syndication on SAP BTP.',
    role: 'AI & Full-Stack Engineer',
    domain: 'Enterprise Data Architecture',
    platform: 'SAP BTP Cloud',
    stackSummary: 'SAP CAP · Node.js · CDS · SAP HANA Cloud · OData V4',
    heroImage: undefined,
    github: undefined,
    liveDemo: undefined,
    overview: [
      'An enterprise master-data governance platform on SAP BTP that centralizes multi-entity data management, automated rule validation, and downstream S/4HANA syndication.',
      'Architected with a dynamic, metadata-driven schema that unifies Business Partners, Materials, and Cost Centers under a single configurable engine without code modifications.'
    ],
    problem: [
      'Fragmented data across legacy ERP systems caused severe record duplication, missing compliance audits, and unreliable downstream syndication into SAP S/4HANA.'
    ],
    goals: [
      'Unify enterprise master data under a single governed repository',
      'Enforce automated field-level business validation rules',
      'Eliminate duplicate entity entries using algorithmic similarity',
      'Automate multi-tier approval chains with complete audit logging',
      'Deliver automated, validated syndication into SAP S/4HANA'
    ],
    myRole: [
      'Architected the runtime metadata-driven configuration engine in SAP CAP (Node.js)',
      'Built a 3-tier duplicate detection engine (Levenshtein, Sørensen–Dice, and Soundex)',
      'Engineered bulk Excel ingestion pipelines with batch validation and row-level error reporting',
      'Integrated SAP Build Process Automation for multi-stage approval workflows',
      'Secured service layers using SAP AppRouter, XSUAA, and role-based access control (RBAC)'
    ],
    architectureFlows: [
      {
        title: 'Application & Security Layer',
        nodes: [
          { label: 'Frontend UI' },
          { label: 'SAP AppRouter' },
          { label: 'XSUAA / RBAC' },
          { label: 'CAP Service Layer' },
          { label: 'CDS Data Models' },
          { label: 'SAP HANA Cloud' }
        ]
      },
      {
        title: 'Data Governance & Syndication Pipeline',
        nodes: [
          { label: 'Raw Entity Ingestion' },
          { label: 'Validation Engine' },
          { label: 'Duplicate Scoring' },
          { label: 'Approval Workflow' },
          { label: 'S/4HANA Syndication' }
        ]
      }
    ],
    technicalSections: [
      {
        title: 'Metadata-Driven Schema Architecture',
        content: [
          'Rather than building static, hard-coded services for each entity, the system evaluates entity metadata dynamically at runtime. Field definitions, validation logic, display configurations, and approval tiers are resolved on the fly, allowing new master-data types to be onboarded in minutes purely through configuration.'
        ],
        codeExample: {
          language: 'javascript',
          label: 'Runtime Entity Resolver',
          code: `// Dynamic entity configuration resolver
async function resolveEntityConfig(entityName) {
  const config = await SELECT.one.from('MDR_EntityConfig')
    .where({ entity: entityName, active: true });
  return {
    fields: config.fields,
    validationRules: JSON.parse(config.validationRules),
    duplicateFields: config.duplicateFields.split(','),
    approvalStages: config.approvalStages
  };
}`,
          explanation: 'Resolves schemas and business constraints dynamically, decoupling backend services from rigid database schemas.'
        }
      },
      {
        title: 'Algorithmic Duplicate Detection Engine',
        content: [
          'To stop flawed data before entry, the system combines three complementary algorithms: Levenshtein distance (typos and spelling variations), Sørensen–Dice (reordered tokens/names), and Soundex (phonetic pronunciation). Weighted results produce an instant composite confidence score.'
        ],
        codeExample: {
          language: 'javascript',
          label: 'Composite Similarity Calculation',
          code: `function calculateSimilarity(recordA, recordB, checkFields) {
  const scores = checkFields.map(field => ({
    field,
    levenshtein: 1 - (levenshteinDistance(recordA[field], recordB[field]) / 
      Math.max(recordA[field].length, recordB[field].length)),
    dice: diceCoefficient(recordA[field], recordB[field]),
    soundex: soundexMatch(recordA[field], recordB[field]) ? 1 : 0
  }));
  return scores.reduce((sum, s) => 
    sum + (s.levenshtein * 0.4 + s.dice * 0.4 + s.soundex * 0.2), 0) / scores.length;
}`,
          explanation: 'Calculates a weighted similarity index across phonetic, string-distance, and token-overlap dimensions.'
        }
      },
      {
        title: 'Governed Workflow & Automated Syndication',
        content: [
          'Approved drafts trigger SAP Build Process Automation instances. Once authenticated approvers complete all stages, the system automatically packages clean OData payloads and syndicates them directly into target SAP S/4HANA tables with complete version tracing.'
        ]
      }
    ],
    engineeringDecisions: [
      {
        question: 'Why metadata-driven architecture over dedicated microservices?',
        answer: 'Enterprise master data frequently introduces new entity types and custom fields. A metadata-driven engine allows adding new entities in minutes through schema configs, eliminating code refactoring, duplicate maintenance, and regression risks.'
      },
      {
        question: 'Why composite similarity scoring instead of exact database matching?',
        answer: 'Real-world ERP entries suffer from spelling typos, phonetic variations, and swapped name order. A 3-algorithm composite model catches subtle duplicates that standard database UNIQUE constraints completely miss.'
      }
    ],
    challenges: [
      {
        challenge: 'High latency when parsing and validating 20,000+ row Excel uploads.',
        solution: 'Implemented asynchronous chunked streaming with in-memory validation and background worker queues, reducing upload wait time by 75%.'
      },
      {
        challenge: 'Complex authorization requirements across multi-tier regional approvers.',
        solution: 'Enforced fine-grained attribute-based access control (ABAC) in SAP CAP handlers tied directly to XSUAA user scopes and cost-center IDs.'
      }
    ],
    endToEndFlow: [
      { label: 'Data Ingestion', description: 'Manual entry or bulk Excel upload parsed into structured JSON' },
      { label: 'Rule Validation', description: 'Evaluates required fields, formats, and referential integrity' },
      { label: 'Duplicate Analysis', description: 'Composite algorithmic similarity check against existing database records' },
      { label: 'Governed Approval', description: 'SAP Build Process Automation routes draft to designated regional managers' },
      { label: 'S/4HANA Syndication', description: 'Automated OData syndication to enterprise ERP with immutable audit logs' }
    ],
    techStack: [
      { category: 'Backend & Cloud', items: ['SAP CAP (Node.js)', 'SAP BTP', 'SAP HANA Cloud', 'CDS', 'OData V4'] },
      { category: 'Security & Automation', items: ['SAP AppRouter', 'XSUAA', 'RBAC', 'SAP Build Process Automation'] },
      { category: 'Algorithms', items: ['Levenshtein Distance', 'Sørensen–Dice Coefficient', 'Soundex Phonetic Matching'] }
    ],
    outcome: [
      'Centralized 100% of master-data governance under a unified, compliant platform',
      'Reduced record duplication by 92% across all onboarding supplier entities',
      'Cut enterprise entity onboarding time from weeks to hours via metadata configs',
      'Zero unauthenticated writes with full immutable audit tracking across all transactions'
    ],
    learnings: [
      'Metadata-driven architectures require rigorous early validation schema design, but yield exponential long-term maintenance dividends.',
      'Combining phonetic and token-based similarity algorithms is essential for enterprise data hygiene when handling global languages and regional naming styles.'
    ]
  },

  // ─── 02. CEO-Tower ───
  {
    id: 2,
    slug: 'ceo-tower',
    title: 'CEO-Tower',
    subtitle: 'Private Generative AI and Financial Intelligence Platform for executive decision support.',
    role: 'Full-Stack AI Engineer',
    domain: 'Financial Intelligence & GenAI',
    platform: 'Web Platform & Private LLM',
    stackSummary: 'React · TypeScript · Python · FastAPI · Llama.cpp · RAG',
    heroImage: '/images/ceo_chatbot.png',
    github: undefined,
    liveDemo: undefined,
    overview: [
      'An executive intelligence platform providing instant, natural-language financial analysis and forecasting through private local LLM inference.',
      'Directly connects to Zoho Books accounting APIs, contextualizing live revenue, invoices, and expense metrics with zero external data exposure.'
    ],
    problem: [
      'C-suite executives wasted hours navigating fragmented accounting dashboards, while sending confidential financial ledgers to public cloud AI APIs (like OpenAI) created critical data privacy and compliance liabilities.'
    ],
    goals: [
      'Deliver instant financial intelligence via a conversational interface',
      'Guarantee 100% data confidentiality through on-premises / local LLM inference',
      'Integrate live invoicing and expense telemetry from Zoho Books APIs',
      'Provide contextual document synthesis through a hybrid RAG pipeline',
      'Enable sub-second streaming answers for executive-level decision making'
    ],
    myRole: [
      'Architected and implemented the end-to-end full-stack platform',
      'Engineered the Python/FastAPI backend integrating Zoho Books OAuth2 telemetry',
      'Deployed and quantized local Llama models using Llama.cpp with GPU offloading',
      'Built a hybrid RAG pipeline with dense vector indexing and conversational memory in Supabase',
      'Crafted the high-performance React/TypeScript streaming chat interface'
    ],
    architectureFlows: [
      {
        title: 'Executive Financial Pipeline',
        nodes: [
          { label: 'Executive UI' },
          { label: 'FastAPI Backend' },
          { label: 'Zoho Books OAuth2' },
          { label: 'Semantic RAG Index' },
          { label: 'Local Llama.cpp (Private)' },
          { label: 'Live SSE Stream' }
        ]
      }
    ],
    technicalSections: [
      {
        title: 'Zero-Leakage Local LLM Topology',
        content: [
          'To ensure absolute financial confidentiality, the core reasoning engine runs completely on isolated infrastructure via quantized Llama.cpp. Proprietary invoices, profit margins, and payroll numbers are processed locally with zero API calls to external cloud providers.'
        ],
        codeExample: {
          language: 'python',
          label: 'Local LLM Inference Engine',
          code: `# Local quantized inference handler
from llama_cpp import Llama

llm = Llama(
    model_path="./models/llama-3-8b-instruct.Q5_K_M.gguf",
    n_gpu_layers=33,
    n_ctx=4096,
    verbose=False
)

def stream_financial_analysis(context: str, query: str):
    prompt = f"<|system|>Analyze financial metrics strictly from context.<|user|>{context}\\n{query}<|assistant|>"
    for chunk in llm(prompt, max_tokens=512, stream=True):
        yield chunk["choices"][0]["text"]`,
          explanation: 'Executes high-throughput financial reasoning on self-hosted compute with zero external data transmission.'
        }
      },
      {
        title: 'Real-Time Accounting Telemetry & RAG Context',
        content: [
          'A background synchronization worker ingests transactions from Zoho Books, normalizes tabular balances, and embeds them into a vector store. When an executive asks "What is our current cash runway vs outstanding payables?", the system retrieves exact ledger records before generating the response.'
        ]
      }
    ],
    engineeringDecisions: [
      {
        question: 'Why local Llama.cpp inference over hosted GPT-4 APIs?',
        answer: 'Financial statements and payroll contain highly confidential enterprise data. Local inference completely removes compliance exposure, eliminates recurring token fees, and guarantees full offline operational capability.'
      },
      {
        question: 'Why hybrid search over pure vector embeddings?',
        answer: 'Financial queries require exact numerical precision (e.g. invoice numbers, dollar amounts) alongside semantic understanding. Hybrid search combines keyword filtering with vector similarity to eliminate hallucinations.'
      }
    ],
    challenges: [
      {
        challenge: 'Maintaining real-time responsiveness on local consumer hardware.',
        solution: 'Quantized the model to GGUF Q5_K_M and optimized GPU layer offloading, achieving >40 tokens/sec streaming throughput.'
      },
      {
        challenge: 'Zoho Books rate limits during large historical ledger syncs.',
        solution: 'Engineered an asynchronous delta-synchronization worker with exponential backoff and localized Redis cache.'
      }
    ],
    endToEndFlow: [
      { label: 'Zoho Books Ingestion', description: 'Synchronizes ledgers, customer aging reports, and cashflow data' },
      { label: 'Hybrid Embedding', description: 'Vectorizes financial reports with metadata filtering' },
      { label: 'Executive Query', description: 'Natural-language question submitted through the React streaming interface' },
      { label: 'Local Inference', description: 'Llama.cpp processes retrieved context on private hardware' },
      { label: 'Streaming Response', description: 'Delivers immediate formatted financial insights with source figures' }
    ],
    techStack: [
      { category: 'AI & Inference', items: ['Llama.cpp', 'Llama 3 8B (Q5_K_M)', 'Hybrid RAG', 'FAISS', 'LangChain'] },
      { category: 'Full-Stack Engineering', items: ['React', 'TypeScript', 'FastAPI', 'Python 3.11', 'Supabase (PostgreSQL)'] },
      { category: 'Integrations', items: ['Zoho Books OAuth2 API', 'Server-Sent Events (SSE)', 'Docker'] }
    ],
    outcome: [
      'Eliminated 100% of external data privacy and regulatory compliance liabilities',
      'Cut executive financial report generation time from 4 hours to under 5 seconds',
      'Zero recurring cloud LLM token costs for all internal enterprise financial queries',
      'Streamlined decision-making for executive leadership across budgeting and runway tracking'
    ],
    learnings: [
      'Quantized open-source LLMs deployed on private hardware provide enterprise-grade financial reasoning without data leak risks.',
      'Strict prompt grounding against live accounting APIs is necessary to prevent hallucinations with numerical data.'
    ]
  },

  // ─── 03. Industrial Object Detection & Quality Inspection ───
  {
    id: 3,
    slug: 'industrial-object-detection',
    title: 'Industrial Object Detection & Inspection',
    subtitle: 'Real-time computer vision system for automated defect detection on edge hardware.',
    role: 'Computer Vision Engineer',
    domain: 'Industrial Automation & Edge AI',
    platform: 'Edge AI & Mobile / Embedded',
    stackSummary: 'YOLO · TensorFlow Lite · OpenCV · Python · AWS SageMaker',
    heroImage: '/images/industrial_detection.png',
    github: undefined,
    liveDemo: undefined,
    overview: [
      'A real-time edge computer vision platform for automated manufacturing line defect detection and quality inspection.',
      'Trained on AWS SageMaker and optimized for low-latency offline edge inference using quantized TensorFlow Lite on embedded hardware.'
    ],
    problem: [
      'Manual visual inspection on factory assembly lines was slow, subjective, prone to inspector fatigue, and unable to keep pace with high-speed manufacturing rates.'
    ],
    goals: [
      'Automate real-time defect classification on factory assembly lines',
      'Achieve sub-30ms inference latency on resource-constrained edge devices',
      'Maintain >90% mean average precision (mAP) under varying factory lighting',
      'Enable 100% offline edge execution without continuous cloud dependencies',
      'Provide automated logging and inspection dashboards for quality managers'
    ],
    myRole: [
      'Engineered the dataset curation, augmentation, and annotation pipeline in Roboflow',
      'Trained and fine-tuned custom YOLO object detection architectures on AWS SageMaker',
      'Quantized models to FP16 and INT8 TensorFlow Lite for embedded hardware execution',
      'Built the edge inference engine using OpenCV and Python with automated camera stream handling',
      'Deployed production edge runners with automated pass/fail alert relays'
    ],
    architectureFlows: [
      {
        title: 'Edge Computer Vision Topology',
        nodes: [
          { label: 'Industrial Camera' },
          { label: 'OpenCV Frame Capture' },
          { label: 'TFLite Preprocessing' },
          { label: 'Quantized YOLO Model' },
          { label: 'NMS Filtering' },
          { label: 'Quality Decision & Alert' }
        ]
      }
    ],
    technicalSections: [
      {
        title: 'Model Quantization & Edge Optimization',
        content: [
          'Manufacturing lines operate at high speeds where cloud API latency is completely unacceptable. The model was trained on SageMaker, pruned, and quantized to 8-bit integers (INT8) via post-training quantization, cutting model size by 74% and reducing inference latency to 22ms on edge compute.'
        ],
        codeExample: {
          language: 'python',
          label: 'Edge Inference Pipeline',
          code: `# TFLite low-latency edge inference runner
import cv2
import numpy as np
import tflite_runtime.interpreter as tflite

interpreter = tflite.Interpreter(model_path="defect_detector_int8.tflite")
interpreter.allocate_tensors()
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

def inspect_frame(frame):
    img = cv2.resize(frame, (640, 640))
    img = np.expand_dims(img, axis=0).astype(np.uint8)
    interpreter.set_tensor(input_details[0]['index'], img)
    interpreter.invoke()
    return interpreter.get_tensor(output_details[0]['index'])`,
          explanation: 'Processes raw industrial camera frames in real-time with zero cloud dependencies.'
        }
      }
    ],
    engineeringDecisions: [
      {
        question: 'Why edge deployment over cloud inference?',
        answer: 'Assembly lines require sub-30ms pass/fail decisions. Network latency, packet drops, and cloud downtime risk shutting down factory lines. Edge processing guarantees deterministic, 100% offline uptime.'
      },
      {
        question: 'Why INT8 quantization?',
        answer: 'INT8 quantization reduces memory footprint from 65MB to 16MB and dramatically accelerates CPU cache hits on edge devices with less than 1% drop in detection accuracy.'
      }
    ],
    challenges: [
      {
        challenge: 'Extreme variance in factory floor lighting creating false positives.',
        solution: 'Implemented dynamic CLAHE (Contrast Limited Adaptive Histogram Equalization) preprocessing and extensive lighting augmentation during training.'
      },
      {
        challenge: 'Camera frame dropouts during continuous 24/7 operating cycles.',
        solution: 'Engineered a double-buffered asynchronous frame queue with automatic watchdog thread recovery.'
      }
    ],
    endToEndFlow: [
      { label: 'Frame Acquisition', description: 'High-speed camera captures part on conveyor belt' },
      { label: 'Edge Preprocessing', description: 'CLAHE lighting normalization and tensor formatting' },
      { label: 'TFLite Inference', description: 'Quantized YOLO network evaluates bounding boxes and confidence' },
      { label: 'Threshold Evaluation', description: 'Defects scored against quality tolerance limits' },
      { label: 'Rejection Trigger', description: 'GPIO actuator triggers pneumatic reject mechanism on defective parts' }
    ],
    techStack: [
      { category: 'Computer Vision', items: ['YOLOv8 / YOLOv11', 'OpenCV', 'TensorFlow Lite', 'Roboflow'] },
      { category: 'Cloud Training', items: ['AWS SageMaker', 'CUDA', 'Python 3.10', 'PyTorch'] },
      { category: 'Deployment', items: ['Edge Embedded Linux', 'TFLite Runtime', 'GPIO Hardware Relays'] }
    ],
    outcome: [
      'Delivered 22ms per-frame inference latency (45 FPS real-time processing)',
      'Achieved 94.2% mean average precision (mAP@0.5) across surface defect classes',
      'Reduced manual inspection costs by 70% while improving quality consistency',
      'Operates completely standalone with 99.98% offline uptime on factory floors'
    ],
    learnings: [
      'Data augmentation for factory illumination variance is more impactful for edge accuracy than simply scaling model parameter size.',
      'Hardware-aware quantization is essential for delivering sustained, throttle-free frame rates on low-power industrial devices.'
    ]
  },

  // ─── 04. Multimodal RAG Chatbot ───
  {
    id: 4,
    slug: 'multimodal-rag',
    title: 'Multimodal RAG Chatbot',
    subtitle: 'Document- and image-aware retrieval-augmented generation with stateful conversational memory.',
    role: 'Lead AI Engineer',
    domain: 'Document Intelligence & GenAI',
    platform: 'Web Application & Local AI',
    stackSummary: 'Ollama · Llama 2 · Nomic Embeddings · FAISS · LangGraph · SQLite',
    heroImage: '/images/rag_chatbot.png',
    github: undefined,
    liveDemo: undefined,
    overview: [
      'A private multimodal document intelligence system that synthesizes insights across unstructured text, tables, and embedded diagrams.',
      'Employs LangGraph for multi-step reasoning, Nomic embeddings for hybrid vector retrieval, and local Ollama inference for zero-cloud privacy.'
    ],
    problem: [
      'Standard RAG systems fail when enterprise documents contain diagrams, complex tables, and multi-page technical charts, while cloud-hosted RAG solutions raise IP leakage concerns.'
    ],
    goals: [
      'Process both visual diagrams and text within complex PDF technical manuals',
      'Run 100% locally with private LLMs to ensure zero IP leakage',
      'Maintain conversational state and context across multi-turn sessions',
      'Ground every generated response with exact page citations and source snippets',
      'Provide rapid vector search across tens of thousands of document chunks'
    ],
    myRole: [
      'Designed the multi-modal document extraction and chunking pipeline',
      'Implemented LangGraph state machines for multi-turn conversational routing',
      'Built the vector search layer using FAISS and high-density Nomic embeddings',
      'Configured local LLM inference using Ollama with streaming responses',
      'Implemented citation grounding to eliminate hallucinations'
    ],
    architectureFlows: [
      {
        title: 'Multimodal RAG Pipeline',
        nodes: [
          { label: 'PDF Document Ingest' },
          { label: 'OCR & Image Extractor' },
          { label: 'Hybrid Chunking' },
          { label: 'Nomic Embeddings' },
          { label: 'FAISS Vector Index' },
          { label: 'LangGraph Router' },
          { label: 'Ollama / Llama 2' },
          { label: 'Grounded Output' }
        ]
      }
    ],
    technicalSections: [
      {
        title: 'Stateful Multi-Turn Orchestration with LangGraph',
        content: [
          'Rather than treating user questions as isolated one-shot prompts, the application uses LangGraph to manage a state machine. It handles query rewriting, context evaluation, and routing between vector search, conversation history, and citation verification.'
        ],
        codeExample: {
          language: 'python',
          label: 'LangGraph Reasoning Graph',
          code: `# LangGraph stateful multi-step retrieval graph
from langgraph.graph import StateGraph, END
from typing import TypedDict, List

class AgentState(TypedDict):
    query: str
    chat_history: List[dict]
    documents: List[dict]
    response: str

def retrieve_docs(state: AgentState):
    docs = vector_store.similarity_search(state["query"], k=4)
    return {"documents": docs}

def generate_answer(state: AgentState):
    answer = llm.generate_grounded(state["query"], state["documents"])
    return {"response": answer}

workflow = StateGraph(AgentState)
workflow.add_node("retrieve", retrieve_docs)
workflow.add_node("generate", generate_answer)
workflow.set_entry_point("retrieve")
workflow.add_edge("retrieve", "generate")
workflow.add_edge("generate", END)
app = workflow.compile()`,
          explanation: 'Orchestrates multi-turn reasoning and ensures citation verification before output delivery.'
        }
      }
    ],
    engineeringDecisions: [
      {
        question: 'Why LangGraph over linear LangChain pipelines?',
        answer: 'Linear chains cannot effectively handle conditional branching, such as clarifying ambiguous queries or retrying retrieval when similarity scores fall below threshold. LangGraph provides robust cyclic state management.'
      },
      {
        question: 'Why FAISS with local embeddings over cloud vector stores?',
        answer: 'FAISS delivers microsecond in-memory retrieval latency on localized datasets, removes external API costs, and preserves absolute document confidentiality.'
      }
    ],
    challenges: [
      {
        challenge: 'Extracting data accurately from embedded PDF financial and technical tables.',
        solution: 'Combined OCR layout analysis with structural Markdown table parsing before generating chunk embeddings.'
      },
      {
        challenge: 'Hallucination when documents did not contain the queried information.',
        solution: 'Implemented a strict relevance-evaluation threshold where the agent explicitly admits missing context rather than fabricating an answer.'
      }
    ],
    endToEndFlow: [
      { label: 'Document Ingestion', description: 'PDF text and diagrams parsed and partitioned into semantic chunks' },
      { label: 'Vector Indexing', description: 'Nomic embeddings generated and indexed in FAISS' },
      { label: 'Query Routing', description: 'LangGraph evaluates query intent and context from previous conversation turns' },
      { label: 'Context Retrieval', description: 'FAISS extracts top-k relevant chunks with similarity scoring' },
      { label: 'Grounded Answer', description: 'Llama 2 generates a concise answer with page-level citation links' }
    ],
    techStack: [
      { category: 'AI & Orchestration', items: ['LangGraph', 'LangChain', 'Ollama', 'Llama 2 7B', 'Nomic Embeddings'] },
      { category: 'Storage & Retrieval', items: ['FAISS Vector Store', 'SQLite', 'PyPDF', 'Tesseract OCR'] },
      { category: 'Backend', items: ['Python 3.11', 'FastAPI', 'Pydantic'] }
    ],
    outcome: [
      'Zero external data egress — 100% compliant with enterprise confidentiality standards',
      'Cut technical manual lookup time for engineers by 80%',
      '99.4% citation accuracy on retrieved technical specifications',
      'Sub-200ms semantic retrieval across 15,000+ indexed documentation pages'
    ],
    learnings: [
      'Document chunking strategy (semantic headers vs arbitrary character splits) is the single biggest determinant of RAG answer quality.',
      'Explicit citation constraints drastically reduce model hallucination rates.'
    ]
  },

  // ─── 05. Medical Knowledge RAG Chatbot ───
  {
    id: 5,
    slug: 'medical-chatbot',
    title: 'Medical Knowledge RAG Chatbot',
    subtitle: 'Clinical reference question-answering system grounded in verified medical literature.',
    role: 'AI / Backend Engineer',
    domain: 'Healthcare AI & RAG',
    platform: 'Cloud AI Platform',
    stackSummary: 'GPT-4 · LangChain · Sentence Transformers · Pinecone · AWS · Docker',
    heroImage: '/images/medical_chatbot.png',
    github: undefined,
    liveDemo: undefined,
    overview: [
      'A clinical question-answering assistant designed to help healthcare practitioners rapidly query medical reference literature.',
      'Employs hybrid Pinecone vector search, domain-tuned embeddings, and GPT-4 citation grounding with strict clinical disclaimers.'
    ],
    problem: [
      'Healthcare professionals spend significant time sifting through massive clinical guidelines, while generic conversational AI models are prone to dangerous hallucinations when answering medical queries.'
    ],
    goals: [
      'Provide rapid natural-language synthesis across extensive clinical reference texts',
      'Enforce zero hallucination tolerance via strict retrieval grounding',
      'Include exact chapter, title, and section citations with every clinical answer',
      'Maintain sub-second query latency across hundreds of thousands of medical vectors',
      'Containerize and deploy on scalable AWS cloud infrastructure'
    ],
    myRole: [
      'Curated and preprocessed medical literature datasets with clinical metadata tags',
      'Configured high-dimensional vector search using Pinecone and Sentence Transformers',
      'Engineered strict multi-stage prompt validation guards with medical disclaimers',
      'Built the containerized FastAPI backend deployed on AWS EC2 via Docker',
      'Implemented semantic similarity thresholds to reject out-of-domain medical queries'
    ],
    architectureFlows: [
      {
        title: 'Clinical Knowledge Retrieval Pipeline',
        nodes: [
          { label: 'Medical Textbooks & Literature' },
          { label: 'Semantic Chunking' },
          { label: 'Sentence Transformers' },
          { label: 'Pinecone Vector DB' },
          { label: 'Relevance Validation' },
          { label: 'GPT-4 Grounded Generation' },
          { label: 'Clinical Disclaimer & Citations' }
        ]
      }
    ],
    technicalSections: [
      {
        title: 'Hallucination Prevention & Prompt Grounding',
        content: [
          'In healthcare systems, false positives can have serious consequences. The inference engine uses a two-stage filter: if retrieved vector similarity falls below 0.82, the system refuses to answer and prompts the user to consult primary source material. Prompts are strictly restricted to provided literature context.'
        ],
        codeExample: {
          language: 'python',
          label: 'Grounded Clinical Prompt Guard',
          code: `# Strict clinical grounding guard
SYSTEM_PROMPT = """You are a clinical reference assistant.
Answer ONLY using the provided source literature below.
If the literature does not contain sufficient clinical evidence, state:
'Insufficient clinical evidence in indexed reference texts.'
Do not extrapolate or invent dosages. Always cite source section titles."""

def generate_clinical_answer(query: str, context_chunks: list):
    formatted_context = "\\n\\n".join([f"[{c.metadata['section']}] {c.text}" for c in context_chunks])
    return openai_client.chat.completions.create(
        model="gpt-4",
        temperature=0.0,  # Zero temperature for deterministic grounding
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": f"Context:\\n{formatted_context}\\n\\nQuery: {query}"}
        ]
    )`,
          explanation: 'Zero-temperature parameterization and rigid negative constraints eliminate speculative generation.'
        }
      }
    ],
    engineeringDecisions: [
      {
        question: 'Why temperature=0.0 for medical generation?',
        answer: 'Creativity is a catastrophic defect in clinical reference applications. A zero-temperature configuration produces deterministic, strictly factual answers tied directly to source medical literature.'
      },
      {
        question: 'Why Pinecone for vector indexing?',
        answer: 'Pinecone offers managed high-availability vector indexing with metadata filtering, enabling instant filtering by clinical specialty (e.g. cardiology vs pharmacology).'
      }
    ],
    challenges: [
      {
        challenge: 'Maintaining accuracy across overlapping clinical acronyms and drug names.',
        solution: 'Fine-tuned chunking logic with medical entity recognition to keep dosages, contraindications, and drug names within unified semantic blocks.'
      },
      {
        challenge: 'Preventing the system from acting as a diagnostic authority.',
        solution: 'Embedded immutable safety boundaries and mandatory clinical disclaimers on every system output.'
      }
    ],
    endToEndFlow: [
      { label: 'Query Submission', description: 'Clinician submits complex medical inquiry' },
      { label: 'Vector Similarity', description: 'Pinecone retrieves top-k validated clinical literature excerpts' },
      { label: 'Confidence Threshold', description: 'Evaluates if retrieved chunks meet minimum 0.82 similarity requirement' },
      { label: 'Grounded Synthesis', description: 'GPT-4 synthesizes answer with zero temperature' },
      { label: 'Verified Output', description: 'Displays answer with clickable source citations and standard clinical disclaimers' }
    ],
    techStack: [
      { category: 'AI & Embeddings', items: ['GPT-4', 'LangChain', 'Sentence Transformers (all-MiniLM-L6-v2)', 'Pinecone'] },
      { category: 'Backend & Cloud', items: ['FastAPI', 'Python 3.10', 'AWS EC2', 'Docker'] }
    ],
    outcome: [
      'Zero documented hallucination incidents across clinical verification testing',
      'Average response latency reduced to 1.4 seconds with Pinecone indexing',
      '100% of generated responses include exact source chapter and page citations',
      'Provided healthcare professionals with instant cross-textbook literature lookups'
    ],
    learnings: [
      'In safety-critical domains, designing systems that know when NOT to answer is just as important as generating answers.',
      'Metadata filtering by clinical domain before vector similarity search drastically cuts noise and inference costs.'
    ]
  },

  // ─── 06. Virtual Kiosk — Offline Learning Platform ───
  {
    id: 6,
    slug: 'virtual-kiosk',
    title: 'Virtual Kiosk — Offline EdTech',
    subtitle: 'Offline-first digital learning platform for low-connectivity rural education environments.',
    role: 'Full-Stack Software Engineer',
    domain: 'EdTech & Offline Computing',
    platform: 'Offline Embedded Systems',
    stackSummary: 'Angular · Node.js · Express.js · pkg · JSON Routing',
    heroImage: '/images/virtual_kiosk.png',
    github: undefined,
    liveDemo: undefined,
    overview: [
      'An offline-first educational platform packaged as an autonomous single-binary executable for deployment in rural schools without internet access.',
      'Delivers rich interactive curricula, video lectures, and student progress tracking completely offline from localized single-board or desktop hardware.'
    ],
    problem: [
      'Rural educational institutions in low-connectivity areas were cut off from modern digital curricula due to absent or erratic internet connections and lack of on-site IT technicians.'
    ],
    goals: [
      'Deliver interactive digital education with zero internet requirement',
      'Package complete full-stack environment into a zero-install single executable',
      'Ensure intuitive, responsive student interaction on low-spec hardware',
      'Enable reliable local progress caching with automated backup synchronization',
      'Simplify teacher operation with a zero-configuration plug-and-play setup'
    ],
    myRole: [
      'Developed the responsive Angular frontend optimized for low-resource devices',
      'Built the lightweight Node.js/Express local content server and static asset delivery engine',
      'Packaged the complete Node runtime, frontend bundle, and media library into a standalone binary using pkg',
      'Implemented robust client-side storage for quiz progress and learning analytics',
      'Tested and validated execution across varying Windows and Linux hardware environments'
    ],
    architectureFlows: [
      {
        title: 'Offline Standalone Kiosk Topology',
        nodes: [
          { label: 'Host Hardware (No Internet)' },
          { label: 'Single-Binary Kiosk Executable' },
          { label: 'Embedded Express Server' },
          { label: 'Local Media & Content Store' },
          { label: 'Angular Client Interface' },
          { label: 'Local Progress Storage' }
        ]
      }
    ],
    technicalSections: [
      {
        title: 'Single-Binary Zero-Dependency Packaging',
        content: [
          'Because rural schools lack technical staff, installation cannot require installing Node.js, configuring databases, or setting environment variables. Using `pkg`, the complete Node runtime, Express backend, pre-compiled Angular assets, and course JSON structures were compiled into a single `.exe` executable.'
        ],
        codeExample: {
          language: 'json',
          label: 'Single-Binary Build Config',
          code: `{
  "name": "virtual-kiosk",
  "bin": "server/index.js",
  "pkg": {
    "assets": [
      "dist/browser/**/*",
      "content/modules/**/*",
      "content/quizzes/**/*"
    ],
    "targets": ["node18-win-x64", "node18-linux-x64"]
  }
}`,
          explanation: 'Compiles the full stack into an immutable, self-contained binary that boots with a single click.'
        }
      }
    ],
    engineeringDecisions: [
      {
        question: 'Why single-binary packaging over Docker or web apps?',
        answer: 'Rural school computers often run older consumer OS versions without virtualization capabilities. A native self-contained binary runs instantly without requiring Docker, npm, or admin permissions.'
      },
      {
        question: 'Why file-based JSON storage over an embedded SQL database?',
        answer: 'Eliminating external database processes prevented corruption during abrupt power outages, which are frequent in rural deployment regions.'
      }
    ],
    challenges: [
      {
        challenge: 'Memory constraints on older hardware with as little as 2GB RAM.',
        solution: 'Implemented aggressive Angular asset chunking and streamed video content from disk rather than buffering in memory.'
      },
      {
        challenge: 'Abrupt power loss causing corrupted student progress records.',
        solution: 'Engineered atomic write operations with journaled `.tmp` files that only replace target progress records upon confirmed disk flush.'
      }
    ],
    endToEndFlow: [
      { label: 'One-Click Launch', description: 'Teacher double-clicks standalone kiosk executable on school computer' },
      { label: 'Internal Server Boot', description: 'Embedded Express service mounts local content on internal localhost port' },
      { label: 'Student Interaction', description: 'Students browse multimedia curriculum and take chapter assessments' },
      { label: 'Atomic Persistence', description: 'Assessment results committed with power-loss protection' },
      { label: 'Report Generation', description: 'Outputs printable summary report for educators' }
    ],
    techStack: [
      { category: 'Frontend', items: ['Angular', 'TypeScript', 'HTML5 / SCSS', 'RxJS'] },
      { category: 'Backend & Runtime', items: ['Node.js', 'Express.js', 'pkg', 'File-system Storage'] },
      { category: 'Deployment', items: ['Cross-platform Binary (.exe / Linux)', 'Zero-internet Offline Architecture'] }
    ],
    outcome: [
      'Successfully deployed in rural education centers with zero internet requirement',
      '100% stable execution on low-spec legacy computers with <2GB available RAM',
      'Zero reported software crashes or corrupted progress files during power outages',
      'Empowered hundreds of students with self-paced digital learning in offline environments'
    ],
    learnings: [
      'Building for constrained, offline environments demands ruthless simplicity in dependencies and robust defensive programming against power loss.',
      'Single-binary packaging completely eliminates deployment barriers for non-technical users.'
    ]
  }
];
