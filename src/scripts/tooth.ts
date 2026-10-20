// tooth.ts · drives --p (0 = big hero tooth, 1 = tiny tooth docked in the nav).
// on the home page it follows scroll; everywhere else it is 1. smoothed so it glides.
import { clamp, motionOff } from "./util";

let cur = 1, raf = 0, wired = false, first = true;

const isHome = () => document.body?.dataset.page === "home";
const target = () => (isHome() ? clamp(window.scrollY / (window.innerHeight * 0.62), 0, 1) : 1);

function paint() {
  document.documentElement.style.setProperty("--p", cur.toFixed(4));
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
  paint();
  if (!wired) {
    wired = true;
    addEventListener("scroll", kick, { passive: true });
    addEventListener("resize", kick);
    // astro swaps <html> attributes on navigation, which wipes the inline style: put --p straight back
    document.addEventListener("astro:after-swap", paint);
  }
  kick();
}
