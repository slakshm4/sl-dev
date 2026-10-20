// ─────────────────────────────────────────────────────────────
//  projects.ts  ·  the eight polaroids on the home page + each project's own page
//  edit titles / years / places here. add `image: "/images/xyz.webp"` to swap a
//  paper scrap for a real photo or screenshot (put the file in /public/images).
// ─────────────────────────────────────────────────────────────

export type PaperKind =
  | "floral" | "newsprint" | "grid" | "kraft"
  | "gingham" | "ruled" | "butter" | "check";

export type Project = {
  slug: string;
  title: string;
  /** the handwritten line under the polaroid (your words) */
  note: string;
  year?: string;
  place?: string;
  paper: PaperKind;
  sticker: string;
  image?: string;
  /** paragraphs shown on the project page */
  story: string[];
  role?: string;
  links?: { label: string; href: string }[];
  /** true once the full write-up exists */
  written?: boolean;
};

export const projects: Project[] = [
  {
    slug: "bilingual-inquiry",
    title: "absence, in two languages",
    note: "a bilingual inquiry into absence, memory, and loss through the fragmentation of language.",
    paper: "newsprint",
    sticker: "ghost",
    story: [
      "a bilingual inquiry into absence, memory, and loss through the fragmentation of language.",
    ],
  },
  {
    slug: "eureka-questscapes",
    title: "eureka: questscapes",
    note: "pioneering oral health–integrated HIV education for youth through bilingual, accessible play.",
    year: "may 2024 – present",
    place: "vancouver, bc",
    paper: "floral",
    sticker: "tooth",
    role: "founder",
    written: true,
    story: [
      "eureka: questscapes is a gamified, web-based hiv education platform for youth ages 15–24 that weaves sexual-health and oral-health literacy together. interactive storytelling, immersive gameplay and trivia-based combat inside a classic 2d platformer let players build health literacy, confront stigma and practise preventive behaviours.",
      "it grew out of a rapid scoping review of digital hiv interventions, which shaped both the content and the product design. i translate academic evidence into accessible, youth-facing learning content, with attention to stigma reduction and inclusive communication.",
      "the project has secured more than $2,000 in seed funding and awards, including an $800 bursary from letsstopaids.",
    ],
  },
  {
    slug: "little-town",
    title: "a little town for big ideas",
    note: "found a little town for big ideas, from its atmosphere to its music.",
    paper: "gingham",
    sticker: "star",
    story: [
      "found a little town for big ideas, from its atmosphere to its music.",
    ],
  },
  {
    slug: "classified-records",
    title: "classified records",
    note: "classified records from a speculative universe built around the ethics of paternalistic genetic intervention under conditions of ecological colonialism.",
    paper: "grid",
    sticker: "eye",
    story: [
      "classified records from a speculative universe built around the ethics of paternalistic genetic intervention under conditions of ecological colonialism.",
    ],
  },
  {
    slug: "adea-fellowship",
    title: "fellowship evaluation",
    note: "evaluation of a dental fellowship analyzing novice educator development through curriculum delivery experiences in preclinical dentistry.",
    paper: "ruled",
    sticker: "sparkle",
    role: "adea academic dental careers fellowship program fellow",
    written: true,
    story: [
      "an evaluation of a dental fellowship, looking at how novice educators develop through delivering curriculum in preclinical dentistry.",
      "as an adea academic dental careers fellowship program fellow, i co-facilitated motivational interviewing instruction and interprofessional orientation. i presented the evaluation of fellowship activities and learner outcomes as a poster and oral presenter at the canadian oral health summit.",
    ],
  },
  {
    slug: "roadshow",
    title: "north coast healthcare travelling roadshow",
    note: "delivering dynamic oral health workshops to Northern BC students through UNBC's North Coast Healthcare Travelling Roadshow.",
    year: "may 2025",
    place: "northern bc",
    paper: "kraft",
    sticker: "butterfly",
    role: "dental hygiene representative",
    written: true,
    story: [
      "as the dental hygiene representative for unbc's 2025 north coast healthcare travelling roadshow, i delivered interactive oral-health workshops to students in grades 4–12 across northern bc, representing the dental hygiene profession and the ubc faculty of dentistry.",
      "the roadshow exists to expose students to different healthcare careers. i focused on the oral–systemic link and on dental hygiene as a primary care profession, tailoring each session with educators and community leaders to spark curiosity and confidence.",
    ],
    links: [
      { label: "read the feature article", href: "https://terracestandard.com/2025/05/08/students-urged-to-consider-health-careers/" },
      { label: "about the roadshow (unbc)", href: "https://www.unbc.ca/healthcare-travelling-roadshow" },
    ],
  },
  {
    slug: "che-project",
    title: "accessible interprofessional curricula",
    note: "an accessibility-first redesign of interprofessional health curricula, co-authoring a primary faculty guide and refining national competency frameworks for 2,000+ UBC students.",
    year: "2025",
    place: "ubc health, vancouver",
    paper: "check",
    sticker: "heart",
    role: "collaborative health education project assistant",
    written: true,
    story: [
      "at ubc health i audited accessibility and revised curriculum materials for clarity, usability and consistency across 2,000+ learners in 14 health programs.",
      "i co-authored the interprofessional education facilitator guide (3rd ed.), contributed to orientation materials aligned with institutional standards, designed a simplified, icon-based version of the cihc competency framework, and served as french language editor for its référentiel des compétences, strengthening the national bilingual standard.",
    ],
    links: [
      { label: "ipe facilitator guide (3rd ed.)", href: "https://health.ubc.ca/media/file/ipe-facilitator-guide-third-editionpdf" },
    ],
  },
  {
    slug: "reclaimed-history",
    title: "reclaimed history",
    note: "tracing the ideological theft and deliberate distortion of ancient Indian heritage and historiography to validate totalitarian rule.",
    paper: "butter",
    sticker: "moon",
    story: [
      "tracing the ideological theft and deliberate distortion of ancient indian heritage and historiography to validate totalitarian rule.",
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
