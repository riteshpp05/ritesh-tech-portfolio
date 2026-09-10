import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HoverLinks from "./HoverLinks";
import "./styles/Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isProjectPage = location.pathname.startsWith('/projects/');

  useEffect(() => {
    if (isProjectPage) return; // Don't attach scroll listeners on project pages

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        const targetId = element.getAttribute("href")?.substring(1);
        const target = document.getElementById(targetId || "");
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }, [isProjectPage]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (isProjectPage) {
      e.preventDefault();
      navigate('/' + hash);
    }
  };

  return (
    <>
      <div className="header">
        <a href="/" className="navbar-title" data-cursor="disable" style={{ display: 'flex', alignItems: 'center' }}
          onClick={(e) => {
            if (isProjectPage) {
              e.preventDefault();
              navigate('/');
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
