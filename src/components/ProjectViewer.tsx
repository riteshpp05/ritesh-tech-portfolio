import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { projects } from '../data/projectData';
import { projectArchitectureTrees } from '../data/architectureTrees';
import type { Project } from '../types/projectTypes';
import { ArchitectureTree } from './casestudy/ArchitectureTree';
import { stopLenis, startLenis } from './utils/lenisProvider';
import './styles/ProjectViewerModal.css';

// ─── 8 Concise Architecture-First Sections ────────────────────────────────────

const TOC_SECTIONS = [
  { id: 'snapshot',       label: 'Project Snapshot'       },
  { id: 'why',            label: 'Why This Project?'      },
  { id: 'architecture',   label: 'System Architecture'    },
  { id: 'workflow',       label: 'End-to-End Workflow'    },
  { id: 'tech',           label: 'Technology Stack'       },
  { id: 'contribution',   label: 'My Contribution'        },
  { id: 'challenges',     label: 'Key Challenges'         },
  { id: 'results',        label: 'Results & Next Steps'   },
];

// ─── Desktop ToC Rail ────────────────────────────────────────────────────────

const TocDesktop = ({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (id: string) => void;
}) => (
  <nav className="pv-toc-rail" aria-label="Table of contents" data-lenis-prevent="true">
    <div className="pv-toc-title">Contents</div>
    <ul className="pv-toc-list">
      {TOC_SECTIONS.map((s, i) => (
        <li key={s.id} className="pv-toc-item">
          <button
            className={`pv-toc-btn${active === s.id ? ' pv-toc-active' : ''}`}
            onClick={() => onSelect(s.id)}
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

// ─── Mobile ToC Dropdown ─────────────────────────────────────────────────────

const TocMobile = ({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (id: string) => void;
}) => {
  const [open, setOpen] = useState(false);
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
                onClick={() => { onSelect(s.id); setOpen(false); }}
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
  const [activeSection, setActiveSection] = useState('snapshot');
  const [isClosing, setIsClosing] = useState(false);

  // Architecture tree resolution
  const archTree = projectArchitectureTrees[slug] ?? project.architectureTree;

  // Smooth close with exit animation
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => onClose(), 220);
  }, [onClose]);

  // ── Escape key & focus ─────────────────────────────────────────────────
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKeyDown);
    requestAnimationFrame(() => closeRef.current?.focus());
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [handleClose]);

  // ── Scroll-to-top when project switches ─────────────────────────────
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'instant' });
    setActiveSection('snapshot');
  }, [slug]);

  const isScrollingToRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Scroll spy ────────────────────────────────────────────────────────
  const handleScroll = useCallback(() => {
    if (isScrollingToRef.current) return;

    const container = scrollRef.current;
    if (!container) return;

    // If scrolled to very bottom, activate last section
    if (container.scrollHeight - container.scrollTop - container.clientHeight <= 60) {
      setActiveSection(TOC_SECTIONS[TOC_SECTIONS.length - 1].id);
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const triggerLine = containerRect.top + 140;

    let current = TOC_SECTIONS[0].id;
    for (const section of TOC_SECTIONS) {
      const el = container.querySelector(`#${section.id}`) as HTMLElement | null;
      if (el && el.getBoundingClientRect().top <= triggerLine) {
        current = section.id;
      }
    }
    setActiveSection(current);
  }, []);

  // ── Programmatic smooth scroll to section ────────────────────────────
  const handleSelectSection = useCallback((id: string) => {
    const container = scrollRef.current;
    const el = container?.querySelector(`#${id}`) as HTMLElement | null;
    if (container && el) {
      isScrollingToRef.current = true;
      setActiveSection(id);

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingToRef.current = false;
      }, 700);

      const targetScroll =
        el.getBoundingClientRect().top -
        container.getBoundingClientRect().top +
        container.scrollTop - 24;

      container.scrollTo({
        top: Math.max(0, targetScroll),
        behavior: 'smooth',
      });
    }
  }, []);

  // ── Backdrop click ────────────────────────────────────────────────────
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
          onScroll={handleScroll}
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
                onClick={() => handleSelectSection('architecture')}
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
          </div>

          {/* ── MOBILE TOC ── */}
          <TocMobile active={activeSection} onSelect={handleSelectSection} />

          {/* ── BODY: Left ToC Rail + Right Content ── */}
          <div className="pv-body" data-lenis-prevent="true">
            <TocDesktop active={activeSection} onSelect={handleSelectSection} />

            <div className="pv-content" data-lenis-prevent="true">

              {/* ── SECTION 1: Project Snapshot ── */}
              <div className="pv-section" id="snapshot">
                <div className="pv-section-header">
                  <span className="pv-section-num">01</span>
                  <h2 className="pv-section-title">Project Snapshot</h2>
                </div>
                <div className="pv-snapshot-grid">
                  <div className="pv-snapshot-card">
                    <span className="pv-snapshot-label problem">Problem</span>
                    <p className="pv-snapshot-text">{project.problem[0]}</p>
                  </div>
                  <div className="pv-snapshot-card">
                    <span className="pv-snapshot-label solution">Solution</span>
                    <p className="pv-snapshot-text">{project.overview[0]}</p>
                  </div>
                  <div className="pv-snapshot-card">
                    <span className="pv-snapshot-label contribution">My Contribution</span>
                    <p className="pv-snapshot-text">{project.myRole[0]}</p>
                  </div>
                  <div className="pv-snapshot-card">
                    <span className="pv-snapshot-label outcome">Outcome</span>
                    <p className="pv-snapshot-text">{project.outcome[0]}</p>
                  </div>
                </div>
              </div>

              {/* ── SECTION 2: Why This Project? ── */}
              <div className="pv-section" id="why">
                <div className="pv-section-header">
                  <span className="pv-section-num">02</span>
                  <h2 className="pv-section-title">Why This Project?</h2>
                </div>
                <p className="pv-section-lead">{project.overview[1] ?? project.overview[0]}</p>
                <ul className="pv-bullet-list">
                  {project.goals.map((g, i) => (
                    <li key={i}>{g}</li>
                  ))}
                </ul>
              </div>

              {/* ── SECTION 3: System Architecture ── */}
              <div className="pv-section" id="architecture">
                <div className="pv-section-header">
                  <span className="pv-section-num">03</span>
                  <h2 className="pv-section-title">System Architecture</h2>
                </div>
                {archTree ? (
                  <ArchitectureTree
                    tree={archTree}
                    description={
                      project.architectureDescription ??
                      'Hierarchical breakdown of system components, layers, and their relationships.'
                    }
                  />
                ) : (
                  <p>Architecture details available in project documentation.</p>
                )}
              </div>

              {/* ── SECTION 4: End-to-End Workflow ── */}
              <div className="pv-section" id="workflow">
                <div className="pv-section-header">
                  <span className="pv-section-num">04</span>
                  <h2 className="pv-section-title">End-to-End Workflow</h2>
                </div>
                <p className="pv-section-lead">How the system processes input from start to output:</p>
                <div className="pv-workflow-pipeline">
                  {project.endToEndFlow.map((step, i) => (
                    <div key={i} className="pv-workflow-step-card">
                      <div className="pv-workflow-step-num">{String(i + 1).padStart(2, '0')}</div>
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

              {/* ── SECTION 5: Technology Stack ── */}
              <div className="pv-section" id="tech">
                <div className="pv-section-header">
                  <span className="pv-section-num">05</span>
                  <h2 className="pv-section-title">Technology Stack</h2>
                </div>
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

                {/* Architecture Decision Rationale — compact table */}
                {project.engineeringDecisions.length > 0 && (
                  <div className="pv-decisions-wrapper">
                    <div className="pv-decisions-title">Key Architecture Decisions</div>
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

              {/* ── SECTION 6: My Contribution ── */}
              <div className="pv-section" id="contribution">
                <div className="pv-section-header">
                  <span className="pv-section-num">06</span>
                  <h2 className="pv-section-title">My Contribution</h2>
                </div>
                <p className="pv-section-lead">What I personally designed, built, and implemented:</p>
                <ul className="pv-contribution-list">
                  {project.myRole.map((item, i) => (
                    <li key={i}>
                      <span className="pv-contribution-bullet">→</span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* If there are technical sections, show compact subsections */}
                {project.technicalSections.length > 0 && (
                  <details className="pv-tech-details">
                    <summary className="pv-tech-details-summary">
                      Technical Implementation Details
                    </summary>
                    <div className="pv-tech-details-body">
                      {project.technicalSections.map((section, i) => (
                        <div key={i} className="pv-tech-detail-item">
                          <h4 className="pv-tech-detail-title">{section.title}</h4>
                          {section.content.map((p, j) => (
                            <p key={j} className="pv-tech-detail-text">{p}</p>
                          ))}
                          {section.codeExample && (
                            <div className="pv-code-block" data-lenis-prevent="true">
                              <div className="pv-code-header">
                                <div>
                                  <span>{section.codeExample.language}</span>
                                  {section.codeExample.label && (
                                    <span className="pv-code-label"> — {section.codeExample.label}</span>
                                  )}
                                </div>
                                <CopyButton code={section.codeExample.code} />
                              </div>
                              <div className="pv-code-content">
                                <pre><code>{section.codeExample.code}</code></pre>
                              </div>
                              {section.codeExample.explanation && (
                                <div className="pv-code-explanation">{section.codeExample.explanation}</div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </details>
                )}
              </div>

              {/* ── SECTION 7: Key Challenges ── */}
              <div className="pv-section" id="challenges">
                <div className="pv-section-header">
                  <span className="pv-section-num">07</span>
                  <h2 className="pv-section-title">Key Engineering Challenges</h2>
                </div>
                <div className="pv-challenges-grid">
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

              {/* ── SECTION 8: Results & Next Steps ── */}
              <div className="pv-section" id="results">
                <div className="pv-section-header">
                  <span className="pv-section-num">08</span>
                  <h2 className="pv-section-title">Results & Next Steps</h2>
                </div>
                <div className="pv-results-wrapper">
                  <div className="pv-results-card">
                    <h4 className="pv-results-heading">Delivered</h4>
                    <ul className="pv-list">
                      {project.outcome.map((o, i) => (
                        <li key={i}>{o}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="pv-learnings-card">
                    <h4 className="pv-learnings-title">Engineering Takeaway</h4>
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

// ─── Copy button (lightweight inline helper) ─────────────────────────────────

const CopyButton = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };
  return (
    <button className="pv-code-copy" onClick={copy}>
      {copied ? '✓ Copied' : 'Copy'}
    </button>
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

    // 3. Lock document body cleanly (prevents background page from jumping)
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
