import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type RefObject,
} from 'react';
import { projects } from '../data/projectData';
import { projectArchitectureTrees } from '../data/architectureTrees';
import type { Project } from '../types/projectTypes';
import { ArchitectureTree } from './casestudy/ArchitectureTree';
import { stopLenis, startLenis } from './utils/lenisProvider';
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
    <div className="pv-code-block" data-lenis-prevent="true">
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

// ─── 8 Streamlined Table of Contents Sections ────────────────────────────────

const TOC_SECTIONS = [
  { id: 'overview',       label: 'Project Overview'         },
  { id: 'why',            label: 'Why This Project?'        },
  { id: 'architecture',   label: 'System Architecture'      },
  { id: 'workflow',       label: 'End-to-End Workflow'      },
  { id: 'tech-decisions', label: 'Tech Stack & Decisions'   },
  { id: 'implementation', label: 'Technical Implementation' },
  { id: 'challenges',     label: 'Challenges & Solutions'   },
  { id: 'outcomes',       label: 'Outcomes & Learnings'     },
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
    <nav className="pv-toc-rail" aria-label="Table of contents" data-lenis-prevent="true">
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
    <div className="pv-toc-mobile" data-lenis-prevent="true">
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

  // Architecture tree resolution
  const archTree = projectArchitectureTrees[slug] ?? project.architectureTree;

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
    requestAnimationFrame(() => closeRef.current?.focus());
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [handleClose]);

  // ── Scroll-to-top when project switches ──────────────────────────────────
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'instant' });
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
        { root, rootMargin: '-60px 0px -60% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
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
      data-lenis-prevent="true"
    >
      <div
        className="pv-panel"
        ref={panelRef}
        data-lenis-prevent="true"
      >

        {/* ── STICKY HEADER ── */}
        <div className="pv-header" data-lenis-prevent="true">
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

        {/* ── INDEPENDENT INTERNAL SCROLL CONTAINER ── */}
        <div
          className="pv-scroll"
          ref={scrollRef}
          data-lenis-prevent="true"
          tabIndex={0}
        >

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
                <span className="pv-hero-meta-label">Core Stack</span>
                <span className="pv-hero-meta-value">{project.stackSummary}</span>
              </div>
            </div>
            <div className="pv-hero-actions">
              <button
                className="pv-btn pv-btn-primary"
                onClick={() => {
                  const el = scrollRef.current?.querySelector('#architecture') as HTMLElement | null;
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                View Architecture Tree ↓
              </button>
              {project.github && (
                <a
                  className="pv-btn pv-btn-outline"
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Source ↗
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

          {/* ── BODY: Left ToC Rail + Right Content ── */}
          <div className="pv-body" data-lenis-prevent="true">
            <TocDesktop active={activeSection} scrollRef={scrollRef} />

            {/* ── 8 STREAMLINED CONTENT SECTIONS ── */}
            <div className="pv-content" data-lenis-prevent="true">

              {/* SECTION 1: Overview */}
              <div className="pv-section" id="overview" ref={setRef('overview')}>
                <div className="pv-section-header">
                  <span className="pv-section-num">01</span>
                  <h2 className="pv-section-title">Project Overview</h2>
                </div>
                {project.overview.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                <div style={{ marginTop: '14px' }}>
                  <p style={{ fontWeight: 600, color: '#0f172a', marginBottom: '8px' }}>
                    Key Engineering Contributions:
                  </p>
                  <ul className="pv-list">
                    {project.myRole.slice(0, 4).map((roleItem, i) => (
                      <li key={i}>{roleItem}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* SECTION 2: Why This Project? (Problem → Solution → Value) */}
              <div className="pv-section" id="why" ref={setRef('why')}>
                <div className="pv-section-header">
                  <span className="pv-section-num">02</span>
                  <h2 className="pv-section-title">Why This Project?</h2>
                </div>
                <div className="pv-why-grid">
                  {/* Problem Card */}
                  <div className="pv-why-card problem">
                    <span className="pv-why-badge">🔴 The Problem</span>
                    <h4>Core Pain Point</h4>
                    <p>{project.problem[0]}</p>
                  </div>

                  {/* Solution Card */}
                  <div className="pv-why-card solution">
                    <span className="pv-why-badge">🔵 The Solution</span>
                    <h4>Engineered Architecture</h4>
                    <p>
                      {project.overview[1] ??
                        project.overview[0] ??
                        'A dedicated architecture engineered to resolve fragmented data flow and provide reliable execution.'}
                    </p>
                  </div>

                  {/* Value Card */}
                  <div className="pv-why-card value">
                    <span className="pv-why-badge">🟢 Tangible Value</span>
                    <h4>Primary Impact</h4>
                    <p>
                      {project.outcome[0] ??
                        project.goals[0] ??
                        'Delivered automated, reliable, and auditable operations.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 3: System Architecture (Tree Diagram) */}
              <div className="pv-section" id="architecture" ref={setRef('architecture')}>
                <div className="pv-section-header">
                  <span className="pv-section-num">03</span>
                  <h2 className="pv-section-title">System Architecture</h2>
                </div>
                {archTree ? (
                  <ArchitectureTree
                    tree={archTree}
                    description={
                      project.architectureDescription ??
                      'Clean hierarchical architecture breakdown demonstrating component isolation, data ingestion flow, business logic services, and downstream persistence.'
                    }
                  />
                ) : (
                  <p>Architecture details available in project documentation.</p>
                )}
              </div>

              {/* SECTION 4: End-to-End Workflow */}
              <div className="pv-section" id="workflow" ref={setRef('workflow')}>
                <div className="pv-section-header">
                  <span className="pv-section-num">04</span>
                  <h2 className="pv-section-title">End-to-End Workflow</h2>
                </div>
                <p>Sequential pipeline mapping user input through processing, execution, and persistence:</p>
                <div className="pv-workflow-pipeline">
                  {project.endToEndFlow.map((step, i) => (
                    <div key={i} className="pv-workflow-step-card">
                      <div className="pv-workflow-step-num">0{i + 1}</div>
                      <div className="pv-workflow-step-content">
                        <span className="pv-workflow-step-name">{step.label}</span>
                        {step.description && (
                          <p className="pv-workflow-step-desc">{step.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 5: Tech Stack & Key Decisions */}
              <div className="pv-section" id="tech-decisions" ref={setRef('tech-decisions')}>
                <div className="pv-section-header">
                  <span className="pv-section-num">05</span>
                  <h2 className="pv-section-title">Technology Stack &amp; Key Decisions</h2>
                </div>
                <div className="pv-tech-stack-container">
                  <div className="pv-tech-categories">
                    {project.techStack.map((cat, i) => (
                      <div key={i} className="pv-tech-category-card">
                        <div className="pv-tech-category-title">{cat.category}</div>
                        <div className="pv-tech-items">
                          {cat.items.map((item, j) => (
                            <span key={j} className="pv-tech-tag">{item}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {project.engineeringDecisions.length > 0 && (
                    <div className="pv-decisions-wrapper">
                      <div className="pv-decisions-title">
                        <span>Architecture Decision Rationale</span>
                      </div>
                      <div className="pv-decisions-grid">
                        {project.engineeringDecisions.map((d, i) => (
                          <div key={i} className="pv-decision">
                            <p className="pv-decision-q">{d.question}</p>
                            <p className="pv-decision-a">{d.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* SECTION 6: Technical Implementation */}
              <div className="pv-section" id="implementation" ref={setRef('implementation')}>
                <div className="pv-section-header">
                  <span className="pv-section-num">06</span>
                  <h2 className="pv-section-title">Technical Implementation</h2>
                </div>
                {project.technicalSections.map((section, i) => (
                  <div key={i} className="pv-subsection">
                    <h3 className="pv-subsection-title">{section.title}</h3>
                    {section.content.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
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

              {/* SECTION 7: Challenges & Solutions */}
              <div className="pv-section" id="challenges" ref={setRef('challenges')}>
                <div className="pv-section-header">
                  <span className="pv-section-num">07</span>
                  <h2 className="pv-section-title">Key Challenges &amp; Solutions</h2>
                </div>
                <div className="pv-challenges-grid">
                  {project.challenges.map((c, i) => (
                    <div key={i} className="pv-challenge-card">
                      <div className="pv-challenge-block">
                        <span className="pv-challenge-label challenge">Engineering Challenge</span>
                        <p className="pv-challenge-text">{c.challenge}</p>
                      </div>
                      <div className="pv-challenge-block">
                        <span className="pv-challenge-label solution">Implemented Solution</span>
                        <p className="pv-challenge-text">{c.solution}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 8: Outcomes & Learnings */}
              <div className="pv-section" id="outcomes" ref={setRef('outcomes')}>
                <div className="pv-section-header">
                  <span className="pv-section-num">08</span>
                  <h2 className="pv-section-title">Outcomes &amp; Learnings</h2>
                </div>
                <div className="pv-outcomes-wrapper">
                  <div className="pv-outcomes-card">
                    <h4 className="pv-outcomes-title">Delivered Results</h4>
                    <ul className="pv-list">
                      {project.outcome.map((o, i) => (
                        <li key={i}>{o}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pv-learnings-card">
                    <h4 className="pv-learnings-title">Engineering Takeaways</h4>
                    {project.learnings.map((l, i) => (
                      <p key={i} className="pv-learnings-text">{l}</p>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── PROJECT NAVIGATION (Prev / Next) ── */}
              <nav className="pv-project-nav" aria-label="Project navigation">
                <div>
                  {prevProject ? (
                    <button
                      className="pv-nav-btn"
                      onClick={() => onNavigate(prevProject.slug)}
                    >
                      <span className="pv-nav-label">← Previous Project</span>
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
                      <span className="pv-nav-label">Next Project →</span>
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

// ─── Exported wrapper with background scroll lock & Lenis pause ──────────────

interface ProjectViewerProps {
  slug: string | null;
  onClose: () => void;
  onNavigate: (slug: string) => void;
}

const ProjectViewer = ({ slug, onClose, onNavigate }: ProjectViewerProps) => {
  const savedScrollY = useRef(0);

  useEffect(() => {
    if (!slug) return;

    // 1. Capture current homepage scroll position
    savedScrollY.current = window.scrollY;

    // 2. Pause Lenis smooth scroll while popup is open
    stopLenis();

    // 3. Lock document body cleanly
    document.body.style.position = 'fixed';
    document.body.style.top = `-${savedScrollY.current}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    return () => {
      // 4. Release body lock
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';

      // 5. Restore exact homepage scroll position
      window.scrollTo({ top: savedScrollY.current, behavior: 'instant' });

      // 6. Resume Lenis smooth scroll
      startLenis();
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
