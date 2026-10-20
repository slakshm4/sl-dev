// ─────────────────────────────────────────────────────────────
//  articles.ts  ·  the cards in notebook → case studies, ephemera and trials. each card is its own little article.
//
//  /notebook/case-studies/<slug>   ·   /notebook/ephemera/<slug>   ·   /notebook/trials/<slug>
//
//  to write one up: replace the placeholder in `body` (one string per block; the mini-markup in src/lib/text.ts works:
//  "## a heading", _italic_, "> a pull quote", "![alt text](/images/file.webp "caption")", [a link](/somewhere)),
//  then delete `draft: true` so the "in the drafts" stamp goes away. images go in /public/images.
//
//  kicker   the small pill on the card ("quiz", "web", "taste test"…)
//  blurb    the line under the title on the card
//  add a new card by copying an object: it appears on the notebook page by itself.
// ─────────────────────────────────────────────────────────────
import type { Drawer, Piece } from "./writing-types";

const soon = ["the full write-up for this one is still being assembled: sketches, screenshots, the works. come back soon."];

const caseStudies: Piece[] = [
  {
    slug: "what-species-are-you",
    title: "what species are you",
    kicker: "quiz",
    blurb: "a personality quiz that sorts you into a species based on your choices.",
    body: [
      "a personality quiz that sorts you into species based on your choices. i made it for [Atelier Town](/projects/little-town), alongside the world of _The Providence Duology_.",
      "_The Providence Duology_ began, for me, with a question: what happens when a society becomes so afraid of its own ending that it decides some lives are more worth saving than others?",
      "it is a story about Elysia, an empire built on borrowed time, and Eden—known first only as 1415—an escaped experiment carrying the evidence of what the empire has done in the name of survival. around him is a world shaped by genetic control, inheritance, grief, and the quiet violence of progress when no one asks who pays for it.",
      "but it is also a story about learning how to see. about Nivara, who must confront the cruelty hidden inside her family's legacy. about the fragile work of trust after betrayal. about people from different worlds choosing, slowly and imperfectly, to build something beyond the systems that made them.",
      "_Forsaken_ and _Redeemer_ are about rebellion. they are about what it means to refuse the future you were given—and to imagine a different one anyway.",
      "~> an uprising is on the horizon. [which side are you on?](https://which-alien-species-are-you-quiz.vercel.app/)",
    ],
  },
  { slug: "wall-of-vinyls", title: "wall of vinyls", kicker: "web", draft: true, body: soon },
  { slug: "melodious-d20", title: "melodious d20 for Melody", kicker: "tabletop", draft: true, body: soon },
  { slug: "portable-photo-booth", title: "portable photo booth using Raspberry Pi", kicker: "hardware", draft: true, body: soon },
  { slug: "joeldi-centre", title: "joeldi centre for human approximation", kicker: "world-building", draft: true, body: soon },
  { slug: "v2-appreciation-mural", title: "v2 appreciation digital mural", kicker: "web", draft: true, body: soon },
  {
    slug: "sitarify",
    title: "sitarify",
    kicker: "music",
    blurb: "a visualizer of Karnatik and Hindustani music, making it accessible to everyone.",
    body: [
      "i built sitarify from a feeling i know well as an nri: being close to a culture, but often meeting it through fragments.",
      "as a Kerala Iyer Tamizh person in the diaspora, music has always felt like one of the ways back—a drone in the background, a raga name i half-recognize, the sense that there is a whole language of feeling i want to spend more time learning.",
      "sitarify lets you hear any song reimagined on a modelled sitar, while making room for both Hindustani and Karnatik ragas, their moods, stories, and ways of moving. i wanted it to feel less like putting an \"Indian\" filter on music, and more like an invitation to listen differently.",
      "maybe it is also my own small way of making the distance feel a little more inhabitable.",
    ],
    link: { label: "try it!", href: "https://slakshm4.github.io/sitarify/" },
  },
  { slug: "contextomy", title: "contextomy", kicker: "web", blurb: "blackout poetry reimagined.", draft: true, body: soon },
  { slug: "activity-randomizer", title: "activity randomizer / slots", kicker: "web", draft: true, body: soon },
  { slug: "hydraulic-press-simulator", title: "hydraulic press simulator with water bottles", kicker: "simulation", draft: true, body: soon },
  { slug: "vancouver-clocks-pomodoro", title: "Vancouver clocks themed pomodoro", kicker: "web", draft: true, body: soon },
  {
    slug: "iq-test",
    title: "iq (ill-advised quackery) test",
    kicker: "quiz",
    blurb: "the Institute of Quizzical Inquiry, Dept. of Impractical Intelligence and Questionology.",
    draft: true,
    body: soon,
  },
];

const ephemera: Piece[] = [
  { slug: "scrapbook-moodboard", title: "scrapbook / moodboard", kicker: "moodboard", blurb: "Pinterest-pilled.", draft: true, body: soon },
  { slug: "fan-casts", title: "fan casts", kicker: "fandom", draft: true, body: soon },
  { slug: "powerpoint-night", title: "PowerPoint night presentations", kicker: "memories", blurb: "memories.", draft: true, body: soon },
];

const trials: Piece[] = [
  { slug: "oxford-comma-dilemma", title: "Oxford comma dilemma", kicker: "investigation", blurb: "native vs esl battle royale", draft: true, body: soon },
  {
    slug: "tastebud-tango",
    title: "tastebud tango travel test",
    kicker: "taste test",
    blurb: "because apparently lemons and limes taste different.",
    draft: true,
    body: soon,
  },
  { slug: "substitution-limits", title: "where does substitution go too far?", kicker: "kitchen", blurb: "vegan cooking edition.", draft: true, body: soon },
  { slug: "sidequesting", title: "sidequesting as a hobby in and of itself", kicker: "field work", draft: true, body: soon },
];

export const tabDrawers: Drawer[] = [
  {
    slug: "case-studies",
    tab: "case-studies",
    title: "case studies",
    sub: "things i have made: a junk journal of projects, with sketches, screenshots, and prototypes.",
    tone: "butter",
    frame: "kraft",
    paper: "grid",
    style: "prose",
    stickers: ["pencil", "key", "star-paper", "cassette"],
    pieces: caseStudies,
  },
  {
    slug: "ephemera",
    tab: "ephemera",
    title: "ephemera",
    sub: "things i have gathered.",
    tone: "sage",
    frame: "floral",
    paper: "butter",
    style: "scraps",
    stickers: ["envelope", "flower", "butterfly", "cloud"],
    pieces: ephemera,
  },
  {
    slug: "trials",
    tab: "trials",
    title: "trials",
    sub: "things i have tried: trials, errors, and investigations.",
    tone: "blush",
    frame: "grid",
    paper: "grid",
    style: "marginalia",
    stickers: ["sparkle", "eye", "leaf", "sun"],
    pieces: trials,
  },
];
