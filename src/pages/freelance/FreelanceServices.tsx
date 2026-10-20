import { useReveal } from "../../hooks/useReveal";

interface Service {
  index: string;
  icon: string;
  title: string;
  badge: string;
  color: string;
  description: string;
  examples: string[];
}

const SERVICES: Service[] = [
  {
    index: "01",
    icon: "⬡",
    title: "AI & Generative AI",
    badge: "GENAI & RAG",
    color: "#FFE600",
    description:
      "Grounded production AI systems using LLMs, hybrid RAG, LangChain/LangGraph, citation verification, and custom local models with zero data leakage.",
    examples: ["Custom RAG Pipelines", "Private LLMs (Llama.cpp)", "Document Intelligence", "Agent Workflows", "Citation Grounding"],
  },
  {
    index: "02",
    icon: "⟳",
    title: "Business Automation",
    badge: "WORKFLOW ENGINE",
    color: "#B8FF00",
    description:
      "Automate repetitive operational processes, multi-stage approval flows, webhook pipelines, notifications, and enterprise data synchronization.",
    examples: ["Workflow Automation", "API Orchestration", "Approval Pipelines", "Event Webhooks", "Process Optimization"],
  },
  {
    index: "03",
    icon: "◫",
    title: "Custom Web Applications",
    badge: "FULL-STACK PLATFORM",
    color: "#00F0FF",
    description:
      "Production-ready React, TypeScript, and FastAPI web platforms with modern design, state management, robust database architecture, and security.",
    examples: ["Executive Dashboards", "Internal Tools", "SaaS MVPs", "Custom Client Portals", "REST/FastAPI Backends"],
  },
  {
    index: "04",
    icon: "◈",
    title: "Data & Analytics",
    badge: "ANALYTICS & BI",
    color: "#FF6B00",
    description:
      "Convert fragmented business data into actionable dashboards, clean relational schemas, automated reporting pipelines, and predictive insights.",
    examples: ["Relational Modeling", "Real-Time Metrics", "Automated Reporting", "Predictive Analytics", "Data Cleansing"],
  },
  {
    index: "05",
    icon: "⌥",
    title: "System Integration",
    badge: "ENTERPRISE CONNECT",
    color: "#D8B4FE",
    description:
      "Connect proprietary APIs, legacy databases, SAP BTP services, and external payment or CRM providers into cohesive, maintainable systems.",
    examples: ["SAP BTP & S/4HANA", "Zoho Books APIs", "Payment Gateways", "OData & REST", "VPC & Edge Integrations"],
  },
];

const FreelanceServices = () => {
  const refs = useReveal(8, 0.1);

  return (
    <>
      <div className="fl-reveal" ref={(el) => (refs.current[6] = el)}>
        <span className="fl-section-label">Engineering Capabilities</span>
        <h2 className="fl-section-heading">WHAT I BUILD FOR YOUR BUSINESS.</h2>
        <p className="fl-section-sub">
          Full-stack capabilities with specialized AI and systems engineering.
          No speculative bloat — only clean, scalable architecture built around your core requirements.
        </p>
      </div>

      <div className="fl-services-grid" role="list">
        {SERVICES.map((service, i) => (
          <div
            key={service.title}
            className="fl-service-card fl-reveal"
            ref={(el) => (refs.current[i] = el)}
            style={{ transitionDelay: `${i * 60}ms` }}
            role="listitem"
          >
            {/* Top header strip */}
            <div className="fl-service-topbar" style={{ backgroundColor: service.color }}>
              <span className="fl-service-index">#{service.index}</span>
              <span className="fl-service-badge-pill">{service.badge}</span>
            </div>

            <div className="fl-service-content">
              <div className="fl-service-header-row">
                <div className="fl-service-icon" aria-hidden="true">{service.icon}</div>
                <h3 className="fl-service-title">{service.title}</h3>
              </div>
              <p className="fl-service-desc">{service.description}</p>
              <div className="fl-service-examples">
                {service.examples.map((ex) => (
                  <span key={ex} className="fl-service-tag">{ex}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FreelanceServices;
