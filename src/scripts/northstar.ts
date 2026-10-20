// northstar.ts · the node map on /north-star.
//
// mermaid.js lays out and draws the `mindmap` (nodes + edges). we then:
//   1. re-measure every label at its real tier size (centre → branch → group → item = macro → meso → micro)
//      and let the nodes breathe so nothing overlaps
//   2. draw dashed "these overlap" threads between related nodes
//   3. give every node a little spring: it leans toward the cursor, you can tug it, and it snaps back —
//      but it can never be moved (the edges follow along as it wobbles)
//   4. zoom buttons + drag-to-pan (the outline list on the page is the accessible version of the same map)
import { clamp, motionOff } from "./util";

type Info = { id: number; label: string; tier: 0 | 1 | 2 | 3; branch: number; parent: number };
type Payload = { def: string; nodes: Info[]; links: [number, number][] };

type N = {
  info: Info; g: SVGGElement; shape: SVGElement | null; label: SVGGElement | null;
  bx: number; by: number; w: number; h: number;
  ox: number; oy: number; vx: number; vy: number;
  s: number; vs: number; ts: number; tx: number; ty: number;
  edgeIn?: SVGPathElement; // path from parent
};

const MASS = [0.28, 0.45, 0.7, 1]; // heavier nodes lean less
const MAXOFF = [5, 8, 12, 16];
const PAD: [number, number][] = [[0, 0], [24, 15], [17, 10], [13, 7]];

let fontsDone: Promise<unknown> | null = null;
const loadFonts = () =>
  (fontsDone ??= Promise.all([
    document.fonts?.load('600 22px "Bodoni Moda"'),
    document.fonts?.load('italic 600 17px "Bodoni Moda"'),
    document.fonts?.load('15px "Newsreader"'),
  ]).catch(() => {}).then(() => document.fonts?.ready));

const NS = "http://www.w3.org/2000/svg";

// mermaid is shipped as a file in public/vendor (not an npm dependency), and only fetched on this page.
// it exposes itself as window.mermaid once the script has run.
const getMermaid = (): any => {
  const w = window as any;
  const ns = w.__esbuild_esm_mermaid_nm?.mermaid;
  return w.mermaid ?? ns?.default ?? ns;
};
const loadMermaid = (): Promise<any> =>
  new Promise((resolve, reject) => {
    if (getMermaid()) return resolve(getMermaid());
    let el = document.querySelector<HTMLScriptElement>("script[data-mermaid]");
    if (!el) {
      el = document.createElement("script");
      el.src = "/vendor/mermaid.min.js";
      el.async = true;
      el.dataset.mermaid = "";
      document.head.appendChild(el);
    }
    el.addEventListener("load", () => (getMermaid() ? resolve(getMermaid()) : reject(new Error("mermaid did not load"))));
    el.addEventListener("error", () => { el!.remove(); reject(new Error("mermaid script failed to load")); });
  });

export async function initNorthStar() {
  const host = document.querySelector<HTMLElement>("#ns-map");
  if (!host || host.dataset.state) return;
  host.dataset.state = "loading";
  const viewport = host.querySelector<HTMLElement>(".ns-viewport")!;
  const caption = host.querySelector<HTMLElement>(".ns-caption");
  const payload: Payload = JSON.parse(host.dataset.map!);

  try {
    const mermaid = await loadMermaid();
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "strict",
      theme: "base",
      htmlLabels: false,
      themeVariables: { fontFamily: '"Newsreader", Georgia, serif', fontSize: "15px" },
      mindmap: { padding: 10, maxNodeWidth: 150, useMaxWidth: false },
    } as any);
    const { svg: markup } = await mermaid.render("ns-svg-" + Date.now(), payload.def);
    if (!host.isConnected) return;
    viewport.innerHTML = markup;
    await loadFonts();
    if (!host.isConnected) return;
    host.dataset.state = "ready";
    build(host, viewport, caption, payload);
  } catch (err) {
    console.warn("north star map could not render", err);
    host.dataset.state = "error";
    host.querySelector(".ns-fallback")?.removeAttribute("hidden");
    document.querySelector(".ns-outline")?.setAttribute("open", "");
  }
}

function build(host: HTMLElement, viewport: HTMLElement, caption: HTMLElement | null, payload: Payload) {
  const svg = viewport.querySelector("svg") as SVGSVGElement;
  svg.removeAttribute("style");
  svg.removeAttribute("width");
  svg.removeAttribute("height");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  svg.removeAttribute("role");

  const still = motionOff();
  const nodes: N[] = [];
  payload.nodes.forEach((info) => {
    const g = svg.querySelector<SVGGElement>(`g.mindmap-node[id$="node_${info.id}"]`);
    if (!g) return;
    const m = /translate\(\s*([-\d.eE]+)[ ,]+([-\d.eE]+)/.exec(g.getAttribute("transform") || "");
    const n: N = {
      info, g,
      shape: g.querySelector<SVGElement>(".label-container") ?? g.querySelector("rect, circle, path, polygon"),
      label: g.querySelector<SVGGElement>("g.label"),
      bx: m ? +m[1] : 0, by: m ? +m[2] : 0, w: 60, h: 30,
      ox: 0, oy: 0, vx: 0, vy: 0, s: still ? 1 : 0, vs: 0, ts: still ? 1 : 0, tx: 0, ty: 0,
    };
    g.classList.add(`ns-b${Math.max(0, info.branch)}`);
    nodes[info.id] = n;
  });
  const root = nodes[0];

  /* 1 ─ re-measure at real sizes, then give the nodes room */
  nodes.forEach(fit);
  const k = 1.2;
  nodes.forEach((n) => {
    n.bx = root.bx + (n.bx - root.bx) * k;
    n.by = root.by + (n.by - root.by) * k;
  });
  separate(nodes);

  /* edges: reuse mermaid's own <path class="edge"> elements */
  svg.querySelectorAll<SVGPathElement>("path.edge").forEach((p) => {
    const m = /edge_(\d+)_(\d+)$/.exec(p.id);
    if (!m) return;
    const child = nodes[+m[2]];
    if (child) child.edgeIn = p;
    p.removeAttribute("style");
    p.classList.add(`ns-b${Math.max(0, child?.info.branch ?? 0)}`, `ns-e${child?.info.tier ?? 3}`);
  });

  /* 2 ─ dashed cross-links, drawn under the nodes */
  const nodesLayer = svg.querySelector("g.nodes") ?? root.g.parentElement!;
  const linkLayer = document.createElementNS(NS, "g");
  linkLayer.setAttribute("class", "ns-links");
  nodesLayer.parentNode!.insertBefore(linkLayer, nodesLayer);
  const links = payload.links
    .filter(([a, b]) => nodes[a] && nodes[b])
    .map(([a, b]) => {
      const el = document.createElementNS(NS, "path");
      el.setAttribute("class", "ns-link");
      linkLayer.appendChild(el);
      return { a: nodes[a], b: nodes[b], el };
    });

  /* geometry helpers */
  const cx = (n: N) => n.bx + n.ox;
  const cy = (n: N) => n.by + n.oy;
  const bow = (x1: number, y1: number, x2: number, y2: number, amt: number) => {
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
    return `M${x1.toFixed(1)} ${y1.toFixed(1)}Q${((x1 + x2) / 2 - (dy / len) * len * amt).toFixed(1)} ${((y1 + y2) / 2 + (dx / len) * len * amt).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  };
  const place = (n: N) => {
    n.g.setAttribute("transform", `translate(${cx(n).toFixed(2)} ${cy(n).toFixed(2)}) scale(${Math.max(0.001, n.s).toFixed(3)})`);
    n.g.style.opacity = String(clamp(n.s * 1.5, 0, 1));
    const p = nodes[n.info.parent];
    if (n.edgeIn && p) n.edgeIn.setAttribute("d", bow(cx(p), cy(p), cx(n), cy(n), 0.06));
  };
  const placeLinks = () => links.forEach((l) => l.el.setAttribute("d", bow(cx(l.a), cy(l.a), cx(l.b), cy(l.b), 0.24)));
  const paintAll = () => { nodes.forEach(place); placeLinks(); };

  /* size the svg */
  let minX = 1e9, minY = 1e9, maxX = -1e9, maxY = -1e9;
  nodes.forEach((n) => {
    minX = Math.min(minX, n.bx - n.w / 2); maxX = Math.max(maxX, n.bx + n.w / 2);
    minY = Math.min(minY, n.by - n.h / 2); maxY = Math.max(maxY, n.by + n.h / 2);
  });
  const M = 36;
  const vb = { x: minX - M, y: minY - M, w: maxX - minX + 2 * M, h: maxY - minY + 2 * M };
  svg.setAttribute("viewBox", `${vb.x} ${vb.y} ${vb.w} ${vb.h}`);
  let zoom = 1;
  const setZoom = (z: number, keep = true) => {
    const before = { cx: (viewport.scrollLeft + viewport.clientWidth / 2) / (vb.w * zoom), cy: (viewport.scrollTop + viewport.clientHeight / 2) / (vb.h * zoom) };
    zoom = clamp(z, 0.4, 1.7);
    svg.style.width = vb.w * zoom + "px";
    svg.style.height = vb.h * zoom + "px";
    if (keep) {
      viewport.scrollLeft = before.cx * vb.w * zoom - viewport.clientWidth / 2;
      viewport.scrollTop = before.cy * vb.h * zoom - viewport.clientHeight / 2;
    }
    host.dispatchEvent(new CustomEvent("ns-zoom", { detail: zoom }));
  };
  const fitZoom = () => Math.min(viewport.clientWidth / vb.w, viewport.clientHeight / vb.h);
  const centreOnRoot = () => {
    viewport.scrollLeft = (root.bx - vb.x) * zoom - viewport.clientWidth / 2;
    viewport.scrollTop = (root.by - vb.y) * zoom - viewport.clientHeight / 2;
  };
  setZoom(clamp(viewport.clientWidth < 640 ? 0.8 : 0.78, 0.4, 1.7), false);
  paintAll();
  centreOnRoot();

  host.querySelectorAll<HTMLElement>("[data-zoom]").forEach((b) =>
    b.addEventListener("click", () => {
      const a = b.dataset.zoom;
      if (a === "in") setZoom(zoom * 1.22);
      else if (a === "out") setZoom(zoom / 1.22);
      else if (a === "fit") { setZoom(fitZoom(), false); viewport.scrollTo(0, 0); }
      else if (a === "reset") { setZoom(0.78, false); centreOnRoot(); }
    }),
  );

  /* 3 ─ springs */
  let px = 0, py = 0, inside = false, hoverId = -1, dragId = -1, raf = 0;
  const toSvg = (e: { clientX: number; clientY: number }) => {
    const m = svg.getScreenCTM();
    if (!m) return { x: 0, y: 0, scale: 1 };
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
    return { x: p.x, y: p.y, scale: m.a };
  };
  let scale = 1;

  const step = () => {
    raf = 0;
    let busy = false;
    const sigma = 90 / scale;
    nodes.forEach((n) => {
      const mass = MASS[n.info.tier];
      let tox = 0, toy = 0;
      if (!still) {
        if (dragId === n.info.id) {
          const dx = px - n.bx, dy = py - n.by, d = Math.hypot(dx, dy) || 1;
          const lim = 34 * mass + 8;
          const r = lim * Math.tanh(d / (lim * 2.4)); // rubber band: pulls, never lets go
          tox = (dx / d) * r; toy = (dy / d) * r;
        } else if (inside && dragId < 0) {
          const dx = px - n.bx, dy = py - n.by, d = Math.hypot(dx, dy) || 1;
          const pull = Math.exp(-(d * d) / (2 * sigma * sigma));
          const lim = MAXOFF[n.info.tier] * mass * 1.15;
          tox = (dx / d) * lim * pull; toy = (dy / d) * lim * pull;
        }
        const kk = 0.16, damp = 0.74;
        n.vx = (n.vx + (tox - n.ox) * kk) * damp; n.vy = (n.vy + (toy - n.oy) * kk) * damp;
        n.ox += n.vx; n.oy += n.vy;
        if (Math.abs(n.vx) + Math.abs(n.vy) + Math.abs(tox - n.ox) + Math.abs(toy - n.oy) > 0.04) busy = true;
      }
      const wantS = n.ts * (hoverId === n.info.id || dragId === n.info.id ? 1.12 : 1);
      if (still) n.s = wantS;
      else {
        n.vs = (n.vs + (wantS - n.s) * 0.14) * 0.72;
        n.s += n.vs;
        if (Math.abs(n.vs) + Math.abs(wantS - n.s) > 0.002) busy = true;
      }
    });
    paintAll();
    if (busy || inside) raf = requestAnimationFrame(step);
  };
  const wake = () => { if (!raf) raf = requestAnimationFrame(step); };

  /* hover highlight + caption */
  const trail = (n: N) => { const out: string[] = []; for (let c: N | undefined = n; c && c.info.tier > 0; c = nodes[c.info.parent]) out.unshift(c.info.label); return out; };
  const setHot = (id: number) => {
    if (hoverId === id) return;
    hoverId = id;
    svg.classList.toggle("has-hot", id >= 0);
    const hot = new Set<number>();
    if (id >= 0) {
      for (let c: N | undefined = nodes[id]; c; c = nodes[c.info.parent]) hot.add(c.info.id);
      nodes.forEach((n) => { if (n.info.parent === id) hot.add(n.info.id); });
      links.forEach((l) => { if (l.a.info.id === id) hot.add(l.b.info.id); if (l.b.info.id === id) hot.add(l.a.info.id); });
    }
    nodes.forEach((n) => {
      const on = hot.has(n.info.id);
      n.g.classList.toggle("is-hot", on);
      n.edgeIn?.classList.toggle("is-hot", on && hot.has(n.info.parent));
    });
    links.forEach((l) => l.el.classList.toggle("is-hot", id >= 0 && (l.a.info.id === id || l.b.info.id === id)));
    if (caption) {
      if (id < 0) caption.textContent = caption.dataset.idle ?? "";
      else {
        const n = nodes[id];
        const t = trail(n).join("  ›  ");
        const mates = links.flatMap((l) => (l.a.info.id === id ? [l.b] : l.b.info.id === id ? [l.a] : [])).map((m) => m.info.label);
        caption.textContent = t + (mates.length ? `   ↔  ${mates.join(", ")}` : "");
      }
    }
    wake();
  };

  const nodeFrom = (t: EventTarget | null) => {
    const g = (t as Element | null)?.closest?.("g.mindmap-node");
    const m = g && /node_(\d+)$/.exec(g.id);
    return m ? +m[1] : -1;
  };

  viewport.addEventListener("pointermove", (e) => {
    const p = toSvg(e); px = p.x; py = p.y; scale = p.scale; inside = true;
    if (panning) {
      viewport.scrollLeft = panStart.sl - (e.clientX - panStart.x);
      viewport.scrollTop = panStart.st - (e.clientY - panStart.y);
    } else if (dragId < 0) setHot(nodeFrom(e.target));
    wake();
  });
  viewport.addEventListener("pointerleave", () => { inside = false; if (dragId < 0) setHot(-1); wake(); });

  let panning = false;
  const panStart = { x: 0, y: 0, sl: 0, st: 0 };
  viewport.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    const id = nodeFrom(e.target);
    const p = toSvg(e); px = p.x; py = p.y; scale = p.scale;
    if (id >= 0 && e.pointerType === "mouse") {
      dragId = id; viewport.setPointerCapture(e.pointerId); setHot(id); wake(); e.preventDefault();
    } else if (e.pointerType === "mouse") {
      panning = true; viewport.classList.add("is-panning");
      panStart.x = e.clientX; panStart.y = e.clientY; panStart.sl = viewport.scrollLeft; panStart.st = viewport.scrollTop;
      viewport.setPointerCapture(e.pointerId);
    }
  });
  const release = () => { dragId = -1; panning = false; viewport.classList.remove("is-panning"); wake(); };
  viewport.addEventListener("pointerup", release);
  viewport.addEventListener("pointercancel", release);

  /* 4 ─ pop in when it scrolls into view */
  const popIn = () => {
    nodes.forEach((n) => {
      const delay = n.info.tier * 170 + Math.max(0, n.info.branch) * 110 + Math.random() * 260;
      setTimeout(() => { n.ts = 1; wake(); }, delay);
    });
  };
  if (still) wake();
  else if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { io.disconnect(); popIn(); } }, { threshold: 0.15 });
    io.observe(host);
  } else popIn();
}

/** fit each node's shape to its label at the real (tier) font size */
function fit(n: N | undefined) {
  if (!n || !n.shape || !n.label) return;
  n.label.removeAttribute("transform");
  const text = n.label.querySelector("text") as SVGGraphicsElement | null;
  const bb = (text ?? n.label).getBBox();
  const [px, py] = PAD[n.info.tier];
  if (n.info.tier === 0) {
    const r = Math.hypot(bb.width / 2, bb.height / 2) + 16;
    n.shape.setAttribute("r", String(r));
    n.shape.removeAttribute("cx"); n.shape.removeAttribute("cy");
    n.w = n.h = r * 2;
  } else {
    const w = bb.width + px * 2, h = bb.height + py * 2;
    n.shape.setAttribute("x", String(-w / 2)); n.shape.setAttribute("y", String(-h / 2));
    n.shape.setAttribute("width", String(w)); n.shape.setAttribute("height", String(h));
    const rx = n.info.tier === 1 ? 7 : h / 2;
    n.shape.setAttribute("rx", String(rx)); n.shape.setAttribute("ry", String(rx));
    n.w = w; n.h = h;
  }
  n.label.setAttribute("transform", `translate(${-(bb.x + bb.width / 2)} ${-(bb.y + bb.height / 2)})`);
  n.g.classList.add("ns-fit");
}

/** nudge overlapping nodes apart (the centre stays put; heavy nodes move less) */
function separate(nodes: (N | undefined)[]) {
  const list = nodes.filter(Boolean) as N[];
  const gap = 9;
  for (let it = 0; it < 90; it++) {
    let moved = false;
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const a = list[i], b = list[j];
        const dx = b.bx - a.bx, dy = b.by - a.by;
        const ox = (a.w + b.w) / 2 + gap - Math.abs(dx);
        const oy = (a.h + b.h) / 2 + gap - Math.abs(dy);
        if (ox <= 0 || oy <= 0) continue;
        const wa = a.info.tier === 0 ? 0 : 1 / (1 + (3 - a.info.tier) * 0.9);
        const wb = b.info.tier === 0 ? 0 : 1 / (1 + (3 - b.info.tier) * 0.9);
        const tot = wa + wb || 1;
        if (ox < oy) {
          const s = dx >= 0 ? 1 : -1;
          a.bx -= s * ox * (wa / tot); b.bx += s * ox * (wb / tot);
        } else {
          const s = dy >= 0 ? 1 : -1;
          a.by -= s * oy * (wa / tot); b.by += s * oy * (wb / tot);
        }
        moved = true;
      }
    }
    if (!moved) break;
  }
}
