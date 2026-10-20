// ─────────────────────────────────────────────────────────────
//  writing.ts  ·  the seven drawers inside /notebook → words, and the pieces in them.
//
//  /notebook/<drawer>            → the drawer: a grid of boxes, one per piece
//  /notebook/<drawer>/<piece>    → one piece, set on its own paper
//
//  to add a piece: copy one of the sample objects below, give it a new `slug` (this becomes the url),
//  write your words in `body`, and delete `sample: true` (that removes the little "sample" stamp).
//
//  body       an array of blocks. each string is one paragraph (prose), one stanza (poems) or one section (songs).
//             inside a stanza / section use "\n" for a line break. songs: start a section with a label line
//             like "[verse 1]" or "[chorus]" and it is set as a small typewriter heading.
//  stickers   up to four, from: star · star-paper · sparkle · ghost · butterfly · fish · heart · eye · tooth · moon
//             cat · flower · pencil · cloud · key · envelope · music · cassette · leaf · sun
//             leave it out and the piece borrows its drawer's default stickers.
//  note       a little handwritten note that sits next to the title (optional).
//  link       a button under the piece, e.g. { label: "listen", href: "https://…" } (optional).
//  tags       the little pills on the card and the page: ["essay"], ["short story", "free verse"]…
//  pinned     true = the piece sits at the top of its drawer, always.
//  the long pieces live in their own files: prose.ts (essays + stories), poems.ts ((dé)générescence), lyrics.ts (the songs, with footnotes), articles.ts (the three notebook tabs).
//  every piece also accepts the mini-markup in src/lib/text.ts: _italic_, "## heading", "> pull quote", [links](/like/this).
//
//  per drawer: `frame` is the patterned paper around the sheet (floral · news · kraft · dots · grid),
//  `paper` is the paper the words are written on (ruled · grid · gingham · butter · newsprint),
//  `style` picks the typography (prose · marginalia · scraps · verse · lyrics).
// ─────────────────────────────────────────────────────────────

export type { StickerName, Piece, Drawer } from "./writing-types";
import type { Drawer, Piece } from "./writing-types";
import { prosePieces } from "./prose";
import { poemPieces } from "./poems";
import { tabDrawers } from "./articles";
import { lyricPieces } from "./lyrics";

const words: Drawer[] = [
  {
    slug: "reflections",
    title: "reflections",
    sub: "what school, clinic, and community work have been teaching me.",
    tone: "sage",
    frame: "floral",
    paper: "ruled",
    style: "prose",
    stickers: ["leaf", "sun", "pencil", "butterfly"],
    pieces: [
      {
        slug: "first-sample",
        title: "a sample reflection",
        date: "month year",
        kicker: "learnings",
        blurb: "a placeholder to show how a reflection sits on the page.",
        sample: true,
        note: "(sample! swap me out.)",
        body: [
          "this is a sample box. it shows the shape of a reflection: a title, a date, and a few paragraphs of thinking out loud.",
          "write the way you'd tell a friend what you learned. keep the paragraphs short and they stay easy to read, even on a phone.",
          "when the real words are in, delete the line that says sample: true and the little stamp disappears.",
        ],
      },
      {
        slug: "second-sample",
        title: "another sample reflection",
        date: "month year",
        kicker: "clinic",
        blurb: "a second placeholder, with different stickers.",
        sample: true,
        stickers: ["tooth", "heart", "sparkle"],
        body: [
          "a second sample, so the drawer has more than one box in it.",
          "stickers are set per piece: pick up to four from the list at the top of src/data/writing.ts.",
        ],
      },
    ],
  },
  {
    slug: "prose",
    title: "prose",
    sub: "essays and short stories.",
    tone: "peri",
    frame: "dots",
    paper: "grid",
    style: "prose",
    stickers: ["pencil", "envelope", "moon", "key"],
    pieces: prosePieces,
  },
  {
    slug: "annotations-on-life",
    title: "annotations on life",
    sub: "thoughts, philosophies, errata.",
    tone: "butter",
    frame: "news",
    paper: "newsprint",
    style: "marginalia",
    stickers: ["eye", "pencil", "sparkle", "star"],
    pieces: [
      {
        slug: "the-loop-closes",
        title: "the loop closes",
        kicker: "philosophy",
        blurb: "margin note: grief has changed my definition of an ending.",
        note: "margin note: grief has changed my definition of an ending.",
        stickers: ["moon", "eye", "star"],
        body: [
          "i used to think death was the worst thing that could happen because it makes a person unavailable to you. i still think absence is brutal. but i have trouble with the concept of brutal and bad as synonyms of one another.",
          "i was raised with the idea that life is part of a much larger cycle: karma, return, release. i don't pretend to know what happens next. but the image that stays with me is the closing of a loop. something completed, even if i was not ready to stop holding its hand. there's an episode, [Chapter 7: Four Souls](https://open.spotify.com/episode/1cfQ6nXr2kCqBpeF5Bch7U?si=597ee447d62d4207), of _Midnight Burger_, a fictional podcast about a transdimensional diner (don't ask), that explores a similar concept.",
          "loss has not made death feel neat. it has made me less interested in calling it a failure.",
        ],
      },
      {
        slug: "closure",
        title: "closure",
        kicker: "errata",
        blurb: "correction to a previous belief: closure is not a door.",
        note: "correction to a previous belief: closure is not a door.",
        stickers: ["key", "pencil", "star"],
        body: [
          "i thought closure was an event: one conversation, one realization, one very cinematic final scene.",
          "now i think it is more like moving house with too many boxes. years later, you find one in a closet. you open it. it is still yours, but it is no longer the centrepiece. it no longer seeks attention. it no longer lives in the middle of the room.",
        ],
      },
      {
        slug: "being-understood",
        title: "being understood",
        kicker: "philosophy",
        blurb: "margin note: perhaps this is why i over-explain.",
        note: "margin note: perhaps this is why i over-explain.",
        stickers: ["eye", "cloud", "sparkle"],
        body: [
          "being understood is lovely, but it is not the price of admission for being real.",
          "some things in me will remain poorly captioned. some things will be misread. i am trying to let that be an ordinary sadness instead of evidence that i have failed to communicate.",
        ],
      },
      {
        slug: "the-optimized-life",
        title: "the optimized life",
        kicker: "errata",
        blurb: "revision: not every hour needs a destiny.",
        note: "revision: not every hour needs a destiny.",
        stickers: ["leaf", "sun", "pencil"],
        body: [
          "i used to think a good day was one i could account for.",
          "now i think a good day can include staring at (or hugging, or communicating with using dowsing sticks cuz apparently that actually works quite well) a tree (be careful, kind, and patient, because they're actually quite prideful beings), sending one email (yippee!), eating something beige (a donut? a singular noodle?), and briefly becoming obsessed with a niche question (which i tend to do… a lot). productivity has a place (sort of). it just… doesn't need to be the landlord.",
        ],
      },
    ],
  },
  {
    slug: "loose-threads",
    title: "loose threads",
    sub: "seemingly unresolved thoughts, open to discussion.",
    tone: "blush",
    frame: "grid",
    paper: "gingham",
    style: "prose",
    stickers: ["cloud", "butterfly", "key", "fish"],
    pieces: [
      {
        slug: "coherent-version-of-ourselves",
        title: "do we owe people the most coherent version of ourselves?",
        kicker: "unresolved",
        stickers: ["key", "cloud"],
        body: [
          "i admire coherence. i also think it can become a very polished cage.",
          "when someone has known you for a long time, how much notice do you owe them before changing your mind, your shape, your whole little operating system? is surprise a kind of betrayal, or just proof that a person is still alive?",
        ],
      },
      {
        slug: "what-makes-a-ritual-work",
        title: "what makes a ritual work?",
        kicker: "unresolved",
        stickers: ["moon", "sparkle", "flower"],
        body: [
          "is it repetition? witnesses? specificity? the fact that it interrupts the day long enough for you to notice you are in it?",
          "disclaimer: i know nothing about Wicca. or any other culture that has rituals outside of Hinduism. but in a broader sense, i keep wondering whether a ritual has to be inherited to feel sacred, or whether you can make one out of a particular tea, a particular walk, a particular song you only play when your heart needs somewhere to sit.",
        ],
      },
      {
        slug: "private-without-becoming-lonely",
        title: "can a life be private without becoming lonely?",
        kicker: "unresolved",
        stickers: ["leaf", "cloud", "key"],
        body: [
          "there is a version of privacy that feels like a locked door, and another that feels like a garden wall: not everything is visible, but something (?) is still growing there (or maybe not…? Schrödinger's plant.)",
          "i am trying to learn the difference.",
        ],
      },
      {
        slug: "small-inconveniences",
        title: "why are small inconveniences sometimes so emotionally loud?",
        kicker: "unresolved",
        stickers: ["fish", "cloud", "ghost"],
        body: [
          "a missing sock: manageable. a delayed bus: normal. a website asking me to create an account to read one sentence: suddenly, the whole project of civilization feels poorly supervised.",
          "i do not have a theory. i do, however, have a sneaking suspicion that it is never really about the sock. because when will life ever be that simple?",
        ],
      },
    ],
  },
  {
    slug: "other-brain-debris",
    title: "other brain debris",
    sub: "a heterogeneous collection of marginalia.",
    tone: "sage",
    frame: "kraft",
    paper: "butter",
    style: "scraps",
    stickers: ["ghost", "fish", "star", "cat"],
    pieces: [
      {
        slug: "tiny-emergency-sized-versions",
        title: "things that should be available in a tiny, emergency-sized version",
        kicker: "debris",
        stickers: ["star", "cat", "sparkle"],
        body: [
          "- a nap\n- an apology (like. a real one i mean)\n- Breka chipotle chicken and bacon pockets\n- the answer to \"where the $&#% did i put that ???\"\n- a person who says \"ok wait, that was lowkey a good point tho\"",
        ],
      },
      {
        slug: "unreasonable-opinions",
        title: "unreasonable opinions i am willing to defend",
        kicker: "debris",
        stickers: ["ghost", "pencil", "star"],
        body: [
          "- the best pen is the one that appears in your bag exactly when you need it.\n- a chair should not be allowed to look so uncomfortable.\n- every city needs more places where you can sit without immediately being expected to buy a croissant.\n- the moon has excellent branding.",
        ],
      },
      {
        slug: "a-brief-taxonomy-of-tabs",
        title: "a brief taxonomy of tabs",
        kicker: "debris",
        stickers: ["fish", "star", "cloud"],
        body: [
          "- the tab i need right now. (where are you now? Atlantis…)\n- the tab i opened because i had a thought… and then immediately lost it :c\n- the tab that has been playing music for twenty minutes. (no seriously which one is it)\n- the tab that contains a recipe i will never make but cannot emotionally release (is food-related emotional constipation a thing? because if so, i definitely have that.)\n- the tab that is somehow holding my entire life together. (Excel my goat)",
        ],
      },
      {
        slug: "little-miracles",
        title: "things that feel like a little miracle",
        kicker: "debris",
        stickers: ["sparkle", "cat", "star"],
        body: [
          "- a green light arriving exactly as you do.\n- finding money in an old pocket. (bonus points if it's something you just thrifted!)\n- someone using a phrase you thought only existed in your family. (impossible edition for all my fellow Tamizhargal)\n- remembering the word you were looking for halfway through brushing your teeth. (2 mins twice a day guys please idw see ur gums haemorrhaging when im trying to scale them)\n- the last bite being the best bite. (nuff said.)",
        ],
      },
    ],
  },
  {
    slug: "poems",
    title: "poems",
    sub: "lyric, part one: on the page.",
    tone: "blush",
    frame: "floral",
    paper: "butter",
    style: "verse",
    stickers: ["flower", "moon", "butterfly", "heart"],
    pieces: [
      ...poemPieces,
      {
        slug: "first-sample",
        title: "untitled (sample)",
        date: "month year",
        kicker: "poem",
        blurb: "a placeholder poem: two short stanzas.",
        sample: true,
        body: [
          "the first line sits alone\nand waits for the second.",
          "stanzas breathe\nbetween the lines.",
        ],
      },
      {
        slug: "second-sample",
        title: "another sample poem",
        date: "month year",
        kicker: "poem",
        blurb: "a second placeholder, three stanzas.",
        sample: true,
        stickers: ["moon", "sparkle", "flower"],
        body: ["line breaks are kept\nexactly where you put them.", "a blank line starts a new stanza.", "that's all there is to it."],
      },
    ],
  },
  {
    slug: "songs",
    title: "songs",
    sub: "lyric, part two: for the ear.",
    tone: "peri",
    frame: "grid",
    paper: "butter",
    style: "lyrics",
    stickers: ["music", "cassette", "star-paper", "sparkle"],
    pieces: lyricPieces,
  },
];

export const writing: Drawer[] = [...words, ...tabDrawers];

export const getDrawer = (slug: string) => writing.find((d) => d.slug === slug);

/** the pieces of a drawer as they appear in its grid: pinned first, anthology parts left out */
export const shown = (d: Drawer): Piece[] => {
  const top = d.pieces.filter((p) => !p.partOf);
  return [...top.filter((p) => p.pinned), ...top.filter((p) => !p.pinned)];
};
export const pieceHref = (d: Drawer, p: Piece) => `/notebook/${d.slug}/${p.slug}`;
