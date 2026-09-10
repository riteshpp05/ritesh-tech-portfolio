
import type { Project } from '../../types/projectTypes';

interface Props {
  project: Project;
}

const ProjectHero = ({ project }: Props) => {
  return (
    <div className="case-study-hero">
      <h1>{project.title}</h1>
      <p className="case-study-hero-subtitle">{project.subtitle}</p>

      <div className="case-study-meta">
        <div className="case-study-meta-item">
          <span className="case-study-meta-label">Role</span>
          <span className="case-study-meta-value">{project.role}</span>
        </div>
        <div className="case-study-meta-item">
          <span className="case-study-meta-label">Domain</span>
          <span className="case-study-meta-value">{project.domain}</span>
        </div>
        <div className="case-study-meta-item">
          <span className="case-study-meta-label">Platform</span>
          <span className="case-study-meta-value">{project.platform}</span>
        </div>
        <div className="case-study-meta-item">
          <span className="case-study-meta-label">Stack</span>
          <span className="case-study-meta-value">{project.stackSummary}</span>
        </div>
      </div>

      <div className="case-study-actions">
        <a href="#architecture" className="case-study-action-btn primary">
          View Architecture
        </a>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="case-study-action-btn"
          >
            View Source Code
          </a>
        )}
        {project.liveDemo && (
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="case-study-action-btn"
          >
            Live Demo
          </a>
        )}
      </div>

      {/* Hero Visual */}
      {project.heroImage ? (
        <div className="case-study-hero-visual">
          <img
            src={project.heroImage}
            alt={`${project.title} — project screenshot`}
            loading="lazy"
          />
        </div>
      ) : (
        <div className="case-study-hero-visual">
          <div className="case-study-hero-placeholder">
            <span className="case-study-placeholder-label">System Architecture</span>
            <span className="case-study-placeholder-title">{project.title}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectHero;
