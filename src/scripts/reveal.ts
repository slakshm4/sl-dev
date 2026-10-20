// reveal.ts · things draw/fade/toss themselves in as they scroll into view.
import { motionOff } from "./util";

const show = (el: Element) => el.classList.add(el.classList.contains("hand-arrow") ? "is-drawn" : "is-in");

export function initReveal() {
  const els = document.querySelectorAll("[data-reveal], .hl, .hand-arrow[data-draw]");
  if (!els.length) return;
  if (motionOff() || !("IntersectionObserver" in window)) {
    els.forEach(show);
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        const delay = el.dataset.delay;
        if (delay) setTimeout(() => show(el), Number(delay));
        else show(el);
        io.unobserve(el);
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
  );
  els.forEach((el) => io.observe(el));
}
