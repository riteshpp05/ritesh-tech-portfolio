import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface CaseStudy {
  number: string;
  slug: string;
  title: string;
  domain: string;
  description: string;
  problem: string;
  solution: string;
  capabilities: string[];
  tech: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    number: "01",
    slug: "ceo-tower",
    title: "Enterprise AI & Financial Intelligence Platform",
    domain: "Financial Intelligence · Enterprise AI",
    description:
      "An enterprise AI platform combining local LLM inference, RAG, financial API integrations, and a FastAPI backend for intelligent access to business and financial data.",
    problem: "Financial data scattered across Zoho Books. Executives needed contextual AI analysis without navigating dashboards — with full data privacy.",
    solution: "Local Llama.cpp inference keeps sensitive financial data on-premise. RAG retrieves live financial context. Server-Sent Events for streaming responses.",
    capabilities: ["AI-powered queries", "RAG pipeline", "Financial intelligence", "Local LLM inference", "API integrations"],
    tech: "React · FastAPI · Python · Llama.cpp · PostgreSQL · Docker",
  },
  {
    number: "02",
    slug: "mdr",
    title: "Master Data Repository & Governance Platform",
    domain: "Enterprise Data Management · SAP BTP",
    description:
      "An enterprise master-data governance platform with configurable validation, multi-algorithm duplicate detection, multi-stage approval workflows, and S/4HANA synchronization.",
    problem: "Decentralised master data causing inconsistency, duplicate records, no governed approvals, and no audit trail across enterprise systems.",
    solution: "Metadata-driven architecture with Levenshtein/Dice/Soundex duplicate detection, SAP Build Process Automation approvals, and downstream S/4HANA sync.",
    capabilities: ["Metadata-driven architecture", "Duplicate detection", "Approval workflows", "S/4HANA sync", "RBAC security"],
    tech: "SAP CAP · Node.js · SAP HANA Cloud · OData V4 · CDS",
  },
  {
    number: "03",
    slug: "medical-chatbot",
    title: "Medical Knowledge RAG Chatbot",
    domain: "Healthcare AI · Document Intelligence",
    description:
      "A retrieval-augmented medical Q&A system that retrieves from a large knowledge base, generates grounded responses with mandatory source citations, deployed on AWS.",
    problem: "Medical professionals need quick, trustworthy access to large reference libraries — standard LLMs hallucinate medical content.",
    solution: "LangChain + Pinecone + GPT-4 with domain-aware chunking and mandatory source citations. Deployed on AWS EC2 with CI/CD pipelines.",
    capabilities: ["RAG pipeline", "Source citations", "Hallucination reduction", "CI/CD deployment", "Containerisation"],
    tech: "GPT-4 · LangChain · Pinecone · Docker · AWS EC2 · Python",
  },
  {
    number: "04",
    slug: "industrial-object-detection",
    title: "Industrial Object Detection & Quality Inspection",
    domain: "Computer Vision · Edge AI",
    description:
      "End-to-end computer vision pipeline for industrial defect detection — YOLO training on AWS SageMaker to INT8-quantised TFLite deployed on Android for offline factory-floor inspection.",
    problem: "Manual visual inspection is slow, inconsistent, and cannot scale in factory environments with limited internet connectivity.",
    solution: "YOLO trained on SageMaker, quantised to INT8 TFLite, deployed on Android for real-time offline inference with bounding-box overlays.",
    capabilities: ["YOLO detection", "Edge deployment", "Offline inference", "Model quantisation", "SageMaker training"],
    tech: "YOLO · AWS SageMaker · TensorFlow Lite · Android · Python",
  },
];

const FreelanceCaseStudies = () => {
  const navigate = useNavigate();
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("fl-visible");
        });
      },
      { threshold: 0.08 }
    );
    cardRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="fl-cases-header fl-reveal" ref={(el) => (cardRefs.current[8] = el)}>
        <span className="fl-section-label">Selected Work</span>
        <h2 className="fl-section-heading">Built for real problems.</h2>
        <p className="fl-section-sub">
          Selected projects showing how I approach AI, automation, enterprise systems,
          and software engineering — from problem to production.
        </p>
      </div>

      <div className="fl-cases-list" role="list">
        {CASE_STUDIES.map((cs, i) => (
          <article
            key={cs.slug}
            className="fl-case-item fl-reveal"
            ref={(el) => (cardRefs.current[i] = el)}
            style={{ transitionDelay: `${i * 90}ms` }}
            role="listitem"
            aria-label={cs.title}
          >
            {/* Left col */}
            <div>
              <p className="fl-case-number">{cs.number}</p>
              <h3 className="fl-case-title">{cs.title}</h3>
              <p className="fl-case-desc">{cs.description}</p>

              <p className="fl-case-problem-label">Problem</p>
              <p className="fl-case-problem-text">{cs.problem}</p>
              <p className="fl-case-problem-label">Solution</p>
              <p className="fl-case-problem-text" style={{ marginBottom: "18px" }}>{cs.solution}</p>

              <div className="fl-case-capabilities">
                {cs.capabilities.map((cap) => (
                  <span key={cap} className="fl-case-cap">{cap}</span>
                ))}
              </div>
              <p className="fl-case-tech" style={{ marginTop: "14px" }}>{cs.tech}</p>
            </div>

            {/* Right col */}
            <div className="fl-case-cta-col">
              <span className="fl-case-domain">{cs.domain}</span>
              <button
                className="fl-case-link"
                onClick={() => navigate(`/projects/${cs.slug}`)}
                aria-label={`View case study for ${cs.title}`}
              >
                View Case Study ↗
              </button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
};

export default FreelanceCaseStudies;
