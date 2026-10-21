// Each row is one complete, checked-over plan. The reels never mix and match
// separate lists, so a spin cannot send you somewhere for an activity that does not fit there.
const sidequests = [
  {
    activity: "A BOOKSTORE CRAWL",
    location: "MAIN STREET",
    duration: "2 HOURS",
    result: "Start with whichever shop catches your eye. One unnecessary book is allowed.",
    solo: "Go alone. You do not need a committee for this.",
    friends: "Bring the friend who will wait while you read every back cover."
  },
  {
    activity: "A LOW-STAKES BOULDERING SESSION",
    location: "MOUNT PLEASANT",
    duration: "90 MINUTES",
    result: "Try a bouldering session, take the breaks, and do not confuse trying with being good at it.",
    solo: "You can arrive knowing absolutely nobody. That is normal there.",
    friends: "Bring someone who will clap when you get halfway up the wall."
  },
  {
    activity: "A THRIFT-STORE LAP",
    location: "COMMERCIAL DRIVE",
    duration: "2 HOURS",
    result: "Pick a small rule before you go: a perfect jacket, a strange mug, or one thing in a colour you do not own.",
    solo: "Take your time. Nobody needs to agree with your finds.",
    friends: "Bring a friend with strong opinions and no spending authority."
  },
  {
    activity: "A PASTRY, THEN A SIT",
    location: "CHINATOWN",
    duration: "AN HOUR",
    result: "Get something warm, sit somewhere for a while, and let the day be smaller than usual.",
    solo: "Take a book, or just look out the window for once.",
    friends: "Pick the pastry for each other. No overthinking it."
  },
  {
    activity: "A LONG SEAWALL WALK",
    location: "FALSE CREEK",
    duration: "UNTIL SUNSET",
    result: "Walk the water slowly. You are allowed to turn around whenever it stops being nice.",
    solo: "Put your phone on silent for the first ten minutes.",
    friends: "Bring someone you can be quiet around."
  },
  {
    activity: "THE SEABUS, NO RUSH",
    location: "LONSDALE QUAY",
    duration: "A HALF DAY",
    result: "Take the SeaBus over, wander without a route, and make the return trip when you feel like it.",
    solo: "Sit by a window if you can get one.",
    friends: "Meet there. Everybody can make their own way over."
  },
  {
    activity: "A MARKET GROCERY WANDER",
    location: "GRANVILLE ISLAND",
    duration: "90 MINUTES",
    result: "Buy one ingredient you have never cooked with and figure the rest out later.",
    solo: "It counts as an outing if you come home with good bread.",
    friends: "Assign everybody one thing to choose for dinner."
  },
  {
    activity: "A PROPER MUSEUM DAY",
    location: "DOWNTOWN",
    duration: "2 HOURS",
    result: "Look at things properly. Read the small cards. There is no prize for making it through every room.",
    solo: "Move at your own pace and linger where you want.",
    friends: "Take turns choosing the next room."
  },
  {
    activity: "A SLOW NEIGHBOURHOOD WALK",
    location: "KITSILANO",
    duration: "AN HOUR",
    result: "Walk a few blocks you have not walked before. Stop in if a place looks good. That is the whole plan.",
    solo: "Leave the headphones in your bag for a bit.",
    friends: "Walk side by side and do not turn it into a fitness thing."
  },
  {
    activity: "THE LONG WAY HOME",
    location: "OLYMPIC VILLAGE",
    duration: "UNTIL DINNER",
    result: "Get there however you like, then take the least efficient route back. See what happens.",
    solo: "A little aimlessness will not hurt you.",
    friends: "Choose turns by coin flip."
  },
  {
    activity: "A PHOTO WALK",
    location: "GASTOWN",
    duration: "AN HOUR",
    result: "Take ten photos of things you would normally pass without noticing. You do not have to post any of them.",
    solo: "Keep the photos for yourself, if you want.",
    friends: "Give each other one very specific photo prompt."
  },
  {
    activity: "SOMETHING NEW TO EAT",
    location: "RICHMOND",
    duration: "ONE AFTERNOON",
    result: "Choose a place with something on the menu you cannot quite picture. Order that.",
    solo: "Sit at the counter if there is one.",
    friends: "Everyone orders one thing for the table."
  },
  {
    activity: "A WATERFRONT WANDER",
    location: "STEVESTON",
    duration: "UNTIL SUNSET",
    result: "Walk along the water, look at the boats, and have a snack before heading back.",
    solo: "It is okay if your only thought is that the water looks nice.",
    friends: "Bring layers. Someone always forgets."
  },
  {
    activity: "A PARK BENCH + A JOURNAL",
    location: "QUEEN ELIZABETH PARK",
    duration: "A COUPLE OF HOURS",
    result: "Bring a notebook. Write whatever is taking up too much room in your head, then take a lap around the gardens.",
    solo: "This one is better without an audience.",
    friends: "Sit together, write separately, compare only if you feel like it."
  },
  {
    activity: "A MOVIE, BY YOURSELF",
    location: "DOWNTOWN",
    duration: "AN EVENING",
    result: "See something at a proper cinema. Get the snack you actually want, not the sensible one.",
    solo: "A solo movie is not sad. It is nice.",
    friends: "Meet in the lobby after and argue about the ending."
  },
  {
    activity: "A LIBRARY AFTERNOON",
    location: "DOWNTOWN",
    duration: "2 HOURS",
    result: "Find a floor you have never used, choose a book at random, and read until your brain quiets down a little.",
    solo: "Nobody will ask anything of you there.",
    friends: "Meet for coffee after. The library part can stay quiet."
  }
];

const requiredQuestFields = ["activity", "location", "duration", "result", "solo", "friends"];

if (!sidequests.every((quest) => requiredQuestFields.every((field) => typeof quest[field] === "string" && quest[field].trim()))) {
  throw new Error("Every sidequest needs a complete, usable plan.");
}


const reels = [...document.querySelectorAll(".reel")];
const spinButton = document.querySelector("#spin-button");
const lever = document.querySelector("#lever");
const reroll = document.querySelector("#reroll");
const resultCard = document.querySelector("#result-card");
const resultWrap = document.querySelector(".result-wrap");
const resultText = document.querySelector("#result-text");
const resultNote = document.querySelector("#result-note");
const orderNumber = document.querySelector("#order-no");
const checkTable = document.querySelector("#check-table");
const stamp = document.querySelector("#stamp");
const ticker = document.querySelector("#ticker");
const creditsDisplay = document.querySelector("#credits");
const spinsDisplay = document.querySelector("#spins");
const soundToggle = document.querySelector("#sound-toggle");
const machine = document.querySelector(".machine-area");
const slotMachine = document.querySelector(".slot-machine");
const modeOptions = [...document.querySelectorAll(".mode-option")];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let companionMode = "surprise";
let spinning = false;
let lastQuest = sidequests[0];
let credits = 3;
let spinCount = 0;

// While a reel spins it flickers through real options for that reel.
const reelPools = Object.fromEntries(
  ["activity", "location", "duration"].map((key) => [key, [...new Set(sidequests.map((quest) => quest[key]))]])
);

const idleLines = [
  "INSERT COIN ✦ PRESS START ✦ PULL THE LEVER TO GENERATE A RANDOM QUEST",
  "TODAY'S BONUS ROUND: LEAVING THE HOUSE ✦ +50 XP FOR FRESH AIR",
  "CURRENT HIGH SCORE: STILL ON THE COUCH ✦ YOU CAN BEAT THAT",
  "PRO TIP: THERE ARE NO WRONG QUESTS ✦ ONLY SIDE ONES",
  "CONTINUE? 9... 8... 7... ✦ PULL THE LEVER ✦ 6... 5..."
];
const thinkingLines = [
  "LOADING LEVEL... ✦ PLEASE DO NOT TURN OFF THE CONSOLE",
  "GENERATING WORLD ✦ ROLLING THE DICE",
  "CPU IS THINKING ✦ STAND BY, PLAYER 1",
  "BLOWING ON THE CARTRIDGE ✦ ONE MOMENT"
];
const buttonThinking = ["LOADING...", "BLOWING ON THE CARTRIDGE", "RENDERING VANCOUVER"];
const modeLines = {
  surprise: "CPU WILL PICK YOUR PARTY ✦ TRUST THE ALGORITHM",
  solo: "1 PLAYER MODE ✦ ZERO LAG ✦ NOBODY STEALS YOUR FRIES",
  friends: "MULTIPLAYER MODE ✦ SOMEONE WILL BE LATE TO THE LOBBY ✦ THAT'S FINE"
};
let idleIndex = 0;

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

// Ticket numbers are random, like a busy diner's pad of guest checks.
function newOrderNumber() {
  let next;
  do {
    next = String(1000 + Math.floor(Math.random() * 9000));
  } while (next === orderNumber.textContent);
  return next;
}

function pad(number) {
  return String(Math.min(number, 99)).padStart(2, "0");
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

// ---------- Marquee bulbs ----------
document.querySelectorAll("[data-bulbs]").forEach((row) => {
  for (let i = 0; i < Number(row.dataset.bulbs); i++) {
    const bulb = document.createElement("span");
    bulb.className = "bulb";
    bulb.style.setProperty("--i", i % 3);
    row.append(bulb);
  }
});

// ---------- Pixel-art props ----------
// Each sprite is drawn one character per pixel; "." is transparent.
const spritePalette = {
  X: "#222029", G: "#4f8a3c", R: "#e34b36", D: "#a82029", W: "#fff7df", C: "#fff7df",
  T: "#62b8b0", K: "#c9c8c0", P: "#f2867a", B: "#5a3420", S: "#fff7df",
  t: "#3f8f88", L: "#2f3a44", Y: "#f1bd38"
};
const sprites = {
  cherry: [
    "......GG...",
    ".....G..G..",
    "....G...G..",
    "...G....G..",
    "..G.....G..",
    ".RRR...RRR.",
    "RWRRR.RWRRR",
    "RRRRR.RRRRR",
    "RRRRD.RRRRD",
    ".DDD...DDD."
  ],
  milkshake: [
    ".........T..",
    "........T...",
    ".....R.T....",
    "....RRT.....",
    "...CCTCC....",
    "..CCCTCCC...",
    ".CCCCTCCCC..",
    "KKKKKKKKKKK.",
    ".PPPPPPPPP..",
    ".PWPPPPPPP..",
    "..PWPPPPP...",
    "..PPPPPPP...",
    "...PPPPP....",
    "....KKK.....",
    ".....K......",
    ".....K......",
    "...KKKKK...."
  ],
  mug: [
    "...S..S.....",
    "..S..S......",
    "...S..S.....",
    "............",
    ".TTTTTTTT...",
    ".TBBBBBBT...",
    ".TTTTTTTTTT.",
    ".DDDDDDDD..T",
    ".TTTTTTTT..T",
    ".TTTTTTTTTT.",
    "..TTTTTT....",
    "KKKKKKKKKK.."
  ],
  palm: [
    "....XXXX.........",
    "..XXX..XXX..XXX..",
    ".XX......XXXX.XXX",
    "X.....XXXXXX....X",
    "....XXX.XX.XXX...",
    "...XX..XX...XXX..",
    "..XX...XX.....XX.",
    ".X.....XX......X.",
    ".......XX........",
    "........XX.......",
    "........XX.......",
    "........XX.......",
    ".......XX........",
    ".......XX........",
    ".......XX........",
    "......XX.........",
    "......XX.........",
    "......XX.........",
    ".......XX........",
    ".......XX........",
    ".....XXXXXX......"
  ],
  car: [
    "..............XXXXXXXXXXX...............",
    ".............XCCCCCCCCCCCX..............",
    "............XCLLLLXCLLLLLCX.............",
    "XX.........XCLLLLLXCLLLLLLCX............",
    "XCCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX..",
    "XCCCCCCCCCCTTTTTTTTTTTTTTTTTTTTTTTTTTTX.",
    "XTTCCCCCCCCCCCCTTTTTtTTTTTTTTTTTTTTTTTYX",
    "DTTTCCCCCCCCCTTTTTTtTTTTKKKKTTTTTTTTTTX.",
    "KKKTTTTTTTTTTTTTTTTtTTTTTTTTTTTTTTTTKKKK",
    ".XXXX..XXXX..XXXXXXXXXXXXXX..XXXX..XXX..",
    "......XWWWWX................XWWWWX......",
    ".....XWRKKRWX..............XWRKKRWX.....",
    "......XWWWWX................XWWWWX......",
    ".......XXXX..................XXXX......."
  ]
};

function pixelSprite(rows, scale) {
  const rects = rows.flatMap((row, y) =>
    [...row].map((key, x) =>
      key === "." ? "" : `<rect x="${x}" y="${y}" width="1" height="1" fill="${spritePalette[key]}"${key === "S" ? ' class="px-steam"' : ""} />`
    )
  );
  return `<svg viewBox="0 0 ${rows[0].length} ${rows.length}" width="${rows[0].length * scale}" height="${rows.length * scale}" shape-rendering="crispEdges" aria-hidden="true">${rects.join("")}</svg>`;
}

document.querySelectorAll("[data-sprite]").forEach((element) => {
  element.innerHTML = pixelSprite(sprites[element.dataset.sprite], element.classList.contains("palm") ? 7 : 4);
});

document.querySelectorAll(".arrow-bulbs").forEach((group) => {
  const xs = group.dataset.x.split(" ");
  group.innerHTML = group.dataset.y
    .split(" ")
    .flatMap((y) => xs.map((x) => [x, y]))
    .map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="4" style="--i: ${i % 3}" />`)
    .join("");
});


// ---------- Chiptune sound ----------
const sound = { context: null, on: true };
try {
  sound.on = localStorage.getItem("sidequest-sound") !== "off";
} catch {}

function audio() {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!sound.on || !Ctx) return null;
  sound.context ??= new Ctx();
  if (sound.context.state === "suspended") sound.context.resume();
  return sound.context;
}

function beep(frequency, { start = 0, length = .08, type = "square", volume = .03, slideTo } = {}) {
  const context = audio();
  if (!context) return;
  const time = context.currentTime + start;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, time);
  if (slideTo) oscillator.frequency.exponentialRampToValueAtTime(slideTo, time + length);
  gain.gain.setValueAtTime(volume, time);
  gain.gain.exponentialRampToValueAtTime(.0001, time + length);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(time);
  oscillator.stop(time + length + .02);
}

const sfx = {
  coin() { beep(988, { length: .07 }); beep(1319, { start: .07, length: .25 }); },
  tick() { beep(170 + Math.random() * 70, { length: .03, volume: .012 }); },
  clunk() { beep(125, { length: .12, slideTo: 65 }); },
  win() {
    [523, 659, 784, 1047].forEach((frequency, i) => beep(frequency, { start: i * .09, length: .16, volume: .025 }));
    beep(1568, { start: .36, length: .45, type: "triangle", volume: .035 });
  },
  blip() { beep(660, { length: .05, volume: .02 }); },
  bonus() { [784, 988, 1319, 1568].forEach((frequency, i) => beep(frequency, { start: i * .05, length: .09, volume: .025 })); },
  horn() {
    [0, .22].forEach((start) => {
      beep(392, { start, length: .16, volume: .025 });
      beep(494, { start, length: .16, volume: .02 });
    });
  }
};

// Honk at the passing car.
document.querySelector(".car").addEventListener("click", sfx.horn);

function renderSoundToggle() {
  soundToggle.setAttribute("aria-pressed", String(sound.on));
  soundToggle.textContent = sound.on ? "♪ SOUND ON" : "♪ SOUND OFF";
}

soundToggle.addEventListener("click", () => {
  sound.on = !sound.on;
  try {
    localStorage.setItem("sidequest-sound", sound.on ? "on" : "off");
  } catch {}
  renderSoundToggle();
  sfx.blip();
});

// ---------- LED ticker ----------
function setTicker(text) {
  ticker.textContent = text;
  ticker.style.animation = "none";
  void ticker.offsetWidth;
  ticker.style.animation = "";
  ticker.style.animationDuration = `${Math.max(9, text.length * .17)}s`;
}

ticker.addEventListener("animationiteration", () => {
  if (spinning) return;
  idleIndex = (idleIndex + 1) % idleLines.length;
  setTicker(idleLines[idleIndex]);
});

// ---------- Readouts ----------
function renderReadouts() {
  creditsDisplay.textContent = pad(credits);
  spinsDisplay.textContent = pad(spinCount);
}

// ---------- Sparkles ----------
// Fires pixel stars out of a point inside `container`. With no point given they
// shoot upward from the top centre, which is how the ticket uses it.
function burst(container, { count, colours, minDistance, maxDistance, upward = false, pixel = false, x, y }) {
  if (reducedMotion.matches) return;
  for (let i = 0; i < count; i++) {
    const spark = document.createElement("span");
    const angle = upward ? Math.PI + Math.random() * Math.PI : (i / count) * Math.PI * 2 + Math.random() * .5;
    const distance = minDistance + Math.random() * (maxDistance - minDistance);
    spark.className = pixel ? "spark is-pixel" : "spark";
    if (x !== undefined) spark.style.setProperty("--x0", `${x}px`);
    if (y !== undefined) spark.style.setProperty("--y0", `${y}px`);
    spark.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
    spark.style.setProperty("--dy", `${Math.sin(angle) * distance * (upward ? .7 : 1)}px`);
    spark.style.setProperty("--s", `${8 + Math.round(Math.random() * 3) * 4}px`);
    spark.style.setProperty("--c", randomItem(colours));
    spark.addEventListener("animationend", () => spark.remove());
    container.append(spark);
  }
}

function sparkle() {
  burst(resultWrap, { count: 22, colours: ["var(--yellow)", "var(--turq)", "var(--tomato)", "var(--cream)"], minDistance: 70, maxDistance: 240, upward: true });
}

// ---------- The spin ----------
function pickQuest() {
  let quest;
  do {
    quest = randomItem(sidequests);
  } while (quest === lastQuest);
  lastQuest = quest;
  return quest;
}

function companionFor(mode) {
  return mode === "surprise" ? randomItem(["solo", "friends"]) : mode;
}

// ---------- The ticket ----------
const footerLine = document.querySelector("#footer-line");
const footerLines = [
  "Most good days start with somebody saying, “fine, let’s just go.”",
  "Nobody has ever regretted the walk they almost didn’t take.",
  "The plan was never the point. Leaving the house was.",
  "Half of every good story is just showing up somewhere.",
  "Some of the best afternoons were somebody else’s idea.",
  "It is very hard to have a bad time near water.",
  "The city is better than your couch remembers.",
  "You don’t need a reason. You need shoes and a transit pass."
];
let currentTicket;

// "for 2 hours", but just "until sunset"
function howLong(quest) {
  const duration = quest.duration.toLowerCase();
  return duration.startsWith("until") ? duration : `for ${duration}`;
}

// Every new ticket gets a fresh order number, and the footer picks a fresh line.
function fillTicket(quest, companion) {
  currentTicket = { quest, companion };
  orderNumber.textContent = newOrderNumber();
  checkTable.textContent = companion === "solo" ? "1" : "2+";
  resultText.innerHTML = `<strong>${quest.activity.toLowerCase()}</strong>, in <strong>${quest.location.toLowerCase()}</strong>, <strong>${howLong(quest)}</strong>. ${quest.result}`;
  resultNote.textContent = quest[companion];
  footerLine.textContent = randomItem(footerLines.filter((line) => line !== footerLine.textContent));
}

function spinReel(reel, stopAfter) {
  const key = reel.dataset.reel;
  const content = reel.querySelector(".reel-content");
  return new Promise((resolve) => {
    reel.classList.add("spinning");
    const flicker = reducedMotion.matches
      ? null
      : window.setInterval(() => {
          content.textContent = randomItem(reelPools[key]);
          if (key === "activity") sfx.tick();
        }, 70);
    window.setTimeout(() => {
      window.clearInterval(flicker);
      resolve(() => {
        reel.classList.remove("spinning");
        reel.classList.add("stopping");
        window.setTimeout(() => reel.classList.remove("stopping"), 300);
        sfx.clunk();
      });
    }, stopAfter);
  });
}

async function spin() {
  if (spinning) return;
  spinning = true;
  const onTheHouse = credits === 0;
  credits = Math.max(0, credits - 1);
  spinCount += 1;
  renderReadouts();

  spinButton.disabled = true;
  spinButton.querySelector(".button-top").textContent = randomItem(buttonThinking);
  slotMachine.classList.remove("is-win");
  stamp.classList.remove("is-stamped");
  machine.classList.add("is-spinning");
  setTicker(onTheHouse ? "OUT OF CREDITS ✦ CONTINUE GRANTED ✦ THIS ONE'S ON THE HOUSE" : randomItem(thinkingLines));
  sfx.coin();

  const quest = pickQuest();
  const calm = reducedMotion.matches;
  await Promise.all(
    reels.map(async (reel, index) => {
      const stop = await spinReel(reel, (calm ? 150 : 900) + index * (calm ? 120 : 600));
      reel.querySelector(".reel-content").textContent = quest[reel.dataset.reel];
      stop();
    })
  );
  await wait(calm ? 50 : 350);

  const companion = companionFor(companionMode);
  fillTicket(quest, companion);
  if (onTheHouse) credits = 3;
  renderReadouts();

  machine.classList.remove("is-spinning");
  slotMachine.classList.add("is-win");
  setTicker(`QUEST UNLOCKED ✦ ${quest.activity} ✦ ${quest.location} ✦ ${quest.duration} ✦ GOOD LUCK, PLAYER 1 ✦ NO SAVE STATES`);
  sfx.win();

  if (!calm) {
    resultCard.animate(
      [
        { clipPath: "inset(0 0 100% 0)", transform: "translateY(-24px)" },
        { clipPath: "inset(0 0 0% 0)", transform: "translateY(0)" }
      ],
      { duration: 560, easing: "steps(8, end)" }
    );
  }
  window.setTimeout(() => {
    stamp.classList.add("is-stamped");
    sparkle();
  }, calm ? 0 : 560);

  spinButton.disabled = false;
  spinButton.querySelector(".button-top").textContent = "PLAYER 1";
  spinning = false;
}

// ---------- Controls ----------
modeOptions.forEach((option) => {
  option.addEventListener("click", () => {
    companionMode = option.dataset.mode;
    modeOptions.forEach((button) => {
      const isActive = button === option;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
    sfx.blip();
    if (!spinning) setTicker(modeLines[companionMode]);
  });
});

spinButton.addEventListener("click", spin);
lever.addEventListener("click", spin);
// ---------- Sharing ----------
// The link carries the quest, so a friend who opens it sees the same ticket.
const shareButton = document.querySelector("#share-ticket");
const shareLabel = document.querySelector("#share-label");
let shareLabelTimer;

function ticketLink() {
  const url = new URL(location.href);
  url.search = "";
  url.hash = "";
  url.searchParams.set("quest", sidequests.indexOf(currentTicket.quest));
  url.searchParams.set("with", currentTicket.companion);
  return url.toString();
}

function flashShareLabel(label) {
  shareLabel.textContent = label;
  window.clearTimeout(shareLabelTimer);
  shareLabelTimer = window.setTimeout(() => (shareLabel.textContent = "SEND TO A FRIEND"), 2200);
}

async function shareTicket() {
  const { quest } = currentTicket;
  const text = `The Sidequest Machine says: ${quest.activity.toLowerCase()} in ${quest.location.toLowerCase()}, ${howLong(quest)}. You in?`;
  const url = ticketLink();
  sfx.blip();
  if (navigator.share) {
    try {
      await navigator.share({ title: "Sidequest Service", text, url });
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }
  try {
    await navigator.clipboard.writeText(`${text} ${url}`);
    flashShareLabel("COPIED!");
    if (!spinning) setTicker("TICKET COPIED ✦ PASTE IT TO A FRIEND ✦ BRING SNACKS");
  } catch {
    flashShareLabel("COULDN'T COPY");
  }
}

shareButton.addEventListener("click", shareTicket);

reroll.addEventListener("click", () => {
  document.querySelector("#machine").scrollIntoView({ behavior: "smooth", block: "center" });
  window.setTimeout(spin, 450);
});

// ---------- Bonus items ----------
// Every 2–6.5 seconds an item appears at a random empty place in the top section of the
// page, drifts for a few seconds, then fades. Before placing one, the page measures every
// line of text, both signs, the palms and any items already showing, and only uses a spot
// with clear space around it, so items never cover words at any screen size.
// Catch one for a bonus point.
const bonusItems = { cherry: "cherries", milkshake: "milkshake", mug: "coffee" };
const hero = document.querySelector(".hero");
const bonusRow = document.querySelector("#check-bonus");
const bonusScoreDisplay = document.querySelector("#bonus-score");
const bonusSpots = [...document.querySelectorAll(".power-up")];
const bonusClearance = 18; // room for the drift loop and the pop, plus a little air
let bonusScore = 0;

function bonusObstacles() {
  const rects = [];
  const walker = document.createTreeWalker(hero, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (!node.textContent.trim() || node.parentElement.closest("[aria-hidden='true'], .sr-only, .power-up, .score-pop")) continue;
    const range = document.createRange();
    range.selectNodeContents(node);
    rects.push(...range.getClientRects());
  }
  document.querySelectorAll(".open-sign, .home-sign, .palm, .power-up.is-live, .power-up.is-leaving").forEach((element) => {
    if (element.getClientRects().length) rects.push(element.getBoundingClientRect());
  });
  return rects;
}

function findBonusPlace(width, height) {
  const heroBox = hero.getBoundingClientRect();
  const obstacles = bonusObstacles();
  const room = bonusClearance;
  for (let attempt = 0; attempt < 80; attempt++) {
    const x = room + Math.random() * (heroBox.width - width - room * 2);
    const y = room + Math.random() * (heroBox.height - height - room * 2);
    const left = heroBox.left + x - room;
    const right = heroBox.left + x + width + room;
    const top = heroBox.top + y - room;
    const bottom = heroBox.top + y + height + room;
    if (obstacles.every((r) => r.right < left || r.left > right || r.bottom < top || r.top > bottom)) return { x, y };
  }
  return null;
}

function spawnBonus() {
  const free = bonusSpots.find((spot) => !spot.classList.contains("is-live") && !spot.classList.contains("is-leaving"));
  const shown = free && showBonus(free);
  window.setTimeout(spawnBonus, shown ? 2000 + Math.random() * 4500 : 600);
}

function showBonus(spot) {
  const kind = randomItem(Object.keys(bonusItems));
  const rows = sprites[kind];
  const place = findBonusPlace(rows[0].length * 4, rows.length * 4);
  if (!place) return false;
  spot.style.left = `${place.x}px`;
  spot.style.top = `${place.y}px`;
  spot.innerHTML = pixelSprite(rows, 4);
  spot.setAttribute("aria-label", `Catch the bonus ${bonusItems[kind]} for a bonus point`);
  spot.classList.add("is-live");
  spot.bonusTimer = window.setTimeout(() => hideBonus(spot), 3500 + Math.random() * 2500);
  return true;
}

function hideBonus(spot) {
  spot.classList.replace("is-live", "is-leaving");
  spot.bonusTimer = window.setTimeout(() => spot.classList.remove("is-leaving"), 700);
}

function catchBonus(spot) {
  if (!spot.classList.contains("is-live")) return;
  window.clearTimeout(spot.bonusTimer);

  const spotBox = spot.getBoundingClientRect();
  const heroBox = hero.getBoundingClientRect();
  const x = spotBox.left - heroBox.left + spotBox.width / 2;
  const y = spotBox.top - heroBox.top + spotBox.height / 2;
  burst(hero, { count: 16, colours: ["#6cc4e8", "var(--tomato)", "var(--paper)"], minDistance: 30, maxDistance: 80, pixel: true, x, y });

  const pop = document.createElement("span");
  pop.className = "score-pop";
  pop.textContent = "+1";
  pop.style.left = `${x}px`;
  pop.style.top = `${y - 10}px`;
  pop.addEventListener("animationend", () => pop.remove());
  hero.append(pop);
  sfx.bonus();

  bonusScore = Math.min(99, bonusScore + 1);
  bonusRow.hidden = false;
  bonusScoreDisplay.textContent = `+${pad(bonusScore)}`;
  bonusScoreDisplay.classList.remove("is-bumped");
  void bonusScoreDisplay.offsetWidth;
  bonusScoreDisplay.classList.add("is-bumped");
  if (!spinning) setTicker(`BONUS ITEM CAUGHT ✦ +1 ✦ ${pad(bonusScore)} ON YOUR QUEST LOG`);

  spot.classList.remove("is-live");
}

bonusSpots.forEach((spot) => spot.addEventListener("click", () => catchBonus(spot)));
// A resize or phone rotation moves the text, so clear items placed for the old layout.
window.addEventListener("resize", () => {
  bonusSpots.forEach((spot) => {
    window.clearTimeout(spot.bonusTimer);
    spot.classList.remove("is-live", "is-leaving");
  });
});
window.setTimeout(spawnBonus, 900);

const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
let konamiIndex = 0;

document.addEventListener("keydown", (event) => {
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  konamiIndex = key === konami[konamiIndex] ? konamiIndex + 1 : key === konami[0] ? 1 : 0;
  if (konamiIndex === konami.length) {
    konamiIndex = 0;
    const on = document.body.classList.toggle("cheat-mode");
    credits = on ? 99 : 3;
    renderReadouts();
    setTicker(on ? "CHEAT CODE ACCEPTED ✦ 99 CREDITS ✦ YOU STILL HAVE TO ACTUALLY GO OUTSIDE" : "CHEATS OFF ✦ BACK TO HONEST LIVING");
    sfx.win();
  }

  const typing = event.target.closest?.("button, a, input, textarea, select, [contenteditable]");
  if (event.code === "Space" && !typing && !event.repeat) {
    event.preventDefault();
    spin();
  }
});

// Start on a random ticket, or on the one a friend shared.
const params = new URLSearchParams(location.search);
const sharedQuest = params.has("quest") ? sidequests[Number(params.get("quest"))] : undefined;
const startQuest = sharedQuest ?? randomItem(sidequests);
const startCompanion = sharedQuest && ["solo", "friends"].includes(params.get("with")) ? params.get("with") : companionFor("surprise");
lastQuest = startQuest;
fillTicket(startQuest, startCompanion);
reels.forEach((reel) => (reel.querySelector(".reel-content").textContent = startQuest[reel.dataset.reel]));

renderSoundToggle();
renderReadouts();
setTicker(sharedQuest ? "A FRIEND SENT YOU THIS QUEST ✦ IT'S ON THE TICKET BELOW ✦ OR PRESS START FOR YOUR OWN" : idleLines[0]);
