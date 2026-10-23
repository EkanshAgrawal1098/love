/* ============================================================================
   ✏️  EVERYTHING YOU NEED TO PERSONALISE LIVES IN THIS ONE FILE.

   HOW TO REPLACE PHOTOS
   1. Put your photo in  public/images/  (e.g. public/images/our-trip.jpg)
   2. Change the `image` field below to  'images/our-trip.jpg'   (no leading slash)
   Tip: JPGs under ~400 KB load fastest on a phone. If a photo is missing,
   the site shows a soft heart placeholder instead of breaking.

   HOW TO EDIT TEXT
   Just change the text between the quotes. Use \n\n inside a string for a blank line.

   NOTE ABOUT THE PHOTOS ALREADY HERE
   I matched your photos to the categories as a starting point. Re-order them, swap
   them, or rewrite any caption so each one tells the TRUE story. The descriptions
   are deliberately left as prompts — only you know what really happened.
   ========================================================================== */

/* ---------- 1. BASICS ---------- */
export const siteConfig = {
  // How the site addresses her. Used in the hero heading and the letter greeting.
  nickname: 'my favourite person',
  // Optional. Put her real name here if you want it shown in the page title area / footer. Leave '' to hide.
  name: '',
  // Optional. Shown at the very bottom of the page. Leave '' to hide.
  footer: 'Made with care, and no expectations.',
};

/* ---------- 2. BACKGROUND MUSIC ----------
   Put an .mp3 in public/music/ and set the path below. Music is OFF by default and
   only plays if she taps the speaker button. Leave '' to hide the music button. */
export const music = {
  src: 'music/our-song.mp3',
  label: 'Our song',
};

/* ---------- 3. HERO TEXT ---------- */
export const hero = {
  subtitle:
    'I made a little place filled with our memories, a few smiles, and some words I should have said better.',
  primaryButton: 'Open Our Little World ♡',
  secondaryButton: 'Take Your Time',
  gentleMessage:
    "This isn't a request for an answer. I just wanted to create something meaningful for you. Take all the time you need.",
};

/* ---------- 4. MEMORY GALLERY ----------
   Each memory:
     title       – short handwritten caption on the polaroid
     date        – optional, '' to hide (e.g. '10 July 2025')
     image       – path inside public/ (see top of file)
     focus       – optional CSS object-position for the thumbnail, e.g. 'center 20%' keeps faces in frame
     description – the personal note shown when she taps the memory
   Add or remove memories freely — the gallery adjusts automatically. */
const PROMPT = 'Write the real story of this moment here: where you were, what happened, what you felt, and what you remember most.';

export const memories = [
  { title: 'Our Special video call ', date: '27 July 2025', image: 'images/01-first-conversation.jpg', focus: 'center 20%', description: PROMPT },
  { title: 'Our first meeting', date: '7 Auguest 2022', image: 'images/02-first-meeting.jpg', focus: 'center 30%', description: PROMPT },
  { title: 'Our favourite bullet ride', date: '5 March 2025', image: 'images/03-favourite-date.jpg', focus: 'center 45%', description: PROMPT },
  { title: 'Our funniest moments', date: '4 July 2026', image: 'images/04-funny-moments.jpg', focus: 'center 25%', description: PROMPT },
  { title: 'A favourite photograph', date: '10 July 2026', image: 'images/05-favourite-photograph.jpg', focus: 'center 60%', description: PROMPT },
  { title: 'Besties time', date: '3 November 2024', image: 'images/06-late-night.jpg', focus: 'center 40%', description: PROMPT },
  { title: 'Our favourite day', date: '18 June 2025', image: 'images/07-favourite-songs.jpg', focus: 'center 35%', description: PROMPT },
  { title: 'Small moments that meant everything', date: '7  March 2026', image: 'images/08-small-moments.jpg', focus: 'center 40%', description: PROMPT },
  { title: 'All the colours', date: '4 March 2026', image: 'images/09-holi.jpg', focus: 'center 40%', description: PROMPT },
  { title: 'Dressed up, side by side', date: '1 October 2025', image: 'images/10-dressed-up.jpg', focus: 'center 30%', description: PROMPT },
  { title: 'The little things', date: '24 June 2026', image: 'images/11-little-things.jpg', focus: 'center 60%', description: PROMPT },
  { title: 'Just the two of us', date: '10 July 2025', image: 'images/12-two-of-us.jpg', focus: 'center 35%', description: PROMPT },
  { title: 'A quiet view', date: '10 July 2026', image: 'images/13-quiet-view.jpg', focus: 'center 75%', description: PROMPT },
  { title: 'Silly faces', date: '3 april 2025', image: 'images/14-silly-faces.jpg', focus: 'center 30%', description: PROMPT },
  { title: 'Drawn with love', date: '19 June 2025', image: 'images/15-drawn-with-love.jpg', focus: 'center 40%', description: PROMPT },
];

export const memoriesText = {
  title: 'Some Moments Stay Forever ✨',
  subtitle: 'Little pieces of our story that still mean so much to me.',
  endCard: 'And these are only a few of the moments I will always remember.',
};

/* ---------- 5. TIMELINE ----------
   icon options: 'sparkles' | 'chat' | 'heart' | 'smile' | 'star' | 'sun'
   Replace the `note` of each milestone with your real words. `image` is optional ('' to hide). */
export const timelineText = {
  title: 'From Strangers to Something Special',
  subtitle: 'A few chapters I keep close.',
};

export const milestones = [
  { icon: 'sparkles', date: '7 auguest 2022', title: 'The day we first met', note: 'The first photgraph with you that meant a lot to me', image: 'images/02-first-meeting.jpg', focus: 'center 20%' },
  { icon: 'chat', date: '27 July 2025', title: 'When we started talking regularly', note: 'When did a message turn into a habit you looked forward to?', image: 'images/01-first-conversation.jpg', focus: 'center 15%' },
  { icon: 'heart', date: '5 March 2026', title: 'Our first bullet moment', note: 'The moment that stick to my heart', image: 'images/03-favourite-date.jpg', focus: 'center 45%' },
  { icon: 'smile', date: 'Add a date', title: 'A memory that made us laugh', note: 'The one you both still smile about.', image: 'images/04-funny-moments.jpg', focus: 'center 30%' },
  { icon: 'star', date: 'Add a date', title: 'When I realised how important you are to me', note: 'Say it plainly and honestly — no pressure attached.', image: 'images/13-quiet-view.jpg', focus: 'center 75%' },
  { icon: 'sun', date: 'Today', title: 'Where we are today', note: 'Apart, with a lot of respect and a lot of gratitude. Whatever happens next, these chapters mattered.', image: '' },
];

/* ---------- 6. THE LOVE GAME ----------
   Each question:
     question   – the question text
     options    – 2 to 4 answers
     correct    – index of the right answer (0 = first option)
     rightMsg   – shown when she gets it right
     wrongMsg   – shown when she doesn't (keep it playful, never negative)
     reward     – a sweet note unlocked after ANY answer (right or wrong), optional image
   ⚠️ The questions below are SAMPLES. Replace them with real answers only you two know. */
export const quizText = {
  title: 'How Well Do You Remember Us? 💗',
  subtitle: 'Five little questions. No pressure, no stakes — just for fun.',
  ending: 'Whether you remembered every answer or not, the little moments we shared will always be special to me. ❤️',
  tiers: [
    { min: 5, text: 'Perfect score. Your memory is unbelievable.' },
    { min: 3, text: 'Really close! You remember more than you think.' },
    { min: 0, text: 'Not a single worry. Some memories are meant to be told again.' },
  ],
};

export const quiz = [
  {
    question: "What's my favourite food?",
    options: ['Pizza', 'Biryani', 'Pasta', 'Street snacks'],
    correct: 3,
    rightMsg: 'Yes! You know me too well.',
    wrongMsg: "Ooh, so close. I'd still happily share mine with you.",
    reward: { text: 'Unlocked: Some of my favourite meals tasted better because of who I was with.', image: 'images/11-little-things.jpg', focus: 'center 60%' },
  },
  {
    question: 'Which of these was our funniest inside joke?',
    options: ['The silly-face selfies', 'The wrong-turn ride', 'The unfinished sentence', 'The mystery snack'],
    correct: 0,
    rightMsg: 'Exactly. I still smile at that one.',
    wrongMsg: 'Plot twist! Even I forgot for a second. Hehe.',
    reward: { text: 'Unlocked: Your laugh is one of my favourite sounds.', image: 'images/14-silly-faces.jpg', focus: 'center 30%' },
  },
  {
    question: 'Which moment was special to us?',
    options: ['Bike ride', 'Dinner date', 'street snacks', 'All of the above'],
    correct: 3,
    rightMsg: 'You remembered. Now it is stuck in my head too.',
    wrongMsg: 'Nope, but that is a great song anyway.',
    reward: { text: 'Unlocked: Music sounds different when it reminds me of you.', image: 'images/07-favourite-songs.jpg', focus: 'center 35%' },
  },
  {
    question: 'Which place do we both remember most?',
    options: ['The hilltop view', 'The old café', 'The night drive', 'The festival crowd'],
    correct: 0,
    rightMsg: 'That view, that breeze. Yes.',
    wrongMsg: 'Not that one, but all of them were good.',
    reward: { text: 'Unlocked: Wherever we went, the best part was the company.', image: 'images/13-quiet-view.jpg', focus: 'center 75%' },
  },
  {
    question: 'Which moment made us laugh the most?',
    options: ['The photo that went wrong', 'The wrong order', 'The dance attempt', 'The unexpected rain'],
    correct: 2,
    rightMsg: 'That was a good one. Great memory!',
    wrongMsg: 'Close enough. We laughed at so many.',
    reward: { text: 'Unlocked: Thank you for every time you made an ordinary day lighter.', image: 'images/09-holi.jpg', focus: 'center 40%' },
  },
];

/* ---------- 7. THE LETTER ----------
   Edit freely. Each string in `paragraphs` is one paragraph. */
export const letter = {
  heading: 'A Letter I Owe You...',
  hint: 'Tap the envelope when you feel like reading it',
  paragraphs: [
    "I don't really know where to begin, but I know I owe you a genuine apology.",
    "I'm sorry for the ways I hurt you and for the things I did wrong. I'm sorry for the moments when I didn't give your feelings the understanding and care they deserved.",
    "I know that saying sorry cannot undo what happened, and I don't expect a few words to fix everything.",
    "You've been such a special part of my life. The conversations, the laughter, the little memories, and even the simplest moments we shared mean more to me than I can properly explain.",
    'I miss us. But more importantly, I understand that your feelings matter too.',
    "I'm not writing this to pressure you into coming back or to ask you to make a decision before you're ready.",
    "I want to learn from my mistakes and show through my actions, not just my words, that I can do better. I know that change takes time, and I don't expect you to trust words alone.",
    'A part of me hopes we might get another chance to write a better chapter together. But I respect that you need time, and I will respect your decision.',
    'Thank you for the beautiful memories you\'ve given me. I am genuinely sorry for the hurt I\'ve caused you.',
    "Take all the time you need. You don't owe me an answer.",
  ],
  closing: 'With love,',
  signature: 'Someone who is truly sorry. ❤️',
};

/* ---------- 8. COMMITMENTS ----------
   icon options: 'listen' | 'honest' | 'grow' | 'heart' | 'star'
   ⚠️ These are EXAMPLES. Replace them with promises you can honestly keep. */
export const commitmentsText = {
  title: 'Not Just Words, But Actions.',
  subtitle: 'Things I want to do better — and will try to show, not just say.',
};

export const commitments = [
  { icon: 'listen', title: 'Listen Better', text: 'Understand her feelings instead of immediately defending myself.' },
  { icon: 'honest', title: 'Communicate Honestly', text: 'Address misunderstandings with patience and respect.' },
  { icon: 'grow', title: 'Grow Through My Mistakes', text: 'Make meaningful changes rather than repeating empty promises.' },
];

/* ---------- 9. THE ENDING ---------- */
export const ending = {
  title: 'Whatever Tomorrow Brings...',
  paragraphs: [
    "I'm grateful for the beautiful moments we've shared. I hope life brings you happiness, peace, and all the little things that make you smile.",
    'A part of me hopes our paths find their way back to each other. But I know that love also means respecting your feelings, your space, and your choice.',
    "You don't need to reply. Just take care of yourself. ❤️",
  ],
  button: 'Read My Letter Again',
};
