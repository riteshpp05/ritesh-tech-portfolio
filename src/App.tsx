import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const ProjectCaseStudy = lazy(() => import("./components/casestudy/ProjectCaseStudy"));
import { LoadingProvider } from "./context/LoadingProvider";
import { LenisProvider } from "./components/utils/lenisProvider";

const App = () => {
  // Dynamic viewport height for mobile Safari (avoids 100vh bug)
  useEffect(() => {
    const updateVh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
    };
    updateVh();
    window.addEventListener('resize', updateVh);
    window.addEventListener('orientationchange', updateVh);
    return () => {
      window.removeEventListener('resize', updateVh);
      window.removeEventListener('orientationchange', updateVh);
    };
  }, []);

  return (
    <Routes>
      {/* 3D Homepage */}
      <Route
        path="/"
        element={
          <LenisProvider>
            <LoadingProvider>
              <Suspense>
                <MainContainer>
                  <Suspense>
                    <CharacterModel />
                  </Suspense>
                </MainContainer>
              </Suspense>
            </LoadingProvider>
          </LenisProvider>
        }
      />

      {/* Project Case Study Pages - NO 3D canvas */}
      <Route
        path="/projects/:slug"
        element={
          <Suspense fallback={
            <div style={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#030712',
              color: '#6b7280',
              fontFamily: '"Geist", sans-serif',
            }}>
              Loading...
            </div>
          }>
            <ProjectCaseStudy />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default App;
