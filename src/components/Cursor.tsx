import { useEffect, useRef } from "react";
import "./styles/Cursor.css";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch devices
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    let hover = false;
    let isActive = true;
    let reqId: number;
    const cursor = cursorRef.current!;
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };
    document.addEventListener("mousemove", onMouseMove);

    const loop = () => {
      if (!isActive) return;
      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        
        // Zero-GC transform interpolation instead of gsap.to inside rAF
        cursor.style.transform = `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`;
      }
      reqId = requestAnimationFrame(loop);
    };
    reqId = requestAnimationFrame(loop);

    const items = document.querySelectorAll("[data-cursor]");
    const mouseOvers: { el: HTMLElement; fn: (e: MouseEvent) => void }[] = [];
    const mouseOuts: { el: HTMLElement; fn: () => void }[] = [];

    items.forEach((item) => {
      const element = item as HTMLElement;
      
      const onOver = (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();

        if (element.dataset.cursor === "icons") {
          cursor.classList.add("cursor-icons");
          cursor.style.transform = `translate3d(${rect.left}px, ${rect.top}px, 0)`;
          cursor.style.setProperty("--cursorH", `${rect.height}px`);
          hover = true;
        }
        if (element.dataset.cursor === "disable") {
          cursor.classList.add("cursor-disable");
        }
      };
      
      const onOut = () => {
        cursor.classList.remove("cursor-disable", "cursor-icons");
        hover = false;
      };

      element.addEventListener("mouseover", onOver);
      element.addEventListener("mouseout", onOut);
      mouseOvers.push({ el: element, fn: onOver });
      mouseOuts.push({ el: element, fn: onOut });
    });

    return () => {
      isActive = false;
      cancelAnimationFrame(reqId);
      document.removeEventListener("mousemove", onMouseMove);
      mouseOvers.forEach(({ el, fn }) => el.removeEventListener("mouseover", fn));
      mouseOuts.forEach(({ el, fn }) => el.removeEventListener("mouseout", fn));
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef} style={{ willChange: "transform" }}></div>;
};

export default Cursor;
