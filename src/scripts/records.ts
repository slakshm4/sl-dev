// records.ts · the turntable on /say-hi. there is no player: the record just spins (one turn every 9 seconds),
// and picking a song swaps the pointillist cover on the platter + shows your note and the links out.
export function initRecords() {
  const root = document.querySelector<HTMLElement>("[data-records]");
  if (!root) return;
  const buttons = [...root.querySelectorAll<HTMLButtonElement>("[data-song]")];
  const panels = [...root.querySelectorAll<HTMLElement>("[data-panel]")];
  const disc = root.querySelector<HTMLElement>("[data-disc]");
  const art = root.querySelector<HTMLImageElement>("[data-art]");
  const arm = root.querySelector<HTMLElement>("[data-arm]");
  if (!buttons.length) return;

  art?.addEventListener("error", () => { art.hidden = true; });

  let current = "";
  const select = (id: string, animate = true) => {
    if (id === current) return;
    current = id;
    buttons.forEach((b) => {
      const on = b.dataset.song === id;
      b.setAttribute("aria-pressed", String(on));
      b.classList.toggle("is-on", on);
    });
    panels.forEach((p) => (p.hidden = p.dataset.panel !== id));
    const btn = buttons.find((b) => b.dataset.song === id)!;
    const src = btn.dataset.art || "";
    root.style.setProperty("--song-tone", btn.dataset.tone || "var(--peri)");
    if (art && disc) {
      if (animate && document.documentElement.dataset.motion !== "off") {
        disc.classList.add("is-swap");
        arm?.classList.add("is-lift");
        setTimeout(() => {
          if (src) { art.src = src; art.hidden = false; } else art.hidden = true;
          disc.classList.remove("is-swap");
          arm?.classList.remove("is-lift");
        }, 520);
      } else if (src) { art.src = src; art.hidden = false; } else art.hidden = true;
    }
  };

  buttons.forEach((b) => b.addEventListener("click", () => select(b.dataset.song!)));
  root.querySelector("[data-shuffle]")?.addEventListener("click", () => {
    const others = buttons.filter((b) => b.dataset.song !== current);
    select(others[Math.floor(Math.random() * others.length)].dataset.song!);
  });

  const fromHash = buttons.find((b) => "#" + b.dataset.song === location.hash)?.dataset.song;
  select(fromHash || buttons[0].dataset.song!, false);
  root.classList.add("is-ready");
}

/** two truths and a lie: tap a note to guess which one is fibbing. (set `lie` in say-hi.astro to enable a reveal) */
export function initFacts() {
  document.querySelectorAll<HTMLElement>("[data-facts]").forEach((root) => {
    const notes = [...root.querySelectorAll<HTMLElement>("[data-fact]")];
    const lie = root.dataset.lie === "" ? -1 : Number(root.dataset.lie);
    const foot = root.querySelector<HTMLElement>("[data-foot]");
    const stampFor = (n: HTMLElement) => n.querySelector<HTMLElement>(".ttl-stamp")!;
    notes.forEach((n, i) => {
      const btn = n.querySelector<HTMLButtonElement>("[data-guess]")!;
      btn.addEventListener("click", () => {
        notes.forEach((m, j) => {
          const b = m.querySelector<HTMLButtonElement>("[data-guess]")!;
          b.setAttribute("aria-pressed", String(i === j));
          const st = stampFor(m);
          st.hidden = i !== j;
          st.textContent = i === j ? "your guess" : "";
        });
        if (lie >= 0) {
          notes.forEach((m, j) => {
            const st = stampFor(m);
            st.hidden = false;
            st.textContent = j === lie ? "the lie" : "true";
          });
          if (foot) foot.firstChild!.textContent = i === lie ? "you got it. nice nose. " : "not quite. ";
        }
      });
    });
  });
}
