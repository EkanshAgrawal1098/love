import { useCallback, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, Gift, RotateCcw, Sparkles } from 'lucide-react';
import Reveal from './Reveal';
import SafeImage from './SafeImage';
import Confetti from './Confetti';
import { quiz, quizText } from '../data/relationshipData';

const LETTERS = ['A', 'B', 'C', 'D'];

export default function Quiz() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [unlocked, setUnlocked] = useState([]);

  const q = quiz[index];
  const answered = picked !== null;
  const correct = answered && picked === q.correct;
  const total = quiz.length;
  const progress = done ? 100 : (index / total) * 100 + (answered ? 100 / total : 0);

  const choose = (i) => {
    if (answered) return;
    setPicked(i);
    if (i === q.correct) setScore((s) => s + 1);
    if (q.reward) setUnlocked((u) => [...u, q.reward]);
  };

  const next = () => {
    if (index + 1 >= total) {
      setDone(true);
      setConfetti(true);
    } else {
      setIndex((n) => n + 1);
      setPicked(null);
    }
  };

  const restart = () => {
    setIndex(0);
    setPicked(null);
    setScore(0);
    setDone(false);
    setUnlocked([]);
  };

  const stopConfetti = useCallback(() => setConfetti(false), []);
  const tier = quizText.tiers.find((t) => score >= t.min) || quizText.tiers[quizText.tiers.length - 1];

  return (
    <section id="game" className="relative z-10 px-6 py-24 sm:py-32">
      <Reveal className="text-center">
        <h2 className="section-title">{quizText.title}</h2>
        <p className="section-sub mt-4">{quizText.subtitle}</p>
      </Reveal>

      <Reveal className="mx-auto mt-12 max-w-2xl" delay={0.1}>
        <div className="glass overflow-hidden rounded-3xl p-5 sm:p-8">
          {/* progress */}
          <div className="mb-6">
            <div className="mb-2 flex justify-between text-xs uppercase tracking-widest text-white/55">
              <span>{done ? 'All done' : `Question ${index + 1} of ${total}`}</span>
              <span>
                {score} <span aria-hidden="true">💗</span>
                <span className="sr-only">points</span>
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
              <motion.div className="h-full rounded-full bg-gradient-to-r from-rose to-blush" animate={{ width: `${progress}%` }} transition={{ duration: 0.6, ease: 'easeOut' }} />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={index}
                initial={reduce ? false : { opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.35 }}
              >
                <h3 className="font-serif text-2xl leading-snug text-white sm:text-3xl">{q.question}</h3>

                <div className="mt-6 grid gap-3" role="group" aria-label="Answer choices">
                  {q.options.map((opt, i) => {
                    const isRight = answered && i === q.correct;
                    const isWrongPick = answered && i === picked && i !== q.correct;
                    return (
                      <motion.button
                        key={opt}
                        type="button"
                        onClick={() => choose(i)}
                        disabled={answered}
                        whileHover={!answered && !reduce ? { scale: 1.02 } : undefined}
                        whileTap={!answered && !reduce ? { scale: 0.98 } : undefined}
                        animate={isRight && !reduce ? { scale: [1, 1.04, 1] } : isWrongPick && !reduce ? { x: [0, -6, 6, -4, 4, 0] } : undefined}
                        className={`flex min-h-[52px] items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors ${
                          isRight
                            ? 'border-emerald-300/70 bg-emerald-400/15 text-white'
                            : isWrongPick
                              ? 'border-amber-300/70 bg-amber-300/10 text-white'
                              : answered
                                ? 'border-white/10 bg-white/[0.03] text-white/45'
                                : 'border-white/15 bg-white/[0.05] text-white/90 hover:border-blush/60 hover:bg-white/10'
                        }`}
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-medium">
                          {isRight ? <Check className="h-4 w-4" aria-hidden="true" /> : LETTERS[i]}
                        </span>
                        <span>{opt}</span>
                      </motion.button>
                    );
                  })}
                </div>

                <div aria-live="polite">
                  <AnimatePresence>
                    {answered && (
                      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                        <p className="flex items-start gap-2 font-serif text-lg text-blush">
                          <Sparkles className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" />
                          <span>{correct ? q.rightMsg : q.wrongMsg}</span>
                        </p>

                        {q.reward && (
                          <div className="mt-4 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-3">
                            {q.reward.image && (
                              <div className="h-20 w-16 shrink-0 overflow-hidden rounded-md">
                                <SafeImage src={q.reward.image} alt="" focus={q.reward.focus} className="h-full w-full object-cover" />
                              </div>
                            )}
                            <p className="flex items-start gap-2 text-sm leading-relaxed text-white/80">
                              <Gift className="mt-0.5 h-4 w-4 shrink-0 text-rose" aria-hidden="true" />
                              <span>{q.reward.text}</span>
                            </p>
                          </div>
                        )}

                        <button type="button" onClick={next} className="btn-primary mt-6 w-full sm:w-auto">
                          {index + 1 >= total ? 'See how I did' : 'Next question'}
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="text-center">
                <p className="font-script text-6xl text-blush">
                  {score} / {total}
                </p>
                <p className="mt-3 font-serif text-lg text-white/85">{tier.text}</p>
                <p className="mx-auto mt-6 max-w-md font-serif text-xl italic leading-relaxed text-white">{quizText.ending}</p>

                {unlocked.length > 0 && (
                  <div className="mt-8 text-left">
                    <p className="mb-3 text-center text-xs uppercase tracking-widest text-white/50">Sweet notes you unlocked</p>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {unlocked.map((u, i) => (
                        <li key={i} className="rounded-xl border border-white/10 bg-white/[0.05] p-3 text-sm leading-relaxed text-white/80">
                          {u.text.replace(/^Unlocked:\s*/i, '')}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button type="button" onClick={restart} className="btn-ghost mt-8">
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  Play again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <p className="mt-4 text-center text-xs text-white/40">This game is just for fun. The letter below is always open, whatever your score.</p>
      </Reveal>

      {confetti && <Confetti onDone={stopConfetti} />}
    </section>
  );
}
