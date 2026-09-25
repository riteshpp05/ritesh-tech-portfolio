import { useRef, useEffect } from "react";
import { scrollToLenis } from "../../components/utils/lenisProvider";

const MODELS = [
  {
    title: "Project-Based",
    description: "For clearly defined applications, websites, and automation projects with a defined scope and deliverables.",
    note: "Most common for new web apps, AI tools, and automation systems.",
  },
  {
    title: "MVP Development",
    description: "For startups and founders who want to turn an idea into a working, testable product as efficiently as possible.",
    note: "Focused on core functionality, speed, and learning from real users.",
  },
  {
    title: "AI & Automation Consulting",
    description: "For businesses that need help designing the right technical architecture and solution before committing to a build.",
    note: "Ideal when you need to evaluate options first.",
  },
  {
    title: "Long-Term Engineering",
    description: "For businesses that need ongoing development, feature additions, maintenance, or dedicated technical support.",
    note: "Structured as a retainer or recurring engagement.",
  },
];

const FreelanceEngagement = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pricingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("fl-visible");
        });
      },
      { threshold: 0.08 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    if (pricingRef.current) observer.observe(pricingRef.current);
    cardRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="fl-reveal" ref={headerRef}>
        <span className="fl-section-label">Engagement</span>
        <h2 className="fl-section-heading">How we can work together.</h2>
        <p className="fl-section-sub">
          Different projects need different working arrangements. Here are the
          most common ways clients engage with me.
        </p>
      </div>

      <div className="fl-engagement-grid" role="list">
        {MODELS.map((model, i) => (
          <div
            key={model.title}
            className="fl-engagement-card fl-reveal"
            ref={(el) => (cardRefs.current[i] = el)}
            style={{ transitionDelay: `${i * 70}ms` }}
            role="listitem"
          >
            <h3 className="fl-engagement-title">{model.title}</h3>
            <p className="fl-engagement-desc">{model.description}</p>
            <p className="fl-engagement-note">{model.note}</p>
          </div>
        ))}
      </div>

      <div className="fl-engagement-pricing fl-reveal" ref={pricingRef}>
        <p className="fl-engagement-pricing-text">
          Pricing depends on scope, complexity, integrations, and ongoing
          support. Every project starts with a conversation about what you need
          to build.
        </p>
        <a
          href="#inquiry"
          className="fl-btn-primary"
          onClick={(e) => {
            e.preventDefault();
            scrollToLenis("#inquiry", { offset: -20, duration: 1.3 });
          }}
          style={{ flexShrink: 0 }}
        >
          Discuss Your Project ↗
        </a>
      </div>
    </>
  );
};

export default FreelanceEngagement;
