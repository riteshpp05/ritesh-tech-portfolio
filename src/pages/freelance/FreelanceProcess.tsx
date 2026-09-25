import { useRef, useEffect } from "react";

const STEPS = [
  { number: "01", title: "Discover", description: "Understand your business problem, goals, users, and technical requirements before writing a line of code." },
  { number: "02", title: "Design", description: "Define the solution architecture, workflow, integrations, and a clear implementation plan." },
  { number: "03", title: "Build", description: "Develop, integrate, and test the solution with production quality from day one." },
  { number: "04", title: "Deploy", description: "Move the solution into a production-ready environment with proper CI/CD and infrastructure." },
  { number: "05", title: "Improve", description: "Monitor, optimise, and extend the solution as your business grows and requirements evolve." },
];

const FreelanceProcess = () => {
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("fl-visible");
        });
      },
      { threshold: 0.12 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    stepRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="fl-reveal" ref={headerRef}>
        <span className="fl-section-label">Process</span>
        <h2 className="fl-section-heading">From idea to production.</h2>
        <p className="fl-section-sub">
          A structured engineering process that keeps projects predictable,
          communication clear, and delivery on track.
        </p>
      </div>

      <div className="fl-process-grid" role="list">
        <div className="fl-process-connector" aria-hidden="true" />
        {STEPS.map((step, i) => (
          <div
            key={step.number}
            className="fl-process-step"
            ref={(el) => (stepRefs.current[i] = el)}
            style={{ transitionDelay: `${i * 100}ms` }}
            role="listitem"
          >
            <div className="fl-process-node" aria-label={`Step ${step.number}`}>
              {step.number}
            </div>
            <h3 className="fl-process-title">{step.title}</h3>
            <p className="fl-process-desc">{step.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default FreelanceProcess;
