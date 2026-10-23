import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { music } from '../data/relationshipData';
import { asset } from './SafeImage';

// Music is OFF by default and never autoplays. The button is mounted once at the
// app level, so her on/off choice persists for the whole visit while she scrolls.
export default function MusicToggle() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (!note) return undefined;
    const t = setTimeout(() => setNote(''), 3200);
    return () => clearTimeout(t);
  }, [note]);

  if (!music?.src) return null;

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
      return;
    }
    try {
      await a.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
      setNote('Music file not found yet. Add one to public/music/');
    }
  };

  return (
    <>
      <audio ref={audioRef} src={asset(music.src)} loop preload="none" onError={() => setPlaying(false)} />
      <div className="fixed bottom-5 left-5 z-[60] flex items-center gap-3" style={{ marginBottom: 'env(safe-area-inset-bottom)' }}>
        <button
          type="button"
          onClick={toggle}
          aria-pressed={playing}
          aria-label={playing ? 'Pause music' : 'Play music'}
          className="glass flex h-12 w-12 items-center justify-center rounded-full text-blush hover:bg-white/15"
        >
          {playing ? <Volume2 className="h-5 w-5" aria-hidden="true" /> : <VolumeX className="h-5 w-5" aria-hidden="true" />}
        </button>
        <AnimatePresence>
          {note && (
            <motion.span
              role="status"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="glass max-w-[60vw] rounded-full px-4 py-2 text-xs text-white/80"
            >
              {note}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
