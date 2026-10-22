// glossary.ts · little hover-definitions. words from src/data/glossary.ts get a faint dotted underline; hover or focus draws a
// pen underline and a small paper note fades in (1.5 s). it fades away when the pointer leaves. tap toggles it on touch screens.
// screen readers get the definition through aria-describedby (the popup itself is hidden from them), keyboard users get it on focus.
import { glossary } from "../data/glossary";

const SKIP = "a, button, summary, h1, h2, h3, h4, h5, h6, script, style, svg, textarea, input, select, label, code, pre, time, .strip, .gl, .sr-only, .chip, .stamp, .post, .cv-link, #ns-map, .ns-viewport, [aria-hidden='true'], [data-no-gloss], [contenteditable]";
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
const GUARD_L = "(?<![\\p{L}\\p{N}_-])";
const GUARD_R = "(?![\\p{L}\\p{N}_-])";

// one regex per case rule, longest spellings first so "ecological colonialism" wins over any shorter overlap
const build = (cs: boolean) => {
  const list = glossary.filter((g) => !!g.cs === cs).flatMap((g, _i) => g.match.map((m) => ({ m, g })));
  list.sort((a, b) => b.m.length - a.m.length);
  const map = new Map<string, number>();
  list.forEach(({ m, g }) => map.set(cs ? m : m.toLowerCase(), glossary.indexOf(g)));
  const re = list.length ? new RegExp(`${GUARD_L}(${list.map(({ m }) => esc(m)).join("|")})${GUARD_R}`, cs ? "gu" : "giu") : null;
  return { re, map };
};
const RULES = [build(false), build(true)];

let pop: HTMLElement | null = null;
let current: HTMLElement | null = null;
let wired = false;
const still = () => document.documentElement.dataset.motion === "off" || document.documentElement.dataset.a11y === "on" || matchMedia("(prefers-reduced-motion: reduce)").matches;

function popEl() {
  if (pop) return pop;
  pop = document.createElement("div");
  pop.className = "gl-pop";
  pop.setAttribute("aria-hidden", "true");
  pop.innerHTML = '<span class="gl-tape"></span><strong class="gl-h"></strong><span class="gl-d"></span>';
  document.body.appendChild(pop);
  return pop;
}

function place(term: HTMLElement, x?: number) {
  const p = popEl();
  const rects = [...term.getClientRects()];
  const r = (x !== undefined && rects.find((q) => x >= q.left - 2 && x <= q.right + 2)) || rects[0] || term.getBoundingClientRect();
  const pw = p.offsetWidth, ph = p.offsetHeight, m = 12;
  let left = r.left + r.width / 2 - pw / 2;
  left = Math.max(m, Math.min(left, window.innerWidth - pw - m));
  const below = r.bottom + 14;
  const top = below + ph + m > window.innerHeight && r.top - ph - 14 > m ? r.top - ph - 14 : below;
  p.style.left = `${left + window.scrollX}px`;
  p.style.top = `${top + window.scrollY}px`;
  p.dataset.side = top < r.top ? "above" : "below";
}

function show(term: HTMLElement, x?: number) {
  const g = glossary[Number(term.dataset.gl)];
  if (!g) return;
  const p = popEl();
  (p.querySelector(".gl-h") as HTMLElement).textContent = g.term;
  (p.querySelector(".gl-d") as HTMLElement).textContent = g.def;
  p.classList.remove("is-on");
  current = term;
  place(term, x);
  void p.offsetWidth;
  p.classList.add("is-on");
  p.classList.toggle("is-still", still());
}
function hide(term?: HTMLElement) {
  if (term && term !== current) return;
  pop?.classList.remove("is-on");
  current = null;
}

function wrap(root: HTMLElement) {
  // a word is marked once per page, but "page" means each collapsible part separately: if its first mention sits inside a closed section,
  // tab, or drawer you have not opened yet, the later mentions you can actually see still get their definition.
  const done = new Set<string>();
  const scopes = new WeakMap<Element, number>();
  const scopeOf = (n: Node) => {
    const box = n.parentElement?.closest("details, [role='tabpanel'], .nb-panel, [hidden]");
    if (!box) return 0;
    if (!scopes.has(box)) scopes.set(box, scopes.size + 1);
    return scopes.get(box)!;
  };
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(n) {
      const el = n.parentElement;
      if (!el || !n.nodeValue || n.nodeValue.trim().length < 4) return NodeFilter.FILTER_REJECT;
      if (el.closest(SKIP)) return NodeFilter.FILTER_REJECT;
      const lang = el.closest("[lang]")?.getAttribute("lang");
      if (lang && !/^en/i.test(lang)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  const defs = document.getElementById("gl-defs") ?? Object.assign(document.createElement("div"), { id: "gl-defs", hidden: true });
  if (!defs.parentElement) document.body.appendChild(defs);

  for (const node of nodes) {
    const text = node.nodeValue!;
    const sc = scopeOf(node);
    const hits: { i: number; len: number; idx: number; s: string }[] = [];
    for (const { re, map } of RULES) {
      if (!re) continue;
      re.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = re.exec(text))) {
        const idx = map.get(re === RULES[0].re ? m[1].toLowerCase() : m[1]);
        if (idx !== undefined && !done.has(`${sc}|${idx}`)) hits.push({ i: m.index, len: m[1].length, idx, s: m[1] });
      }
    }
    if (!hits.length) continue;
    hits.sort((a, b) => a.i - b.i);
    const frag = document.createDocumentFragment();
    let at = 0;
    for (const h of hits) {
      if (h.i < at || done.has(`${sc}|${h.idx}`)) continue; // overlapping, or already marked in this part of the page
      done.add(`${sc}|${h.idx}`);
      if (h.i > at) frag.append(text.slice(at, h.i));
      const span = document.createElement("span");
      span.className = "gl";
      span.tabIndex = 0;
      span.dataset.gl = String(h.idx);
      span.textContent = h.s;
      const id = `gl-d-${h.idx}`;
      span.setAttribute("aria-describedby", id);
      if (!document.getElementById(id)) {
        const d = document.createElement("span");
        d.id = id;
        d.textContent = `${glossary[h.idx].term}: ${glossary[h.idx].def}`;
        defs.appendChild(d);
      }
      frag.append(span);
      at = h.i + h.len;
    }
    if (at < text.length) frag.append(text.slice(at));
    node.replaceWith(frag);
  }
}

export function initGlossary() {
  const main = document.getElementById("main");
  if (main && !main.dataset.gl) {
    main.dataset.gl = "1";
    try { wrap(main); } catch (e) { console.warn(e); }
  }
  hide();
  if (wired) return;
  wired = true;
  const t = (e: Event) => (e.target as Element | null)?.closest?.<HTMLElement>(".gl") ?? null;
  document.addEventListener("pointerover", (e) => {
    const g = t(e);
    if (g && (e as PointerEvent).pointerType === "mouse" && g !== current) show(g, (e as PointerEvent).clientX);
  });
  document.addEventListener("pointerout", (e) => {
    const g = t(e);
    if (g && (e as PointerEvent).pointerType === "mouse" && !g.contains((e as PointerEvent).relatedTarget as Node)) hide(g);
  });
  document.addEventListener("click", (e) => {
    const g = t(e);
    if (!g) return hide();
    if (g === current && pop?.classList.contains("is-on") && (e as PointerEvent).pointerType !== "mouse") return hide(g);
    show(g, (e as MouseEvent).clientX);
  });
  // keyboard focus shows the note; a mouse or finger focuses the word too, but then the click/tap handler decides
  document.addEventListener("focusin", (e) => { const g = t(e); if (g && g.matches(":focus-visible")) show(g); });
  document.addEventListener("focusout", (e) => { const g = t(e); if (g) hide(g); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") hide(); });
  document.addEventListener("scroll", () => hide(), { passive: true });
}
