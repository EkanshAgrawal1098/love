import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Menu, X } from 'lucide-react';

export const NAV_LINKS = [
  { id: 'memories', label: 'Memories' },
  { id: 'story', label: 'Our Story' },
  { id: 'game', label: 'Little Game' },
  { id: 'letter', label: 'The Letter' },
  { id: 'actions', label: 'Actions' },
  { id: 'ending', label: 'Ending' },
];

export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (id) => {
    setOpen(false);
    // Wait a tick so the menu closes before the page scrolls.
    setTimeout(() => scrollToId(id), 60);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[65] transition-colors duration-500 ${
        solid || open ? 'bg-midnight/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5" aria-label="Main">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 font-script text-2xl text-blush"
          aria-label="Back to the beginning"
        >
          <Heart className="h-4 w-4 fill-rose text-rose" aria-hidden="true" />
          For you
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <button
                type="button"
                onClick={() => go(l.id)}
                className="rounded-full px-4 py-2 text-sm text-white/75 transition-colors hover:bg-white/10 hover:text-white"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full text-blush md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden px-5 pb-4 md:hidden"
          >
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <button
                  type="button"
                  onClick={() => go(l.id)}
                  className="w-full rounded-xl px-3 py-3.5 text-left font-serif text-lg text-white/85 hover:bg-white/10"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
