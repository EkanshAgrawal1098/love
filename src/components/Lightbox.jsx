import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import SafeImage from './SafeImage';

// Accessible modal: Esc closes, arrow keys navigate, focus is trapped on its buttons and restored on close.
export default function Lightbox({ items, index, onClose, onChange }) {
  const closeRef = useRef(null);
  const item = items[index];

  useEffect(() => {
    const previous = document.activeElement;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
      previous?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onChange((index + 1) % items.length);
      if (e.key === 'ArrowLeft') onChange((index - 1 + items.length) % items.length);
      if (e.key === 'Tab') {
        const nodes = document.querySelectorAll('[data-lightbox-focus]');
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, items.length, onChange, onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-[#fdf8ee] text-ink shadow-soft"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex min-h-0 flex-1 items-center justify-center bg-black/90">
          <SafeImage src={item.image} alt={`${item.title} photo`} eager className="max-h-[58vh] w-full object-contain" />
        </div>
        <div className="max-h-[32vh] overflow-y-auto p-5 sm:p-7">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-script text-3xl text-rose">{item.title}</h3>
            {item.date && <span className="text-sm text-ink/60">{item.date}</span>}
          </div>
          <p className="mt-3 font-serif text-base leading-relaxed text-ink/85">{item.description}</p>
        </div>

        <button
          ref={closeRef}
          data-lightbox-focus
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-white hover:bg-black/75"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        {items.length > 1 && (
          <>
            <button
              data-lightbox-focus
              type="button"
              onClick={() => onChange((index - 1 + items.length) % items.length)}
              aria-label="Previous memory"
              className="absolute left-3 top-[28vh] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white hover:bg-black/75"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              data-lightbox-focus
              type="button"
              onClick={() => onChange((index + 1) % items.length)}
              aria-label="Next memory"
              className="absolute right-3 top-[28vh] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white hover:bg-black/75"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
