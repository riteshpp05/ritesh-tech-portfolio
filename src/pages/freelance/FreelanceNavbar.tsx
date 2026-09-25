import { useNavigate, useLocation } from "react-router-dom";
import { scrollToLenis } from "../../components/utils/lenisProvider";
import HoverLinks from "../../components/HoverLinks";

const FreelanceNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isFreelance = location.pathname === "/freelance";
  const isProjectPage = location.pathname.startsWith("/projects/");

  const handlePortfolioNav = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    if (isProjectPage || isFreelance) {
      navigate("/" + hash);
    } else {
      scrollToLenis(hash, { offset: -20, duration: 1.3 });
    }
  };

  return (
    <>
      {/* Frosted glass background layer */}
      <div className="fl-navbar-bg" aria-hidden="true" />

      <nav className="fl-navbar" aria-label="Freelance page navigation">
        {/* Logo */}
        <a
          href="/"
          className="fl-navbar-logo"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
          aria-label="Go to portfolio homepage"
        >
          <img src="/logo.png" alt="Ritesh Patil" />
        </a>

        {/* Nav links — ABOUT and CASE STUDIES only (no WORK on freelance page) */}
        <ul className="fl-navbar-links" role="list">
          <li>
            <a
              href="/#about"
              onClick={(e) => handlePortfolioNav(e, "#about")}
            >
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a
              href="/projects/mdr"
              onClick={(e) => {
                e.preventDefault();
                navigate("/projects/mdr");
              }}
            >
              <HoverLinks text="CASE STUDIES" />
            </a>
          </li>
          <li>
            <a
              href="/freelance"
              className={isFreelance ? "fl-nav-active" : ""}
              onClick={(e) => {
                e.preventDefault();
                if (!isFreelance) navigate("/freelance");
                else scrollToLenis(0, { duration: 1.2 });
              }}
            >
              <HoverLinks text="FREELANCE" />
            </a>
          </li>
        </ul>

        {/* Primary CTA */}
        <a
          href="#inquiry"
          className="fl-navbar-cta"
          onClick={(e) => {
            e.preventDefault();
            scrollToLenis("#inquiry", { offset: -20, duration: 1.3 });
          }}
        >
          Start a Project ↗
        </a>
      </nav>
    </>
  );
};

export default FreelanceNavbar;
