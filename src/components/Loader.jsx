import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Heart } from 'lucide-react';

// A short, skippable page-entry animation. Tap anywhere to skip it.
export default function Loader({ onDone }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(onDone, reduce ? 250 : 1900);
    return () => clearTimeout(t);
  }, [onDone, reduce]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-midnight"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      onClick={onDone}
      role="status"
      aria-label="Opening"
    >
      <motion.div
        animate={reduce ? undefined : { scale: [1, 1.18, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Heart className="h-12 w-12 fill-rose text-rose drop-shadow-[0_0_18px_rgba(229,84,111,0.8)]" aria-hidden="true" />
      </motion.div>
      <motion.p
        className="mt-6 font-script text-3xl text-blush"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Opening something small…
      </motion.p>
    </motion.div>
  );
}
