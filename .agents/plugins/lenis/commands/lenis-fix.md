---
description: Automatically audit and fix Lenis modal scroll issues and GSAP sync
---

Perform an automated audit of Lenis scroll interactions in the codebase:
1. Scan for scrollable modals, dialogs, or drawers missing data-lenis-prevent.
2. Check if Lenis is paused via stopLenis() when modals are active.
3. Validate GSAP ScrollTrigger updates and ticker integration.
4. Ensure CSS includes min-height: 0 and overflow-y: auto on nested scrolling elements.
5. Apply fixes directly if any issues are detected.
