import { lazy, PropsWithChildren, Suspense, useEffect, useState, useCallback } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";
import ProjectViewer from "./ProjectViewer";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [activeProjectSlug, setActiveProjectSlug] = useState<string | null>(null);

  const openProject = useCallback((slug: string) => {
    setActiveProjectSlug(slug);
  }, []);

  const closeProject = useCallback(() => {
    setActiveProjectSlug(null);
  }, []);

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div className="container-main">
      <a href="#about" className="skip-to-content" aria-label="Skip to main content">Skip to content</a>
      <Cursor />
      <Navbar onOpenProject={openProject} />
      <SocialIcons />
      {/* Persist children (WebGL) across resize to prevent unmounting */}
      <div className="canvas-wrapper">
        {children}
      </div>
      <main>
        <div className="container-main">
          <Landing />
          <About />
          <WhatIDo />
          <Career />
          <Work onOpenProject={openProject} />
          <Suspense fallback={<div>Loading....</div>}>
            <TechStack />
          </Suspense>
          <Contact />
        </div>
      </main>

      {/* Project Case Study Modal — rendered over everything */}
      <ProjectViewer
        slug={activeProjectSlug}
        onClose={closeProject}
        onNavigate={openProject}
      />
    </div>
  );
};

export default MainContainer;
