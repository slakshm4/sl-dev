// chrome.ts · theme + motion + mobile menu toggles, and the little ink stars that pop where you click.
import { motionOff, store } from "./util";

let wired = false;

function sync() {
  const r = document.documentElement;
  const dark = r.dataset.theme === "dark";
  const off = r.dataset.motion === "off";
  document.querySelectorAll<HTMLElement>('[data-toggle="theme"]').forEach((b) => {
    b.setAttribute("aria-pressed", String(dark));
    b.setAttribute("aria-label", dark ? "switch to light mode" : "switch to dark mode");
  });
  document.querySelectorAll<HTMLElement>('[data-toggle="motion"]').forEach((b) => {
    b.setAttribute("aria-pressed", String(off));
    b.setAttribute("aria-label", off ? "resume motion" : "pause motion");
  });
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#16132a" : "#ddd7ec");
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
        } else if (kind === "motion") {
          const next = r.dataset.motion === "off" ? "on" : "off";
          r.dataset.motion = next;
          store.set("motion", next);
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
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && document.body.classList.contains("menu-open")) {
        setMenu(false);
        document.querySelector<HTMLElement>('[data-toggle="menu"]')?.focus();
      }
    });
  }
  setMenu(false);
  sync();
}
