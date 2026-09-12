import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let activeLenis: Lenis | null = null;

export const getLenis = () => activeLenis;

export const stopLenis = () => {
  if (activeLenis) {
    activeLenis.stop();
  }
};

export const startLenis = () => {
  if (activeLenis) {
    activeLenis.start();
  }
};

export const scrollToLenis = (
  target: string | number | HTMLElement,
  options?: {
    offset?: number;
    duration?: number;
    immediate?: boolean;
    lock?: boolean;
  }
) => {
  if (activeLenis) {
    activeLenis.scrollTo(target, {
      duration: options?.duration ?? 1.3,
      offset: options?.offset ?? 0,
      immediate: options?.immediate ?? false,
      lock: options?.lock ?? false,
    });
  } else {
    if (typeof target === "string") {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }
};

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // High-performance smooth scroll configuration
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Quintic easing for natural deceleration
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.8,
      syncTouch: false, // Allows native fluid momentum on iOS/Android
      autoResize: true,
      anchors: true,
      prevent: (node: HTMLElement) => Boolean(node?.closest?.("[data-lenis-prevent]")),
    });

    lenisRef.current = lenis;
    activeLenis = lenis;

    // 1. Sync ScrollTrigger with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // 2. Drive Lenis through GSAP ticker for 1:1 frame-accurate coupling
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000); // Convert seconds to milliseconds
    };
    gsap.ticker.add(tickerCallback);

    // 3. Disable lag smoothing to prevent visual stutter in scroll animations
    gsap.ticker.lagSmoothing(0);

    return () => {
      activeLenis = null;
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};
