import { lazy, PropsWithChildren, Suspense, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  const openProject = useCallback((slug: string) => {
    navigate(`/projects/${slug}`);
  }, [navigate]);

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
    </div>
  );
};

export default MainContainer;
