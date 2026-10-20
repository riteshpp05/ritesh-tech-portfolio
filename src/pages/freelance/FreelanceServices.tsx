import { useReveal } from "../../hooks/useReveal";

interface Service {
  index: string;
  icon: string;
  title: string;
  badge: string;
  description: string;
  examples: string[];
}

const SERVICES: Service[] = [
  {
    index: "01",
    icon: "⬡",
    title: "AI & Generative AI",
    badge: "GENAI & RAG",
    description:
      "Production-grade AI systems with private local LLMs, hybrid RAG retrieval, citation verification, and autonomous agent workflows with zero data leakage.",
    examples: ["Custom RAG Pipelines", "Private LLMs (Llama.cpp)", "Document Intelligence", "Autonomous Agents", "Citation Grounding"],
  },
  {
    index: "02",
    icon: "⟳",
    title: "Business Automation",
    badge: "WORKFLOW ENGINE",
    description:
      "Automate manual business operations, multi-stage approval chains, asynchronous webhook pipelines, and real-time enterprise data synchronization.",
    examples: ["Workflow Automation", "API Orchestration", "Approval Pipelines", "Event Webhooks", "Process Optimization"],
  },
  {
    index: "03",
    icon: "◫",
    title: "Custom Web Applications",
    badge: "FULL-STACK PLATFORM",
    description:
      "High-performance React, TypeScript, and FastAPI applications architected for reliability, responsive UI performance, and secure cloud deployment.",
    examples: ["Executive Dashboards", "Internal Tools", "SaaS MVPs", "Custom Client Portals", "FastAPI Backends"],
  },
  {
    index: "04",
    icon: "◈",
    title: "Data & Analytics",
    badge: "ANALYTICS & BI",
    description:
      "Transform fragmented operational data into clean relational schemas, automated analytical pipelines, and real-time executive reporting dashboards.",
    examples: ["Relational Modeling", "Real-Time Telemetry", "Automated Reporting", "Predictive Analytics", "Data Hygiene"],
  },
  {
    index: "05",
    icon: "⌥",
    title: "System Integration",
    badge: "ENTERPRISE CONNECT",
    description:
      "Bridge proprietary databases, SAP BTP services, payment gateways, and third-party SaaS APIs into cohesive, resilient software ecosystems.",
    examples: ["SAP BTP & S/4HANA", "Zoho Books APIs", "Payment Gateways", "OData & REST", "VPC & Edge Relays"],
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
          Zero speculative bloat — only clean, scalable software architected around your core business requirements.
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
            {/* Sleek Minimalist Topbar */}
            <div className="fl-service-topbar">
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
