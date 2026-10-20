// sprites.ts · gives every <Sprite> one of two lives, by coin flip: quiver (stop-motion jitter) or scribble (thin-marker draw-in).
// with motion off the sprite stays the plain sticker it was server-rendered as.
import { motionOff } from "./util";

// sticker fill colours → the loose marker hatching defined in Layout.astro. chalk (white) fills are left empty: the paper shows through.
const HATCH: [RegExp, string][] = [
  [/chalk|fffdf3/i, "none"],
  [/st-ink|1f1b2e/i, "url(#hatch-ink)"],
  [/peri|8e9bde/i, "url(#hatch-peri)"],
  [/butter|f4d777/i, "url(#hatch-butter)"],
  [/blush|f2b1c6/i, "url(#hatch-blush)"],
  [/fish|ee8f3f/i, "url(#hatch-fish)"],
  [/c7d3e6/i, "url(#hatch-ice)"],
  [/a2cba1/i, "url(#hatch-sage)"],
  [/8a7a55/i, "url(#hatch-brown)"],
  [/ebcfa6/i, "url(#hatch-sand)"],
];

function scribble(el: HTMLElement) {
  const svg = el.querySelector("svg");
  if (!svg) return;
  let k = 0;
  svg.querySelectorAll<SVGElement>("g, path, circle, ellipse, rect, line, polyline, polygon").forEach((n) => {
    const fill = n.getAttribute("fill");
    if (fill && fill !== "none") {
      const hit = HATCH.find(([re]) => re.test(fill));
      if (hit) n.setAttribute("fill", hit[1]);
    }
    const stroke = n.getAttribute("stroke");
    if (stroke && /st-ink|1f1b2e/i.test(stroke)) n.classList.add("sk-ink");
    if (n.tagName.toLowerCase() === "g") return;
    n.setAttribute("pathLength", "1");
    n.classList.add("sk");
    n.style.setProperty("--d", `${(k++ * 0.11).toFixed(2)}s`);
  });
}

export function initSprites() {
  const off = motionOff();
  document.querySelectorAll<HTMLElement>("[data-sprite]:not([data-ready])").forEach((el) => {
    el.dataset.ready = "1";
    if (off) return;
    if (Math.random() < 0.5) {
      el.classList.add("sprite--quiver");
      el.style.setProperty("--qs", `${(0.75 + Math.random() * 0.4).toFixed(2)}s`);
      el.style.setProperty("--qd", `-${(Math.random() * 1.2).toFixed(2)}s`);
    } else {
      el.classList.add("sprite--scribble");
      scribble(el);
    }
  });
}
