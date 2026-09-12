import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type RefObject,
} from 'react';
import { projects } from '../data/projectData';
import type { Project } from '../types/projectTypes';
import './styles/ProjectViewerModal.css';

// ─── Sub-components ──────────────────────────────────────────────────────────

/** Code block with copy */
const CodeBlock = ({
  language,
  label,
  code,
  explanation,
}: {
  language: string;
  label: string;
  code: string;
  explanation: string;
}) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };
  return (
    <div className="pv-code-block">
      <div className="pv-code-header">
        <div>
          <span>{language}</span>
          {label && <span className="pv-code-label"> — {label}</span>}
        </div>
        <button className="pv-code-copy" onClick={copy}>
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <div className="pv-code-content">
        <pre><code>{code}</code></pre>
      </div>
      {explanation && (
        <div className="pv-code-explanation">{explanation}</div>
      )}
    </div>
  );
};

// ─── Table of Contents ───────────────────────────────────────────────────────

const TOC_SECTIONS = [
  { id: 'overview',   label: 'Overview'              },
  { id: 'problem',    label: 'Problem'               },
  { id: 'goals',      label: 'Goals'                 },
  { id: 'role',       label: 'My Role'               },
  { id: 'arch',       label: 'Architecture'          },
  { id: 'deep-dive',  label: 'Technical Deep Dive'   },
  { id: 'decisions',  label: 'Engineering Decisions' },
  { id: 'challenges', label: 'Challenges'            },
  { id: 'flow',       label: 'End-to-End Flow'       },
  { id: 'tech-stack', label: 'Technology Stack'      },
  { id: 'outcome',    label: 'Outcome'               },
  { id: 'learnings',  label: 'Learnings'             },
];

const TocDesktop = ({
  active,
  scrollRef,
}: {
  active: string;
  scrollRef: RefObject<HTMLDivElement | null>;
}) => {
  const handleClick = (id: string) => {
    const el = scrollRef.current?.querySelector(`#${id}`) as HTMLElement | null;
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <nav className="pv-toc-rail" aria-label="Table of contents">
      <div className="pv-toc-title">Contents</div>
      <ul className="pv-toc-list">
        {TOC_SECTIONS.map((s, i) => (
          <li key={s.id} className="pv-toc-item">
            <button
              className={`pv-toc-btn${active === s.id ? ' pv-toc-active' : ''}`}
              onClick={() => handleClick(s.id)}
              aria-current={active === s.id ? 'true' : undefined}
            >
              <span className="pv-toc-num">{String(i + 1).padStart(2, '0')}</span>
              {s.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const TocMobile = ({
  active,
  scrollRef,
}: {
  active: string;
  scrollRef: RefObject<HTMLDivElement | null>;
}) => {
  const [open, setOpen] = useState(false);
  const handleClick = (id: string) => {
    const el = scrollRef.current?.querySelector(`#${id}`) as HTMLElement | null;
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOpen(false);
  };
  const activeLabel = TOC_SECTIONS.find(s => s.id === active)?.label ?? 'Contents';
  return (
    <div className="pv-toc-mobile">
      <button
        className="pv-toc-mobile-toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>Contents — {activeLabel}</span>
        <span className={`pv-toc-mobile-toggle-icon${open ? ' open' : ''}`}>▾</span>
      </button>
      {open && (
        <ul className="pv-toc-mobile-list" role="list">
          {TOC_SECTIONS.map((s, i) => (
            <li key={s.id}>
              <button
                className={`pv-toc-mobile-btn${active === s.id ? ' pv-toc-active' : ''}`}
                onClick={() => handleClick(s.id)}
              >
                <span className="pv-toc-num">{String(i + 1).padStart(2, '0')}</span>
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ─── Main Modal ───────────────────────────────────────────────────────────────

interface Props {
  slug: string;
  onClose: () => void;
  onNavigate: (slug: string) => void;
}

const ProjectViewerModal = ({ slug, onClose, onNavigate }: Props) => {
  const project = projects.find((p: Project) => p.slug === slug)!;
  const currentIndex = projects.findIndex((p: Project) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : undefined;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : undefined;

  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const [activeSection, setActiveSection] = useState('overview');
  const [isClosing, setIsClosing] = useState(false);

  // Smooth close with exit animation
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => onClose(), 220);
  }, [onClose]);

  // ── Escape key & focus ────────────────────────────────────────────────────
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKeyDown);
    // Move focus to close button
    requestAnimationFrame(() => closeRef.current?.focus());
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [handleClose]);

  // ── Scroll-to-top when project switches ──────────────────────────────────
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
    setActiveSection('overview');
    sectionRefs.current.clear();
  }, [slug]);

  // ── IntersectionObserver for active ToC tracking ──────────────────────────
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const observers: IntersectionObserver[] = [];

    sectionRefs.current.forEach((el, id) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { root, rootMargin: '-80px 0px -60% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [slug]);

  // ── Fade-in observer ─────────────────────────────────────────────────────
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const fadeEls = root.querySelectorAll('.pv-fade-in');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('pv-visible');
      }),
      { root, threshold: 0.08 }
    );
    fadeEls.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [slug]);

  // ── setRef helper ─────────────────────────────────────────────────────────
  const setRef = (id: string) => (el: HTMLElement | null) => {
    if (el) sectionRefs.current.set(id, el);
  };

  // ── Backdrop click ────────────────────────────────────────────────────────
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  if (!project) return null;

  return (
    <div
      className={`pv-backdrop${isClosing ? ' pv-closing' : ''}`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pv-dialog-title"
    >
      <div className="pv-panel" ref={panelRef}>

        {/* ── HEADER ── */}
        <div className="pv-header">
          <div className="pv-header-left">
            <span className="pv-header-badge">Case Study</span>
            <span className="pv-header-title" id="pv-dialog-title">
              {project.title}
            </span>
          </div>
          <button
            className="pv-close-btn"
            onClick={handleClose}
            ref={closeRef}
            aria-label="Close project viewer"
          >
            ✕
          </button>
        </div>

        {/* ── SCROLLABLE AREA ── */}
        <div className="pv-scroll" ref={scrollRef}>

          {/* ── HERO ── */}
          <div className="pv-hero">
            <div className="pv-hero-eyebrow">{project.domain}</div>
            <h1 className="pv-hero-title">{project.title}</h1>
            <p className="pv-hero-subtitle">{project.subtitle}</p>
            <div className="pv-hero-meta">
              <div className="pv-hero-meta-item">
                <span className="pv-hero-meta-label">Role</span>
                <span className="pv-hero-meta-value">{project.role}</span>
              </div>
              <div className="pv-hero-meta-item">
                <span className="pv-hero-meta-label">Platform</span>
                <span className="pv-hero-meta-value">{project.platform}</span>
              </div>
              <div className="pv-hero-meta-item">
                <span className="pv-hero-meta-label">Stack</span>
                <span className="pv-hero-meta-value">{project.stackSummary}</span>
              </div>
            </div>
            <div className="pv-hero-actions">
              <button
                className="pv-btn pv-btn-primary"
                onClick={() => {
                  const el = scrollRef.current?.querySelector('#arch') as HTMLElement | null;
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                View Architecture ↓
              </button>
              {project.github && (
                <a
                  className="pv-btn pv-btn-outline"
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub ↗
                </a>
              )}
              {project.liveDemo && (
                <a
                  className="pv-btn pv-btn-outline"
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo ↗
                </a>
              )}
            </div>
            {project.heroImage && (
              <div className="pv-hero-image">
                <img
                  src={project.heroImage}
                  alt={`${project.title} — project screenshot`}
                  loading="lazy"
                />
              </div>
            )}
          </div>

          {/* ── MOBILE TOC ── */}
          <TocMobile active={activeSection} scrollRef={scrollRef} />

          {/* ── BODY: ToC rail + Content ── */}
          <div className="pv-body">
            <TocDesktop active={activeSection} scrollRef={scrollRef} />

            {/* ── CONTENT ── */}
            <div className="pv-content">

              {/* 01 Overview */}
              <div className="pv-section pv-fade-in" id="overview" ref={setRef('overview')}>
                <div className="pv-section-header">
                  <span className="pv-section-num">01</span>
                  <h2 className="pv-section-title">Overview</h2>
                </div>
                {project.overview.map((p, i) => <p key={i}>{p}</p>)}
              </div>

              {/* 02 Problem */}
              <div className="pv-section pv-fade-in" id="problem" ref={setRef('problem')}>
                <div className="pv-section-header">
                  <span className="pv-section-num">02</span>
                  <h2 className="pv-section-title">The Problem</h2>
                </div>
                {project.problem.map((p, i) => <p key={i}>{p}</p>)}
              </div>

              {/* 03 Goals */}
              <div className="pv-section pv-fade-in" id="goals" ref={setRef('goals')}>
                <div className="pv-section-header">
                  <span className="pv-section-num">03</span>
                  <h2 className="pv-section-title">Goals</h2>
                </div>
                <ul className="pv-list">
                  {project.goals.map((g, i) => <li key={i}>{g}</li>)}
                </ul>
              </div>

              {/* 04 My Role */}
              <div className="pv-section pv-fade-in" id="role" ref={setRef('role')}>
                <div className="pv-section-header">
                  <span className="pv-section-num">04</span>
                  <h2 className="pv-section-title">My Role</h2>
                </div>
                {project.myRole.map((p, i) => <p key={i}>{p}</p>)}
              </div>

              {/* 05 Architecture */}
              <div className="pv-section pv-fade-in" id="arch" ref={setRef('arch')}>
                <div className="pv-section-header">
                  <span className="pv-section-num">05</span>
                  <h2 className="pv-section-title">Architecture</h2>
                </div>
                {project.architectureDescription && <p>{project.architectureDescription}</p>}
                <div style={{ marginTop: '16px' }}>
                  {project.architectureFlows.map((flow, i) => (
                    <div key={i} className="pv-arch-flow">
                      <div className="pv-arch-flow-title">{flow.title}</div>
                      <div className="pv-arch-nodes">
                        {flow.nodes.map((node, j) => (
                          <span key={j} style={{ display: 'contents' }}>
                            <div className="pv-arch-node" title={node.description}>
                              {node.label}
                            </div>
                            {j < flow.nodes.length - 1 && (
                              <span className="pv-arch-arrow">→</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 06 Technical Deep Dive */}
              <div className="pv-section pv-fade-in" id="deep-dive" ref={setRef('deep-dive')}>
                <div className="pv-section-header">
                  <span className="pv-section-num">06</span>
                  <h2 className="pv-section-title">Technical Deep Dive</h2>
                </div>
                {project.technicalSections.map((section, i) => (
                  <div key={i} className="pv-subsection">
                    <h3 className="pv-subsection-title">{section.title}</h3>
                    {section.content.map((p, j) => <p key={j}>{p}</p>)}
                    {section.codeExample && (
                      <CodeBlock
                        language={section.codeExample.language}
                        label={section.codeExample.label}
                        code={section.codeExample.code}
                        explanation={section.codeExample.explanation}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* 07 Engineering Decisions */}
              <div className="pv-section pv-fade-in" id="decisions" ref={setRef('decisions')}>
                <div className="pv-section-header">
                  <span className="pv-section-num">07</span>
                  <h2 className="pv-section-title">Key Engineering Decisions</h2>
                </div>
                <div className="pv-decisions">
                  {project.engineeringDecisions.map((d, i) => (
                    <div key={i} className="pv-decision">
                      <p className="pv-decision-q">{d.question}</p>
                      <p className="pv-decision-a">{d.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 08 Challenges */}
              <div className="pv-section pv-fade-in" id="challenges" ref={setRef('challenges')}>
                <div className="pv-section-header">
                  <span className="pv-section-num">08</span>
                  <h2 className="pv-section-title">Challenges &amp; Solutions</h2>
                </div>
                <div className="pv-challenges">
                  {project.challenges.map((c, i) => (
                    <div key={i} className="pv-challenge-card">
                      <div className="pv-challenge-block">
                        <span className="pv-challenge-label challenge">Challenge</span>
                        <p className="pv-challenge-text">{c.challenge}</p>
                      </div>
                      <div className="pv-challenge-block">
                        <span className="pv-challenge-label solution">Solution</span>
                        <p className="pv-challenge-text">{c.solution}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 09 End-to-End Flow */}
              <div className="pv-section pv-fade-in" id="flow" ref={setRef('flow')}>
                <div className="pv-section-header">
                  <span className="pv-section-num">09</span>
                  <h2 className="pv-section-title">End-to-End Flow</h2>
                </div>
                <div className="pv-flow">
                  {project.endToEndFlow.map((step, i) => (
                    <span key={i} style={{ display: 'contents' }}>
                      <div className="pv-flow-step" title={step.description}>
                        {step.label}
                      </div>
                      {i < project.endToEndFlow.length - 1 && (
                        <span className="pv-flow-arrow">→</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {/* 10 Tech Stack */}
              <div className="pv-section pv-fade-in" id="tech-stack" ref={setRef('tech-stack')}>
                <div className="pv-section-header">
                  <span className="pv-section-num">10</span>
                  <h2 className="pv-section-title">Technology Stack</h2>
                </div>
                <div className="pv-tech-grid">
                  {project.techStack.map((cat, i) => (
                    <div key={i} className="pv-tech-category">
                      <div className="pv-tech-category-title">{cat.category}</div>
                      <div className="pv-tech-items">
                        {cat.items.map((item, j) => (
                          <span key={j} className="pv-tech-tag">{item}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 11 Outcome */}
              <div className="pv-section pv-fade-in" id="outcome" ref={setRef('outcome')}>
                <div className="pv-section-header">
                  <span className="pv-section-num">11</span>
                  <h2 className="pv-section-title">Outcome</h2>
                </div>
                <ul className="pv-list">
                  {project.outcome.map((o, i) => <li key={i}>{o}</li>)}
                </ul>
              </div>

              {/* 12 Learnings */}
              <div className="pv-section pv-fade-in" id="learnings" ref={setRef('learnings')}>
                <div className="pv-section-header">
                  <span className="pv-section-num">12</span>
                  <h2 className="pv-section-title">What I Learned</h2>
                </div>
                <div className="pv-learnings">
                  {project.learnings.map((l, i) => (
                    <p key={i} style={{ margin: i < project.learnings.length - 1 ? '0 0 12px' : '0' }}>
                      {l}
                    </p>
                  ))}
                </div>
              </div>

              {/* ── CTA ── */}
              <div className="pv-cta pv-fade-in">
                <p className="pv-cta-label">Interested in the implementation?</p>
                <div className="pv-cta-links">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pv-btn pv-btn-outline"
                    >
                      GitHub ↗
                    </a>
                  )}
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pv-btn pv-btn-outline"
                    >
                      Live Demo ↗
                    </a>
                  )}
                  <a
                    href="https://www.linkedin.com/in/riteshpatil-32946b26b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pv-btn pv-btn-outline"
                  >
                    LinkedIn ↗
                  </a>
                  <button className="pv-btn pv-btn-primary" onClick={handleClose}>
                    ← Back to Portfolio
                  </button>
                </div>
              </div>

              {/* ── Prev / Next ── */}
              <nav className="pv-project-nav" aria-label="Project navigation">
                <div>
                  {prevProject ? (
                    <button
                      className="pv-nav-btn"
                      onClick={() => onNavigate(prevProject.slug)}
                    >
                      <span className="pv-nav-label">← Previous</span>
                      <span className="pv-nav-title">{prevProject.title}</span>
                    </button>
                  ) : (
                    <button className="pv-nav-btn" onClick={handleClose}>
                      <span className="pv-nav-label">←</span>
                      <span className="pv-nav-title">Back to Portfolio</span>
                    </button>
                  )}
                </div>
                <div>
                  {nextProject && (
                    <button
                      className="pv-nav-btn pv-nav-next"
                      onClick={() => onNavigate(nextProject.slug)}
                    >
                      <span className="pv-nav-label">Next →</span>
                      <span className="pv-nav-title">{nextProject.title}</span>
                    </button>
                  )}
                </div>
              </nav>

            </div>{/* /pv-content */}
          </div>{/* /pv-body */}
        </div>{/* /pv-scroll */}
      </div>{/* /pv-panel */}
    </div>
  );
};

// ─── Exported wrapper with scroll-lock ──────────────────────────────────────

interface ProjectViewerProps {
  slug: string | null;
  onClose: () => void;
  onNavigate: (slug: string) => void;
}

const ProjectViewer = ({ slug, onClose, onNavigate }: ProjectViewerProps) => {
  const savedScrollY = useRef(0);

  // Lock body scroll when modal opens; restore when it closes
  useEffect(() => {
    if (!slug) return;

    // Save and lock
    savedScrollY.current = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${savedScrollY.current}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    return () => {
      // Restore
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo({ top: savedScrollY.current, behavior: 'instant' });
    };
  }, [slug]);

  if (!slug) return null;

  return (
    <ProjectViewerModal
      slug={slug}
      onClose={onClose}
      onNavigate={onNavigate}
    />
  );
};

export default ProjectViewer;
