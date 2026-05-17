import React, { useEffect, useRef, useState } from 'react';

/**
 * Anima um número de 0 até o valor final quando entra na viewport.
 * Aceita strings tipo "2.6×", "85%", "1.8s", "400+", "3+".
 */
export default function AnimatedNumber({ value, duration = 1600 }) {
  const match = String(value).match(/^([\d.,]+)(.*)$/);
  if (!match) return <span>{value}</span>;

  const target = parseFloat(match[1].replace(',', '.'));
  const suffix = match[2];
  const isFloat = match[1].includes('.') || match[1].includes(',');
  const decimals = isFloat ? (match[1].split(/[.,]/)[1]?.length || 1) : 0;

  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const start = performance.now();
          const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(1, elapsed / duration);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setDisplay(target * eased);
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  const formatted = isFloat
    ? display.toFixed(decimals).replace('.', ',')
    : Math.round(display).toString();

  return (
    <span ref={ref}>
      {formatted}{suffix}
    </span>
  );
}
