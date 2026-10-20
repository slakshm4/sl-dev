// boot.ts · wires everything up. runs once; every module re-checks the page on each navigation
// (astro's <ClientRouter /> swaps pages without a reload, so we listen for astro:page-load).
import { initChrome } from "./chrome";
import { initTooth } from "./tooth";
import { initReveal } from "./reveal";
import { initSprites } from "./sprites";
import { initEyes } from "./eyes";
import { initTypewriter } from "./typewriter";
import { initTabs } from "./tabs";
import { initRecords, initFacts } from "./records";

const safe = (fn: () => void) => { try { fn(); } catch (e) { console.warn(e); } };

let ran = false;
function pageLoad() {
  ran = true;
  safe(initChrome);
  safe(initTooth);
  safe(initEyes);
  safe(initTypewriter);
  safe(initTabs);
  safe(initRecords);
  safe(initFacts);
  safe(initSprites);
  safe(initReveal);
  // the north star map pulls in mermaid, so it is only fetched on that page
  if (document.querySelector("#ns-map")) {
    import("./northstar").then((m) => m.initNorthStar()).catch((e) => console.warn(e));
  }
}

let booted = false;
export function boot() {
  if (booted) return;
  booted = true;
  document.addEventListener("astro:page-load", pageLoad);
  // belt and braces: if the router never announces the first page, run once anyway
  const fallback = () => setTimeout(() => { if (!ran) pageLoad(); }, 60);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fallback);
  else fallback();
}
