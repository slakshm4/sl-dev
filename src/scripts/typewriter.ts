// typewriter.ts · the hello that types itself, in a new language each time.
// "shradha lakshman" never changes; only the greeting does. letters appear one at a time,
// rest for ~1600ms with a blinking cursor, then are deleted one letter at a time.
import { motionOff } from "./util";

export const greetings: { t: string; l: string }[] = [
  { t: "hi, my name is", l: "en" },
  { t: "ciao, sono", l: "it" },
  { t: "salut, moi c'est", l: "fr" },
  { t: "hola, me llamo", l: "es" },
  { t: "hallo, ich heiße", l: "de" },
  { t: "नमस्ते, मेरा नाम", l: "hi" },
  { t: "வணக்கம், என் பெயர்", l: "ta" },
  { t: "こんにちは、私の名前は", l: "ja" },
  { t: "你好，我叫", l: "zh" },
  { t: "привет, меня зовут", l: "ru" },
  { t: "안녕하세요, 제 이름은", l: "ko" },
  { t: "salve, nomen mihi est", l: "la" },
];

const PAUSE = 1600;
let token = 0;

const graphemes = (s: string): string[] => {
  const Seg = (Intl as any).Segmenter;
  return Seg ? Array.from(new Seg("und", { granularity: "grapheme" }).segment(s), (x: any) => x.segment) : Array.from(s);
};
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export function initTypewriter() {
  const host = document.querySelector<HTMLElement>("[data-typewriter]");
  if (!host) return;
  const out = host.querySelector<HTMLElement>(".tw-text")!;
  const mine = ++token;
  const alive = () => token === mine && host.isConnected;

  if (motionOff()) {
    out.textContent = greetings[0].t;
    out.lang = "en";
    host.classList.add("is-static");
    return;
  }
  host.classList.remove("is-static");

  (async () => {
    let i = 0;
    while (alive()) {
      const g = greetings[i % greetings.length];
      const letters = graphemes(g.t);
      out.lang = g.l;
      host.classList.remove("is-resting");
      for (let n = 1; n <= letters.length && alive(); n++) {
        out.textContent = letters.slice(0, n).join("");
        await wait(62 + Math.random() * 46);
      }
      host.classList.add("is-resting"); // cursor blinks
      await wait(PAUSE);
      host.classList.remove("is-resting");
      for (let n = letters.length - 1; n >= 0 && alive(); n--) {
        out.textContent = letters.slice(0, n).join("");
        await wait(34);
      }
      await wait(260);
      i++;
      if (motionOff()) { out.textContent = greetings[0].t; host.classList.add("is-static"); return; }
    }
  })();
}
