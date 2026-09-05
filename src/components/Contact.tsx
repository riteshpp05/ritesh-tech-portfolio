import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <footer className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h2>Contact</h2>
        <div className="contact-flex">
          <div className="contact-box">
            <h3>Connect</h3>
            <p>
              <a
                href="https://www.linkedin.com/in/riteshpatil-32946b26b"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="disable"
              >
                LinkedIn — riteshpatil
              </a>
            </p>
            <h3>Education</h3>
            <p>
              PG Diploma in AI &amp; ML, MIT World Peace University — 2024–2025
            </p>
            <p>
              B.Sc Computer Science, Abasaheb Garware College —
              2020–2023
            </p>
          </div>
          <div className="contact-box">
            <h3>Social</h3>
            <a
              href="https://github.com/riteshpp05"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
              aria-label="Visit Ritesh Patil on GitHub"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/riteshpatil-32946b26b"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
              aria-label="Connect with Ritesh Patil on LinkedIn"
            >
              LinkedIn <MdArrowOutward />
            </a>
            <a
              href="mailto:riteshpatil702811@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
              aria-label="Email Ritesh Patil"
            >
              Email <MdArrowOutward />
            </a>
            <a
              href="tel:+917028111146"
              data-cursor="disable"
              className="contact-social"
              aria-label="Call Ritesh Patil"
            >
              Phone <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <p className="contact-credit">
              Designed and Developed <br /> by <span>Ritesh Patil</span>
            </p>
            <p className="contact-copyright">
              <MdCopyright /> 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
