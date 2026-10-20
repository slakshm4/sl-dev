// writing-types.ts · the shapes used by writing.ts and the data files (prose.ts, poems.ts, articles.ts)

export type StickerName =
  | "star" | "star-paper" | "sparkle" | "ghost" | "butterfly" | "fish" | "heart" | "eye" | "tooth" | "moon" | "cat" | "flower"
  | "pencil" | "cloud" | "key" | "envelope" | "music" | "cassette" | "leaf" | "sun";

export type Piece = {
  slug: string;
  title: string;
  date?: string;
  /** one small pill (older field). `tags` is the same idea with several pills at once */
  kicker?: string;
  /** the pills on the card and the page: "essay", "short story", "free verse"… */
  tags?: string[];
  blurb?: string;
  /** one string per block (a paragraph, a stanza, a section). see src/lib/text.ts for the mini-markup */
  body: string[];
  stickers?: StickerName[];
  /** a handwritten note that sits next to the title */
  note?: string;
  /** a longer boxed note on the page (e.g. an explanation of the title) */
  noteBox?: { title?: string; body: string[] };
  link?: { label: string; href: string };
  /** numbered notes under the words. in the text, a [^1] after a word becomes a small number that jumps to note 1 (the first string here) */
  footnotes?: string[];
  /** little rubber stamps under the title ("cd in the works") */
  stamps?: string[];
  /** shows the "sample" stamp */
  sample?: boolean;
  /** shows the "in the drafts" stamp */
  draft?: boolean;
  /** sits at the top of its drawer, whatever order the pieces are written in */
  pinned?: boolean;
  /** "stream": one unbroken run of thought */
  look?: "stream";
  /** an anthology: the slugs of the pieces inside it (they live in the same drawer) */
  parts?: string[];
  /** a piece that belongs to an anthology: kept out of the drawer's grid */
  partOf?: string;
  /** a poem split between the ears: [left ear, right ear] line by line, plus its translation */
  stereo?: { pairs: [string, string][]; translation?: [string, string][] };
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
  /** set for the three notebook tabs (case studies, ephemera, trials): their cards link straight to the pieces, there is no separate drawer page */
  tab?: "case-studies" | "ephemera" | "trials";
};
