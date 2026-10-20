// tabs.ts · accessible tabs for the notebook (arrow keys, home/end, deep links like /notebook#trials).
export function initTabs() {
  document.querySelectorAll<HTMLElement>("[data-tabs]").forEach((root) => {
    const tabs = [...root.querySelectorAll<HTMLElement>('[role="tab"]')];
    const panels = tabs.map((t) => document.getElementById(t.getAttribute("aria-controls")!)!);
    if (!tabs.length) return;

    const select = (i: number, focus = false, push = true) => {
      tabs.forEach((t, n) => {
        const on = n === i;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        panels[n].hidden = !on;
        if (on) root.style.setProperty("--tab", `var(--${t.dataset.tone ?? "peri"})`);
      });
      panels[i].classList.remove("is-flip");
      void panels[i].offsetWidth;
      panels[i].classList.add("is-flip");
      if (focus) tabs[i].focus();
      if (push) history.replaceState(null, "", "#" + tabs[i].id.replace(/^tab-/, ""));
    };

    tabs.forEach((t, i) => {
      t.addEventListener("click", () => select(i));
      t.addEventListener("keydown", (e) => {
        const k = e.key;
        let n = -1;
        if (k === "ArrowRight" || k === "ArrowDown") n = (i + 1) % tabs.length;
        else if (k === "ArrowLeft" || k === "ArrowUp") n = (i - 1 + tabs.length) % tabs.length;
        else if (k === "Home") n = 0;
        else if (k === "End") n = tabs.length - 1;
        if (n >= 0) { e.preventDefault(); select(n, true); }
      });
    });

    const want = tabs.findIndex((t) => "#" + t.id.replace(/^tab-/, "") === location.hash);
    select(want >= 0 ? want : 0, false, false);
  });
}
