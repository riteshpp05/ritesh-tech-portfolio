import { useReveal } from "../../hooks/useReveal";
import { scrollToLenis } from "../../components/utils/lenisProvider";

const FreelanceFinalCTA = () => {
  const refs = useReveal(1, 0.15);

  return (
    <section
      className="fl-final-cta"
      id="cta"
      aria-label="Final call to action"
    >
      <div className="fl-container">
        <div className="fl-final-box fl-reveal" ref={(el) => (refs.current[0] = el)}>
          <div className="fl-final-badge">READY TO EXECUTE</div>
          <h2 className="fl-final-heading">
            HAVE AN AI WORKFLOW, CUSTOM PLATFORM, OR AUTOMATION BOTTLENECK?
          </h2>
          <p className="fl-final-sub">
            Let's turn your concept into reliable, test-driven, production-ready software.
          </p>
          <div className="fl-final-ctas">
            <a
              href="#inquiry"
              className="fl-btn-primary"
              onClick={(e) => {
                e.preventDefault();
                scrollToLenis("#inquiry", { offset: -24, duration: 1.2 });
              }}
            >
              START A PROJECT ↗
            </a>
            <a
              href="mailto:riteshpatil702811@gmail.com"
              className="fl-btn-secondary"
            >
              EMAIL DIRECTLY ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreelanceFinalCTA;
