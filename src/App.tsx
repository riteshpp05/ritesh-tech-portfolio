import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const ProjectCaseStudy = lazy(() => import("./components/casestudy/ProjectCaseStudy"));
const FreelancePage = lazy(() => import("./pages/FreelancePage"));
import { LoadingProvider } from "./context/LoadingProvider";
import { LenisProvider } from "./components/utils/lenisProvider";

const CaseStudyRedirect = () => {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/projects/${slug || 'mdr'}`} replace />;
};

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

      {/* Project Case Study Pages - Canonical Route */}
      <Route
        path="/projects/:slug"
        element={
          <Suspense fallback={
            <div style={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#FDFBF7',
              color: '#121212',
              fontFamily: '"Geist", sans-serif',
              fontWeight: 700,
              fontSize: '18px',
              letterSpacing: '1px',
            }}>
              LOADING CASE STUDY...
            </div>
          }>
            <ProjectCaseStudy />
          </Suspense>
        }
      />

      {/* Legacy / Alias Case Study Routes — Instant redirect to canonical */}
      <Route path="/case-studies/:slug" element={<CaseStudyRedirect />} />
      <Route path="/case-study/:slug" element={<CaseStudyRedirect />} />
      <Route path="/case-studies" element={<Navigate to="/freelance#case-studies" replace />} />
      <Route path="/freelancing" element={<Navigate to="/freelance" replace />} />

      {/* Freelance Page */}
      <Route
        path="/freelance"
        element={
          <LenisProvider>
            <Suspense fallback={
              <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#FDFBF7',
                color: '#121212',
                fontFamily: '"Geist", sans-serif',
                fontWeight: 700,
                fontSize: '18px',
                letterSpacing: '1px',
              }}>
                LOADING FREELANCE...
              </div>
            }>
              <FreelancePage />
            </Suspense>
          </LenisProvider>
        }
      />
    </Routes>
  );
};

export default App;
