'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Reveal
 * ---------------------------------------------------------------------------
 * Fades + lifts children into place once they enter the viewport. One shared
 * implementation avoids five near-identical IntersectionObserver hooks
 * scattered across the About pages. Respects prefers-reduced-motion via CSS
 * (see .plrct-reveal rules — animation is disabled there, not here).
 * -------------------------------------------------------------------------- */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`plrct-reveal${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  );
}