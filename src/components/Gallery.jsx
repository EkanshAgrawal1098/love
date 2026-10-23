import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import Reveal from './Reveal';
import SafeImage from './SafeImage';
import Lightbox from './Lightbox';
import { memories, memoriesText } from '../data/relationshipData';

const TILTS = [-3, 2, -1.5, 3, -2.5, 1.5, -1, 2.5];

export default function Gallery() {
  const reduce = useReducedMotion();
  const scroller = useRef(null);
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: 0 });
  const [dragging, setDragging] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  // Mouse drag-to-scroll. Touch uses native swipe scrolling.
  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse') return;
    drag.current = { down: true, startX: e.clientX, startLeft: scroller.current.scrollLeft, moved: 0 };
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d.down) return;
    const dx = e.clientX - d.startX;
    d.moved = Math.max(d.moved, Math.abs(dx));
    if (d.moved > 6 && !dragging) setDragging(true);
    scroller.current.scrollLeft = d.startLeft - dx;
  };
  const endDrag = () => {
    drag.current.down = false;
    setDragging(false);
  };
  const open = (i) => {
    if (drag.current.moved > 6) return; // it was a drag, not a click
    setOpenIndex(i);
  };
  const nudge = (dir) => scroller.current?.scrollBy({ left: dir * Math.min(340, window.innerWidth * 0.8), behavior: 'smooth' });

  return (
    <section id="memories" className="relative z-10 py-24 sm:py-32">
      <Reveal className="px-6 text-center">
        <h2 className="section-title">{memoriesText.title}</h2>
        <p className="section-sub mt-4">{memoriesText.subtitle}</p>
      </Reveal>

      <div className="relative mx-auto mt-14 max-w-[1400px]">
        <div
          ref={scroller}
          role="list"
          aria-label="Memories. Scroll sideways to see more."
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          className={`hide-scrollbar flex gap-6 overflow-x-auto px-6 pb-10 pt-6 sm:gap-8 sm:px-12 ${
            dragging ? 'cursor-grabbing select-none' : 'cursor-grab snap-x snap-mandatory'
          }`}
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {memories.map((m, i) => (
            <motion.div
              role="listitem"
              key={m.title + i}
              className="w-[74vw] max-w-[300px] shrink-0 snap-center sm:w-[290px]"
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 40px 0px 0px' }}
              transition={{ duration: 0.7, delay: Math.min(i, 4) * 0.08 }}
            >
              <motion.button
                type="button"
                onClick={() => open(i)}
                aria-label={`Open memory: ${m.title}`}
                className="polaroid block w-full text-left"
                style={{ rotate: reduce ? 0 : TILTS[i % TILTS.length] }}
                whileHover={reduce ? undefined : { rotate: 0, y: -8, scale: 1.03 }}
                whileFocus={reduce ? undefined : { rotate: 0, y: -8, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                <div className="aspect-[4/5] w-full overflow-hidden bg-black/10">
                  <SafeImage src={m.image} alt={`${m.title}: a photo of us`} focus={m.focus} className="h-full w-full object-cover" />
                </div>
                <div className="px-1 pb-1 pt-3 text-ink">
                  <p className="font-script text-2xl leading-tight text-ink">{m.title}</p>
                  {m.date && <p className="mt-1 text-xs tracking-wide text-ink/55">{m.date}</p>}
                </div>
              </motion.button>
            </motion.div>
          ))}

          <div role="listitem" className="flex w-[74vw] max-w-[300px] shrink-0 snap-center items-center sm:w-[290px]">
            <div className="glass flex aspect-[4/5] w-full flex-col items-center justify-center rounded-md p-7 text-center">
              <Heart className="mb-5 h-8 w-8 fill-rose text-rose drop-shadow-[0_0_14px_rgba(229,84,111,0.7)]" aria-hidden="true" />
              <p className="font-script text-3xl leading-snug text-blush">{memoriesText.endCard}</p>
            </div>
          </div>
        </div>

        <div className="mt-2 hidden justify-center gap-4 sm:flex">
          <button type="button" onClick={() => nudge(-1)} aria-label="Previous memories" className="glass flex h-12 w-12 items-center justify-center rounded-full text-blush hover:bg-white/15">
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => nudge(1)} aria-label="Next memories" className="glass flex h-12 w-12 items-center justify-center rounded-full text-blush hover:bg-white/15">
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <p className="mt-4 text-center text-xs text-white/40 sm:hidden">Swipe sideways →</p>
      </div>

      <AnimatePresence>
        {openIndex !== null && <Lightbox items={memories} index={openIndex} onChange={setOpenIndex} onClose={() => setOpenIndex(null)} />}
      </AnimatePresence>
    </section>
  );
}
