// make-records.mjs ─ turns each song's real album cover into a pointillist painting of that cover.
//
//   npm run records            → fetch any covers that are missing
//   npm run records -- --force → redo every one
//
// how it works
//   1. asks the iTunes search api (no key needed) for the track, and grabs its cover + apple music link
//   2. repaints the cover as dots: big dots lay down the colour, medium dots add texture, tiny dots
//      sit on the edges so faces, letters and shapes stay recognisable (it is a painting OF the cover)
//   3. writes public/records/<id>.webp and src/data/records.json (read by src/pages/say-hi.astro)
//
// it never fails the build: if the network is down it warns and the site shows a plain vinyl instead.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "..");
const songsFile = path.join(root, "src/data/songs.json");
const outDir = path.join(root, "public/records");
const dataFile = path.join(root, "src/data/records.json");
const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const IF_MISSING = args.includes("--if-missing");
const testIdx = args.indexOf("--test"); // node scripts/make-records.mjs --test cover.jpg out.webp

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.warn("[records] sharp isn't installed: run `npm install` first. skipping.");
  process.exit(0);
}

/* ── tiny seeded random so a cover always paints the same way ── */
function rng(seed) {
  let s = seed >>> 0 || 1;
  return () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296);
}
const hash = (str) => [...str].reduce((a, c) => (Math.imul(a, 31) + c.charCodeAt(0)) >>> 0, 7);

/* ── colour helpers ── */
const clamp = (n, a = 0, b = 255) => Math.max(a, Math.min(b, n));
function boost([r, g, b], sat = 1.22, lift = 4) {
  const l = 0.299 * r + 0.587 * g + 0.114 * b;
  return [clamp(l + (r - l) * sat + lift), clamp(l + (g - l) * sat + lift), clamp(l + (b - l) * sat + lift)];
}
const hex = ([r, g, b]) => "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");

/** repaint an image buffer as pointillism → webp buffer */
export async function pointillise(input, size = 640, seed = 1) {
  const W = size, H = size;
  const { data } = await sharp(input).resize(W, H, { fit: "cover" }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const px = (x, y) => {
    x = clamp(Math.round(x), 0, W - 1); y = clamp(Math.round(y), 0, H - 1);
    const i = (y * W + x) * 3;
    return [data[i], data[i + 1], data[i + 2]];
  };
  const avg = (cx, cy, r) => {
    let R = 0, G = 0, B = 0, n = 0;
    const step = Math.max(1, Math.floor(r / 3));
    for (let y = -r; y <= r; y += step) for (let x = -r; x <= r; x += step) {
      if (x * x + y * y > r * r) continue;
      const [a, b, c] = px(cx + x, cy + y); R += a; G += b; B += c; n++;
    }
    return n ? [R / n, G / n, B / n] : px(cx, cy);
  };
  // edge strength (sobel on luminance), measured on a small copy for speed
  const E = 160, es = W / E;
  const small = await sharp(input).resize(E, E, { fit: "cover" }).greyscale().raw().toBuffer();
  const lum = (x, y) => small[clamp(y, 0, E - 1) * E + clamp(x, 0, E - 1)];
  const edge = new Float32Array(E * E);
  let maxE = 1;
  for (let y = 0; y < E; y++) for (let x = 0; x < E; x++) {
    const gx = -lum(x - 1, y - 1) - 2 * lum(x - 1, y) - lum(x - 1, y + 1) + lum(x + 1, y - 1) + 2 * lum(x + 1, y) + lum(x + 1, y + 1);
    const gy = -lum(x - 1, y - 1) - 2 * lum(x, y - 1) - lum(x + 1, y - 1) + lum(x - 1, y + 1) + 2 * lum(x, y + 1) + lum(x + 1, y + 1);
    const m = Math.hypot(gx, gy); edge[y * E + x] = m; if (m > maxE) maxE = m;
  }
  const edgeAt = (x, y) => edge[clamp(Math.floor(y / es), 0, E - 1) * E + clamp(Math.floor(x / es), 0, E - 1)] / maxE;

  const rand = rng(seed);
  const dots = [];
  // a jittered hex grid of dots; `keep(x, y, e)` decides where this layer paints
  const layer = (spacing, rMin, rMax, sampleR, keep, jitter = 0.38) => {
    const batch = [];
    const rowH = spacing * 0.866;
    for (let row = -1, y = 0; y < H + spacing; row++, y = row * rowH) {
      for (let x = (row % 2 ? spacing / 2 : 0) - spacing; x < W + spacing; x += spacing) {
        const cx = x + (rand() - 0.5) * spacing * jitter * 2;
        const cy = y + (rand() - 0.5) * spacing * jitter * 2;
        const e = edgeAt(cx, cy);
        if (!keep(cx, cy, e)) continue;
        // pointillist optical mixing: now and then borrow the colour of a neighbouring patch
        const mix = rand() < 0.22 ? spacing * 0.9 : 0;
        const a = rand() * 6.283;
        const rgb = avg(cx + Math.cos(a) * mix, cy + Math.sin(a) * mix, sampleR);
        const [r, g, b] = boost(rgb, 1.2 + rand() * 0.14, (rand() - 0.5) * 14);
        batch.push({ cx, cy, r: rMin + rand() * (rMax - rMin), fill: hex([r, g, b]) });
      }
    }
    batch.sort(() => rand() - 0.5);
    dots.push(...batch);
  };
  const k = W / 640;
  layer(10.2 * k, 4.9 * k, 5.9 * k, 5 * k, () => true, 0.42);                       // lay down the colour: distinct daubs, paper showing between
  layer(6.2 * k, 2.3 * k, 3.1 * k, 3 * k, (x, y, e) => e > 0.1 || rand() < 0.12, 0.4); // texture, mostly where things change
  layer(4 * k, 1.5 * k, 2.1 * k, 1.8 * k, (x, y, e) => e > 0.2, 0.35);              // detail along the edges
  layer(3 * k, 1.1 * k, 1.5 * k, 1.2 * k, (x, y, e) => e > 0.45, 0.3);              // crisp lines (letters, outlines)
  // the paper showing between the dots is the cover's average colour, lightened (so dark covers don't speckle white)
  const [mr, mg, mb] = avg(W / 2, H / 2, W / 2);
  const ground = hex([mr, mg, mb].map((v) => clamp(v * 0.45 + 255 * 0.5)));

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="${ground}"/>${dots
    .map((d) => `<circle cx="${d.cx.toFixed(1)}" cy="${d.cy.toFixed(1)}" r="${d.r.toFixed(1)}" fill="${d.fill}"/>`)
    .join("")}</svg>`;
  return sharp(Buffer.from(svg)).webp({ quality: 86, effort: 5 }).toBuffer();
}

if (testIdx >= 0) {
  const src = args[testIdx + 1], dst = args[testIdx + 2] ?? "pointillism-test.webp";
  await fs.writeFile(dst, await pointillise(await fs.readFile(src)));
  console.log("wrote", dst);
  process.exit(0);
}

/* ── find each cover ── */
const fold = (s) => s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
const COUNTRIES = ["us", "ca", "in", "fr", "jp", "ru", "de", "cn", "gb"];

async function lookup(song) {
  const wantTitle = fold(song.title);
  const wantArtist = fold(song.artist || "");
  let loose = null;
  for (const q of song.queries ?? [song.title]) {
    for (const country of COUNTRIES) {
      const url = `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&media=music&entity=song&limit=10&country=${country}`;
      let json;
      try {
        const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
        if (!res.ok) continue;
        json = await res.json();
      } catch { continue; }
      for (const r of json.results ?? []) {
        const t = fold(r.trackName || "");
        const a = fold(r.artistName || "");
        const titleOk = t.includes(wantTitle) || wantTitle.includes(t);
        const artistOk = !wantArtist || a.includes(wantArtist) || wantArtist.split(" ").some((w) => w.length > 3 && a.includes(w));
        if (titleOk && artistOk) return r;
        if (!loose && titleOk) loose = r;
      }
    }
  }
  return loose;
}

async function main() {
  const songs = JSON.parse(await fs.readFile(songsFile, "utf8"));
  let records = {};
  try { records = JSON.parse(await fs.readFile(dataFile, "utf8")); } catch { /* first run */ }
  await fs.mkdir(outDir, { recursive: true });

  let made = 0;
  for (const song of songs) {
    const file = path.join(outDir, `${song.id}.webp`);
    const have = await fs.access(file).then(() => true, () => false);
    if (have && !FORCE && records[song.id]) continue;
    if (IF_MISSING && have && records[song.id]) continue;
    try {
      const hit = await lookup(song);
      if (!hit) { console.warn(`[records] no match for "${song.title}", skipping`); continue; }
      const artUrl = hit.artworkUrl100.replace(/\/\d+x\d+bb\./, "/1000x1000bb.");
      const img = Buffer.from(await (await fetch(artUrl, { signal: AbortSignal.timeout(20000) })).arrayBuffer());
      const webp = await pointillise(img, 640, hash(song.id));
      await fs.writeFile(file, webp);
      records[song.id] = {
        art: `/records/${song.id}.webp`,
        appleUrl: (hit.trackViewUrl || "").replace(/&uo=\d+/, ""),
        artist: hit.artistName,
        matched: `${hit.trackName}: ${hit.artistName}`,
      };
      made++;
      console.log(`[records] ${song.id}: ${hit.trackName} · ${hit.artistName}`);
    } catch (e) {
      console.warn(`[records] "${song.title}" failed (${e.message}), skipping`);
    }
  }
  await fs.writeFile(dataFile, JSON.stringify(records, null, 2) + "\n");
  console.log(`[records] done: ${made} new, ${Object.keys(records).length}/${songs.length} total`);
}

main().catch((e) => { console.warn("[records] skipped:", e.message); process.exit(0); });
