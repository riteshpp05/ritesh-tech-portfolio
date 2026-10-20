import { useReveal } from "../../hooks/useReveal";
import { useNavigate } from "react-router-dom";
import { projects } from "../../data/projectData";

const FreelanceCaseStudies = () => {
  const navigate = useNavigate();
  const refs = useReveal(12, 0.08);

  return (
    <>
      <div className="fl-cases-header fl-reveal" ref={(el) => (refs.current[10] = el)}>
        <span className="fl-section-label">Selected Case Studies</span>
        <h2 className="fl-section-heading">Built for real problems. Tested in production.</h2>
        <p className="fl-section-sub">
          Architectural deep dives demonstrating end-to-end engineering rigor — from problem formulation,
          custom pipelines, and local LLM privacy to production deployments.
        </p>
      </div>

      <div className="fl-cases-list" role="list">
        {projects.map((project, i) => {
          const problemText = project.problem?.[0] || project.overview?.[0] || "";
          const solutionText =
            project.challenges?.[0]?.solution ||
            project.myRole?.[0] ||
            project.overview?.[1] ||
            "Production-ready architecture designed for performance and scale.";
          const goals = project.goals?.slice(0, 4) || [];

          return (
            <article
              key={project.slug}
              className="fl-case-item fl-reveal"
              ref={(el) => (refs.current[i] = el)}
              style={{ transitionDelay: `${i * 80}ms` }}
              role="listitem"
              aria-label={project.title}
            >
              {/* Sleek Minimalist Topbar */}
              <div className="fl-case-topbar">
                <div className="fl-case-topbar-left">
                  <span className="fl-case-index-badge">CASE #{String(i + 1).padStart(2, "0")}</span>
                  <span className="fl-case-domain-tag">{project.domain}</span>
                </div>
                <span className="fl-case-platform-tag">{project.platform}</span>
              </div>

              {/* Card Body Grid */}
              <div className="fl-case-body">
                <div className="fl-case-main-content">
                  <h3 className="fl-case-title">{project.title}</h3>
                  <p className="fl-case-subtitle">{project.subtitle}</p>

                  {/* Problem & Solution Callout Blocks */}
                  <div className="fl-case-problem-solution-grid">
                    <div className="fl-case-callout fl-callout-problem">
                      <div className="fl-callout-badge problem">THE PROBLEM</div>
                      <p className="fl-callout-text">{problemText}</p>
                    </div>

                    <div className="fl-case-callout fl-callout-solution">
                      <div className="fl-callout-badge solution">ENGINEERED SOLUTION</div>
                      <p className="fl-callout-text">{solutionText}</p>
                    </div>
                  </div>

                  {/* Key Capabilities / Goals */}
                  {goals.length > 0 && (
                    <div className="fl-case-goals-row">
                      <span className="fl-case-goals-label">KEY DELIVERABLES:</span>
                      <div className="fl-case-goals-tags">
                        {goals.map((goal, gIdx) => (
                          <span key={gIdx} className="fl-case-goal-pill">
                            <span className="fl-goal-check" aria-hidden="true">✓</span> {goal}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  <div className="fl-case-tech-row">
                    <span className="fl-case-tech-label">STACK:</span>
                    <span className="fl-case-tech-pills">{project.stackSummary}</span>
                  </div>
                </div>

                {/* Right Column: Actions & Outcomes */}
                <div className="fl-case-action-col">
                  {project.outcome && project.outcome.length > 0 && (
                    <div className="fl-case-outcomes-box">
                      <div className="fl-case-outcome-title">MEASURABLE IMPACT</div>
                      <ul className="fl-case-outcome-list">
                        {project.outcome.slice(0, 3).map((item, oIdx) => (
                          <li key={oIdx} className="fl-case-outcome-item">
                            <span className="fl-outcome-dot" aria-hidden="true">▸</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button
                    className="fl-btn-primary fl-case-view-btn"
                    onClick={() => navigate(`/projects/${project.slug}`)}
                    aria-label={`View complete case study for ${project.title}`}
                  >
                    <span>VIEW CASE STUDY</span>
                    <span className="fl-btn-arrow" aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
};

export default FreelanceCaseStudies;
