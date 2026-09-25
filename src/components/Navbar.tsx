import { useLocation, useNavigate } from "react-router-dom";
import HoverLinks from "./HoverLinks";
import { scrollToLenis } from "./utils/lenisProvider";
import "./styles/Navbar.css";

interface NavbarProps {
  onOpenProject?: (slug: string) => void;
}

const Navbar = ({ onOpenProject }: NavbarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isProjectPage = location.pathname.startsWith('/projects/');
  const isFreelancePage = location.pathname === '/freelance';

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    if (isProjectPage || isFreelancePage) {
      navigate('/' + hash);
    } else {
      // Use Lenis smooth scroll for seamless interpolated transitions
      scrollToLenis(hash, { offset: -20, duration: 1.3 });
    }
  };

  const handleCaseStudiesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isProjectPage) {
      navigate('/projects/mdr');
    } else if (isFreelancePage) {
      navigate('/projects/mdr');
    } else if (onOpenProject) {
      onOpenProject('mdr');
    } else {
      scrollToLenis('#work', { offset: -20, duration: 1.3 });
    }
  };

  return (
    <>
      <div className="header">
        <a
          href="/"
          className="navbar-title"
          data-cursor="disable"
          style={{ display: 'flex', alignItems: 'center' }}
          onClick={(e) => {
            if (isProjectPage || isFreelancePage) {
              e.preventDefault();
              navigate('/');
            } else {
              e.preventDefault();
              scrollToLenis(0, { duration: 1.2 });
            }
          }}
        >
          <img src="/logo.png" alt="Ritesh Patil Logo" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
        </a>
        <a
          href="https://www.linkedin.com/in/riteshpatil-32946b26b"
          className="navbar-connect"
          data-cursor="disable"
          target="_blank"
          rel="noopener noreferrer"
        >
          linkedin.com/in/riteshpatil
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about" onClick={(e) => handleNavClick(e, '#about')}>
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a
              data-href="#case-studies"
              href="#case-studies"
              onClick={handleCaseStudiesClick}
              aria-label="View Project Case Studies & System Design"
            >
              <HoverLinks text="CASE STUDIES" />
            </a>
          </li>
          <li>
            <a
              href="/freelance"
              onClick={(e) => {
                e.preventDefault();
                navigate('/freelance');
              }}
              aria-label="Freelance AI & Software Development"
              style={isFreelancePage ? { color: 'var(--accent-cyan)' } : {}}
            >
              <HoverLinks text="FREELANCE" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
