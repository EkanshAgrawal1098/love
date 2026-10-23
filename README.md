# A Little Place For Us ❤️

A private, interactive apology website: a polaroid memory gallery, a story timeline, a gentle little quiz, an envelope-opening letter, and a quiet ending. Built with React, Vite, Tailwind CSS, Framer Motion and Lucide icons. No backend, no accounts, no API keys.

The whole experience is designed around one message: **"I'm sorry, I cherish our memories, I'm willing to grow, and I respect your need for time."** Nothing on the site pressures her to answer, and nothing is locked behind the game.

## Run it

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install
npm run dev
```

Open the address shown in the terminal (usually http://localhost:5173). To test on your phone, run `npm run dev -- --host` and open the "Network" address on the same Wi-Fi.

## Personalise it (one file)

Everything lives in **`src/data/relationshipData.js`**. It is commented section by section:

| What | Where in the file |
| --- | --- |
| Her nickname / name, footer | `siteConfig` |
| Background music path | `music` |
| Hero text | `hero` |
| Photos, captions, dates, descriptions | `memories` |
| Timeline milestones | `milestones` |
| Quiz questions, answers, sweet notes | `quiz` |
| The letter | `letter` |
| Your commitments | `commitments` |
| The final message | `ending` |

### Replacing photos

1. Copy your photo into `public/images/`.
2. In `relationshipData.js`, set the memory's `image` to `'images/your-photo.jpg'` (no leading slash).
3. If faces get cut off, tweak `focus`, for example `'center 20%'` to show more of the top of the photo.

Tips: phone photos are big. Resize to about 1400 px on the long side (under ~400 KB each) so the site opens quickly on her phone. Missing images show a soft heart placeholder instead of breaking.

> The photos currently in the project were matched to the categories as a starting point. The descriptions are intentionally left as prompts: please write the true story behind each one, and re-order or swap photos so every caption is honest.

### Music

Put an `.mp3` in `public/music/` and set `music.src` in the data file (default `music/our-song.mp3`). Music is **off by default** and never autoplays; she can turn it on with the speaker button. If there is no music file, set `src: ''` to hide the button.

### The quiz

The five questions are samples. For each one set the `question`, the `options` (2 to 4), the `correct` index (`0` is the first option), and the playful messages. Wrong answers get a gentle, funny message, never a negative one, and every answer unlocks a sweet note.

### The commitments

The three cards are examples. Replace them with promises you can genuinely keep. A few honest, specific lines are worth more than polished general ones.

## Share it with her

```bash
npm run build
```

This creates a `dist/` folder, a plain static website. Upload that folder to any free static host (Netlify Drop, Vercel, Cloudflare Pages, GitHub Pages) and send her the link. The site has `noindex` set so search engines will not list it. Check it on your own phone first.

## Project structure

```
src/
  data/relationshipData.js   ← everything you edit
  components/                ← Hero, Gallery, Timeline, Quiz, Letter, Commitments, Ending, and helpers
  App.jsx  main.jsx  index.css
public/
  images/                    ← your photos
  music/                     ← your song
```

## Accessibility and performance

- Respects `prefers-reduced-motion` (animations, particles and confetti calm down or switch off).
- Keyboard friendly: all buttons are real buttons, the photo viewer traps focus, closes with Esc and navigates with the arrow keys.
- Images are lazy-loaded with alt text; particles pause when off-screen.
- Mobile-first layout with no horizontal overflow.
