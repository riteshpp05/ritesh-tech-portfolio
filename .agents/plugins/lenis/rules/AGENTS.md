# Lenis Smooth Scroll Guidelines & Rules

When building, modifying, or debugging scroll interactions with Darkroom Engineering's Lenis in this project, follow these engineering standards:

---

## 1. Modal & Overlay Scroll Isolation (CRITICAL)

- **Always add `data-lenis-prevent="true"`** (or `data-lenis-prevent`) to any scrollable modal, dialog, dropdown, or off-canvas drawer.
- Without `data-lenis-prevent`, Lenis captures global `wheel` events on `window` and calls `e.preventDefault()`, completely breaking internal mouse-wheel and trackpad scrolling in nested elements.
- For full-screen modals, pair `data-lenis-prevent` with programmatic pausing:
  ```ts
  // On modal mount / open
  stopLenis(); // or lenis.stop()
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = '100%';
  document.body.style.overflow = 'hidden';

  // On modal unmount / close
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  document.body.style.overflow = '';
  window.scrollTo({ top: scrollY, behavior: 'instant' });
  startLenis(); // or lenis.start()
  ```

---

## 2. GSAP ScrollTrigger Integration

- Connect Lenis scroll updates to GSAP's ScrollTrigger:
  ```ts
  lenis.on("scroll", ScrollTrigger.update);
  ```
- Hook `lenis.raf` into the GSAP ticker rather than a separate `requestAnimationFrame` loop:
  ```ts
  const tickerCallback = (time: number) => {
    lenis.raf(time * 1000); // GSAP time is in seconds; Lenis expects milliseconds
  };
  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);
  ```
- On cleanup:
  ```ts
  gsap.ticker.remove(tickerCallback);
  lenis.destroy();
  ```

---

## 3. WebGL & Three.js Camera Synchronization

- Use `lenis.on('scroll', ({ scroll, progress, velocity }) => ...)` to drive Three.js camera position or uniform values.
- Never run independent scroll listeners on `window` when Lenis is driving the page; listen directly to Lenis scroll events to ensure 1:1 frame synchronization with interpolated smoothing.

---

## 4. Mobile & Touch Handling

- By default, `syncTouch: false` allows mobile devices to use native momentum scrolling.
- Avoid setting `syncTouch: true` unless WebGL scroll synchronization is strictly required across touch screens, as it can cause inertial fighting on iOS Safari.
- Set `touchMultiplier: 2` or use native touch gestures with `overscroll-behavior: contain` on internal panels.

---

## 5. CSS Requirements

- Always ensure `lenis/dist/lenis.css` is imported at root level.
- Lenis modifies HTML/body styles; ensure child flex containers that need internal scrolling have `min-height: 0` and `overflow-y: auto`.
