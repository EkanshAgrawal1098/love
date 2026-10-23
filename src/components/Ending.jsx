import { motion, useReducedMotion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Particles from './Particles';
import Reveal from './Reveal';
import { scrollToId } from './Navbar';
import { ending, siteConfig } from '../data/relationshipData';

export default function Ending() {
  const reduce = useReducedMotion();
  return (
    <section
      id="ending"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-28 text-center"
      style={{ background: 'linear-gradient(180deg, rgba(11,10,31,0) 0%, #0b0a1f 18%, #120b34 60%, #07061a 100%)' }}
    >
      <Particles stars={110} hearts={4} />

      <div className="relative z-10 mx-auto max-w-2xl">
        <Reveal>
          <motion.div
            className="mx-auto mb-8 flex h-20 w-20 items-center justify-center"
            animate={reduce ? undefined : { scale: [1, 1.1, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Heart className="h-14 w-14 fill-rose text-rose drop-shadow-[0_0_28px_rgba(229,84,111,0.9)]" aria-hidden="true" />
          </motion.div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-script text-5xl text-blush sm:text-6xl md:text-7xl" style={{ textShadow: '0 0 36px rgba(255,140,170,0.45)' }}>
            {ending.title}
          </h2>
        </Reveal>

        <div className="mt-10 space-y-5 font-serif text-lg leading-relaxed text-white/85 sm:text-xl">
          {ending.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.15 + i * 0.12}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.6} className="mt-12">
          <button
            type="button"
            onClick={() => scrollToId('letter')}
            className="rounded-full px-6 py-3 text-sm text-white/65 underline decoration-white/30 underline-offset-8 transition-colors hover:text-white"
          >
            {ending.button}
          </button>
        </Reveal>
      </div>

      {siteConfig.footer && <p className="absolute bottom-6 z-10 px-6 text-xs text-white/35">{siteConfig.footer}</p>}
    </section>
  );
}
