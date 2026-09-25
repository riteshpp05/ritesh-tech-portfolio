import { useRef, useEffect } from "react";

interface Service {
  icon: string;
  title: string;
  description: string;
  examples: string[];
}

const SERVICES: Service[] = [
  {
    icon: "⬡",
    title: "AI & Generative AI",
    description:
      "Build intelligent applications using LLMs, RAG, AI agents, document intelligence, and enterprise AI architectures.",
    examples: ["AI assistants", "RAG applications", "AI agents", "Document intelligence", "Enterprise copilots"],
  },
  {
    icon: "⟳",
    title: "Business Automation",
    description:
      "Automate repetitive business processes, approvals, notifications, data processing, and multi-step workflows.",
    examples: ["Workflow automation", "API integrations", "Approval workflows", "Process automation", "Notifications"],
  },
  {
    icon: "◫",
    title: "Custom Web Applications",
    description:
      "Design and develop production-ready websites, dashboards, portals, internal tools, and custom applications.",
    examples: ["Business websites", "Dashboards", "Internal tools", "SaaS applications", "Custom portals"],
  },
  {
    icon: "◈",
    title: "Data & Analytics",
    description:
      "Turn business data into actionable dashboards, insights, and predictive systems that inform decisions.",
    examples: ["Data analysis", "BI dashboards", "Predictive models", "Reporting systems", "Data pipelines"],
  },
  {
    icon: "⌥",
    title: "System Integration",
    description:
      "Connect APIs, databases, enterprise systems, and AI services into reliable, maintainable business workflows.",
    examples: ["REST APIs", "Database integrations", "Enterprise integrations", "AI integrations", "Cloud services"],
  },
];

const FreelanceServices = () => {
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("fl-visible");
        });
      },
      { threshold: 0.1 }
    );
    revealRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="fl-reveal" ref={(el) => (revealRefs.current[5] = el)}>
        <span className="fl-section-label">Services</span>
        <h2 className="fl-section-heading">What can I build for your business?</h2>
        <p className="fl-section-sub">
          From AI infrastructure to polished web products — end-to-end engineering
          grounded in your business goals.
        </p>
      </div>

      <div className="fl-services-grid" role="list">
        {SERVICES.map((service, i) => (
          <div
            key={service.title}
            className="fl-service-card fl-reveal"
            ref={(el) => (revealRefs.current[i] = el)}
            style={{ transitionDelay: `${i * 70}ms` }}
            role="listitem"
          >
            <div className="fl-service-icon" aria-hidden="true">{service.icon}</div>
            <h3 className="fl-service-title">{service.title}</h3>
            <p className="fl-service-desc">{service.description}</p>
            <div className="fl-service-examples">
              {service.examples.map((ex) => (
                <span key={ex} className="fl-service-tag">{ex}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FreelanceServices;
