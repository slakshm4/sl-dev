# redesign notes

run it: `npm install` then `npm run dev`. the first run also asks apple music (itunes search) for each song's cover and turns it into pointillism art (`scripts/make-records.mjs`, output goes to `public/records/` and `src/data/records.json`). if you're offline it quietly skips and the record just shows the plain label. run it by hand any time with `npm run records`.

no extra npm packages are needed: astro is the only dependency. the north star map's drawing library (mermaid) is a single file in `public/vendor/`.

pushing to `main` deploys the site through `.github/workflows/deploy.yml` (github → settings → pages → source: **github actions**).

## where things live

| what | where |
| --- | --- |
| page shell, fonts, theme + motion script | `src/layouts/Layout.astro` |
| nav, tooth, footer, bongo cat | `src/components/` |
| home page (hero, typewriter, polaroids) | `src/pages/index.astro` |
| the eight polaroid projects + their own pages (write-ups, pictures, links) | `src/data/projects.ts` → `src/pages/projects/[slug].astro` |
| north star map content (nodes + links), also feeds the outline list | `src/data/northstar.ts` |
| cv content shown on /experience | `src/data/cv.ts` |
| notebook tabs (words · case studies · ephemera · trials) | `src/data/notebook.ts` |
| **case studies, ephemera and trials**: one article per card | `src/data/articles.ts` |
| **words drawers**: reflections, annotations on life, loose threads, other brain debris, poems | `src/data/writing.ts` |
| **songs** (seven lyric sheets, with footnotes) | `src/data/lyrics.ts` |
| **prose** (essays + short stories) | `src/data/prose.ts` |
| **(dé)générescence** (the five stereo poems) | `src/data/poems.ts` |
| shapes shared by those data files | `src/data/writing-types.ts` |
| pages for drawers and pieces | `src/pages/notebook/[drawer]/index.astro` and `[piece].astro` |
| the little text markup used inside all of the above | `src/lib/text.ts` |
| ten songs on the say-hi record shelf | `src/data/songs.json` |
| email / phone / instagram / linkedin / two truths | top of `src/pages/say-hi.astro` |
| colours, cursor, torn paper, tape | `src/styles/global.css`, `src/styles/paper.css` |
| animation + interaction code | `src/scripts/` |
| mermaid (north star map), self-hosted | `public/vendor/mermaid.min.js` |

## writing text: the mini-markup

every string in `body` (and every project `story`) is one block. inside a string:

- `_italic_` or `*italic*`, `**bold**`
- `[a link](/somewhere-on-this-site)` stays on the site; `[a link](https://example.com)` opens in a new tab
- a block that starts with `## ` is a heading, `### ` a smaller heading, `> ` a pull quote, `- ` a bullet list, `1. ` a numbered list
- `![describe the picture](/images/file.webp "caption")` is a picture (put the file in `public/images/`)
- a block that starts with `~> ` is a hand-drawn arrow pointing at a line of handwriting; links inside it work (`~> an uprising is on the horizon. [which side are you on?](https://…)`)
- `word[^1]` puts a small footnote number after the word. the notes themselves go in the piece's `footnotes: [...]` list (first string = note 1) and appear under the words with a ↩ link back (see `the-trees-know-your-name` in `lyrics.ts`)
- a piece can also have `link: { label: "try it!", href: "https://…" }`, which is the pill button under the words
- anything else is a paragraph; `\n` makes a line break inside it

text is escaped first, so a stray `<` or `&` can't break a page.

## adding pieces

- **an essay, story or reflection**: copy a piece in `prose.ts` / `writing.ts`, give it a new `slug` (the url), put the words in `body`. `tags: ["essay"]` / `["short story"]` / `["free verse"]` make the little pills. `pinned: true` keeps it at the top of its drawer.
- **a case study, ephemera item or trial**: copy an object in `articles.ts`. it appears on the notebook page by itself and opens its own article page. replace the placeholder `body`, then delete `draft: true` so the "in the drafts" stamp goes away.
- **an anthology** (like (dé)générescence): the anthology piece lists its parts (`parts: [slugs]`) and each part says `partOf: "<anthology slug>"`.
- **a stereo poem**: `stereo.pairs` is `[left ear, right ear]` line by line, and `stereo.translation` is the same in english. lines inside quote marks are the english voice and are set in italics automatically.

## the lowercase rule (and its exceptions)

the site is lowercase on purpose, and since this round **nothing is forced to lowercase by css any more**: what you type is what shows. the rule i applied everywhere:

- lowercase: everything, including the first word of a sentence, titles, headings, months, days, "i", and abbreviations of ordinary words (hiv, ai, cd, cv, pdf, mp3).
- capitalised: names of people (Shradha Lakshman, Carabelli), places (Vancouver, Northern BC, Robson Square), organisations and brands (UBC, UNBC, ADEA, Union Gospel Mission, Figma, YouTube), languages and nationalities (French, Tamizh, Indian), the names of other people's works inside running text, and a few proper-noun terms (Nazi, Soviet, the Cold War, the Anthropocene).
- your own titles (project names, case studies, pieces) stay lowercase, with only the names inside them capitalised.
- dashes: em dash with no spaces for asides (`like this—like this`), en dash with no spaces for ranges (`2024–present`, `grades 4–12`), hyphens for compound words, straight quotes, and an oxford comma.

## two truths and a lie: the guess counter

after someone taps "that's the lie", each note shows how many people guessed it ("guessed by 91% of people"). it is an anonymous tally of three numbers kept by [abacus](https://abacus.jasoncameron.dev), a free counting service that needs no account. nothing about the visitor is sent, and each browser counts once (remembered in localstorage). percentages only appear after 5 guesses. to turn it off, set `TALLY = ""` in `src/scripts/records.ts`; to switch to your own counter later, change `TALLY` / `NS` and the two `fetch`es there.

## the tooth

the tooth docked in the nav is a link home on every page: the tooth itself is a floating picture that can't take clicks, so an invisible link (`.tooth-link` in `src/components/Nav.astro`) sits right under it. the "home" word in the nav stays the keyboard route.

## phones: lighter animations

touch devices (coarse pointers) get a lighter site: no page-transition snapshots (pages simply load), simpler torn paper edges, no grain layer, and no endless looping animations. the play/pause button in the nav pauses or resumes all animation on any device; it's remembered, and defaults to paused if the device asks for reduced motion.

## things to check / fill in

- little town: the stamp "july 2026 · Robson Square, Vancouver" was inferred from your note; change `year` / `place` in `projects.ts` if it's wrong.
- case studies, ephemera and trials are mostly drafts with a short placeholder (sitarify and what species are you are written up now). replace the rest as you write them.
- the experience page: a cv line links to its polaroid page by adding `href: "/projects/<slug>"` to its entry in `cv.ts` (done for the che role, the roadshow and the Canadian Oral Health Summit).
- `lie` in `say-hi.astro` is `null` on purpose. set it to 0, 1 or 2 if you want the buttons to reveal the answer.
- the molar is labelled fdi #26 (upper left first molar). universal numbering calls it #14, so double-check the label you want.
- the old versions of the files that were replaced are in `_before-redesign/` (not committed to git). delete the folder whenever you're happy.
