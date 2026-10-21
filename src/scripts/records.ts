// records.ts · the turntable on /say-hi. there is no player: the record just spins (one turn every 9 seconds),
// and picking a song swaps the pointillist cover on the platter + shows your note and the links out.
import { store } from "./util";

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
    if (art) art.alt = btn.dataset.alt || "album cover";
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
// ── how many people guessed each one ─────────────────────────────────────────
// an anonymous tally: three numbers (one per fact) kept by abacus (abacus.jasoncameron.dev), a free counting
// service that needs no account. nothing about the visitor is sent. each browser is counted once.
// to turn the stats off: set TALLY to "". to move to your own counter later: change TALLY / NS and the two fetches below.
const TALLY = "https://abacus.jasoncameron.dev";
const NS = "shradhalakshman-com";
const MIN_GUESSES = 5; // percentages only show once this many people have guessed (a "91%" from 2 people means nothing)
const factKey = (i: number) => `two-truths-${i + 1}`;

async function tally(action: "hit" | "get", i: number): Promise<number | null> {
  if (!TALLY) return null;
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 4500);
  try {
    const r = await fetch(`${TALLY}/${action}/${NS}/${factKey(i)}`, { signal: ctl.signal });
    if (r.status === 404) return 0; // never guessed yet
    if (!r.ok) return null;
    const j = await r.json();
    return typeof j.value === "number" ? j.value : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export function initFacts() {
  document.querySelectorAll<HTMLElement>("[data-facts]").forEach((root) => {
    const notes = [...root.querySelectorAll<HTMLElement>("[data-fact]")];
    const lie = root.dataset.lie === "" ? -1 : Number(root.dataset.lie);
    const foot = root.querySelector<HTMLElement>("[data-foot]");
    const stampFor = (n: HTMLElement) => n.querySelector<HTMLElement>(".ttl-stamp")!;
    const tallyNote = root.querySelector<HTMLElement>("[data-tally]");
    let counted = store.get("ttl-voted") !== null;

    // fetch (and, for a first-time guesser, add to) the tally, then show "guessed by n% of people" on each note
    const showStats = async (guess: number) => {
      const first = !counted;
      counted = true; // set straight away so a double tap can't count twice
      let counts: (number | null)[];
      if (first) {
        const mine = await tally("hit", guess);
        if (mine === null) counted = false; // the counter couldn't be reached: try again on the next guess
        else store.set("ttl-voted", String(guess));
        counts = await Promise.all(notes.map((_, j) => (j === guess ? Promise.resolve(mine) : tally("get", j))));
      } else {
        counts = await Promise.all(notes.map((_, j) => tally("get", j)));
      }
      const hide = () => {
        notes.forEach((n) => { const el = n.querySelector<HTMLElement>("[data-stat]"); if (el) el.hidden = true; });
        if (tallyNote) tallyNote.hidden = true;
      };
      if (counts.some((c) => c === null)) return hide();
      const total = (counts as number[]).reduce((a, b) => a + b, 0);
      if (total < MIN_GUESSES) {
        hide();
        if (tallyNote) {
          tallyNote.textContent = "you're one of the first to guess. come back later to see how everyone else did.";
          tallyNote.hidden = false;
        }
        return;
      }
      notes.forEach((n, j) => {
        const el = n.querySelector<HTMLElement>("[data-stat]");
        if (!el) return;
        const pct = Math.round(((counts[j] as number) / total) * 100);
        el.innerHTML = `guessed by <strong>${pct}%</strong> of people`;
        el.hidden = false;
      });
      if (tallyNote) {
        tallyNote.textContent = `based on ${total} guesses so far. the tally is anonymous: three numbers, no names.`;
        tallyNote.hidden = false;
      }
    };

    notes.forEach((n, i) => {
      const btn = n.querySelector<HTMLButtonElement>("[data-guess]")!;
      btn.addEventListener("click", () => {
        void showStats(i);
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
