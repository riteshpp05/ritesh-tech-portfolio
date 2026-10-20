import { useReveal } from "../../hooks/useReveal";

const STEPS = [
  {
    number: "01",
    title: "Discover & Scope",
    color: "#FFE600",
    description: "Understand your core business constraint, data privacy requirements, and technical criteria before writing a line of code.",
  },
  {
    number: "02",
    title: "Architecture Design",
    color: "#B8FF00",
    description: "Map schemas, API contracts, LLM inference topology, and a concrete milestone delivery plan with deterministic verification.",
  },
  {
    number: "03",
    title: "Production Build",
    color: "#00F0FF",
    description: "Develop, containerize, and test the solution with clean types, error boundaries, and defensive backend handling from day one.",
  },
  {
    number: "04",
    title: "CI/CD & Deploy",
    color: "#FF6B00",
    description: "Deploy onto your infrastructure or cloud environment (AWS, private VPC, Docker) with full documentation and IP transfer.",
  },
  {
    number: "05",
    title: "Support & Optimize",
    color: "#D8B4FE",
    description: "Monitor latency, optimize vector queries or database indexing, and iterate as client traffic and requirements scale.",
  },
];

const FreelanceProcess = () => {
  const refs = useReveal(8, 0.12);

  return (
    <>
      <div className="fl-reveal" ref={(el) => (refs.current[7] = el)}>
        <span className="fl-section-label">Engineering Process</span>
        <h2 className="fl-section-heading">FROM INITIAL CONCEPT TO RUNNING SYSTEM.</h2>
        <p className="fl-section-sub">
          A predictable, transparent workflow designed for speed without sacrificing engineering rigor, code quality, or testing.
        </p>
      </div>

      <div className="fl-process-grid" role="list">
        {STEPS.map((step, i) => (
          <div
            key={step.number}
            className="fl-process-step fl-reveal"
            ref={(el) => (refs.current[i] = el)}
            style={{ transitionDelay: `${i * 90}ms` }}
            role="listitem"
          >
            <div
              className="fl-process-node"
              style={{ backgroundColor: step.color }}
              aria-label={`Step ${step.number}`}
            >
              {step.number}
            </div>
            <div className="fl-process-card">
              <h3 className="fl-process-title">{step.title}</h3>
              <p className="fl-process-desc">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FreelanceProcess;
