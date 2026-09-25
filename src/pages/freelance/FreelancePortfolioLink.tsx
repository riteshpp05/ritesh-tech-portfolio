import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FreelancePortfolioLink = () => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("fl-visible");
        });
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="fl-portfolio-section"
      id="portfolio-link"
      aria-label="Link to full portfolio"
    >
      <div className="fl-container">
        <div className="fl-reveal" ref={ref}>
          <span className="fl-section-label">Full Portfolio</span>
          <h2 className="fl-portfolio-heading">Want to know more about my work?</h2>
          <p className="fl-portfolio-sub">
            Explore my complete technical portfolio, engineering background,
            work experience, and full project case studies.
          </p>
          <button
            className="fl-btn-secondary"
            onClick={() => navigate("/")}
            aria-label="View the full Ritesh Patil portfolio"
          >
            View Full Portfolio →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FreelancePortfolioLink;
