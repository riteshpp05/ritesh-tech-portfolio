import { useEffect, useRef } from "react";

/**
 * Shared IntersectionObserver hook used across all Freelance page sections.
 * Adds `fl-visible` to each observed element when it enters the viewport.
 *
 * @param count   - number of ref slots to pre-allocate (use a generous upper bound)
 * @param threshold - visibility ratio before triggering (default 0.08)
 * @returns refs array — assign elements via `ref={(el) => (refs.current[i] = el)}`
 */
export function useReveal<T extends Element = HTMLElement>(
  count: number = 20,
  threshold: number = 0.08
) {
  const refs = useRef<(T | null)[]>(Array(count).fill(null));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("fl-visible");
        });
      },
      { threshold }
    );

    refs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [threshold]);

  return refs;
}
