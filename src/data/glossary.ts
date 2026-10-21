// ─────────────────────────────────────────────────────────────
//  glossary.ts  ·  words that get a little hover-definition anywhere on the site (script: src/scripts/glossary.ts)
//
//  every entry: `term` (the heading in the popup), `match` (the spellings to look for), `def` (the definition).
//  only the first appearance of each entry on a page is marked, so a page never looks speckled.
//  `cs: true` = match the capitals exactly (for abbreviations like SRP). definitions: lowercase, plain words, Canadian spelling.
//  to add a word, copy an entry. to remove one, delete it.
//  it skips links, buttons, headings, pills, the north star map, and anything not in English (the French poems).
// ─────────────────────────────────────────────────────────────

export type Gloss = { term: string; match: string[]; def: string; cs?: boolean };

export const glossary: Gloss[] = [
  // ── south asian words & ideas
  { term: "dharma", match: ["dharma"], def: "a Sanskrit word with no single English match: duty, rightness, the way things ought to be done. in the Bhagavad Gita, it is the path a person is called to walk." },
  { term: "karma", match: ["karma"], def: "the idea, across Hindu, Buddhist, and other Indian traditions, that actions carry consequences that shape what comes next, sometimes across lifetimes." },
  { term: "Vedanta", match: ["Vedantic", "Vedanta"], def: "a school of Hindu philosophy rooted in the Upanishads, concerned with the nature of the self and of ultimate reality." },
  { term: "Ayurveda", match: ["Ayurvedic", "Ayurveda"], def: "a traditional system of medicine from India that looks after the body through balance: diet, daily routine, herbs, and rest." },
  { term: "Bhagavad Gita", match: ["Bhagavad Gita"], def: "a 700-verse Sanskrit poem inside the Mahabharata, in which Krishna advises the warrior Arjuna about duty, action, and devotion on the eve of battle." },
  { term: "raga", match: ["ragas", "raga"], def: "a melodic framework in Indian classical music: a set of notes and ways of moving between them, tied to a mood and often a time of day." },
  { term: "Karnatik", match: ["Karnatik", "Carnatic"], def: "the classical music tradition of southern India. also spelled Carnatic." },
  { term: "Hindustani", match: ["Hindustani"], def: "the classical music tradition of northern India." },
  { term: "sitar", match: ["sitar"], def: "a long-necked, plucked string instrument from India, known for its shimmering sympathetic strings." },
  { term: "diaspora", match: ["diaspora"], def: "a people living away from their ancestral homeland, and the communities they build there." },
  { term: "NRI", match: ["NRI"], cs: true, def: "non-resident Indian: a common term for Indian citizens living abroad, often used more loosely for the wider diaspora." },

  // ── ideas & art words
  { term: "chiaroscuro", match: ["chiaroscuro"], def: "an Italian art term for strong contrast between light and dark, used in painting to give a scene depth and drama." },
  { term: "allegory", match: ["allegory"], def: "a story whose characters and events stand in for bigger ideas." },
  { term: "pluralism", match: ["pluralism"], def: "the view that many different values and ways of living can be valid at once, with no single one ruling over the rest." },
  { term: "paternalistic", match: ["paternalistic"], def: "overriding someone's choices \"for their own good\" without giving them a say." },
  { term: "hegemony", match: ["hegemony"], def: "the dominance of one group, state, or set of ideas over others, often without needing force." },
  { term: "totalitarianism", match: ["totalitarianism", "totalitarian"], def: "a system of rule that demands total control over public and private life." },
  { term: "ecological colonialism", match: ["ecological colonialism"], def: "when outside powers take over a place's land, species, and resources and reshape its ecosystem for their own benefit." },
  { term: "kitsch", match: ["kitschy", "kitsch"], def: "art or decor thought of as sentimental, tacky, or mass-produced, and often loved anyway." },
  { term: "blackout poetry", match: ["blackout poetry"], def: "poems made by blacking out most of an existing page of text and keeping the words that remain." },
  { term: "contextomy", match: ["contextomy"], def: "quoting words out of their original context so they seem to say something else, usually misleadingly." },
  { term: "fallow", match: ["fallow"], def: "land left unplanted for a season so the soil can recover." },
  { term: "errata", match: ["errata"], def: "corrections to mistakes found after something has been published." },
  { term: "marginalia", match: ["marginalia"], def: "notes written in the margins of a book or page." },
  { term: "ephemera", match: ["ephemera"], def: "everyday paper things never meant to be kept, like tickets, flyers, and scribbled notes." },
  { term: "pianissimo", match: ["pianissimo"], def: "a musical direction: very quietly." },
  { term: "crescendo", match: ["crescendo"], def: "a musical direction: gradually getting louder." },
  { term: "decrescendo", match: ["decrescendo"], def: "a musical direction: gradually getting quieter." },

  // ── history
  { term: "Aryan", match: ["Aryanism", "Aryans", "Aryan"], def: "originally a Sanskrit word (ārya) meaning \"noble,\" later a label for a family of languages. in the 1800s and 1900s it was twisted into a false racial category, which Nazism used to claim a \"master race.\"" },
  { term: "philology", match: ["philologist", "philology"], def: "the study of language in old written texts, tracing how words and languages change over time. a philologist is someone who does this." },
  { term: "historiography", match: ["historiographical", "historiography"], def: "the study of how history gets written: who tells it, with what methods, and from what angle." },
  { term: "deep battle", match: ["deep battle"], def: "a Soviet military theory of striking the whole depth of an enemy's defences at once, not just the front line." },
  { term: "operational art", match: ["operational art"], def: "the level of military planning between tactics (single battles) and strategy (the whole war)." },
  { term: "Cuban Missile Crisis", match: ["Cuban Missile Crisis"], def: "the 1962 standoff between the United States and the Soviet Union over Soviet nuclear missiles in Cuba, the closest the Cold War came to nuclear war." },

  // ── dental & health education
  { term: "cusp of Carabelli", match: ["cusp of Carabelli"], def: "an extra bump sometimes found on the tongue side of an upper first molar. harmless, and named after the dentist Georg Carabelli." },
  { term: "radiographs", match: ["radiographs", "radiograph"], def: "dental x-rays: images that show what is going on beneath the surface of the teeth and bone." },
  { term: "debridement", match: ["debridement"], def: "cleaning plaque and calculus (hardened plaque) off the teeth." },
  { term: "SRP", match: ["SRP"], cs: true, def: "scaling and root planing: a deep cleaning below the gumline to treat gum disease." },
  { term: "EO/IO", match: ["EO/IO"], cs: true, def: "extraoral and intraoral exams: checking the outside (head, neck, jaw) and the inside of the mouth for signs of disease." },
  { term: "interprofessional education", match: ["interprofessional education", "IPE"], def: "students from different health professions learning with, from, and about each other, so they work better together as a team." },
  { term: "motivational interviewing", match: ["motivational interviewing"], def: "a collaborative counselling style that helps people find their own reasons to change instead of being told what to do." },
  { term: "scoping review", match: ["scoping review"], def: "a type of research review that maps what is known about a broad topic, instead of answering one narrow question." },
  { term: "ADEA", match: ["ADEA"], cs: true, def: "the American Dental Education Association." },
];
