// chrome.ts · theme + motion + mobile menu toggles, and the little ink stars that pop where you click.
import { motionOff, store } from "./util";

let wired = false;

function sync() {
  const r = document.documentElement;
  const dark = r.dataset.theme === "dark";
  const off = r.dataset.motion === "off";
  document.querySelectorAll<HTMLElement>('[data-toggle="theme"]').forEach((b) => {
    b.setAttribute("aria-pressed", String(dark));
    b.setAttribute("aria-label", "dark mode");
    b.title = dark ? "switch to light mode" : "switch to dark mode";
  });
  document.querySelectorAll<HTMLElement>('[data-toggle="motion"]').forEach((b) => {
    b.setAttribute("aria-pressed", String(off));
    b.setAttribute("aria-label", "pause animations");
    b.title = off ? "animations are paused. tap to bring back the turning tooth, floating stickers, and page effects" : "pause the animations (turning tooth, floating stickers, page effects)";
  });
  const acc = r.dataset.a11y === "on";
  document.querySelectorAll<HTMLElement>('[data-toggle="a11y"]').forEach((b) => {
    b.setAttribute("aria-pressed", String(acc));
    b.title = acc ? "accessible mode is on. tap to go back to the scrapbook look" : "switch to accessible mode: easier-to-read font, no animation, plainer backgrounds, higher contrast";
  });
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#16132a" : "#ddd7ec");
}

/** a polite announcement for screen readers (the live region sits in Layout.astro) */
function say(msg: string) {
  const el = document.getElementById("a11y-status");
  if (!el) return;
  el.textContent = "";
  setTimeout(() => { el.textContent = msg; }, 60);
}

/** accessible mode: dyslexia-friendly font, everything still, plain backgrounds, stronger contrast (the styles are in a11y.css) */
function setAccessible(on: boolean) {
  const r = document.documentElement;
  r.dataset.a11y = on ? "on" : "off";
  store.set("a11y", on ? "on" : "off");
  if (on) {
    // remember what the motion switch was, so turning accessible mode off puts it back
    store.set("motion-before-a11y", r.dataset.motion === "off" ? "off" : "on");
    r.dataset.motion = "off";
    store.set("motion", "off");
    // anything that was waiting to scroll into view just shows now
    document.querySelectorAll("[data-reveal], .hl").forEach((e) => e.classList.add("is-in"));
    document.querySelectorAll(".hand-arrow[data-draw]").forEach((e) => e.classList.add("is-drawn"));
  } else {
    const before = store.get("motion-before-a11y") === "off" ? "off" : "on";
    r.dataset.motion = before;
    store.set("motion", before);
  }
  say(on ? "accessible mode on. the font is now OpenDyslexic, animations are off, and backgrounds are plainer with stronger contrast." : "accessible mode off.");
}

function setMenu(open: boolean) {
  document.body.classList.toggle("menu-open", open);
  document.querySelectorAll<HTMLElement>('[data-toggle="menu"]').forEach((b) => {
    b.setAttribute("aria-expanded", String(open));
    b.setAttribute("aria-label", open ? "close menu" : "open menu");
  });
}

function stars(x: number, y: number) {
  if (motionOff() || matchMedia("(pointer: coarse)").matches) return;
  for (let i = 0; i < 6; i++) {
    const s = document.createElement("span");
    s.className = "click-star";
    const a = Math.random() * Math.PI * 2;
    const d = 22 + Math.random() * 30;
    s.style.left = x + "px";
    s.style.top = y + "px";
    s.style.setProperty("--dx", Math.cos(a) * d + "px");
    s.style.setProperty("--dy", Math.sin(a) * d + "px");
    s.style.setProperty("--rot", Math.round(Math.random() * 180 - 90) + "deg");
    s.style.width = s.style.height = 9 + Math.random() * 10 + "px";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 750);
  }
}

export function initChrome() {
  if (!wired) {
    wired = true;
    document.addEventListener("click", (e) => {
      const ex = (e.target as Element).closest<HTMLElement>("[data-expand]");
      if (ex) {
        const all = [...document.querySelectorAll<HTMLDetailsElement>("details.cv-sec")];
        const open = ex.getAttribute("aria-pressed") !== "true";
        all.forEach((d) => (d.open = open));
        ex.setAttribute("aria-pressed", String(open));
        ex.textContent = open ? "close all sections" : "open all sections";
        return;
      }
      const t = (e.target as Element).closest<HTMLElement>("[data-toggle]");
      if (t) {
        const r = document.documentElement;
        const kind = t.dataset.toggle;
        if (kind === "theme") {
          const next = r.dataset.theme === "dark" ? "light" : "dark";
          r.dataset.theme = next;
          store.set("theme", next);
          say(next === "dark" ? "dark mode on." : "dark mode off.");
        } else if (kind === "motion") {
          const next = r.dataset.motion === "off" ? "on" : "off";
          r.dataset.motion = next;
          store.set("motion", next);
          say(next === "off" ? "animations paused." : "animations on.");
        } else if (kind === "a11y") {
          setAccessible(r.dataset.a11y !== "on");
        } else if (kind === "menu") {
          setMenu(!document.body.classList.contains("menu-open"));
        }
        sync();
        return;
      }
      if ((e.target as Element).closest("#site-nav a")) setMenu(false);
    });
    document.addEventListener("pointerdown", (e) => {
      if ((e.target as Element).closest("input, textarea, select")) return;
      stars(e.clientX, e.clientY);
    });
    // the note under the accessibility button fades once you scroll, so it is never left half-hidden under the nav
    let away = false;
    const noteWatch = () => {
      const a = window.scrollY > 12;
      if (a !== away) { away = a; document.documentElement.classList.toggle("note-away", a); }
    };
    window.addEventListener("scroll", noteWatch, { passive: true });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && document.body.classList.contains("menu-open")) {
        setMenu(false);
        document.querySelector<HTMLElement>('[data-toggle="menu"]')?.focus();
      }
    });
  }
  setMenu(false);
  sync();
  document.documentElement.classList.toggle("note-away", window.scrollY > 12);
}
