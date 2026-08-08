'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Counter
 * ---------------------------------------------------------------------------
 * Scroll-triggered count-up. Isolated as its own tiny client component so the
 * pages that use it (Overview's stat strip) can otherwise stay server
 * components — only this leaf needs the browser IntersectionObserver.
 * ---------------------------------------------------------------------------
 */
export default function Counter({ value, suffix = '', duration = 1400 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - (1 - progress) ** 3;
              setDisplay(Math.round(eased * value));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className="PLRCT-counter">
      {display}
      {suffix}
    </span>
  );
}