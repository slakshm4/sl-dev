// ─────────────────────────────────────────────────────────────
//  northstar.ts  ·  the node map on /north-star
//  four branches → groups → single nodes  (macro → meso → micro).
//  mermaid lays the whole thing out; the `links` below are the dashed
//  "these overlap" threads drawn on top. edit freely.
// ─────────────────────────────────────────────────────────────

export type Group = { label: string; items: string[] };
export type Branch = { label: string; tone: "peri" | "butter" | "sage" | "blush"; groups: Group[] };

export const centre = "north star";

export const branches: Branch[] = [
  {
    label: "philosophy + relational drivers",
    tone: "peri",
    groups: [
      { label: "identity", items: ["authenticity", "connection", "being", "inclusion", "autonomy", "curiosity"] },
      { label: "social ecology", items: ["community", "my village", "kitty cats", "powerpoint nights", "themed parties", "atelier"] },
      { label: "systems", items: ["ideation", "catalysts", "innovation", "joy of creating", "self-expression", "iteration"] },
      { label: "dynamic affects", items: ["sparkle factor", "spite", "whimsy", "novelty", "nostalgia", "allegiance"] },
    ],
  },
  {
    label: "personal interests",
    tone: "butter",
    groups: [
      { label: "fandom / storytelling / lore", items: ["archive of our own", "speculative xenobiology", "making memes", "young justice + dc batfam dynamics"] },
      { label: "visual", items: ["atelier", "graphic design + aesthetic curation", "painting", "iphone + digicam photography"] },
      { label: "adventures + competition", items: ["web-based games", "interactive narrative / tabletop games", "travel"] },
      { label: "auditory", items: ["musicianship", "opera", "raves", "consumption and critique of music"] },
      { label: "media + linguistics", items: ["audiobooks", "conlang development", "podcasts"] },
    ],
  },
  {
    label: "sensory experiences",
    tone: "sage",
    groups: [
      { label: "atmospheric anchors", items: ["light rain against glass", "fresh laundry", "soft fabric", "sunlight", "sound of distant traffic", "waves washing ashore", "constellations", "cloud watching"] },
      { label: "cuisines of the world", items: ["allen's fruit punch", "la québec butter chicken poutine", "dovetail sangria", "breka turkey provolone sandwich", "gisèle lalonde sachi's shawarma platter", "radiatori alla vodka", "jaeyook bokkeum", "brown sugar bubble tea oreos"] },
    ],
  },
  {
    label: "professional pursuits",
    tone: "blush",
    groups: [
      { label: "social impact", items: ["hiv education", "oral health literacy", "advocacy"] },
      { label: "philology", items: ["annotated literature", "language acquisition", "poetry", "creative nonfiction"] },
    ],
  },
];

/** dashed threads between nodes that overlap. [labelA, labelB, optional occurrence of A (0 = first)] */
export const links: [string, string, number?, number?][] = [
  ["atelier", "atelier", 0, 1],            // appears under social ecology and under visual
  ["curiosity", "novelty"],
  ["joy of creating", "painting"],
  ["inclusion", "oral health literacy"],
  ["community", "advocacy"],
  ["language acquisition", "conlang development"],
  ["spite", "musicianship"],               // 21 languages, mostly out of spite
  ["whimsy", "making memes"],
  ["nostalgia", "fresh laundry"],
  ["poetry", "annotated literature"],
];

/* ───────────────────────────────────────────────────────────────
   helpers that turn the lists above into a mermaid `mindmap`
   (nodes are numbered in the order they are written: mermaid keeps that order,
    so node_0 is the centre, node_1 the first branch, and so on)
   ─────────────────────────────────────────────────────────────── */
export type Node = { id: number; label: string; tier: 0 | 1 | 2 | 3; branch: number; parent: number };

export function flatten(): Node[] {
  const out: Node[] = [{ id: 0, label: centre, tier: 0, branch: -1, parent: -1 }];
  branches.forEach((b, bi) => {
    const bid = out.length;
    out.push({ id: bid, label: b.label, tier: 1, branch: bi, parent: 0 });
    b.groups.forEach((g) => {
      const gid = out.length;
      out.push({ id: gid, label: g.label, tier: 2, branch: bi, parent: bid });
      g.items.forEach((it) => out.push({ id: out.length, label: it, tier: 3, branch: bi, parent: gid }));
    });
  });
  return out;
}

const esc = (s: string) => s.replace(/"/g, "'");

export function buildMindmap(nodes = flatten()): string {
  const lines = ["mindmap"];
  nodes.forEach((n) => {
    const pad = "  ".repeat(n.tier + 1);
    const open = n.tier === 0 ? "((" : n.tier === 3 ? "(" : "[";
    const close = n.tier === 0 ? "))" : n.tier === 3 ? ")" : "]";
    lines.push(`${pad}n${n.id}${open}"${esc(n.label)}"${close}`);
    lines.push(`${pad}:::ns-t${n.tier}`);
  });
  return lines.join("\n");
}

/** resolves the label pairs in `links` to node-id pairs (so duplicate labels like "atelier" work) */
export function resolveLinks(nodes = flatten()): [number, number][] {
  const find = (label: string, nth = 0) => nodes.filter((n) => n.label === label)[nth]?.id ?? -1;
  return links
    .map(([a, b, na = 0, nb = 0]) => {
      if (a === b) return [find(a, na), find(b, nb || 1)] as [number, number];
      return [find(a, na), find(b, nb)] as [number, number];
    })
    .filter(([a, b]) => a >= 0 && b >= 0 && a !== b);
}
