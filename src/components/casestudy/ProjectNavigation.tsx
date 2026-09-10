import { Link } from 'react-router-dom';
import type { Project } from '../../types/projectTypes';

interface Props {
  prevProject?: Project;
  nextProject?: Project;
}

const ProjectNavigation = ({ prevProject, nextProject }: Props) => {
  return (
    <nav className="case-study-nav" aria-label="Project navigation">
      <div>
        {prevProject ? (
          <Link to={`/projects/${prevProject.slug}`} className="case-study-nav-link">
            <span className="case-study-nav-label">← Previous</span>
            <span className="case-study-nav-title">{prevProject.title}</span>
          </Link>
        ) : (
          <Link to="/" className="case-study-nav-link">
            <span className="case-study-nav-label">←</span>
            <span className="case-study-nav-title">Back to Portfolio</span>
          </Link>
        )}
      </div>
      <div>
        {nextProject ? (
          <Link to={`/projects/${nextProject.slug}`} className="case-study-nav-link next">
            <span className="case-study-nav-label">Next →</span>
            <span className="case-study-nav-title">{nextProject.title}</span>
          </Link>
        ) : (
          <Link to="/" className="case-study-nav-link next">
            <span className="case-study-nav-label">→</span>
            <span className="case-study-nav-title">Back to Portfolio</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default ProjectNavigation;
