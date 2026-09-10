import { useState } from 'react';

interface Section {
  id: string;
  label: string;
}

interface Props {
  sections: Section[];
  activeSection: string;
  mobile?: boolean;
}

const TableOfContents = ({ sections, activeSection, mobile }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    if (mobile) setIsOpen(false);
  };

  if (mobile) {
    return (
      <div className="case-study-toc-mobile">
        <button
          className="case-study-toc-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="toc-mobile-list"
        >
          <span>Contents</span>
          <span style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
            ▾
          </span>
        </button>
        {isOpen && (
          <nav id="toc-mobile-list" className="case-study-toc-mobile-list" aria-label="Table of contents">
            <ul className="case-study-toc-list">
              {sections.map((section, i) => (
                <li key={section.id} className="case-study-toc-item">
                  <button
                    className={`case-study-toc-link ${activeSection === section.id ? 'active' : ''}`}
                    onClick={() => handleClick(section.id)}
                  >
                    <span className="case-study-toc-number">{String(i + 1).padStart(2, '0')}</span>
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    );
  }

  return (
    <aside className="case-study-toc" aria-label="Table of contents">
      <div className="case-study-toc-title">Contents</div>
      <nav>
        <ul className="case-study-toc-list">
          {sections.map((section, i) => (
            <li key={section.id} className="case-study-toc-item">
              <button
                className={`case-study-toc-link ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => handleClick(section.id)}
              >
                <span className="case-study-toc-number">{String(i + 1).padStart(2, '0')}</span>
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default TableOfContents;
