// ─────────────────────────────────────────────────────────────
//  notebook.ts  ·  the four sections of /notebook (there is no "all" tab)
//  each entry is a card. `href` is the page it opens (`external: true` for other websites).
//  case studies, ephemera and trials are built from articles.ts (one card = one article page): add cards there.
//  the writing drawers (reflections, prose, poems…) live in writing.ts: that's where your pieces go.
//  status: "draft" shows a "in the drafts" stamp. delete it when it's live.
// ─────────────────────────────────────────────────────────────

import { tabDrawers } from "./articles";

export type Entry = { title: string; blurb?: string; tag: string; href?: string; external?: boolean; status?: "draft" };
export type Section = {
  id: "words" | "case-studies" | "ephemera" | "trials";
  label: string;
  hint: string;
  tone: "peri" | "butter" | "sage" | "blush";
  groups: { label?: string; entries: Entry[] }[];
};

// the cards in case studies / ephemera / trials come from articles.ts: each one is its own page
const fromDrawer = (slug: string): Entry[] => {
  const d = tabDrawers.find((x) => x.slug === slug)!;
  return d.pieces.map((p) => ({
    title: p.title,
    blurb: p.blurb,
    tag: p.kicker ?? slug,
    href: `/notebook/${d.slug}/${p.slug}`,
    ...(p.draft ? { status: "draft" as const } : {}),
  }));
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
          { title: "reflections", blurb: "what school, clinic, and community work have been teaching me.", tag: "learnings", href: "/notebook/reflections" },
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
    hint: "things i have made: a junk journal of projects, with sketches, screenshots, and prototypes",
    tone: "butter",
    groups: [{ entries: fromDrawer("case-studies") }],
  },
  {
    id: "ephemera",
    label: "ephemera",
    hint: "things i have gathered",
    tone: "sage",
    groups: [{ entries: fromDrawer("ephemera") }],
  },
  {
    id: "trials",
    label: "trials",
    hint: "things i have tried: trials, errors, and investigations",
    tone: "blush",
    groups: [{ entries: fromDrawer("trials") }],
  },
];
