import { lazy, PropsWithChildren, Suspense, useEffect, useCallback, useState, useRef } from "react";
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

/**
 * Defers loading and mounting the heavy (2.5MB) 3D Physics TechStack until
 * the user scrolls within 600px of the section, eliminating initial load contention.
 */
const LazyTechStack = () => {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [inView]);

  return (
    <div ref={containerRef} style={{ minHeight: "var(--vh)" }}>
      {inView ? (
        <Suspense fallback={<div style={{ minHeight: "var(--vh)" }} />}>
          <TechStack />
        </Suspense>
      ) : (
        <div style={{ minHeight: "var(--vh)" }} />
      )}
    </div>
  );
};

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
          <LazyTechStack />
          <Contact />
        </div>
      </main>
    </div>
  );
};

export default MainContainer;
