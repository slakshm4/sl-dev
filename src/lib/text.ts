// text.ts · the tiny bit of markup used inside the words on this site. no libraries, nothing to install.
//
//   _italic_  or  *italic*      → italic
//   **bold**                    → bold
//   ==highlight==               → a highlighter swipe that draws itself in as it scrolls into view
//   [label](/some/page)         → link on this site;  [label](https://…) opens in a new tab
//   word[^1]                    → a small footnote number (the notes themselves go in a piece's `footnotes` list)
//
// block-level (one string in a `body` array = one block):
//   "## a heading"   "### a smaller heading"   "> a pull quote"
//   "- one\n- two"   (bullets)      "1. one\n2. two"   (numbered)
//   "![alt text](/images/file.webp "caption")"   (picture)
//   "~> some words [and a link](https://…)"      (a hand-drawn arrow pointing at a line of handwriting)
//   anything else    → a paragraph (use "\n" inside it for a line break)
//
// everything is html-escaped first, so a stray < or & in your text can't break the page.

export const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const safeHref = (h: string) => (/^(\/|#|https:\/\/|mailto:)/.test(h) ? h : "#");

/** bold + italics only (also used inside link labels) */
function emph(s: string): string {
  s = s.replace(/==(?=\S)([^=\n]+?)(?<=\S)==/g, '<span class="hl">$1</span>');
  s = s.replace(/\*\*(?=\S)([^*\n]+?)(?<=\S)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/(^|[\s(";'—-])_(?=\S)([^_\n]+?)(?<=\S)_(?=$|[\s.,;:!?)"'—-])/g, "$1<em>$2</em>");
  s = s.replace(/(^|[\s(";'—-])\*(?=\S)([^*\n]+?)(?<=\S)\*(?=$|[\s.,;:!?)"'—-])/g, "$1<em>$2</em>");
  return s;
}

/** inline markup → html string (use with set:html) */
export function inline(src: string): string {
  let s = esc(src);
  // footnote numbers first: word[^1] → a little raised number that jumps to the note at the bottom
  const marks: string[] = [];
  s = s.replace(/\[\^(\d+)\]/g, (_m, n: string) => {
    marks.push(`<sup class="fnref"><a href="#fn-${n}" id="fnref-${n}" aria-label="footnote ${n}">${n}</a></sup>`);
    return `\u0001${marks.length - 1}\u0001`;
  });
  // links next, so the underscores / asterisks inside a url are left alone
  const links: string[] = [];
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label: string, href: string) => {
    const h = safeHref(href.replace(/&amp;/g, "&"));
    const ext = /^https:\/\//.test(h);
    links.push(
      `<a href="${esc(h)}"${ext ? ' target="_blank" rel="noopener"' : ""}>${emph(label)}${ext ? '<span class="sr-only"> (opens in a new tab)</span>' : ""}</a>`,
    );
    return `\u0000${links.length - 1}\u0000`;
  });
  s = emph(s);
  s = s.replace(/\u0000(\d+)\u0000/g, (_m, i: string) => links[Number(i)]);
  s = s.replace(/\u0001(\d+)\u0001/g, (_m, i: string) => marks[Number(i)]);
  // an em dash never starts a line (word joiner before it) but the line may still break after it (zero-width space)
  s = s.replace(/([^\s>])—(?=[^\s<])/g, "$1\u2060—\u200b");
  return s;
}

/** the same, with the markup stripped: for <title>, meta tags, aria-labels */
export function plain(src: string): string {
  return src
    .replace(/^~> /, "")
    .replace(/\[\^\d+\]/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/==(?=\S)([^=\n]+?)(?<=\S)==/g, "$1")
    .replace(/(^|[\s("'])_([^_\n]+)_(?=$|[\s.,;:!?)"'])/g, "$1$2")
    .replace(/\*([^*\n]+)\*/g, "$1");
}

export type Block =
  | { t: "p"; html: string }
  | { t: "h2" | "h3"; html: string }
  | { t: "quote"; html: string }
  | { t: "cta"; html: string }
  | { t: "ul" | "ol"; items: string[] }
  | { t: "img"; src: string; alt: string; cap?: string };

export function toBlocks(strs: string[]): Block[] {
  return strs.map((b): Block => {
    let m: RegExpExecArray | null;
    if ((m = /^(#{2,3}) (.+)$/s.exec(b))) return { t: m[1].length === 2 ? "h2" : "h3", html: inline(m[2]) };
    if ((m = /^> (.+)$/s.exec(b))) return { t: "quote", html: inline(m[1]) };
    if ((m = /^~> (.+)$/s.exec(b))) return { t: "cta", html: inline(m[1]) };
    if ((m = /^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/.exec(b))) return { t: "img", src: m[2], alt: plain(m[1]), cap: m[3] ? inline(m[3]) : undefined };
    const lines = b.split("\n");
    if (lines.length > 0 && lines.every((l) => /^- /.test(l))) return { t: "ul", items: lines.map((l) => inline(l.slice(2))) };
    if (lines.length > 0 && lines.every((l) => /^\d+\. /.test(l))) return { t: "ol", items: lines.map((l) => inline(l.replace(/^\d+\. /, ""))) };
    return { t: "p", html: inline(b) };
  });
}

/** rough reading time for the little "n min read" stamp */
export function readTime(strs: string[]): string {
  const words = strs.join(" ").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 210))} min read`;
}

/**
 * stereo poems: which lines are the english voice? (a line that opens a quote, and every line until the quote closes)
 * `lines` is the poem in reading order: left-ear line, right-ear line, left, right…
 */
export function voiceFlags(lines: string[]): boolean[] {
  let inQ = false;
  return lines.map((l) => {
    if (/^["“]/.test(l.trim())) inQ = true;
    const flag = inQ;
    if (/["”][^\w"”]*$/.test(l.trim()) && !/^["“][^"”]*$/.test(l.trim())) inQ = false;
    return flag;
  });
}
