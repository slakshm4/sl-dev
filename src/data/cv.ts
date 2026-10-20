// ─────────────────────────────────────────────────────────────
//  cv.ts  ·  everything on /experience.   source of truth: the cv pdf
//  (Shradha_Lakshman_CV_HPE_2026_final.pdf, kept at /public/shradha-lakshman-cv.pdf)
//  swap the pdf file whenever you have the 1-page version; the link stays the same.
// ─────────────────────────────────────────────────────────────

export const cvHref = "/shradha-lakshman-cv.pdf";

export const profile =
  "dental hygiene graduate and licensed dental hygienist with experience in health professions education, curriculum accessibility, community-based oral health, learner mentorship, and digital health education. interested in designing inclusive, evidence-informed learning experiences that connect clinical practice with community health needs. developing skills in ai-assisted and agentic software development to prototype small websites and interactive educational tools.";

export const strengths = [
  "health professions education and interprofessional learning",
  "curriculum development, accessibility review, and learning-material refinement",
  "oral health promotion and community-based education",
  "evidence synthesis and structured research",
  "learner mentorship, facilitation, and presentations",
  "trauma-informed, culturally responsive communication",
  "digital health education and interactive-tool prototyping",
  "documentation, coordination, and stakeholder communication",
];

export type Job = { role: string; org: string; when: string; status?: "current" | "completed"; bullets: string[] };

export const jobs: Job[] = [
  {
    role: "licensed dental hygienist (part-time)",
    org: "joyce wu dental, richmond, bc",
    when: "aug 2026 – present",
    status: "current",
    bullets: [
      "provide preventive oral healthcare and patient education in a clinical dental setting.",
      "communicate oral-health information and individualized preventive guidance to support patient understanding and self-care.",
      "maintain clinical documentation and collaborate with the dental care team.",
    ],
  },
  {
    role: "operations executive, programs & events",
    org: "vancouver coworking atelier society (nonprofit)",
    when: "sep 2025 – present",
    status: "current",
    bullets: [
      "coordinate event logistics and documentation, including venues, schedules, merchandise, and program materials.",
      "contribute to inclusive, steam-focused networking events aligned with community and organizational goals.",
    ],
  },
  {
    role: "founder, eureka: questscapes — youth digital health education project",
    org: "independent project",
    when: "may 2024 – present",
    status: "current",
    bullets: [
      "developing a gamified, evidence-informed hiv education platform for youth ages 15–24, integrating sexual-health and oral-health literacy.",
      "secured more than $2,000 in seed funding and awards to advance the project.",
      "led a rapid scoping review of digital hiv interventions and synthesized findings to inform content and product design.",
      "translate academic evidence into accessible, youth-facing learning content, with attention to stigma reduction and inclusive communication.",
      "building skills in ai-assisted/agentic coding to prototype small websites and interactive digital tools.",
    ],
  },
  {
    role: "collaborative health education (che) project assistant",
    org: "ubc health, university of british columbia",
    when: "may – aug 2025",
    status: "completed",
    bullets: [
      "audited accessibility and revised curriculum materials for clarity, usability, and consistency across 2,000+ learners in 14 health programs.",
      "co-authored the interprofessional education facilitator guide (3rd ed.) and contributed to orientation materials aligned with institutional standards.",
      "supported the quality and consistency of educational resources used across health programs.",
    ],
  },
  {
    role: "community-based dental hygiene practitioner (student)",
    org: "ubc · union gospel mission · pioneer community living association · elizabeth fry society",
    when: "jan 2024 – apr 2026",
    status: "completed",
    bullets: [
      "completed structured oral-health assessments and documentation with people experiencing social and structural barriers to care, following standardized protocols.",
      "communicated complex health information in trauma-informed, culturally responsive settings.",
      "collaborated with interdisciplinary teams to support referrals and continuity of care.",
    ],
  },
  {
    role: "oral health educator",
    org: "ubc · skwo:wech elementary school · s.u.c.c.e.s.s. simon ky lee care home · union gospel mission · pioneer community living association · elizabeth fry society",
    when: "jan 2024 – apr 2026",
    status: "completed",
    bullets: [
      "delivered evidence-informed oral-health education, adapting explanations and activities for different audiences while maintaining guideline fidelity.",
      "supported preventive outreach initiatives, including clinics and free oral-cancer screenings, by sharing clear, actionable information.",
    ],
  },
];

export const education = {
  degree: "bachelor of dental sciences (dental hygiene)",
  school: "university of british columbia, faculty of dentistry",
  when: "sep 2022 – may 2026 · graduated",
  coursework: ["oral epidemiology", "health policy and advocacy", "preventive and community health", "professionalism", "statistics"],
  awards: [
    {
      title: "marilyn dionne teed memorial award",
      body: "honours the memory of marilyn dionne teed and is awarded to a graduating dental hygiene student who demonstrates outstanding integrity, dedication, loyalty, and perseverance during their undergraduate years.",
    },
    {
      title: "eureka: questscapes — project funding",
      body: "secured over $2,000 in combined seed funding and project support to develop the platform.",
    },
  ],
};

export const leadership = [
  { role: "academic dental careers fellowship program fellow", org: "american dental education association (adea)", body: "co-facilitated motivational interviewing instruction and interprofessional orientation." },
  { role: "dental hygiene representative", org: "2025 healthcare travelling roadshow · northern bc", body: "represented dental hygiene and shared career pathways and oral-health education with youth across northern bc." },
  { role: "inaugural dental hygiene representative", org: "student professionalism & ethics association in dentistry, ubc", body: "contributed to equity-driven, ethics-informed student leadership." },
  { role: "peer mentor", org: "ubc faculty of dentistry", body: "mentored 53 junior students on study strategies and academic readiness." },
  { role: "booth representative", org: "canadian society for disability and oral health · pacific dental conference", body: "shared accessibility and disability-inclusive care strategies." },
];

export const talks = [
  { title: "canadian oral health summit", role: "poster and oral presenter", body: "presented work evaluating fellowship activities and learner outcomes." },
  { title: "pacific dental conference", role: "booth representative, canadian society for disability and oral health", body: "shared accessibility and disability-inclusive care strategies." },
  { title: "mentorship panels", role: "panelist, year 2 and year 3 panels", body: "senior student mentorship panels at the ubc faculty of dentistry." },
];

/** formal citations keep their capitalisation on the page */
export const publications: { group: string; items: string[] }[] = [
  {
    group: "interprofessional education resources",
    items: [
      "Collaborative Health Education Enrichment Working Group (includes Lakshman S). Interprofessional Education (IPE) Facilitator Guide. 3rd ed. Vancouver (BC): University of British Columbia Health; 2025.",
      "Lakshman S, Editor. Session Zero – Competency Assessment of Interprofessional Teams. Vancouver (BC): UBC Health, University of British Columbia; Forthcoming.",
      "Lakshman S, Editor. TBC on the Run – Relationship-Focused Care/Services [educational module]. Vancouver (BC): UBC Health, University of British Columbia; 2025.",
      "Lakshman S, Editor. TBC on the Run – Collaborative Leadership for Shared Decision-Making [educational module]. Vancouver (BC): UBC Health, University of British Columbia; 2025.",
    ],
  },
  {
    group: "national framework contributions (cihc)",
    items: [
      "Lakshman S, Designer. Canadian Interprofessional Health Collaborative (CIHC). Simplified Competency Framework for Advancing Collaboration [Internet]. Vancouver (BC): CIHC; 2025.",
      "Lakshman S, Designer. Canadian Interprofessional Health Collaborative (CIHC). Référentiel de compétences du CPIS pour l'avancement de la collaboration en santé et services sociaux – version simplifiée [Internet]. Vancouver (BC): CIHC; 2025.",
      "Lakshman S, French Language Editor. Canadian Interprofessional Health Collaborative (CIHC). Référentiel des compétences du CPIS pour l'avancement de la collaboration en santé et services sociaux [Internet]. Vancouver (BC): CIHC; Forthcoming.",
    ],
  },
  {
    group: "educational curriculum development",
    items: [
      "Lakshman S, Designer. Collaborative Decision-Making: Interprofessional Workshop [slide deck; internal educational resource]. Vancouver (BC): UBC Health, University of British Columbia; 2025.",
      "Lakshman S, Designer. Health Informatics: Interprofessional Workshop [slide deck; internal educational resource]. Vancouver (BC): UBC Health, University of British Columbia; 2025.",
      "Lakshman S, Designer. iEthics Q1: Foundations of Ethical Practice [slide deck; internal educational resource]. Vancouver (BC): UBC Health, University of British Columbia; 2025.",
      "Lakshman S, Designer. iEthics Q3: Interprofessional Ethical Decision-Making [slide deck; internal educational resource]. Vancouver (BC): UBC Health, University of British Columbia; 2025.",
      "Lakshman S, Designer. Substance Use Education: Interprofessional Workshop [slide deck; internal educational resource]. Vancouver (BC): UBC Health, University of British Columbia; 2025.",
      "Lakshman S, Designer. Professionalism: Interprofessional Workshop [slide deck; internal educational resource]. Vancouver (BC): UBC Health, University of British Columbia; 2025.",
    ],
  },
  {
    group: "teaching",
    items: [
      "Lakshman S, Lecturer. Interprofessional Education & Integrated Curriculum Orientation [lecture and slides]. Vancouver (BC): UBC Faculty of Dentistry, University of British Columbia; 2025.",
    ],
  },
  {
    group: "media and knowledge translation",
    items: [
      "Lakshman S, Student Contributor. University of British Columbia, UBC Health. 2025 UBC Health IPE Student Orientation Video [Internet]. Vancouver (BC): University of British Columbia; 2025. Available from: https://learning.media.ubc.ca/media/2025+UBC+Health+Student+Orientation+Video/0_jhxo7u68",
    ],
  },
];

export const skills = {
  tools: ["microsoft office", "google workspace", "figma", "rstudio", "ai-assisted / agentic coding tools (self-directed, small-project prototyping)"],
  certifications: ["cpr / bls"],
};
