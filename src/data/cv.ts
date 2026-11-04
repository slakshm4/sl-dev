// ─────────────────────────────────────────────────────────────
//  cv.ts  ·  everything on /experience.   source of truth: the cv pdf
//  (Shradha_Lakshman_CV_HPE_2026_final.pdf, kept at /public/shradha-lakshman-cv.pdf)
//  swap the pdf file whenever you have the 1-page version; the link stays the same.
// ─────────────────────────────────────────────────────────────

export const cvHref = "/shradha-lakshman-cv.pdf";

export const profile =
  "i'm a licensed dental hygienist (UBC, 2026) who also teaches and builds. i've worked on health-science curriculum, run oral-health workshops in the community, mentored students, and made an hiv education game. i like turning clinical evidence into things people actually want to use, and i'm teaching myself to code with ai tools so i can prototype them.";

export const strengths = [
  "teaching: co-taught motivational interviewing at UBC",
  "accessibility: audited course materials used by 2,000+ students",
  "research: scoping review on digital hiv education",
  "building: eureka: questscapes, contextomy, sitarify",
];

export type Job = { role: string; org: string; when: string; status?: "current" | "completed"; bullets: string[]; /** the role links to its polaroid project page */ href?: string; /** underline the role in lilac (no link) */ underline?: boolean; /** e-portfolio posts that go with this role (keys from eportfolio.ts) */ posts?: string[] };

export const jobs: Job[] = [
  {
    role: "licensed dental hygienist (part-time)",
    underline: true,
    org: "Joyce Wu Dental, Richmond, BC",
    when: "aug 2026–present",
    status: "current",
    bullets: [
      "i provide preventive oral healthcare in a clinical dental setting, and explain to each patient what's going on in their mouth and what to do about it.",
      "i keep the clinical documentation and work with the rest of the dental team.",
    ],
  },
  {
    role: "operations executive, programs & events",
    org: "Vancouver Coworking Atelier Society (nonprofit)",
    when: "sep 2025–present",
    status: "current",
    posts: ["oralhealth-in-unexpected-spaces"],
    bullets: [
      "i plan the events: venues, schedules, merchandise, and program materials, and i write up what happened.",
      "i help run steam-focused networking events that are open to everyone.",
    ],
  },
  {
    role: "founder, eureka: questscapes— youth digital health education project",
    org: "independent project",
    when: "may 2024–present",
    status: "current",
    posts: ["sel-hiv-oralhealth"],
    bullets: [
      "i'm building a gamified hiv education platform for ages 15–24 that teaches sexual health and oral health together.",
      "it has raised more than $2,000 in seed funding and awards.",
      "i led a rapid scoping review of digital hiv interventions, and used it to shape the content and design.",
      "i turn academic research into plain language for young people, and try to keep it free of stigma.",
      "i'm learning to code with ai tools so i can prototype small websites and interactive tools.",
    ],
  },
  {
    role: "collaborative health education (che) project assistant",
    href: "/projects/che-project",
    org: "UBC Health, University of British Columbia",
    when: "may–aug 2025",
    status: "completed",
    bullets: [
      "i fixed accessibility problems in course materials used by 2,000+ learners across 14 health programs, and made them clearer and more consistent.",
      "i co-wrote the interprofessional education facilitator guide (3rd ed.) and helped with orientation materials.",
    ],
  },
  {
    role: "community-based dental hygiene practitioner (student)",
    org: "UBC · Union Gospel Mission · Pioneer Community Living Association · Elizabeth Fry Society",
    when: "jan 2024–apr 2026",
    status: "completed",
    posts: ["prevention-with-impact-ugm", "de-escalation-in-patient-care", "redefining-courage"],
    bullets: [
      "i did oral-health assessments, following standard protocols, with people who have trouble getting dental care.",
      "i explained health information in plain, trauma-informed terms, and worked with the care teams on referrals.",
    ],
  },
  {
    role: "oral health educator",
    org: "UBC · Skwo:wech Elementary School · S.U.C.C.E.S.S. Simon Ky Lee Care Home · Union Gospel Mission · Pioneer Community Living Association · Elizabeth Fry Society",
    when: "jan 2024–apr 2026",
    status: "completed",
    posts: ["ltc-raisingthebar", "oral-cancer-screening-clinic"],
    bullets: [
      "i taught oral health to different audiences, from kids to seniors, and changed the explanation to suit who was in the room while keeping to the guidelines.",
      "i helped at outreach clinics and free oral-cancer screenings by explaining what people could do next.",
    ],
  },
];

export const education = {
  degree: "bachelor of dental sciences (dental hygiene)",
  school: "University of British Columbia, Faculty of Dentistry",
  when: "sep 2022–may 2026 · graduated",
  /** reflections written for coursework (e-portfolio posts) */
  posts: ["dh-chx-prescription-rights", "dh-epinephrine-prescription-rights", "my-first-ever-digital-scan", "ipe-2023-2024-reflection", "y2-patchwork-summary"],
  coursework: ["oral epidemiology", "health policy and advocacy", "preventive and community health", "professionalism", "statistics"],
  awards: [
    {
      title: "Marilyn Dionne Teed Memorial Award",
      body: "honours the memory of Marilyn Dionne Teed and goes to a graduating dental hygiene student who shows outstanding integrity, dedication, loyalty, and perseverance. my award went toward funding eureka: questscapes.",
    },
    {
      title: "eureka: questscapes— project funding",
      body: "secured over $2,000 in combined seed funding and project support to develop the platform.",
    },
  ],
};

export const leadership = [
  { role: "academic dental careers fellowship program fellow", org: "American Dental Education Association (ADEA)", posts: ["adea-adcfp", "mi-evidence-informed-dh-cc"], body: "co-facilitated motivational interviewing instruction and interprofessional orientation." },
  { role: "dental hygiene representative", org: "2025 healthcare travelling roadshow · Northern BC", href: "/projects/roadshow", posts: ["decolonizing-success"], body: "represented dental hygiene and shared career pathways and oral-health education with youth across Northern BC." },
  { role: "inaugural dental hygiene representative", org: "Student Professionalism & Ethics Association in Dentistry, UBC", posts: ["ubc-spea-inaugural-dh-rep", "carrying-confidentiality-forward"], body: "contributed to equity-driven, ethics-informed student leadership." },
  { role: "peer mentor", org: "UBC Faculty of Dentistry", body: "mentored 53 junior students, mostly on how to study." },
  { role: "booth representative", org: "Canadian Society for Disability and Oral Health · Pacific Dental Conference", body: "talked with conference attendees about making care work for patients with disabilities." },
];

export const talks = [
  { title: "Canadian Oral Health Summit", href: "/projects/adea-fellowship", posts: ["adea-adcfp"], role: "poster and oral presenter", body: "presented work evaluating fellowship activities and learner outcomes." },
  { title: "Pacific Dental Conference", role: "booth representative, Canadian Society for Disability and Oral Health", body: "talked with conference attendees about making care work for patients with disabilities." },
  { title: "mentorship panels", role: "panelist, year 2 and year 3 panels", body: "senior student mentorship panels at the UBC Faculty of Dentistry." },
];

/** formal citations, in the site's voice: lowercase titles and roles; names and acronyms keep their capitals */
export const publications: { group: string; items: string[]; posts?: string[] }[] = [
  {
    group: "interprofessional education resources",
    items: [
      "Collaborative Health Education Enrichment Working Group (includes Lakshman S). interprofessional education (ipe) facilitator guide. 3rd ed. Vancouver (BC): University of British Columbia Health; 2025.",
      "Lakshman S, editor. session zero— competency assessment of interprofessional teams. Vancouver (BC): UBC Health, University of British Columbia; forthcoming.",
    ],
  },
  {
    group: "national framework contributions (cihc)",
    items: [
      "Lakshman S, designer. Canadian Interprofessional Health Collaborative (CIHC). simplified competency framework for advancing collaboration [Internet]. Vancouver (BC): CIHC; 2025.",
      "Lakshman S, designer. Canadian Interprofessional Health Collaborative (CIHC). référentiel de compétences du CPIS pour l'avancement de la collaboration en santé et services sociaux— version simplifiée [Internet]. Vancouver (BC): CIHC; 2025.",
    ],
  },
  {
    group: "educational curriculum development",
    items: [
      "Lakshman S, designer. collaborative decision-making: interprofessional workshop [slide deck; internal educational resource]. Vancouver (BC): UBC Health, University of British Columbia; 2025.",
      "Lakshman S, designer. health informatics: interprofessional workshop [slide deck; internal educational resource]. Vancouver (BC): UBC Health, University of British Columbia; 2025.",
      "Lakshman S, designer. iEthics Q1: foundations of ethical practice [slide deck; internal educational resource]. Vancouver (BC): UBC Health, University of British Columbia; 2025.",
      "Lakshman S, designer. iEthics Q3: interprofessional ethical decision-making [slide deck; internal educational resource]. Vancouver (BC): UBC Health, University of British Columbia; 2025.",
      "Lakshman S, designer. substance use education: interprofessional workshop [slide deck; internal educational resource]. Vancouver (BC): UBC Health, University of British Columbia; 2025.",
      "Lakshman S, designer. professionalism: interprofessional workshop [slide deck; internal educational resource]. Vancouver (BC): UBC Health, University of British Columbia; 2025.",
    ],
  },
  {
    group: "teaching",
    posts: ["mi-evidence-informed-dh-cc"],
    items: [
      "Lakshman S, lecturer. interprofessional education & integrated curriculum orientation [lecture and slides]. Vancouver (BC): UBC Faculty of Dentistry, University of British Columbia; 2025.",
      "Lakshman S, lecturer. compassionate conversations… (motivational interviewing) [lecture and slides]. Vancouver (BC): UBC Faculty of Dentistry, University of British Columbia; 2026.",
    ],
  },
  {
    group: "media and knowledge translation",
    items: [
      "Lakshman S, student contributor. University of British Columbia, UBC Health. 2025 UBC Health ipe student orientation video [Internet]. Vancouver (BC): University of British Columbia; 2025. available from: https://learning.media.ubc.ca/media/2025+UBC+Health+Student+Orientation+Video/0_jhxo7u68",
    ],
  },
];

export const skills = {
  tools: ["Microsoft Office", "Google Workspace", "Figma", "RStudio", "ai-assisted / agentic coding tools (self-directed, small-project prototyping)"],
  certifications: ["Basic Life Support (BLS) for health care professionals (CPR)"],
};
