import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <section className="landing-section" id="landingDiv" aria-label="Introduction">
        <div className="landing-container">
          <div className="landing-intro">
            <span className="landing-greeting">Hello! I'm</span>
            <h1>
              RITESH
              <br />
              <span>PATIL</span>
            </h1>
          </div>
          <div className="landing-info">
            <h2>AI/ML Engineer &</h2>
            <h3 className="landing-info-h2">
              <div className="landing-h2-1">Generative AI</div>
              <div className="landing-h2-2">Engineer</div>
            </h3>
            <h3>
              <div className="landing-h2-info">Developer</div>
              <div className="landing-h2-info-1">Generative AI</div>
            </h3>
          </div>
        </div>
        {children}
      </section>
    </>
  );
};

export default Landing;
