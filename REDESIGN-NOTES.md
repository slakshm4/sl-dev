# redesign notes

run it: `npm install` then `npm run dev`. the first run also asks apple music (itunes search) for each song's cover and turns it into pointillism art (`scripts/make-records.mjs`, output goes to `public/records/` and `src/data/records.json`). if you're offline it quietly skips and the record just shows the plain label. run it by hand any time with `npm run records`.

no extra npm packages are needed: astro is the only dependency. the north star map's drawing library (mermaid) is a single file in `public/vendor/`.

## where things live

| what | where |
| --- | --- |
| page shell, fonts, theme + motion script | `src/layouts/Layout.astro` |
| nav, tooth, footer, bongo cat | `src/components/` |
| home page (hero, typewriter, polaroids) | `src/pages/index.astro` |
| the eight polaroid projects + their own pages | `src/data/projects.ts` → `src/pages/projects/[slug].astro` |
| north star map content (nodes + links), also feeds the outline list | `src/data/northstar.ts` |
| cv content shown on /experience | `src/data/cv.ts` |
| notebook cards (words · case studies · ephemera · trials) | `src/data/notebook.ts` |
| **your writing** (reflections, prose, annotations on life, loose threads, other brain debris, poems, songs) | `src/data/writing.ts` |
| pages for those drawers and pieces | `src/pages/notebook/[drawer]/index.astro` and `[piece].astro` |
| ten songs | `src/data/songs.json` |
| email / phone / instagram / linkedin / two truths | top of `src/pages/say-hi.astro` |
| colours, cursor, torn paper, tape | `src/styles/global.css`, `src/styles/paper.css` |
| animation + interaction code | `src/scripts/` |
| mermaid (north star map), self-hosted | `public/vendor/mermaid.min.js` |

## adding your own writing

open `src/data/writing.ts`. the top of the file explains everything. in short: each drawer has a list of `pieces`. copy one of the sample pieces, give it a new `slug` (that becomes the url: `/notebook/<drawer>/<slug>`), put your words in `body`, pick up to four `stickers`, and delete `sample: true` to remove the "sample" stamp. each drawer already has its own paper, frame and typography (lined notebook page, newsprint with highlighter, scraps, verse, typewritten lyric sheet) so new pieces match the rest of the site automatically.

## things to check / fill in

- placeholder titles in `projects.ts`: absence, in two languages · a little town for big ideas · classified records · reclaimed history. rename freely (the slug is the url).
- adea fellowship: the cv gives no dates, so none are shown.
- `lie` in `say-hi.astro` is `null` on purpose. set it to 1, 2 or 3 if you want the buttons to reveal the answer.
- most notebook case studies, trials and ephemera are marked `draft` ("in the drafts") until you write them. delete `status: "draft"` when one is live, and add an `href`.
- the molar is labelled fdi #26 (upper left first molar). universal numbering calls it #14, so double-check the label you want.
- the old versions of the files that were replaced are in `_before-redesign/` (not committed to git). delete the folder whenever you're happy.
