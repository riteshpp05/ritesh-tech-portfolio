import { useReveal } from "../../hooks/useReveal";
import { useNavigate } from "react-router-dom";

const FreelancePortfolioLink = () => {
  const refs = useReveal(1, 0.15);
  const navigate = useNavigate();

  return (
    <section
      className="fl-portfolio-section"
      id="portfolio-link"
      aria-label="Link to full 3D portfolio"
    >
      <div className="fl-container">
        <div className="fl-portfolio-box fl-reveal" ref={(el) => (refs.current[0] = el)}>
          <div className="fl-portfolio-tag-pill">INTERACTIVE 3D EXPERIENCE</div>
          <h2 className="fl-portfolio-heading">CURIOUS ABOUT MY BROADER ENGINEERING PROFILE?</h2>
          <p className="fl-portfolio-sub">
            Explore my interactive 3D workstation, complete career trajectory, technical skill index,
            and software journey across robotics, computer vision, and enterprise platforms.
          </p>
          <button
            className="fl-btn-primary"
            onClick={() => navigate("/")}
            aria-label="View the full 3D Ritesh Patil portfolio"
          >
            VIEW FULL 3D PORTFOLIO →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FreelancePortfolioLink;
