import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { Heart, MessageCircle, Smile, Sparkles, Star, Sunrise } from 'lucide-react';
import Reveal from './Reveal';
import SafeImage from './SafeImage';
import { milestones, timelineText } from '../data/relationshipData';

const ICONS = { sparkles: Sparkles, chat: MessageCircle, heart: Heart, smile: Smile, star: Star, sun: Sunrise };

export default function Timeline() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 70%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="story" className="relative z-10 px-6 py-24 sm:py-32">
      <Reveal className="text-center">
        <h2 className="section-title">{timelineText.title}</h2>
        <p className="section-sub mt-4">{timelineText.subtitle}</p>
      </Reveal>

      <div ref={ref} className="relative mx-auto mt-16 max-w-5xl">
        {/* the line, and the glowing part that fills as you scroll */}
        <div aria-hidden="true" className="absolute bottom-0 left-5 top-0 w-px -translate-x-1/2 bg-white/15 md:left-1/2" />
        <motion.div
          aria-hidden="true"
          className="absolute bottom-0 left-5 top-0 w-[2px] origin-top -translate-x-1/2 bg-gradient-to-b from-blush via-rose to-blush shadow-[0_0_14px_rgba(255,140,170,0.9)] md:left-1/2"
          style={{ scaleY: reduce ? 1 : fill }}
        />

        <ol>
          {milestones.map((m, i) => {
            const Icon = ICONS[m.icon] || Heart;
            const right = i % 2 === 1;
            return (
              <motion.li
                key={m.title}
                className="relative mb-14 pl-14 last:mb-0 md:grid md:grid-cols-2 md:gap-20 md:pl-0"
                initial={reduce ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="absolute left-5 top-3 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-blush/50 bg-midnight text-blush shadow-glow md:left-1/2">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>

                <div className={`glass rounded-2xl p-5 sm:p-6 ${right ? 'md:col-start-2' : 'md:col-start-1 md:text-right'}`}>
                  {m.date && <p className="text-xs uppercase tracking-[0.2em] text-blush/70">{m.date}</p>}
                  <h3 className="mt-1 font-serif text-xl text-white sm:text-2xl">{m.title}</h3>
                  {m.image && (
                    <div className={`mt-4 ${right ? '' : 'md:ml-auto'} max-w-xs`}>
                      <div className="polaroid" style={{ transform: `rotate(${right ? 1.5 : -1.5}deg)` }}>
                        <SafeImage src={m.image} alt={`${m.title}`} focus={m.focus} className="aspect-[4/3] w-full object-cover" />
                      </div>
                    </div>
                  )}
                  <p className="mt-4 font-script text-2xl leading-snug text-blush">{m.note}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
