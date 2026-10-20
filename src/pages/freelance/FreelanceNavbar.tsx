import { useNavigate, useLocation } from "react-router-dom";
import { scrollToLenis } from "../../components/utils/lenisProvider";

const FreelanceNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isFreelance = location.pathname === "/freelance";

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    if (!isFreelance) {
      navigate("/freelance" + hash);
    } else {
      scrollToLenis(hash, { offset: -24, duration: 1.2 });
    }
  };

  return (
    <>
      <header className="fl-navbar-wrapper" role="banner">
        <nav className="fl-navbar" aria-label="Freelance navigation">
          {/* Logo & Brand */}
          <div className="fl-navbar-brand">
            <a
              href="/"
              className="fl-navbar-logo"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
              aria-label="Go to portfolio homepage"
            >
              <img src="/logo.png" alt="Ritesh Patil Logo" />
              <span className="fl-navbar-logo-text">RITESH PATIL</span>
            </a>
            <span className="fl-nav-badge-pill">FREELANCE</span>
          </div>

          {/* Nav links */}
          <ul className="fl-navbar-links" role="list">
            <li>
              <a
                href="#services"
                onClick={(e) => handleNavClick(e, "#services")}
              >
                SERVICES
              </a>
            </li>
            <li>
              <a
                href="#case-studies"
                onClick={(e) => handleNavClick(e, "#case-studies")}
              >
                CASE STUDIES
              </a>
            </li>
            <li>
              <a
                href="#process"
                onClick={(e) => handleNavClick(e, "#process")}
              >
                PROCESS
              </a>
            </li>
            <li>
              <a
                href="#engagement"
                onClick={(e) => handleNavClick(e, "#engagement")}
              >
                ENGAGEMENT
              </a>
            </li>
            <li>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                }}
                className="fl-nav-portfolio-link"
              >
                3D PORTFOLIO ↗
              </a>
            </li>
          </ul>

          {/* Primary CTA */}
          <a
            href="#inquiry"
            className="fl-navbar-cta"
            onClick={(e) => {
              e.preventDefault();
              scrollToLenis("#inquiry", { offset: -24, duration: 1.2 });
            }}
          >
            START A PROJECT ↗
          </a>
        </nav>
      </header>
    </>
  );
};

export default FreelanceNavbar;
