import { useRef, useEffect } from "react";

const WHY_ITEMS = [
  { icon: "◈", title: "Engineering-first approach", description: "Solutions architected for reliability, scalability, and maintainability — not just to make a demo work." },
  { icon: "⬡", title: "Business problem before technology", description: "I start with what you need to achieve, then select the right technology — not the other way around." },
  { icon: "▲", title: "Production-oriented development", description: "Code written with security, error handling, deployment, and long-term maintenance in mind from the start." },
  { icon: "◫", title: "End-to-end implementation", description: "I handle the full stack — AI pipeline design, frontend, API, deployment, and documentation." },
  { icon: "⌥", title: "Modern AI architecture", description: "RAG, agentic AI, local LLM inference, LangChain, SAP AI Core — applied where they actually solve the problem." },
  { icon: "⌘", title: "Custom solutions over generic products", description: "Every business problem is specific. I build for your context, not a one-size-fits-all SaaS template." },
  { icon: "◷", title: "Clear communication throughout", description: "Regular updates, honest scope discussions, and decisions documented so you always know where the project stands." },
];

const FreelanceWhyMe = () => {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

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
    itemRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="fl-reveal" ref={headerRef}>
        <span className="fl-section-label">Why Work With Me</span>
        <h2 className="fl-section-heading">Engineering that solves the problem.</h2>
        <p className="fl-section-sub">
          Not a vendor selling a product. An engineer who understands your
          problem and builds the right solution for it.
        </p>
      </div>

      <div className="fl-why-grid" role="list">
        {WHY_ITEMS.map((item, i) => (
          <div
            key={item.title}
            className="fl-why-item fl-reveal"
            ref={(el) => (itemRefs.current[i] = el)}
            style={{ transitionDelay: `${i * 55}ms` }}
            role="listitem"
          >
            <span className="fl-why-icon" aria-hidden="true">{item.icon}</span>
            <h3 className="fl-why-title">{item.title}</h3>
            <p className="fl-why-desc">{item.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default FreelanceWhyMe;
