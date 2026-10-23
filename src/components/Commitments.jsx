import { Ear, Heart, MessageCircleHeart, Sprout, Star } from 'lucide-react';
import Reveal from './Reveal';
import { commitments, commitmentsText } from '../data/relationshipData';

const ICONS = { listen: Ear, honest: MessageCircleHeart, grow: Sprout, heart: Heart, star: Star };

export default function Commitments() {
  return (
    <section id="actions" className="relative z-10 px-6 py-24 sm:py-32">
      <Reveal className="text-center">
        <h2 className="section-title">{commitmentsText.title}</h2>
        <p className="section-sub mt-4">{commitmentsText.subtitle}</p>
      </Reveal>

      <ul className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
        {commitments.map((c, i) => {
          const Icon = ICONS[c.icon] || Heart;
          return (
            <li key={c.title}>
              <Reveal delay={i * 0.12} className="h-full">
                <div className="glass h-full rounded-3xl p-7 text-center transition-transform duration-500 hover:-translate-y-1.5">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose/15 text-blush shadow-glow">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-serif text-2xl text-white">{c.title}</h3>
                  <p className="mt-3 font-serif leading-relaxed text-white/75">{c.text}</p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
