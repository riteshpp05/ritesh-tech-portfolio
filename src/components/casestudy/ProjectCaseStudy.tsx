import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../../data/projectData';
import type { Project } from '../../types/projectTypes';
import ProjectHero from './ProjectHero';
import TableOfContents from './TableOfContents';
import SectionHeading from './SectionHeading';
import ArchitectureSection from './ArchitectureSection';
import TechnicalDeepDive from './TechnicalDeepDive';
import EngineeringDecisions from './EngineeringDecisions';
import ChallengesSection from './ChallengesSection';
import FlowDiagram from './FlowDiagram';
import TechStackSection from './TechStackSection';
import ProjectNavigation from './ProjectNavigation';
import '../styles/CaseStudy.css';

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem' },
  { id: 'goals', label: 'Goals' },
  { id: 'role', label: 'My Role' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'deep-dive', label: 'Technical Deep Dive' },
  { id: 'decisions', label: 'Engineering Decisions' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'flow', label: 'End-to-End Flow' },
  { id: 'tech-stack', label: 'Technology Stack' },
  { id: 'outcome', label: 'Outcome' },
  { id: 'learnings', label: 'Learnings' },
];

const ProjectCaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeSection, setActiveSection] = useState('overview');
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  const project = projects.find((p: Project) => p.slug === slug);

  // Find prev/next projects
  const currentIndex = projects.findIndex((p: Project) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : undefined;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : undefined;

  // Set page title & meta
  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Ritesh Patil`;
      
      // Update meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', `${project.subtitle} — Case study by Ritesh Patil.`);
      }

      // Update OG tags
      const setMeta = (property: string, content: string) => {
        let el = document.querySelector(`meta[property="${property}"]`);
        if (!el) {
          el = document.createElement('meta');
          el.setAttribute('property', property);
          document.head.appendChild(el);
        }
        el.setAttribute('content', content);
      };
      setMeta('og:title', `${project.title} | Ritesh Patil`);
      setMeta('og:description', project.subtitle);
      setMeta('og:url', `https://riteshpatil.com/projects/${project.slug}`);
      if (project.heroImage) {
        setMeta('og:image', `https://riteshpatil.com${project.heroImage}`);
      }
    }

    // Scroll to top on mount
    window.scrollTo(0, 0);

    return () => {
      document.title = 'Ritesh Patil — AI/ML Engineer & Generative AI Developer | Pune, India';
    };
  }, [project, slug]);

  // IntersectionObserver for active section tracking
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionRefs.current.forEach((el, id) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-100px 0px -60% 0px', threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [project]);

  // Fade-in animation
  useEffect(() => {
    const fadeEls = document.querySelectorAll('.case-study-fade-in');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    fadeEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [project]);

  if (!project) {
    return (
      <div className="case-study-page">
        <div className="case-study-content" style={{ padding: '120px 20px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Project Not Found</h1>
          <p style={{ color: '#6b7280', marginBottom: '24px' }}>
            The project you're looking for doesn't exist.
          </p>
          <Link to="/" className="case-study-action-btn">← Back to Portfolio</Link>
        </div>
      </div>
    );
  }

  const setSectionRef = (id: string) => (el: HTMLElement | null) => {
    if (el) sectionRefs.current.set(id, el);
  };

  return (
    <div className="case-study-page">
      <div className="case-study-wrapper">
        {/* Back Navigation */}
        <Link to="/" className="case-study-back">
          ← Back to Portfolio
        </Link>

        {/* Hero */}
        <ProjectHero project={project} />

        {/* Mobile Table of Contents */}
        <TableOfContents
          sections={sections}
          activeSection={activeSection}
          mobile
        />

        {/* Two-column layout: ToC + Content */}
        <div className="case-study-layout">
          {/* Desktop Table of Contents */}
          <TableOfContents
            sections={sections}
            activeSection={activeSection}
          />

          {/* Main Content */}
          <div className="case-study-content">
            {/* Overview */}
            <section
              className="case-study-section case-study-fade-in"
              id="overview"
              ref={setSectionRef('overview')}
            >
              <SectionHeading number="01" title="Overview" />
              {project.overview.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>

            {/* Problem */}
            <section
              className="case-study-section case-study-fade-in"
              id="problem"
              ref={setSectionRef('problem')}
            >
              <SectionHeading number="02" title="The Problem" />
              {project.problem.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>

            {/* Goals */}
            <section
              className="case-study-section case-study-fade-in"
              id="goals"
              ref={setSectionRef('goals')}
            >
              <SectionHeading number="03" title="Goals" />
              <ul className="case-study-goals">
                {project.goals.map((g, i) => (
                  <li key={i}>{g}</li>
                ))}
              </ul>
            </section>

            {/* My Role */}
            <section
              className="case-study-section case-study-fade-in"
              id="role"
              ref={setSectionRef('role')}
            >
              <SectionHeading number="04" title="My Role" />
              {project.myRole.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>

            {/* Architecture */}
            <section
              className="case-study-section case-study-fade-in"
              id="architecture"
              ref={setSectionRef('architecture')}
            >
              <SectionHeading number="05" title="Architecture" />
              {project.architectureDescription && (
                <p>{project.architectureDescription}</p>
              )}
              <ArchitectureSection flows={project.architectureFlows} />
            </section>

            {/* Technical Deep Dive */}
            <section
              className="case-study-section case-study-fade-in"
              id="deep-dive"
              ref={setSectionRef('deep-dive')}
            >
              <SectionHeading number="06" title="Technical Deep Dive" />
              <TechnicalDeepDive sections={project.technicalSections} />
            </section>

            {/* Engineering Decisions */}
            <section
              className="case-study-section case-study-fade-in"
              id="decisions"
              ref={setSectionRef('decisions')}
            >
              <SectionHeading number="07" title="Key Engineering Decisions" />
              <EngineeringDecisions decisions={project.engineeringDecisions} />
            </section>

            {/* Challenges */}
            <section
              className="case-study-section case-study-fade-in"
              id="challenges"
              ref={setSectionRef('challenges')}
            >
              <SectionHeading number="08" title="Challenges & Solutions" />
              <ChallengesSection challenges={project.challenges} />
            </section>

            {/* End-to-End Flow */}
            <section
              className="case-study-section case-study-fade-in"
              id="flow"
              ref={setSectionRef('flow')}
            >
              <SectionHeading number="09" title="End-to-End Flow" />
              <FlowDiagram steps={project.endToEndFlow} />
            </section>

            {/* Tech Stack */}
            <section
              className="case-study-section case-study-fade-in"
              id="tech-stack"
              ref={setSectionRef('tech-stack')}
            >
              <SectionHeading number="10" title="Technology Stack" />
              <TechStackSection categories={project.techStack} />
            </section>

            {/* Outcome */}
            <section
              className="case-study-section case-study-fade-in"
              id="outcome"
              ref={setSectionRef('outcome')}
            >
              <SectionHeading number="11" title="Outcome" />
              <ul className="case-study-goals">
                {project.outcome.map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
              </ul>
            </section>

            {/* Learnings */}
            <section
              className="case-study-section case-study-fade-in"
              id="learnings"
              ref={setSectionRef('learnings')}
            >
              <SectionHeading number="12" title="What I Learned" />
              <div className="case-study-learnings">
                {project.learnings.map((l, i) => (
                  <p key={i} style={{ margin: i < project.learnings.length - 1 ? '0 0 12px' : '0' }}>{l}</p>
                ))}
              </div>
            </section>

            {/* CTA */}
            <div className="case-study-cta case-study-fade-in">
              <p>Interested in the implementation?</p>
              <div className="case-study-cta-links">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="case-study-action-btn">
                    GitHub
                  </a>
                )}
                <a
                  href="https://www.linkedin.com/in/riteshpatil-32946b26b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-study-action-btn"
                >
                  LinkedIn
                </a>
                <Link to="/" className="case-study-action-btn">
                  Back to Portfolio
                </Link>
              </div>
            </div>

            {/* Project Navigation */}
            <ProjectNavigation
              prevProject={prevProject}
              nextProject={nextProject}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCaseStudy;
