// ─────────────────────────────────────────────────────────────
//  poems.ts  ·  (dé)générescence: an anthology, and the five poems inside it
//
//  the anthology (`parts`) shows the five poems as cards; each poem is its own page (`partOf` keeps them out of the main poems grid).
//  every poem is written in couplets split between the ears: `pairs` is [left ear, right ear] line by line,
//  and `translation` is the same, in english. the english voice (the lines inside quote marks) is set in italics automatically.
//
//  write in lowercase; capitals are only for names.
// ─────────────────────────────────────────────────────────────
import type { Piece } from "./writing-types";

export const degenerescence = "degenerescence";

export const poemPieces: Piece[] = [
  {
    slug: "degenerescence",
    title: "(dé)générescence",
    tags: ["anthology", "free verse"],
    blurb: "five poems in French, with an English voice in the other ear.",
    stickers: ["cassette", "moon", "ghost", "music"],
    parts: ["corps-temoin", "empreinte", "la-jachere", "les-ecartes", "l-irreparable-en-moi"],
    stamps: ["cd in the works", "mp3 coming soon"],
    note: "i hope you'll listen with both earbuds in.",
    link: { label: "about the project", href: "/projects/bilingual-inquiry" },
    body: [
      "there are five poems, each written in free verse because i'm too lazy to rhyme. also, i think it sounds better. they are in French, with an embedded English voice—a letter written in clandestine, a lost-then-found document, fragments of strings of words overheard from some undefined coordinate—that runs through each one in italics, split between the ears, answering the French obliquely rather than translating it. the French and the English never say the same thing. they mourn the same thing from different angles, and the stereo field is where the two accounts touch.",
    ],
  },
  {
    slug: "corps-temoin",
    title: "corps témoin",
    kicker: "poem a",
    tags: ["free verse"],
    partOf: "degenerescence",
    stickers: ["eye", "sparkle", "ghost"],
    noteBox: {
      body: [
        "the direct translation of _corps témoin_ is \"control group\", or, if you want to be literal about it, \"control body\".",
        "but _corps_ means body, and _témoin_ means witness. so the title is a play on words: it sits between the clinical, hard, cold, detached language of science and the rawer, more vulgar, more vulnerable meaning of the poem.",
      ],
    },
    body: [],
    stereo: {
      pairs: [
        ["je vous ai gardée dans ce que je taisais", "dans la chair, avant même que vous l'eussiez su—"],
        ["l'on peut corriger une séquence", "non point ce que le silence a déjà scellé"],
        ["\"i wrote this down", "where the frost keeps what summer forgets—\""],
        ["vous étiez encore dans votre premier matin", "et j'eusse dû détourner les yeux"],
        ["\"the body is a faithful keeper", "of abandoned things—\""],
        ["\"it does not forget on instruction", "though the mind has long since turned away\""],
        ["ce que l'âme consent à perdre", "demeure gravé dans l'os, dans le fil le plus secret"],
        ["j'ai voulu vous épargner ce passage", "comme on détourne un enfant d'une porte fermée"],
        ["\"keep this.", "keep this.\""],
        ["il ne reste plus de vous", "que ce que vous ne vous rappelez plus"],
      ],
      translation: [
        ["i kept you in what i kept silent.", "in the flesh, even before you knew it—"],
        ["one can correct a sequence.", "not what silence has sealed."],
        ["\"i wrote this down", "where the frost keeps what summer forgets—\""],
        ["you were still in your first morning.", "and i should have looked away."],
        ["\"the body is a faithful keeper", "of abandoned things—\""],
        ["\"it does not forget on instruction", "though the mind has long since turned away\""],
        ["what the soul agrees to lose", "remains engraved in the bone, in the most secret thread"],
        ["i wanted to spare you this passage", "like turning a child away from a closed door"],
        ["\"keep this.", "keep this.\""],
        ["all that remains of you", "is what you no longer remember"],
      ],
    },
  },
  {
    slug: "empreinte",
    title: "empreinte",
    kicker: "poem b",
    tags: ["free verse"],
    partOf: "degenerescence",
    stickers: ["envelope", "moon", "sparkle"],
    noteBox: {
      body: [
        "_empreinte_ means \"imprint\" or \"trace.\"",
        "the title frames the poem around an involuntary mark left by a brief, almost imperceptible contact: like wax retaining the shape of what touched it. it suggests that presence can alter someone permanently without intention, while the one who caused the mark may never know it existed. the poem's central paradox—being changed by someone who has forgotten having known you—makes the title both literal and emotional.",
      ],
    },
    body: [],
    stereo: {
      pairs: [
        ["vous m'avez effleuré sans le vouloir", "et j'en garde la marque à mon insu—"],
        ["telle la cire qui retient la forme", "de ce qu'elle n'a tenu qu'un instant"],
        ["\"i did not mean to leave", "anything behind—\""],
        ["je n'ose plus approcher", "ce que votre main a seulement frôlé"],
        ["\"but the light remembers", "the shape of what stood in it\""],
        ["vous êtes partie avant que je pusse comprendre", "ce que votre présence avait fait de moi"],
        ["\"i have sought you", "in every room since—\""],
        ["il est un endroit en moi", "que vous seul avez traversé"],
        ["\"and found only", "the outline of where you were\""],
        ["et que vous seul avez oublié", "d'avoir jamais connu"],
      ],
      translation: [
        ["you touched me without meaning to.", "and i bear the mark without knowing it—"],
        ["like wax that retains the shape", "of what it held for only a moment."],
        ["\"i did not mean to leave", "anything behind—\""],
        ["i no longer dare to approach", "what your hand has only brushed against"],
        ["\"but the light remembers", "the shape of what stood in it\""],
        ["you left before i could understand", "what your presence had done to me"],
        ["\"i have sought you", "in every room since—\""],
        ["there is a place within me", "that only you have crossed"],
        ["\"and found only", "the outline of where you were\""],
        ["and that only you have forgotten", "ever having known"],
      ],
    },
  },
  {
    slug: "la-jachere",
    title: "la jachère",
    kicker: "poem c",
    tags: ["free verse"],
    partOf: "degenerescence",
    stickers: ["leaf", "flower", "sun"],
    noteBox: {
      body: [
        "_la jachère_ means \"fallow land\"—a field left unplanted so it may recover.",
        "the title makes the poem's garden imagery a metaphor for a possibility that was sensed but never allowed to grow: a relationship, name, or future returned to winter before it could become spring. it carries the quiet grief of potential rather than loss alone; what is left fallow is not dead, but it may never be cultivated again. the title therefore names the space between what might have been and what was deliberately left unmade.",
      ],
    },
    body: [],
    stereo: {
      pairs: [
        ["j'avais imaginé vos mains plus grandes", "tenant ce que nous n'avons point eu le temps de nommer—"],
        ["une saison que l'on pressent", "avant même qu'elle ne s'ouvre"],
        ["\"there was a morning", "i had already given you—\""],
        ["j'avais choisi sans choisir", "comme on ferme une fenêtre sur le froid"],
        ["\"a name i carried", "briefly, like water in cupped hands\""],
        ["le jardin existait pourtant", "avant que nous n'en retournions la terre"],
        ["\"i have not gone back", "to that part of the garden since—\""],
        ["ce que nous avons rendu à l'hiver", "avait déjà la forme du printemps"],
        ["\"some seasons", "do not return\""],
        ["je vous regarde parfois", "et je vois ce que nous n'avons pas laissé venir"],
      ],
      translation: [
        ["i had imagined your hands larger", "holding what we didn't have time to name—"],
        ["a season we sense", "even before it begins"],
        ["\"there was a morning", "i had already given you—\""],
        ["i had chosen without choosing", "like closing a window against the cold"],
        ["\"a name i carried", "briefly, like water in cupped hands\""],
        ["yet the garden existed", "before we turned the soil"],
        ["\"i have not gone back", "to that part of the garden since—\""],
        ["what we gave back to winter", "already had the shape of spring"],
        ["\"some seasons", "do not return\""],
        ["i look at you sometimes", "and i see what we did not let come"],
      ],
    },
  },
  {
    slug: "les-ecartes",
    title: "les écartés",
    kicker: "poem d",
    tags: ["free verse"],
    partOf: "degenerescence",
    stickers: ["fish", "cloud", "moon"],
    noteBox: {
      body: [
        "_les écartés_ means \"the ones set aside,\" \"the excluded,\" or \"the cast-offs.\"",
        "the title identifies the poem's subject not as charity itself, but as those judged unworthy of it—the shipwrecked returned to the sea because their suffering does not fit a respectable image. it exposes the selectivity hidden inside compassion: mercy can become another form of sorting. the plural title also turns individual abandonment into a social condition, giving the poem its bitter, accusatory force.",
      ],
    },
    body: [],
    stereo: {
      pairs: [
        ["l'on a trié les naufragés sur la grève", "gardant ceux dont le visage convenait—"],
        ["les autres ont été rejetés à la mer", "avec la politesse d'un geste bien élevé"],
        ["\"we drew a circle", "and we called it mercy—\""],
        ["j'ai vu la charité peser ses bénéficiaires", "comme on pèse le grain avant la disette"],
        ["\"the ones left outside", "were simply not the right kind of suffering\""],
        ["que l'on ne se méprenne point", "la main tendue choisit toujours son destinataire"],
        ["\"we built the shelter", "facing away from the wind they came in on\""],
        ["il est des douleurs que l'on couronne", "et d'autres que l'on enjambe sans ralentir"],
        ["\"not all drowning", "is considered drowning\""],
        ["continuez, messieurs", "le spectacle est fort bien ordonné"],
      ],
      translation: [
        ["we sorted the shipwrecked on the shore", "keeping those whose faces suited us—"],
        ["the others were thrown back into the sea", "with the politeness of a well-mannered gesture"],
        ["\"we drew a circle", "and we called it mercy—\""],
        ["i saw charity weigh its beneficiaries", "as grain is weighed before famine"],
        ["\"the ones left outside", "were simply not the right kind of suffering\""],
        ["let there be no mistake", "the outstretched hand always chooses its recipient"],
        ["\"we built the shelter", "facing away from the wind they came in on\""],
        ["there are pains that we crown", "and others that we step over without slowing down"],
        ["\"not all drowning", "is considered drowning\""],
        ["continue, gentlemen", "the show is beautifully orchestrated (?)"],
      ],
    },
  },
  {
    slug: "l-irreparable-en-moi",
    title: "l'irréparable en moi",
    kicker: "poem e",
    tags: ["free verse"],
    partOf: "degenerescence",
    stickers: ["heart", "ghost", "sparkle"],
    noteBox: {
      body: [
        "_l'irréparable en moi_ means \"the irreparable within me.\"",
        "the title locates damage not in a single event but in the self's own making: a collapse that occurred before the clay could be fired, before the self could become whole. it frames identity as something shaped, cracked, and remade without a stable original form. the title's gravity lies in its refusal of repair—not because healing is impossible, but because what was lost may no longer be recoverable in the form one once intended.",
      ],
    },
    body: [],
    stereo: {
      pairs: [
        ["je me suis façonné de mes propres mains", "sans savoir ce que je voulais former—"],
        ["le limon ne ment point", "elle prend la forme de ce qu'on lui impose"],
        ["\"i have put my fist through", "better versions of myself—\""],
        ["il y a des fissures qui datent de loin", "que j'ai cru pouvoir cacher sous une nouvelle couche"],
        ["\"i have been several people", "none of them reliable—\""],
        ["ma voix m'est devenue étrangère", "quelque part entre hier et ce matin"],
        ["\"i am not sure anymore", "if i am the potter or the vessel—\""],
        ["quelque chose en moi s'est flétri, affaisé", "avant même d'avoir connu le feu—"],
        ["\"you cannot fire", "a thing that has already collapsed—\""],
        ["il ne reste qu'à reprendre l'argile", "et ne plus se souvenir de ce que nous souhaitions en faire​​​​​​​​​​​​​​​​"],
      ],
      translation: [
        ["i shaped myself with my own hands", "without knowing what i wanted to form—"],
        ["silt does not lie", "it takes the shape of what is imposed upon it"],
        ["\"i have put my fist through", "better versions of myself—\""],
        ["there are cracks that date back a long way", "that i thought i could hide under a new layer"],
        ["\"i have been several people", "none of them reliable—\""],
        ["my voice has become foreign to me", "somewhere between yesterday and this morning"],
        ["\"i am not sure anymore", "if i am the potter or the vessel—\""],
        ["something inside me withered, caved in", "before it ever knew the fire—"],
        ["\"you cannot fire", "a thing that has already collapsed—\""],
        ["all that's left is to take back the clay", "and forget what we wanted to do with it"],
      ],
    },
  },
];
