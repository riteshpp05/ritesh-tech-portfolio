import { MdCopyright, MdArrowOutward } from "react-icons/md";

const FreelanceFooter = () => {
  return (
    <footer
      className="fl-footer"
      aria-label="Freelance page footer"
    >
      <div className="fl-container">
        <div className="fl-footer-inner">
          <div className="fl-footer-left">
            <span className="fl-footer-badge">AVAILABLE FOR CONTRACTS</span>
            <p className="fl-footer-copy">
              <MdCopyright style={{ verticalAlign: "middle" }} /> 2026 RITESH PATIL
              &nbsp;·&nbsp; AI/ML ENGINEER &amp; GENERATIVE AI DEVELOPER
            </p>
          </div>

          <nav className="fl-footer-links" aria-label="Footer navigation">
            <a
              href="https://github.com/riteshpp05"
              className="fl-footer-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ritesh Patil on GitHub"
            >
              GITHUB <MdArrowOutward style={{ verticalAlign: "middle" }} />
            </a>
            <a
              href="https://www.linkedin.com/in/riteshpatil-32946b26b"
              className="fl-footer-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ritesh Patil on LinkedIn"
            >
              LINKEDIN <MdArrowOutward style={{ verticalAlign: "middle" }} />
            </a>
            <a
              href="mailto:riteshpatil702811@gmail.com"
              className="fl-footer-link"
              aria-label="Email Ritesh Patil"
            >
              EMAIL <MdArrowOutward style={{ verticalAlign: "middle" }} />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default FreelanceFooter;
