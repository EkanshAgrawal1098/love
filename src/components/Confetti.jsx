import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const COLORS = ['#ffc2d1', '#e5546f', '#fbf3e4', '#b983ff', '#ff9bb5', '#ffd9a0'];

// A short, gentle burst of confetti. Skipped entirely when reduced motion is on.
export default function Confetti({ onDone }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      onDone?.();
      return undefined;
    }
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const pieces = Array.from({ length: 110 }, () => ({
      x: w / 2 + (Math.random() - 0.5) * 120,
      y: h * 0.55,
      vx: (Math.random() - 0.5) * 11,
      vy: -Math.random() * 13 - 4,
      size: Math.random() * 7 + 4,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      heart: Math.random() < 0.25,
    }));

    let raf = 0;
    const start = performance.now();
    const frame = (now) => {
      const elapsed = now - start;
      ctx.clearRect(0, 0, w, h);
      for (const p of pieces) {
        p.vy += 0.28;
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, 1 - elapsed / 3600);
        ctx.fillStyle = p.color;
        if (p.heart) {
          ctx.font = `${p.size * 2}px sans-serif`;
          ctx.fillText('♥', -p.size, p.size);
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        }
        ctx.restore();
      }
      if (elapsed < 3600) {
        raf = requestAnimationFrame(frame);
      } else {
        onDone?.();
      }
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [reduce, onDone]);

  if (reduce) return null;
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[85] h-full w-full" />;
}
