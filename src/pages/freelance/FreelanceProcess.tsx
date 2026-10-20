import { useReveal } from "../../hooks/useReveal";

const STEPS = [
  {
    number: "01",
    title: "Discover & Scope",
    description: "Define core business objectives, constraints, data privacy requirements, and verifiable success criteria before writing code.",
  },
  {
    number: "02",
    title: "Architecture Design",
    description: "Map schemas, API contracts, LLM inference topology, and a concrete milestone delivery plan with deterministic verification.",
  },
  {
    number: "03",
    title: "Production Build",
    description: "Implement the software with defensive error boundaries, strictly typed schemas, automated tests, and containerized deployment.",
  },
  {
    number: "04",
    title: "CI/CD & Deployment",
    description: "Deploy to your infrastructure (AWS, private VPC, on-premise, Docker) with comprehensive documentation and complete IP transfer.",
  },
  {
    number: "05",
    title: "Support & Scaling",
    description: "Monitor latency, optimize vector indices, fine-tune inference pipelines, and iterate as business demands expand.",
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
          A predictable, transparent workflow engineered for velocity without compromising code quality, testing rigor, or security.
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
