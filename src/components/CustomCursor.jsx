import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

// A soft glow that trails the mouse. Desktop (fine pointer + hover) only.
// The normal cursor stays visible, so nothing about usability changes.
export default function CustomCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setEnabled(window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduce);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return undefined;
    let x = -100;
    let y = -100;
    let cx = -100;
    let cy = -100;
    let raf = 0;
    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
    };
    const tick = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      if (ref.current) ref.current.style.transform = `translate3d(${cx - 14}px, ${cy - 14}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', move, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] h-7 w-7 rounded-full border border-blush/60 bg-rose/20 shadow-[0_0_24px_rgba(255,140,170,0.5)] mix-blend-screen"
    />
  );
}
