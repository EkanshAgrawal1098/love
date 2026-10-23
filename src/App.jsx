import { useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import CustomCursor from './components/CustomCursor';
import MusicToggle from './components/MusicToggle';
import Particles from './components/Particles';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Timeline from './components/Timeline';
import Quiz from './components/Quiz';
import Letter from './components/Letter';
import Commitments from './components/Commitments';
import Ending from './components/Ending';

export default function App() {
  const [loading, setLoading] = useState(true);
  const finish = useCallback(() => setLoading(false), []);

  return (
    <div className="aurora relative min-h-screen">
      <AnimatePresence>{loading && <Loader key="loader" onDone={finish} />}</AnimatePresence>

      <ScrollProgress />
      <Navbar />
      <CustomCursor />
      <MusicToggle />
      <BackToTop />

      {/* one calm, page-wide layer of faint stars behind everything */}
      <Particles fixed stars={40} hearts={0} className="opacity-60" />

      <main className="relative">
        <Hero ready={!loading} />
        <Gallery />
        <Timeline />
        <Quiz />
        <Letter />
        <Commitments />
        <Ending />
      </main>
    </div>
  );
}
