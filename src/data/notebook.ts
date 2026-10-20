// ─────────────────────────────────────────────────────────────
//  notebook.ts  ·  the four sections of /notebook (there is no "all" tab)
//  each entry is a card. add `href` once an entry has its own page (`external: true` for other websites).
//  the writing drawers (reflections, prose, poems…) live in writing.ts: that's where your pieces go.
//  status: "draft" shows a "in the drafts" stamp. delete it when it's live.
// ─────────────────────────────────────────────────────────────

export type Entry = { title: string; blurb?: string; tag: string; href?: string; external?: boolean; status?: "draft" };
export type Section = {
  id: "words" | "case-studies" | "ephemera" | "trials";
  label: string;
  hint: string;
  tone: "peri" | "butter" | "sage" | "blush";
  groups: { label?: string; entries: Entry[] }[];
};

export const notebook: Section[] = [
  {
    id: "words",
    label: "words",
    hint: "things i have written",
    tone: "peri",
    groups: [
      {
        label: "learnings",
        entries: [
          { title: "reflections", blurb: "what school, clinic and community work have been teaching me.", tag: "learnings", href: "/notebook/reflections" },
          { title: "e-portfolio", blurb: "why do felines have canines? and further intellectual inquiry", tag: "e-portfolio", href: "https://blogs.ubc.ca/ydofelineshavecanines", external: true },
        ],
      },
      {
        label: "miscellanea",
        entries: [
          { title: "prose", blurb: "essays and short stories.", tag: "prose", href: "/notebook/prose" },
          { title: "annotations on life", blurb: "thoughts, philosophies, errata.", tag: "annotations", href: "/notebook/annotations-on-life" },
          { title: "loose threads", blurb: "seemingly unresolved thoughts, open to discussion.", tag: "loose threads", href: "/notebook/loose-threads" },
          { title: "other brain debris", blurb: "a heterogeneous collection of marginalia.", tag: "debris", href: "/notebook/other-brain-debris" },
        ],
      },
      {
        label: "lyric",
        entries: [
          { title: "poems", tag: "poetry", href: "/notebook/poems" },
          { title: "songs", tag: "songwriting", href: "/notebook/songs" },
        ],
      },
    ],
  },
  {
    id: "case-studies",
    label: "case studies",
    hint: "things i have made: a junk journal of projects, with sketches, screenshots and prototypes",
    tone: "butter",
    groups: [
      {
        entries: [
          { title: "what species are you", tag: "quiz", status: "draft" },
          { title: "wall of vinyls", tag: "web", status: "draft" },
          { title: "melodious d20 for melody", tag: "tabletop", status: "draft" },
          { title: "portable photo booth using raspberry pi", tag: "hardware", status: "draft" },
          { title: "joeldi centre for human approximation", tag: "world-building", status: "draft" },
          { title: "v2 appreciation digital mural", tag: "web", status: "draft" },
          { title: "sitarify", blurb: "a visualizer of karnatik and hindustani music, making it accessible to everyone.", tag: "music", status: "draft" },
          { title: "contextomy", blurb: "blackout poetry reimagined.", tag: "web", status: "draft" },
          { title: "activity randomizer / slots", tag: "web", status: "draft" },
          { title: "hydraulic press simulator with water bottles", tag: "simulation", status: "draft" },
          { title: "vancouver clocks themed pomodoro", tag: "web", status: "draft" },
          { title: "iq (ill-advised quackery) test", blurb: "the institute of quizzical inquiry, dept. of impractical intelligence and questionology.", tag: "quiz", status: "draft" },
        ],
      },
    ],
  },
  {
    id: "ephemera",
    label: "ephemera",
    hint: "things i have gathered",
    tone: "sage",
    groups: [
      {
        entries: [
          { title: "scrapbook / moodboard", blurb: "pinterest-pilled.", tag: "moodboard", status: "draft" },
          { title: "fan casts", tag: "fandom", status: "draft" },
          { title: "powerpoint night presentations", blurb: "memories.", tag: "memories", status: "draft" },
        ],
      },
    ],
  },
  {
    id: "trials",
    label: "trials",
    hint: "things i have tried: trials, errors and investigations",
    tone: "blush",
    groups: [
      {
        entries: [
          { title: "oxford comma dilemma", blurb: "native vs ESL battle royale", tag: "investigation", status: "draft" },
          { title: "tastebud tango travel test", blurb: "because apparently lemons and limes taste different.", tag: "taste test", status: "draft" },
          { title: "where does substitution go too far?", blurb: "vegan cooking edition.", tag: "kitchen", status: "draft" },
          { title: "sidequesting as a hobby in and of itself", tag: "field work", status: "draft" },
        ],
      },
    ],
  },
];
