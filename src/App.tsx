import { lazy, Suspense, useEffect } from "react";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
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
  );
};

export default App;
