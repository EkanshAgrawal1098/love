import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Particles from './Particles';
import { scrollToId } from './Navbar';
import { hero, siteConfig } from '../data/relationshipData';

function useTypewriter(text, start, reduce) {
  const [out, setOut] = useState(reduce ? text : '');
  useEffect(() => {
    if (reduce) {
      setOut(text);
      return undefined;
    }
    if (!start) return undefined;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 70);
    return () => clearInterval(id);
  }, [text, start, reduce]);
  return out;
}

// An abstract couple on a hill under a moon. Pure SVG, no image needed.
function Scene() {
  return (
    <svg viewBox="0 0 800 320" preserveAspectRatio="xMidYMax slice" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="moon" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff4ea" />
          <stop offset="60%" stopColor="#ffd9e3" />
          <stop offset="100%" stopColor="#ffc2d1" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hill1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#2a1550" />
          <stop offset="100%" stopColor="#0f0b2e" />
        </linearGradient>
        <linearGradient id="hill2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#170f3d" />
          <stop offset="100%" stopColor="#0b0a1f" />
        </linearGradient>
      </defs>
      <circle cx="560" cy="90" r="90" fill="url(#moon)" opacity="0.55" />
      <circle cx="560" cy="90" r="34" fill="#fff4ea" opacity="0.95" />
      <path d="M0 250 C140 200 260 235 400 215 C540 195 660 235 800 205 L800 320 L0 320 Z" fill="url(#hill1)" />
      <path d="M0 285 C160 255 300 280 430 262 C560 245 690 280 800 262 L800 320 L0 320 Z" fill="url(#hill2)" />
      {/* the two of them, side by side */}
      <g fill="#07061a">
        <circle cx="372" cy="213" r="9" />
        <path d="M360 226 Q372 220 384 226 L388 268 L356 268 Z" />
        <circle cx="400" cy="216" r="8" />
        <path d="M389 228 Q400 222 411 228 L414 268 L386 268 Z" />
        <path d="M388 236 Q394 242 399 238" stroke="#07061a" strokeWidth="3" fill="none" />
      </g>
    </svg>
  );
}

export default function Hero({ ready }) {
  const reduce = useReducedMotion();
  const [showGentle, setShowGentle] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const sceneY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 90]);
  const textY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -40]);

  const heading = `Hey, ${siteConfig.nickname}...`;
  const typed = useTypewriter(heading, ready, reduce);
  const typingDone = typed.length >= heading.length;

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden text-center"
      style={{ background: 'linear-gradient(180deg, #0b0a1f 0%, #1a1048 38%, #4a2160 70%, #a24a72 100%)' }}
    >
      <Particles stars={90} hearts={7} />

      <motion.div className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] min-h-[220px]" style={{ y: sceneY }}>
        <Scene />
      </motion.div>

      <motion.div style={{ y: textY }} className="relative z-10 mx-auto max-w-3xl px-6 pb-24 pt-24">
        <h1 className="font-script text-5xl leading-tight text-blush sm:text-6xl md:text-7xl" style={{ textShadow: '0 0 36px rgba(255,140,170,0.45)' }}>
          <span aria-label={`${heading} ❤️`}>
            <span aria-hidden="true">{typed}</span>
            {typingDone && (
              <motion.span aria-hidden="true" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="ml-2 inline-block">
                ❤️
              </motion.span>
            )}
            {!typingDone && <span aria-hidden="true" className="caret" />}
          </span>
        </h1>

        <motion.p
          className="mx-auto mt-6 max-w-xl font-serif text-lg italic leading-relaxed text-white/85 sm:text-xl"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={typingDone ? { opacity: 1, y: 0 } : { opacity: reduce ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={typingDone ? { opacity: 1, y: 0 } : { opacity: reduce ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <button type="button" className="btn-primary w-full sm:w-auto" onClick={() => scrollToId('memories')}>
            {hero.primaryButton}
          </button>
          <button
            type="button"
            className="btn-ghost w-full sm:w-auto"
            aria-expanded={showGentle}
            aria-controls="gentle-message"
            onClick={() => setShowGentle((s) => !s)}
          >
            {hero.secondaryButton}
          </button>
        </motion.div>

        <div id="gentle-message" aria-live="polite" className="mx-auto mt-6 max-w-lg">
          <AnimatePresence>
            {showGentle && (
              <motion.p
                initial={{ opacity: 0, y: 8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="glass rounded-2xl px-6 py-4 font-serif text-base leading-relaxed text-white/90"
              >
                {hero.gentleMessage}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <button
        type="button"
        aria-label="Scroll down"
        onClick={() => scrollToId('memories')}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-blush/80"
      >
        <motion.span
          className="block"
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-8 w-8" aria-hidden="true" />
        </motion.span>
      </button>
    </section>
  );
}
