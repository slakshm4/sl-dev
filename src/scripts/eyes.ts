// eyes.ts · cut-out eyes that follow the cursor, and blink once in a while.
let wired = false, px = -1, py = -1, raf = 0;

function update() {
  raf = 0;
  document.querySelectorAll<SVGSVGElement>("[data-eyes]").forEach((svg) => {
    const r = svg.getBoundingClientRect();
    if (!r.width || r.bottom < 0 || r.top > innerHeight) return;
    const k = r.width / 150;
    svg.querySelectorAll<SVGGElement>(".eyes-pupil").forEach((p, i) => {
      const cx = r.left + (36 + i * 78) * k;
      const cy = r.top + 32 * k;
      const dx = px - cx, dy = py - cy;
      const d = Math.hypot(dx, dy) || 1;
      const m = Math.min(1, d / 220);
      p.style.transform = `translate(${((dx / d) * 10 * m).toFixed(2)}px, ${((dy / d) * 7 * m).toFixed(2)}px)`;
    });
  });
}

export function initEyes() {
  if (wired) return;
  wired = true;
  addEventListener("pointermove", (e) => {
    px = e.clientX; py = e.clientY;
    if (!raf) raf = requestAnimationFrame(update);
  }, { passive: true });
  setInterval(() => {
    if (document.documentElement.dataset.motion === "off") return;
    const all = document.querySelectorAll("[data-eyes]");
    all.forEach((s) => s.classList.add("is-blink"));
    setTimeout(() => all.forEach((s) => s.classList.remove("is-blink")), 150);
  }, 4800);
}
