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

const soon = ["this one's still on the desk. sketches and screenshots are coming. ==come back soon.=="];

const caseStudies: Piece[] = [
  {
    slug: "contextomy",
    title: "contextomy",
    kicker: "web",
    blurb: "blackout poetry reimagined.",
    body: [
      "i love blackout poetry. i know how that sounds. depending on who you ask, it's a kitschy classroom craft or something from r/im14andthisisdeep.",
      "but i keep coming back. to me, it's poetry in its purest form— art imitating life imitating other art, and so on. you don't have to write anything. you read a page until a smaller page shows up inside it, and every word you keep means something only because of everything you covered.",
      "that's more or less what contextomy means: lifting words out of their surroundings until they say something new. usually a bad thing. here, you're doing it on purpose, and the original page is still right there.",
      "i wanted a studio for this, so i built one. pick a page from a small archive of public-domain writing— Dickinson, Poe, Austen, Thoreau, Shelley, Carroll— or bring your own. then make it yours: redaction blocks, Sharpie scribbles, strikethroughs, slow fades. paper, palette, typeface, spacing. nothing is fixed. keep it as a print, a GIF, or a short film of the poem surfacing from the page.",
      "i wanted it to feel like a desk in your bedroom rather than simply a tool. it runs in your browser, with no extra stuff (sign-ins, accounts, uploads, etc.— it isn't a social media platform). every export has a small \"made with contextomy\" mark, like signing the back of a finished page.",
      "so yes, kitschy. i'm fine with that. i'd rather make it look good than pretend i don't love it.",
    ],
    link: { label: "try it!", href: "https://www.shradhalakshman.com/contextomy/" },
  },
  {
    slug: "sidequest-service",
    title: "sidequest service",
    kicker: "web",
    blurb: "indecisive? try your hand at slots!",
    body: [
      "for the indecisive. pull the lever and see what comes out. the machine picks an activity, a place in Vancouver, and roughly how long you'll need. every combination is a real thing you can go out and do.",
      "you can take yourself on a quest or bring some friends along. if you like what you get, print it out as a ticket and send it to whoever you want to come with you.",
      "the whole thing looks like an arcade cabinet because i thought it would be more fun than another website telling you where to go. and certainly more fun than spending three days in a group chat trying to make plans. you don't have to take the machine's word for anything, of course. don't like your quest? pull again. or blame the CPU.",
    ],
    link: { label: "pull the lever", href: "https://www.shradhalakshman.com/sidequest-service/", style: "ticket", aside: "feeling indecisive? hand it to the machine:", meta: "1 activity · 1 place · 1 duration" },
  },
  {
    slug: "sitarify",
    title: "sitarify",
    kicker: "music",
    blurb: "hindustani and karnatik music visualizer— let's take a journey.",
    body: [
      "i built sitarify from a feeling i know well as an nri: being close to a culture, but often meeting it through fragments.",
      "as a Kerala Iyer Tamizh person in the diaspora, music has always felt like one of the ways back— a drone humming in the background, a raga name i only half-recognize. i want to learn the rest.",
      "sitarify lets you hear any song reimagined on a modelled sitar, while making room for both Hindustani and Karnatik ragas, their moods and their stories. i didn't want to just slap an \"Indian\" filter on a song and call it done. i wanted people to come away knowing a bit about the ragas.",
      "it's also how i make the distance feel a bit smaller.",
    ],
    link: { label: "hear a song on sitar", href: "https://www.shradhalakshman.com/sitarify/", style: "string", aside: "headphones on, then:" },
  },
  {
    slug: "what-species-are-you",
    title: "what species are you",
    kicker: "quiz",
    blurb: "a personality quiz that sorts you into a species based on your choices.",
    body: [
      "a personality quiz that sorts you into species based on your choices. i made it for [Atelier Town](/projects/little-town), alongside the world of _The Providence Duology_.",
      "_The Providence Duology_ began, for me, with a question: what happens when a society becomes so afraid of its own ending that it decides some lives are more worth saving than others?",
      "it's about a group of people from six domains, all circling the same red giant, who set out to put right a terrible wrong. the people responsible think they're in the right. Elysia is dying, and its scientists are completely sure that saving their own excuses whatever they do to everyone else.",
      "nobody in it can quite tell which way is up. right and wrong keep trading places, and the ones who look helpless might not be, if they actually tried.",
      "_Forsaken_ and _Redeemer_ are about rebellion, and about refusing the future you were given.",
      "~> an uprising is on the horizon. [which side are you on?](https://which-alien-species-are-you-quiz.vercel.app/)",
    ],
  },
  { slug: "wall-of-vinyls", title: "wall of vinyls", kicker: "web", draft: true, body: soon },
  { slug: "melodious-d20", title: "melodious d20 for Melody", kicker: "tabletop", draft: true, body: soon },
  { slug: "portable-photo-booth", title: "portable photo booth using Raspberry Pi", kicker: "hardware", draft: true, body: soon },
  { slug: "joeldi-centre", title: "joeldi centre for human approximation", kicker: "world-building", draft: true, body: soon },
  { slug: "v2-appreciation-mural", title: "v2 appreciation digital mural", kicker: "web", draft: true, body: soon },
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
