import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

// A light canvas of twinkling stars and a few slow, restrained hearts.
// `fixed` = one page-wide layer. Otherwise it fills its parent (hero / ending).
export default function Particles({ stars = 60, hearts = 8, fixed = false, className = '' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;

    const heartShape = (x, y, s) => {
      ctx.beginPath();
      ctx.moveTo(x, y + s * 0.3);
      ctx.bezierCurveTo(x, y - s * 0.3, x - s, y - s * 0.3, x - s, y + s * 0.2);
      ctx.bezierCurveTo(x - s, y + s * 0.7, x, y + s * 0.9, x, y + s * 1.2);
      ctx.bezierCurveTo(x, y + s * 0.9, x + s, y + s * 0.7, x + s, y + s * 0.2);
      ctx.bezierCurveTo(x + s, y - s * 0.3, x, y - s * 0.3, x, y + s * 0.3);
      ctx.fill();
    };

    const makeHeart = (init) => ({
      x: Math.random() * w,
      y: init ? Math.random() * h : h + 30,
      size: Math.random() * 6 + 5,
      speed: Math.random() * 0.22 + 0.08,
      sway: Math.random() * Math.PI * 2,
      alpha: Math.random() * 0.22 + 0.12,
    });

    let starList = [];
    let heartList = [];

    const setup = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const scale = Math.min(1, (w * h) / (1200 * 800));
      starList = Array.from({ length: Math.max(14, Math.round(stars * Math.max(scale, 0.5))) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.006,
      }));
      heartList = Array.from({ length: hearts }, () => makeHeart(true));
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      for (const s of starList) {
        const a = reduce ? 0.7 : 0.35 + 0.55 * Math.abs(Math.sin(s.phase + t * s.speed * 0.06));
        ctx.fillStyle = `rgba(255, 240, 245, ${a})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      for (const hh of heartList) {
        if (!reduce) {
          hh.y -= hh.speed;
          hh.x += Math.sin(hh.sway + t * 0.0004) * 0.18;
          if (hh.y < -30) Object.assign(hh, makeHeart(false));
        }
        ctx.fillStyle = `rgba(255, 150, 180, ${hh.alpha})`;
        ctx.shadowColor = 'rgba(255, 120, 160, 0.6)';
        ctx.shadowBlur = 10;
        heartShape(hh.x, hh.y, hh.size);
        ctx.shadowBlur = 0;
      }
    };

    const loop = (t) => {
      if (visible && !document.hidden) draw(t);
      raf = requestAnimationFrame(loop);
    };

    setup();
    if (reduce) {
      draw(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(() => {
      setup();
      if (reduce) draw(0);
    });
    ro.observe(canvas);

    let io;
    if (!fixed && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
      });
      io.observe(canvas);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      if (io) io.disconnect();
    };
  }, [stars, hearts, fixed, reduce]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none ${fixed ? 'fixed inset-0 z-0 h-full w-full' : 'absolute inset-0 h-full w-full'} ${className}`}
    />
  );
}
