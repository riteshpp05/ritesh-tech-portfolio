import { useReveal } from "../../hooks/useReveal";

const WHY_ITEMS = [
  { index: "01", icon: "◈", title: "Engineering-First Mindset", description: "Solutions architected for reliability, scalability, and long-term maintainability — never fragile hackathon scripts." },
  { index: "02", icon: "⬡", title: "Problem Before Technology", description: "I dissect the business objective first, then select the right lightweight tools — not force-fitting unnecessary trends." },
  { index: "03", icon: "▲", title: "Production-Oriented Code", description: "Defensive error handling, clean schemas, deterministic logging, and security best practices baked in from day zero." },
  { index: "04", icon: "◫", title: "End-to-End Execution", description: "Single-point ownership covering data pipelines, backend architecture, UI implementation, and containerized deployment." },
  { index: "05", icon: "⌥", title: "Pragmatic AI Architecture", description: "Local LLMs (Llama.cpp), hybrid vector search, LangChain, and SAP AI Core deployed where they solve real enterprise problems." },
  { index: "06", icon: "⌘", title: "Zero Agency Overhead", description: "You deal directly with the engineer designing and writing the code. Rapid iteration, zero telephone games, no inflated markups." },
  { index: "07", icon: "◷", title: "Transparent Communication", description: "Async-first updates, clear milestone demos, and actionable technical documentation so you always own your codebase." },
];

const FreelanceWhyMe = () => {
  const refs = useReveal(10, 0.08);

  return (
    <>
      <div className="fl-reveal" ref={(el) => (refs.current[9] = el)}>
        <span className="fl-section-label">Why Work With Me</span>
        <h2 className="fl-section-heading">ENGINEERING THAT SOLVES THE REAL BOTTLENECK.</h2>
        <p className="fl-section-sub">
          Not a marketing agency selling pre-packaged templates. An autonomous engineer who understands business logic and writes clean, production-grade software.
        </p>
      </div>

      <div className="fl-why-grid" role="list">
        {WHY_ITEMS.map((item, i) => (
          <div
            key={item.title}
            className="fl-why-item fl-reveal"
            ref={(el) => (refs.current[i] = el)}
            style={{ transitionDelay: `${i * 50}ms` }}
            role="listitem"
          >
            <div className="fl-why-top">
              <span className="fl-why-index">#{item.index}</span>
              <span className="fl-why-icon" aria-hidden="true">{item.icon}</span>
            </div>
            <h3 className="fl-why-title">{item.title}</h3>
            <p className="fl-why-desc">{item.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default FreelanceWhyMe;
