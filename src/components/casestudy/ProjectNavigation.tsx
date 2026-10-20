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
            <span className="case-study-nav-label">← PREVIOUS CASE</span>
            <span className="case-study-nav-title">{prevProject.title}</span>
          </Link>
        ) : (
          <Link to="/freelance#case-studies" className="case-study-nav-link">
            <span className="case-study-nav-label">← CASE STUDY INDEX</span>
            <span className="case-study-nav-title">All Case Studies</span>
          </Link>
        )}
      </div>
      <div>
        {nextProject ? (
          <Link to={`/projects/${nextProject.slug}`} className="case-study-nav-link next">
            <span className="case-study-nav-label">NEXT CASE →</span>
            <span className="case-study-nav-title">{nextProject.title}</span>
          </Link>
        ) : (
          <Link to="/freelance#case-studies" className="case-study-nav-link next">
            <span className="case-study-nav-label">CASE STUDY INDEX →</span>
            <span className="case-study-nav-title">All Case Studies</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default ProjectNavigation;
