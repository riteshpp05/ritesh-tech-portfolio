---
name: lenis
description: Expert reference and implementation guide for Darkroom Engineering's Lenis smooth scroll library. Covers installation, React/Vite/Next.js setup, GSAP ScrollTrigger synchronization, Three.js/WebGL camera coupling, modal scroll isolation with data-lenis-prevent, methods (stop, start, scrollTo, destroy), and debugging runbooks.
---

# Darkroom Engineering Lenis Guide & Reference

Lenis is a lightweight, robust, and performant smooth scroll library designed by [Darkroom Engineering](https://github.com/darkroomengineering/lenis). It runs on top of native browser scrolling, keeping `position: sticky`, anchor links, and accessibility functioning properly.

---

## 1. Quick Setup & React Architecture

### Basic React Implementation
```tsx
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const reqId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(reqId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};
```

---

## 2. GSAP ScrollTrigger Integration

When pairing Lenis with GSAP, synchronize ScrollTrigger with Lenis's scroll cycle and feed the ticker:

```ts
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({ duration: 1.2, smoothWheel: true });

// 1. Tell ScrollTrigger to update whenever Lenis scrolls
lenis.on("scroll", ScrollTrigger.update);

// 2. Add Lenis's requestAnimationFrame callback to GSAP's ticker
const ticker = (time: number) => {
  lenis.raf(time * 1000); // GSAP time is in seconds; Lenis expects milliseconds
};
gsap.ticker.add(ticker);

// 3. Disable GSAP lag smoothing to eliminate delay in scroll animations
gsap.ticker.lagSmoothing(0);

// Cleanup
export const destroyLenisGsap = () => {
  gsap.ticker.remove(ticker);
  lenis.destroy();
};
```

---

## 3. Core API Reference

### Configuration Settings
| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `duration` | `number` | `1.2` | Animation duration in seconds (ignored if `lerp` is set). |
| `lerp` | `number` | `0.1` | Linear interpolation intensity (0 to 1). |
| `easing` | `function` | Custom pow | Easing function for scroll physics. |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Primary scroll direction. |
| `gestureOrientation` | `'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | Gesture interception axis. |
| `smoothWheel` | `boolean` | `true` | Interpolates mouse wheel events smoothly. |
| `wheelMultiplier` | `number` | `1` | Sensitivity multiplier for wheel events. |
| `touchMultiplier` | `number` | `1` | Sensitivity multiplier for touch inputs. |
| `syncTouch` | `boolean` | `false` | Mimics touch device momentum (use with caution on iOS). |
| `allowNestedScroll` | `boolean` | `false` | Automatically allows nested containers to scroll. |
| `prevent` | `(node: HTMLElement) => boolean` | `undefined` | Custom filter to bypass smoothing on specific nodes. |
| `respectReducedMotion` | `boolean` | `true` | Automatically disables smoothing when `prefers-reduced-motion` is active. |
| `anchors` | `boolean \| ScrollToOptions` | `false` | Automatically smooths `#anchor` link clicks. |

### Key Methods
| Method | Description | Example |
| :--- | :--- | :--- |
| `lenis.start()` | Resumes smooth scroll event processing. | `lenis.start()` |
| `lenis.stop()` | Pauses smooth scroll (crucial for modals). | `lenis.stop()` |
| `lenis.scrollTo(target, options)` | Scrolls smoothly to target (number, selector, or element). | `lenis.scrollTo('#section', { offset: -50, duration: 1 })` |
| `lenis.raf(time)` | Drives the internal frame step (call every frame). | `lenis.raf(performance.now())` |
| `lenis.resize()` | Recalculates page dimensions. | `lenis.resize()` |
| `lenis.destroy()` | Destroys instance, unbinds all event listeners. | `lenis.destroy()` |

---

## 4. Modal & Nested Scroll Runbook (CRITICAL)

### The Problem
By default, when `smoothWheel: true`, Lenis attaches a global wheel listener to `window` and calls `e.preventDefault()`. Any scrollable modal, dialog, or dropdown will have its wheel events blocked unless explicitly bypassed.

### The Fix
1. **Add HTML attributes to the modal wrapper**:
   ```html
   <div class="modal" data-lenis-prevent="true">
     <div class="scroll-content" data-lenis-prevent="true">
       ...
     </div>
   </div>
   ```
2. **Granular control attributes**:
   * `data-lenis-prevent`: Prevents all Lenis smooth scrolling inside this container.
   * `data-lenis-prevent-wheel`: Prevents wheel event hijacking only.
   * `data-lenis-prevent-touch`: Prevents touch event hijacking only.
3. **Programmatic Pause / Resume**:
   When a full-screen dialog opens, call `lenis.stop()` and apply `position: fixed` to `document.body` with captured scroll offset. When the modal closes, release the body lock, call `window.scrollTo({ top: savedScroll, behavior: 'instant' })`, and call `lenis.start()`.

---

## 5. Troubleshooting Checklist

* **Mouse wheel not scrolling inside popups**: Ensure `data-lenis-prevent="true"` is on the popup and parent, and the inner container has `min-height: 0` with `overflow-y: auto`.
* **Jittery / lagging ScrollTrigger animations**: Ensure `gsap.ticker.lagSmoothing(0)` is called and Lenis `raf` is fed directly from the GSAP ticker.
* **Anchor links not scrolling**: Set `anchors: true` in Lenis options or use `lenis.scrollTo(hash)`.
* **Mobile viewport height bug**: Use `100dvh` or compute `--vh` with `window.innerHeight` to prevent mobile address bar shifting.
