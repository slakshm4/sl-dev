// ─────────────────────────────────────────────────────────────
//  projects.ts  ·  the eight polaroids on the home page + each project's own page
//  edit titles / years / places here (names of places keep their capitals: "Vancouver, BC"). add `image: "/images/xyz.webp"` to swap a
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
  /** paragraphs shown on the project page. the mini-markup from src/lib/text.ts works here (_italic_, [links](/page), "## heading",
   *  "> pull quote", and pictures: '![alt text](/images/file.webp "caption")') */
  story: string[];
  role?: string;
  /** little rubber stamps next to the year / place ("cd in the works") */
  badges?: string[];
  /** buttons under the story. a link that starts with "/" stays on this site; https:// opens in a new tab */
  links?: { label: string; href: string }[];
  /** posts from the UBC e-portfolio that go with this project: keys from src/data/eportfolio.ts (they show up as little pills) */
  posts?: string[];
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
    badges: ["cd in the works", "mp3 coming soon"],
    written: true,
    // the write-up for (dé)générescence: five poems in French with an English voice in the other ear
    story: [
        "there is a version of this post that begins with an explanation. and it fell so flat it's not even funny, so i'm going to try to avoid that.",
        "what i'll say instead is that this project started as a poem and became a question about what happens to things when you try to preserve them— whether the act of preservation is itself a kind of damage, whether the copy ever really holds what the original had, whether the body keeps what the archive loses or the other way around. i kept pulling that thread and eventually i had five poems, and an intentionally degraded cd that i think is quite possibly the most honest thing i've made.",
        "the through line of this project is loss, which is not a very interesting thing to say about anything. loss is the through line of most things. what i was more specifically interested in was the way loss encodes itself— not in memory exactly, which is famously unreliable, but in the body, in the material, in whatever substrate the experience left its mark on before the mind had a chance to decide whether to keep it.",
        "the poems, eventually, became a way of approaching things that cannot be recovered or undone. they are clinical in places, intimate in others, and often deliberately affectless. there is something about trying to describe an irreparable thing with precision that interests me. the silence is load-bearing. the body was never made to respond to top-down erasure commands.",
        "there are five poems, each written in free verse because i'm too lazy to rhyme. also, i think it sounds better. they are in French, with an embedded English voice— a letter written in clandestine, a lost-then-found document, fragments of strings of words overheard from some undefined coordinate— that runs through each one in italics, split between the ears, answering the French obliquely rather than translating it. the French and the English never say the same thing. they mourn the same thing from different angles, and the stereo field is where the two accounts touch.",
        "the poems are about, in order: someone stored in another person's silence before they had learned to make their own. the mark made by someone who has since forgotten the making of it. that which was given back before it could be given anything, living entirely in the future tense, or suspended in the conditional. a society that sorts its casualties by acceptability. and the self as clay— shaped, cracked, reshaped, collapsing. cyclical, certainly. a bit cynical, perhaps. forevermore.",
        "i wrote them in an 18th-century French register because that century knew something about the gap between formal surface and interior devastation that i find useful. Laclos. Rousseau's Rêveries. the epistolary form as a way of addressing someone who may never read what you wrote. vous instead of tu— the formal second person that keeps tenderness at a careful distance, which is sometimes the only distance at which tenderness is survivable.",
        "the degradation is deliberate and is not a metaphor, or not only a metaphor. each poem is recorded, then that recording is recorded, then that recording is recorded again, until you have three or four generations of copy, each one accumulating the noise of its own transmission— this includes things like frequency loss. for those of you who are unfamiliar, as i was 12-ish hours ago before my internet deep dive into yet another rabbit hole, the high end going first, then the mid, then whatever's left. the voice becoming a voice becoming a smear of a voice becoming… something. you get the point.",
        "> you don't lose the original so much as you lose access to it under layers of every time you've remembered it since.",
        "this is what memory actually does, i think. not the dramatic erasure but the sort of slow accumulation of interference. you don't lose the original so much as you lose access to it under layers of every time you've remembered it since. the copy is all you have and the copy is already a copy of a copy of a copy of something you can no longer verify because your perspective can never be objective, can never be true to the sequence of events in reality.",
        "the decay isn't uniform across the project. the poems degrade the old way, re-recorded generation by generation until the voice is almost more noise floor than person. it felt right that the two voices wouldn't share the same kind of dying.",
        "the binaural split means the poem only fully assembles if you have both earbuds in. each ear alone gets fragments, half-grammar, impressions. both together and a sentence arrives. i liked the idea that the complete version requires a kind of presence— that you have to be fully there, both sides, to get the whole thing— and that even then what you get is a degraded archive of something that might have been clearer, once.",
        "the background noise is different for each poem. i'm still deciding exactly what goes where. transit announcements. the specific frequency of a room that is trying to be quiet and failing. cicadas recorded in Japan— these will likely be taken from royalty-free repositories online, as i have, regrettably, never been to Japan. these sfx run underneath both channels equally, which ties the ears together before the words start— the listener instinctively wants to merge the tracks, which is the condition the poems are trying to describe.",
        "i… don't know entirely why i made this. and no, that's not false modesty (something i am often guilty of anyway, but that's beside the point), it's just that the poems came first and the project grew around them the way a project does when you're not quite ready to be finished with something. i kept finding new ways to lose the same things.",
        "what happens is the poem. what happens is the voice, getting further from the original with every generation.",
        "i think that's enough. the cd is in the works, and a copy in .mp3 is coming soon. i hope you'll listen with both earbuds in.",
      ],
    links: [{ label: "read the poems: (dé)générescence", href: "/notebook/poems/degenerescence" }],
  },
  {
    slug: "eureka-questscapes",
    title: "eureka: questscapes",
    note: "pioneering oral-health-integrated hiv education for youth through bilingual, accessible play.",
    year: "may 2024–present",
    place: "Vancouver, BC",
    paper: "floral",
    sticker: "tooth",
    role: "founder",
    posts: ["sel-hiv-oralhealth"],
    written: true,
    story: [
      "eureka: questscapes is a gamified, web-based hiv education platform for youth ages 15–24 that weaves sexual-health and oral-health literacy together. interactive storytelling, immersive gameplay, and trivia-based combat inside a classic 2d platformer let players build health literacy, confront stigma, and practise preventive behaviours.",
      "it grew out of a rapid scoping review of digital hiv interventions, which shaped both the content and the product design. i'm currently finalizing the manuscript for that review, which found that no online gamified hiv education platform touches on oral health at all— a glaring and significant gap, and the one eureka: questscapes sets out to fill. i translate academic evidence into accessible, youth-facing learning content, with attention to stigma reduction and inclusive communication.",
      "the project has secured more than $2,000 in seed funding and awards, including an $800 bursary from LetsStopAIDS.",
    ],
  },
  {
    slug: "little-town",
    title: "a little town for big ideas",
    note: "found a little town for big ideas, from its atmosphere to its music.",
    year: "july 2026",
    place: "Robson Square, Vancouver",
    paper: "gingham",
    sticker: "star",
    written: true,
    story: [
        "this july, i got to be part of Atelier Town at Robson Square— a day full of people sharing the strange, ambitious things they've been quietly making.",
        "i demoed a large world-building poster for _The Providence Duology_, the two-book story i'm writing: _Forsaken_ and _Redeemer_. it was really special to put Elysia— an empire built on borrowed time— into the world and talk through the systems, tensions, and tiny details that have been living in my notes for so long. i also made a personality quiz that sorts you into species based on your choices, which you can find [here](/notebook/case-studies/what-species-are-you).",
        "![the trifold poster for The Providence Duology: a dark starfield with the title, a map of six domains orbiting a red giant, a character web, and a trait system](/images/providence-duology-poster.webp \"the poster i demoed: _The Providence Duology_, on trifold bristol board.\")",
        "i also helped organize the event, especially the music demo: a group of musicians came together to perform a prepared song on stage, then opened things up into a jam session. watching something carefully made turn into something shared and spontaneous felt very Atelier core.",
        "![a group photo of everyone at Atelier Town, on stage in front of the projected Atelier Town screen, some holding up signs](/images/atelier-town.webp \"everyone at Atelier Town.\")",
        "infinitely grateful to everyone who brought their work, curiosity, and generosity to make our little town feel alive.",
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
    note: "evaluation of a dental fellowship analysing novice educator development through curriculum delivery experiences in preclinical dentistry.",
    year: "june 2026",
    place: "Saskatoon, SK",
    paper: "ruled",
    sticker: "sparkle",
    role: "ADEA academic dental careers fellowship program fellow",
    posts: ["adea-adcfp", "mi-evidence-informed-dh-cc"],
    written: true,
    story: [
      "an evaluation of a dental fellowship, looking at how novice educators develop through delivering curriculum in preclinical dentistry.",
      "as an ADEA academic dental careers fellowship program fellow, i co-facilitated motivational interviewing instruction and interprofessional orientation. i presented the evaluation of fellowship activities and learner outcomes as a poster and oral presenter at the Canadian Oral Health Summit.",
      '![the poster, titled retrospective evaluation of a dental teaching fellowship program, with sections on the introduction, methods, data analysis, results, limitations, and conclusion](/images/adea-poster.webp "the poster: a retrospective evaluation of a dental teaching fellowship program.")',
      '![Shradha standing next to the printed poster on its easel, smiling](/images/adea-me-with-poster.webp "me with the poster.")',
    ],
  },
  {
    slug: "roadshow",
    title: "North Coast healthcare travelling roadshow",
    note: "delivering dynamic oral health workshops to Northern BC students through UNBC's North Coast healthcare travelling roadshow.",
    year: "may 2025",
    place: "Northern BC",
    paper: "kraft",
    sticker: "butterfly",
    role: "dental hygiene representative",
    posts: ["decolonizing-success"],
    written: true,
    story: [
      "as the dental hygiene representative for UNBC's 2025 North Coast healthcare travelling roadshow, i delivered interactive oral-health workshops to students in grades 4–12 across Northern BC, representing the dental hygiene profession and the UBC Faculty of Dentistry.",
      "the roadshow exists to expose students to different healthcare careers. i focused on the oral-systemic link and on dental hygiene as a primary care profession, tailoring each session with educators and community leaders to spark curiosity and confidence.",
    ],
    links: [
      { label: "read the feature article", href: "https://terracestandard.com/2025/05/08/students-urged-to-consider-health-careers/" },
      { label: "about the roadshow (UNBC)", href: "https://www.unbc.ca/healthcare-travelling-roadshow" },
    ],
  },
  {
    slug: "che-project",
    title: "accessible interprofessional curricula",
    note: "an accessibility-first redesign of interprofessional health curricula, co-authoring a primary faculty guide and refining national competency frameworks for 2,000+ UBC students.",
    year: "2025",
    place: "UBC Health, Vancouver",
    paper: "check",
    sticker: "heart",
    role: "collaborative health education project assistant",
    posts: ["ipe-2023-2024-reflection", "y2-patchwork-summary"],
    written: true,
    story: [
      "at UBC Health i audited accessibility and revised curriculum materials for clarity, usability, and consistency across 2,000+ learners in 14 health programs.",
      "i co-authored the interprofessional education facilitator guide (3rd ed.), contributed to orientation materials aligned with institutional standards, designed a simplified, icon-based version of the CIHC competency framework, and served as French language editor for its référentiel des compétences, strengthening the national bilingual standard.",
    ],
    links: [
      { label: "ipe facilitator guide (3rd ed.)", href: "https://health.ubc.ca/media/file/ipe-facilitator-guide-third-editionpdf" },
    ],
  },
  {
    slug: "reclaimed-history",
    title: "Hitler, Himmler, and the Nazi appropriation of ancient India",
    note: "tracing the ideological theft and deliberate distortion of ancient Indian heritage and historiography to validate totalitarian rule.",
    paper: "butter",
    sticker: "moon",
    written: true,
    story: [],
    links: [{ label: "read the essay", href: "/notebook/prose/nazi-appropriation-of-ancient-india" }],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
