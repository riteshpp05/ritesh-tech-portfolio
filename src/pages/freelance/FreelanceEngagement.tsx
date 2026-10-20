import { useReveal } from "../../hooks/useReveal";
import { scrollToLenis } from "../../components/utils/lenisProvider";

const MODELS = [
  {
    title: "Project-Based Build",
    badge: "FIXED SCOPE",
    color: "#FFE600",
    description: "For clearly defined web applications, AI integrations, and automation systems with specific requirements and milestones.",
    note: "✓ Milestone delivery · Defined timeline · Fixed deliverables",
  },
  {
    title: "MVP Development",
    badge: "FAST TURNAROUND",
    color: "#B8FF00",
    description: "For founders and early-stage teams aiming to bring a validated, working AI or web product to market within 2–4 weeks.",
    note: "✓ Core features first · Rapid iteration · Full IP handoff",
  },
  {
    title: "AI & System Consulting",
    badge: "ARCHITECTURE AUDIT",
    color: "#00F0FF",
    description: "For companies that need expert guidance designing vector search topology, local LLM feasibility, or SAP/cloud architectures before building.",
    note: "✓ Tech stack evaluation · Feasibility analysis · Architecture blueprint",
  },
  {
    title: "Dedicated Engineering",
    badge: "RETAINER",
    color: "#D8B4FE",
    description: "For scaling businesses needing continuous feature development, pipeline optimizations, maintenance, and technical ownership.",
    note: "✓ Guaranteed hours · Priority response · Ongoing roadmap execution",
  },
];

const FreelanceEngagement = () => {
  const refs = useReveal(8, 0.08);

  return (
    <>
      <div className="fl-reveal" ref={(el) => (refs.current[6] = el)}>
        <span className="fl-section-label">Engagement Models</span>
        <h2 className="fl-section-heading">HOW WE CAN WORK TOGETHER.</h2>
        <p className="fl-section-sub">
          Flexible structures tailored to your technical timeline and project complexity. Every engagement starts with a straightforward scoping discussion.
        </p>
      </div>

      <div className="fl-engagement-grid" role="list">
        {MODELS.map((model, i) => (
          <div
            key={model.title}
            className="fl-engagement-card fl-reveal"
            ref={(el) => (refs.current[i] = el)}
            style={{ transitionDelay: `${i * 70}ms` }}
            role="listitem"
          >
            <div className="fl-engagement-top" style={{ backgroundColor: model.color }}>
              <span className="fl-engagement-badge">{model.badge}</span>
            </div>
            <div className="fl-engagement-body">
              <h3 className="fl-engagement-title">{model.title}</h3>
              <p className="fl-engagement-desc">{model.description}</p>
              <div className="fl-engagement-note-box">
                <p className="fl-engagement-note">{model.note}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fl-engagement-pricing fl-reveal" ref={(el) => (refs.current[7] = el)}>
        <div className="fl-pricing-text-block">
          <span className="fl-pricing-tag">TRANSPARENT PRICING</span>
          <p className="fl-engagement-pricing-text">
            Engagements are priced based on technical scope, complexity, and timeline requirements.
            You receive clear deliverables, direct communication, and zero hidden markups.
          </p>
        </div>
        <a
          href="#inquiry"
          className="fl-btn-primary"
          onClick={(e) => {
            e.preventDefault();
            scrollToLenis("#inquiry", { offset: -24, duration: 1.2 });
          }}
          style={{ flexShrink: 0 }}
        >
          DISCUSS YOUR PROJECT ↗
        </a>
      </div>
    </>
  );
};

export default FreelanceEngagement;
