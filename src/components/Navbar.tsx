import { useLocation, useNavigate } from "react-router-dom";
import HoverLinks from "./HoverLinks";
import { scrollToLenis } from "./utils/lenisProvider";
import "./styles/Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isProjectPage = location.pathname.startsWith('/projects/');

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    if (isProjectPage) {
      navigate('/' + hash);
    } else {
      // Use Lenis smooth scroll for seamless interpolated transitions
      scrollToLenis(hash, { offset: -20, duration: 1.3 });
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
            if (isProjectPage) {
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
            <a data-href="#work" href="#work" onClick={(e) => handleNavClick(e, '#work')}>
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>
              <HoverLinks text="CONTACT" />
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
