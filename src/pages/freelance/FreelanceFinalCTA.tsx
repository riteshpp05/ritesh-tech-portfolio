import { useRef, useEffect } from "react";
import { scrollToLenis } from "../../components/utils/lenisProvider";

const FreelanceFinalCTA = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("fl-visible");
        });
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="fl-final-cta"
      id="cta"
      aria-label="Final call to action"
    >
      <div className="fl-container">
        <div className="fl-final-box fl-reveal" ref={ref}>
          <h2 className="fl-final-heading">
            Have an idea, a repetitive process, or a business problem you'd like to solve?
          </h2>
          <p className="fl-final-sub">
            Let's turn it into a practical, production-ready solution.
          </p>
          <div className="fl-final-ctas">
            <a
              href="#inquiry"
              className="fl-btn-primary"
              onClick={(e) => {
                e.preventDefault();
                scrollToLenis("#inquiry", { offset: -20, duration: 1.3 });
              }}
            >
              Start a Project ↗
            </a>
            <a
              href="mailto:riteshpatil702811@gmail.com"
              className="fl-btn-secondary"
            >
              Email Directly ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreelanceFinalCTA;
