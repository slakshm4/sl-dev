// util.ts · tiny helpers shared by the scripts
export const root = () => document.documentElement;
export const motionOff = () =>
  root().dataset.motion === "off" || (matchMedia("(prefers-reduced-motion: reduce)").matches && root().dataset.motion !== "on");
export const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const store = {
  get(k: string) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k: string, v: string) { try { localStorage.setItem(k, v); } catch { /* private mode */ } },
};
/** run `fn` once per page view (first load + every client-side navigation) */
export function onPage(fn: () => void) {
  document.addEventListener("astro:page-load", fn);
}
