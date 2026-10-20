// tooth.ts · drives the hero → nav hand-off (p = 0: big hero tooth, p = 1: tiny tooth docked in the nav).
// on the home page it follows scroll; everywhere else it is 1. smoothed so it glides.
//
// performance note: this used to set a css variable (--p) on <html> every frame, which makes the browser re-check the style of
// every element on the page (slow on phones). now it writes opacity / transform directly onto the handful of elements that move.
import { clamp, motionOff } from "./util";

let cur = 1, raf = 0, wired = false, first = true;

const isHome = () => document.body?.dataset.page === "home";
// with the phone menu open the tooth always docks, so the big hero tooth never sits over the menu
const target = () => (isHome() && !document.body.classList.contains("menu-open") ? clamp(window.scrollY / (window.innerHeight * 0.62), 0, 1) : 1);

type Els = { tooth: HTMLElement | null; shadow: HTMLElement | null; stage: HTMLElement | null; scroll: HTMLElement | null; intro: HTMLElement | null };
let els: Els = { tooth: null, shadow: null, stage: null, scroll: null, intro: null };
let last = -1;

function find() {
  if (els.tooth?.isConnected && (!isHome() || els.stage?.isConnected)) return;
  els = {
    tooth: document.querySelector<HTMLElement>(".tooth-wrap"),
    shadow: document.querySelector<HTMLElement>(".tooth-shadow"),
    stage: document.querySelector<HTMLElement>(".hero-stage"),
    scroll: document.querySelector<HTMLElement>(".hero-scroll"),
    intro: document.querySelector<HTMLElement>(".intro"),
  };
  last = -1;
}

function paint() {
  find();
  const p = Math.round(cur * 1000) / 1000;
  if (p === last) return;
  last = p;
  const { tooth, shadow, stage, scroll, intro } = els;
  // the tooth: slides from the middle of the hero up to the nav while shrinking. (--y0 is set in Tooth.astro)
  if (tooth) tooth.style.transform = `translate(-50%, calc(${1 - p} * var(--y0))) scale(${1 - 0.82 * p})`;
  if (shadow) shadow.style.opacity = String(clamp(1 - p * 1.4, 0, 1));
  if (stage) stage.style.opacity = String(clamp(1 - p * 2.4, 0, 1));
  if (scroll) scroll.style.opacity = String(clamp(1 - p * 3, 0, 1));
  if (intro) intro.style.opacity = String(clamp((p - 0.32) * 1.9, 0, 1));
}

function frame() {
  raf = 0;
  const t = target();
  cur = motionOff() ? t : cur + (t - cur) * 0.16;
  if (Math.abs(t - cur) < 0.001) cur = t;
  paint();
  if (cur !== t) raf = requestAnimationFrame(frame);
}

const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };

export function initTooth() {
  if (first) { cur = target(); first = false; }
  last = -1;
  paint();
  if (!wired) {
    wired = true;
    addEventListener("scroll", kick, { passive: true });
    addEventListener("resize", kick);
    const watch = () => mo.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    const mo = new MutationObserver(kick);
    watch();
    // a new page has just been swapped in: put the right opacities on it before it is painted
    document.addEventListener("astro:after-swap", () => { mo.disconnect(); watch(); last = -1; els.tooth = null; paint(); });
  }
  kick();
}
