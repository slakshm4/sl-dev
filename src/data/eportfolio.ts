// ─────────────────────────────────────────────────────────────
//  eportfolio.ts  ·  every post on the UBC e-portfolio (blogs.ubc.ca/ydofelineshavecanines), in one place.
//  the rest of the site points at a post by its `key` (the last bit of its url), e.g. posts: ["decolonizing-success"] in cv.ts / projects.ts / explore.astro.
//  to add a new post: copy a line below, change the key, the date and the label (lowercase, like everything else; names and acronyms keep their capitals).
//  the little pill (src/components/PostLinks.astro) opens the post in a new tab.
// ─────────────────────────────────────────────────────────────

export const eportfolioHome = "https://blogs.ubc.ca/ydofelineshavecanines/";

export type Post = { key: string; label: string; href: string };

const p = (key: string, path: string, label: string): Post => ({ key, label, href: `${eportfolioHome}${path}/` });

export const posts: Post[] = [
  p("sel-hiv-oralhealth", "2026/04/10/sel-hiv-oralhealth", "the role of dental hygiene in social entrepreneurship for hiv and oral health"),
  p("adea-adcfp", "2026/04/10/adea-adcfp", "retrospective evaluation of a dental teaching fellowship program"),
  p("dh-chx-prescription-rights", "2026/04/10/dh-chx-prescription-rights", "an examination of the dental hygiene scope of practice in BC"),
  p("my-first-ever-digital-scan", "2026/04/10/my-first-ever-digital-scan", "a lesson in embracing emerging technologies"),
  p("oralhealth-in-unexpected-spaces", "2026/04/10/oralhealth-in-unexpected-spaces", "oral health in unexpected spaces"),
  p("prevention-with-impact-ugm", "2026/04/10/prevention-with-impact-ugm", "prevention with impact: UGM"),
  p("carrying-confidentiality-forward", "2026/04/10/carrying-confidentiality-forward", "carrying confidentiality forward"),
  p("redefining-courage", "2026/04/10/redefining-courage", "redefining courage"),
  p("decolonizing-success", "2025/12/05/decolonizing-success", "how oral health outreach decolonized my idea of success"),
  p("ltc-raisingthebar", "2025/12/05/ltc-raisingthebar", "raising the bar for oral hygiene in long-term care"),
  p("oral-cancer-screening-clinic", "2025/12/04/oral-cancer-screening-clinic", "advanced EO/IO skills at a community oral cancer screening clinic"),
  p("ubc-spea-inaugural-dh-rep", "2025/12/03/ubc-spea-inaugural-dh-rep", "pioneering the dental hygiene role in student professionalism & ethics"),
  p("dh-epinephrine-prescription-rights", "2025/12/03/dh-epinephrine-prescription-rights", "BC dental hygienists' authority to prescribe epinephrine-containing local anesthetics: an action plan"),
  p("mi-evidence-informed-dh-cc", "2025/12/03/mi-evidence-informed-dh-cc", "motivational interviewing as a lens on evidence-informed professionalism in dental hygiene practice"),
  p("de-escalation-in-patient-care", "2025/12/03/de-escalation-in-patient-care", "UGM New West: what one escalated visit taught me about professional standards"),
  p("y2-patchwork-summary", "2024/03/23/y2-patchwork-summary", "2023/2024 patchwork summary reflection"),
  p("ipe-2023-2024-reflection", "2024/02/05/ipe-2023-2024-reflection", "IPE 2023/2024 reflection"),
];

export const getPost = (key: string): Post | undefined => posts.find((x) => x.key === key);
