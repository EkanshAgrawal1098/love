import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Reveal from './Reveal';
import { letter, siteConfig } from '../data/relationshipData';

function Rose({ className = '' }) {
  return (
    <svg viewBox="0 0 64 80" className={className} aria-hidden="true">
      <path d="M32 44 C31 56 33 66 31 78" stroke="#4d7a54" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M32 62 C22 58 16 60 12 54 C20 52 28 54 32 62Z" fill="#5f9168" />
      <path d="M32 56 C40 50 46 52 52 46 C44 44 36 48 32 56Z" fill="#6aa074" />
      <circle cx="32" cy="26" r="18" fill="#c93a5b" />
      <path d="M32 12 C42 14 46 24 38 30 C30 34 22 28 26 20 C28 16 34 16 35 21" stroke="#8f2340" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M20 24 C22 34 32 40 42 34" stroke="#e5546f" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function Envelope({ opening, onOpen }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      key="envelope"
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30, scale: 0.96 }}
      transition={{ duration: 0.6 }}
    >
      <button
        type="button"
        onClick={onOpen}
        disabled={opening}
        aria-label="Open the envelope to read the letter"
        className="group relative aspect-[3/2] w-[min(88vw,400px)]"
        style={{ perspective: 900 }}
      >
        <motion.div
          className="absolute inset-0 rounded-lg shadow-soft"
          style={{ background: 'linear-gradient(160deg, #f4dfc4, #e6c9a4)' }}
          animate={reduce ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* inner folds */}
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top right, rgba(0,0,0,0.07) 49.5%, transparent 50%) left / 50% 100% no-repeat, linear-gradient(to top left, rgba(0,0,0,0.07) 49.5%, transparent 50%) right / 50% 100% no-repeat' }} />
          </div>
          {/* the flap */}
          <motion.div
            className="absolute inset-x-0 top-0 h-[58%] origin-top"
            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)', background: 'linear-gradient(180deg, #ecd2ad, #dcb98f)', backfaceVisibility: 'hidden' }}
            animate={{ rotateX: opening ? 180 : 0 }}
            transition={{ duration: reduce ? 0.01 : 0.8, ease: 'easeInOut' }}
          />
          {/* wax seal */}
          <motion.div
            className="absolute left-1/2 top-[50%] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-rose shadow-[0_4px_14px_rgba(120,20,40,0.5)]"
            animate={{ opacity: opening ? 0 : 1, scale: opening ? 0.6 : 1 }}
          >
            <Heart className="h-5 w-5 fill-cream text-cream" aria-hidden="true" />
          </motion.div>
        </motion.div>
      </button>
      <p className="mt-8 font-script text-2xl text-blush/90">{letter.hint}</p>
    </motion.div>
  );
}

export default function Letter() {
  const reduce = useReducedMotion();
  const [state, setState] = useState('closed'); // closed | opening | open

  const open = () => {
    if (state !== 'closed') return;
    if (reduce) {
      setState('open');
      return;
    }
    setState('opening');
    setTimeout(() => setState('open'), 1100);
  };

  const greeting = `Hey, ${siteConfig.nickname},`;

  return (
    <section id="letter" className="relative z-10 px-5 py-24 sm:py-32">
      <Reveal className="text-center">
        <h2 className="section-title">{letter.heading}</h2>
      </Reveal>

      <div className="mx-auto mt-14 flex min-h-[320px] max-w-2xl items-start justify-center">
        <AnimatePresence mode="wait">
          {state !== 'open' ? (
            <Envelope key="env" opening={state === 'opening'} onOpen={open} />
          ) : (
            <motion.article
              key="letter"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="paper relative w-full rounded-sm px-6 py-10 text-ink sm:px-12 sm:py-14"
              aria-label="Letter"
            >
              <Rose className="absolute -top-8 right-6 h-20 w-16 rotate-[8deg] drop-shadow-md sm:right-10" />

              <p className="font-script text-3xl text-rose sm:text-4xl">{greeting}</p>

              <div className="mt-6 space-y-5 font-serif text-[1.05rem] leading-[1.85] sm:text-lg">
                {letter.paragraphs.map((p, i) => (
                  <motion.p
                    key={i}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduce ? 0 : 0.35 + i * 0.22, duration: 0.7 }}
                  >
                    {p}
                  </motion.p>
                ))}
              </div>

              <motion.div
                className="mt-10"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: reduce ? 0 : 0.5 + letter.paragraphs.length * 0.22, duration: 1 }}
              >
                <p className="font-serif italic text-ink/80">{letter.closing}</p>
                <p className="mt-2 font-script text-3xl leading-snug text-rose sm:text-4xl">{letter.signature}</p>
                <svg viewBox="0 0 220 14" className="mt-1 h-3 w-48 text-rose/60" aria-hidden="true">
                  <motion.path
                    d="M2 9 C30 2 60 13 95 7 S160 3 218 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    initial={reduce ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: reduce ? 0 : 1 + letter.paragraphs.length * 0.22, duration: 1.4 }}
                  />
                </svg>
              </motion.div>

              <button
                type="button"
                onClick={() => setState('closed')}
                className="mt-10 text-sm text-ink/55 underline underline-offset-4 hover:text-ink/80"
              >
                Fold the letter back into its envelope
              </button>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
