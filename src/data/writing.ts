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
//
//  per drawer: `frame` is the patterned paper around the sheet (floral · news · kraft · dots · grid),
//  `paper` is the paper the words are written on (ruled · grid · gingham · butter · newsprint),
//  `style` picks the typography (prose · marginalia · scraps · verse · lyrics).
// ─────────────────────────────────────────────────────────────

export type StickerName =
  | "star" | "star-paper" | "sparkle" | "ghost" | "butterfly" | "fish" | "heart" | "eye" | "tooth" | "moon" | "cat" | "flower"
  | "pencil" | "cloud" | "key" | "envelope" | "music" | "cassette" | "leaf" | "sun";

export type Piece = {
  slug: string;
  title: string;
  date?: string;
  kicker?: string;
  blurb?: string;
  body: string[];
  stickers?: StickerName[];
  note?: string;
  link?: { label: string; href: string };
  sample?: boolean;
};

export type Drawer = {
  slug: string;
  title: string;
  sub: string;
  intro?: string;
  tone: "peri" | "butter" | "sage" | "blush";
  frame: "floral" | "news" | "kraft" | "dots" | "grid";
  paper: "ruled" | "grid" | "gingham" | "butter" | "newsprint";
  style: "prose" | "marginalia" | "scraps" | "verse" | "lyrics";
  stickers: StickerName[];
  pieces: Piece[];
};

export const writing: Drawer[] = [
  {
    slug: "reflections",
    title: "reflections",
    sub: "what school, clinic and community work have been teaching me.",
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
    pieces: [
      {
        slug: "first-sample",
        title: "a sample essay",
        date: "month year",
        kicker: "essay",
        blurb: "a placeholder essay: title, date, a few paragraphs.",
        sample: true,
        body: [
          "the first paragraph of an essay is a promise. this one promises nothing, because it is a sample.",
          "longer pieces work best in short paragraphs. the first letter of the opening paragraph gets a highlighter swipe automatically.",
          "stickers sit around the edges of the page, never on the words.",
        ],
      },
      {
        slug: "second-sample",
        title: "a sample short story",
        date: "month year",
        kicker: "short story",
        blurb: "a placeholder story, to see fiction on the page.",
        sample: true,
        stickers: ["ghost", "moon", "key"],
        body: [
          "the kettle clicked off and nobody moved. (sample text: the real story starts here.)",
          "dialogue, scene breaks and everything else work the same way: one string per paragraph.",
        ],
      },
    ],
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
        slug: "first-sample",
        title: "a sample annotation",
        date: "month year",
        kicker: "philosophy",
        blurb: "a short thought with a note in the margin.",
        sample: true,
        note: "(margin note goes here)",
        body: [
          "an annotation is a short thought set down next to something bigger. this is where it goes.",
          "two or three lines is plenty.",
        ],
      },
      {
        slug: "second-sample",
        title: "errata, sample edition",
        date: "month year",
        kicker: "errata",
        blurb: "a correction to something i used to believe.",
        sample: true,
        note: "formerly: sure about this.",
        stickers: ["star", "eye"],
        body: ["a correction, printed in the smallest type possible so it can't be missed."],
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
        slug: "first-sample",
        title: "a sample loose thread",
        date: "month year",
        kicker: "unresolved",
        blurb: "a thought that hasn't landed yet. come argue with it.",
        sample: true,
        note: "tug on this one. tell me what you think.",
        body: [
          "a loose thread starts with a question you can't quite put down.",
          "say what you think so far, say where it stops making sense, and leave the end open.",
        ],
      },
      {
        slug: "second-sample",
        title: "a second sample thread",
        date: "month year",
        kicker: "unresolved",
        blurb: "another open question, set out on gingham.",
        sample: true,
        stickers: ["fish", "cloud"],
        body: ["one more placeholder, so you can see two threads side by side."],
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
        slug: "first-sample",
        title: "a sample scrap",
        date: "month year",
        kicker: "debris",
        blurb: "a fragment that doesn't belong anywhere else.",
        sample: true,
        body: ["lists, overheard lines, half ideas, things that were funny at 2am.", "each paragraph lands on its own little scrap."],
      },
      {
        slug: "second-sample",
        title: "another sample scrap",
        date: "month year",
        kicker: "debris",
        blurb: "more debris, more stickers.",
        sample: true,
        stickers: ["cat", "star", "ghost", "sparkle"],
        body: ["something small.", "something stranger.", "something with a sticker on it."],
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
    pieces: [
      {
        slug: "first-sample",
        title: "a sample song",
        date: "month year",
        kicker: "songwriting",
        blurb: "a placeholder lyric sheet: verse, chorus, verse.",
        sample: true,
        note: "(a link to the recording goes under the lyrics.)",
        body: [
          "[verse 1]\nthe first line sets the key\nthe second answers it",
          "[chorus]\nthis is where it lifts\nthis is where you sing along",
          "[verse 2]\nthe story keeps moving\nthe words keep their shape",
        ],
      },
      {
        slug: "second-sample",
        title: "another sample song",
        date: "month year",
        kicker: "songwriting",
        blurb: "a second lyric sheet, with a bridge.",
        sample: true,
        stickers: ["cassette", "music", "star-paper"],
        body: ["[verse]\nfour lines, more or less\neach on its own line", "[bridge]\nthe part where it turns"],
      },
    ],
  },
];

export const getDrawer = (slug: string) => writing.find((d) => d.slug === slug);
