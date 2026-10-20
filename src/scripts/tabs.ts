// tabs.ts · the notebook's folder drawer.
// closed: four folders stacked in a drawer. open one and the others become tabs; the cards shake out of the folder's pocket onto the page.
// keyboard: enter/space opens a folder, arrow keys move between tabs, esc puts the folder back. deep links like /notebook#trials open that folder.
export function initTabs() {
  document.querySelectorAll<HTMLElement>("[data-nb]").forEach((root) => {
    const stack = root.querySelector<HTMLElement>("[data-stack]")!;
    const row = root.querySelector<HTMLElement>("[data-tabs-row]")!;
    const folders = [...root.querySelectorAll<HTMLButtonElement>("[data-folder]")];
    const tabs = [...row.querySelectorAll<HTMLElement>('[role="tab"]')];
    const panels = tabs.map((t) => document.getElementById(t.getAttribute("aria-controls")!)!);
    if (!tabs.length || !stack) return;
    const still = () => matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motion === "off";
    let current = -1;

    // each card starts somewhere along the folder's pocket and travels to where it lands
    const scatter = (panel: HTMLElement) => {
      const pr = panel.getBoundingClientRect();
      const ofh = parseFloat(getComputedStyle(panel).getPropertyValue("--ofh")) || 220;
      const lip = parseFloat(getComputedStyle(panel).getPropertyValue("--lip")) || 70;
      panel.querySelectorAll<HTMLElement>(".nbc").forEach((li, n) => {
        const cs = getComputedStyle(li);
        const jx = parseFloat(cs.getPropertyValue("--jx")) || 0;
        const jy = parseFloat(cs.getPropertyValue("--jy")) || 0;
        const r = li.getBoundingClientRect();
        const cx = r.left + r.width / 2 - jx;
        const cy = r.top + r.height / 2 - jy;
        // a deterministic spread of pocket spots so it feels shaken, not stamped
        const spot = ((n * 0.6180339887) % 1) * 0.76 + 0.12;
        const sx = pr.left + pr.width * spot;
        const sy = pr.top + ofh - lip * 0.55;
        li.style.setProperty("--fx", `${Math.round(sx - cx)}px`);
        li.style.setProperty("--fy", `${Math.round(sy - cy)}px`);
        li.style.setProperty("--fr", `${(n % 2 ? 1 : -1) * (4 + ((n * 5) % 8))}deg`);
      });
    };

    const hash = (id: string | null) => history.replaceState(null, "", id ? "#" + id : location.pathname + location.search);

    const show = (i: number, focus = false, push = true) => {
      const first = current < 0;
      current = i;
      stack.hidden = true;
      row.hidden = false;
      tabs.forEach((t, n) => {
        const on = n === i;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        panels[n].hidden = !on;
        panels[n].classList.remove("is-open");
      });
      const p = panels[i];
      if (!still()) scatter(p);
      void p.offsetWidth;
      p.classList.add("is-open");
      if (focus) tabs[i].focus();
      if (push) hash(tabs[i].id.replace(/^tab-/, ""));
      if (first && push) row.scrollIntoView({ block: "nearest", behavior: still() ? "auto" : "smooth" });
    };

    const close = (focusFolder = true) => {
      const was = current;
      current = -1;
      panels.forEach((p) => { p.hidden = true; p.classList.remove("is-open"); });
      row.hidden = true;
      stack.hidden = false;
      stack.classList.remove("is-entering");
      void stack.offsetWidth;
      if (!still()) stack.classList.add("is-entering");
      hash(null);
      if (focusFolder && was >= 0) folders[was]?.focus();
    };

    folders.forEach((f, i) => f.addEventListener("click", () => {
      if (still()) return show(i, true);
      stack.classList.add("is-leaving");
      setTimeout(() => { stack.classList.remove("is-leaving"); show(i, true); }, 330);
    }));
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => show(i));
      t.addEventListener("keydown", (e) => {
        const k = e.key;
        let n = -1;
        if (k === "ArrowRight" || k === "ArrowDown") n = (i + 1) % tabs.length;
        else if (k === "ArrowLeft" || k === "ArrowUp") n = (i - 1 + tabs.length) % tabs.length;
        else if (k === "Home") n = 0;
        else if (k === "End") n = tabs.length - 1;
        if (n >= 0) { e.preventDefault(); show(n, true); }
      });
    });
    root.querySelectorAll<HTMLElement>("[data-close]").forEach((b) => b.addEventListener("click", () => close()));
    root.addEventListener("keydown", (e) => { if (e.key === "Escape" && current >= 0) close(); });

    // start closed unless the url names a folder
    panels.forEach((p) => (p.hidden = true));
    row.hidden = true;
    const want = tabs.findIndex((t) => "#" + t.id.replace(/^tab-/, "") === location.hash);
    if (want >= 0) show(want, false, false);
  });
}
