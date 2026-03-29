/* ═══════════════════════════════════════════════════════════
   SCRIPT.JS — Buthaya Mind Reader
   Trees: Animal (~130 nodes), Item (~130 nodes),
          Character (~200+ nodes incl. scientists, leaders,
          historical figures, actors, musicians, athletes)
═══════════════════════════════════════════════════════════ */

/* ─────────────────── STARS ─────────────────── */
(function () {
  const c = document.getElementById('stars'), ctx = c.getContext('2d');
  let W, H, stars = [];
  function resize() { W = c.width = innerWidth; H = c.height = innerHeight; buildStars(); }
  function buildStars() {
    stars = [];
    const n = Math.floor(W * H / 2200);
    for (let i = 0; i < n; i++) {
      stars.push({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * .9 + .2,
        a: Math.random(), da: Math.random() * .003 + .001,
        speed: Math.random() * .04
      });
    }
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      s.a += s.da; if (s.a > 1 || s.a < 0) s.da = -s.da;
      s.y -= s.speed; if (s.y < 0) s.y = H;
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(220,200,255,${s.a})`; ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize', resize);
  resize(); draw();
})();

/* ─────────────────── CONFETTI ─────────────────── */
function fireConfetti() {
  const c = document.getElementById('confetti'), ctx = c.getContext('2d');
  c.width = innerWidth; c.height = innerHeight;
  const pieces = [];
  const colors = ['#f0c060', '#c880ff', '#60ffaa', '#ff8888', '#80ccff', '#ffff80'];
  for (let i = 0; i < 90; i++) {
    pieces.push({
      x: Math.random() * innerWidth, y: -20,
      vx: (Math.random() - 0.5) * 7, vy: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      w: Math.random() * 8 + 4, h: Math.random() * 14 + 6,
      rot: Math.random() * 360, vr: (Math.random() - 0.5) * 9,
      life: 1
    });
  }
  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, c.width, c.height);
    pieces.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.12; p.rot += p.vr; p.life -= 0.012;
      ctx.save(); ctx.globalAlpha = Math.max(0, p.life);
      ctx.translate(p.x, p.y); ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.color; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    frame++;
    if (frame < 170) requestAnimationFrame(animate);
    else ctx.clearRect(0, 0, c.width, c.height);
  }
  animate();
}

/* ═══════════════════════════════════════════════════════════
   ANIMAL TREE  (~130 nodes)
═══════════════════════════════════════════════════════════ */
const ANIMAL_TREE = {
  start: { q: "Does it have a backbone (is it a vertebrate)?", yes: "vertebrate", no: "invertebrate" },

  /* ── INVERTEBRATES ── */
  invertebrate: { q: "Does it have more than 6 legs or tentacles?", yes: "manyLegs", no: "fewLegs" },
  manyLegs: { q: "Does it live mostly in the ocean?", yes: "seaInvert", no: "landInvert" },
  seaInvert: { q: "Does it have a hard outer shell?", yes: "shellSeaA", no: "softSeaA" },
  shellSeaA: { q: "Is it known as popular seafood?", yes: "crab", no: "shellfish2" },
  crab: { q: "Does it walk sideways?", yes: "guessCrab", no: "guessLobster" },
  shellfish2: { q: "Does it have two shells (bivalve)?", yes: "guessClam", no: "guessSnail" },
  softSeaA: { q: "Does it have 8 arms?", yes: "guessOctopus", no: "tenArms" },
  tenArms: { q: "Can it squirt ink to escape?", yes: "guessSquid", no: "guessJellyfish" },
  landInvert: { q: "Does it have 8 legs (is it an arachnid)?", yes: "arachnid", no: "manyLegLand" },
  arachnid: { q: "Does it have a curved stinging tail?", yes: "guessScorpion", no: "spider2" },
  spider2: { q: "Is it large and hairy?", yes: "guessTarantula", no: "guessSpider" },
  manyLegLand: { q: "Does it have more than 20 legs?", yes: "guessCentipede", no: "guessMillipede" },
  fewLegs: { q: "Is it an insect (exactly 6 legs)?", yes: "insect", no: "wormType" },
  insect: { q: "Can it fly?", yes: "flyingInsect", no: "crawlingInsect" },
  flyingInsect: { q: "Does it produce something people eat or use (honey, silk)?", yes: "usefulInsect", no: "plainFlier" },
  usefulInsect: { q: "Does it make honey?", yes: "guessBee", no: "guessSilkworm" },
  plainFlier: { q: "Is it attracted to light at night?", yes: "nightFlier", no: "dayFlier" },
  nightFlier: { q: "Does it bite and spread disease?", yes: "guessMosquito", no: "guessMoth" },
  dayFlier: { q: "Does it have large colorful patterned wings?", yes: "guessButterfly", no: "guessDragonfly" },
  crawlingInsect: { q: "Is it known for living in large colonies underground?", yes: "guessAnt", no: "beetle2" },
  beetle2: { q: "Does it have a hard shell covering its wings?", yes: "guessBeetle", no: "guessCockroach" },
  wormType: { q: "Does it live underground in soil?", yes: "guessEarthworm", no: "guessSlug" },

  /* ── VERTEBRATES ── */
  vertebrate: { q: "Is it a mammal (warm-blooded, has fur or hair)?", yes: "mammal", no: "nonMammal" },

  nonMammal: { q: "Can it fly (is it a bird)?", yes: "bird", no: "nonBird" },
  bird: { q: "Is it a bird of prey (hunts animals)?", yes: "raptor", no: "otherBird" },
  raptor: { q: "Does it hunt at night?", yes: "guessOwl", no: "raptor2" },
  raptor2: { q: "Is it the national symbol of the USA?", yes: "guessEagle", no: "guessHawk" },
  otherBird: { q: "Can it swim or spend time on water?", yes: "waterBird", no: "landBird" },
  waterBird: { q: "Is it large and completely black and white and cannot fly?", yes: "guessPenguin", no: "waterBird2" },
  waterBird2: { q: "Is it a very large graceful white bird?", yes: "guessSwan", no: "guessDuck" },
  landBird: { q: "Is it kept on farms for eggs or meat?", yes: "farmBird", no: "wildBird" },
  farmBird: { q: "Does it crow loudly in the morning?", yes: "guessRooster", no: "guessChicken" },
  wildBird: { q: "Can it mimic human speech?", yes: "guessParrot", no: "wildBird2" },
  wildBird2: { q: "Is it known for its spectacular tail display?", yes: "guessPeacock", no: "wildBird3" },
  wildBird3: { q: "Is it a small common city bird?", yes: "guessPigeon", no: "guessCrow" },

  nonBird: { q: "Does it live mainly in water and breathe through gills (is it a fish)?", yes: "fish", no: "amphibReptile" },
  fish: { q: "Is it a large ocean predator?", yes: "bigFish", no: "smallFish" },
  bigFish: { q: "Does it have rows of razor-sharp teeth?", yes: "guessShark", no: "guessTuna" },
  smallFish: { q: "Is it commonly kept in home aquariums?", yes: "guessGoldfish", no: "guessSalmon" },
  amphibReptile: { q: "Is it cold-blooded with scaly skin (a reptile)?", yes: "reptile", no: "amphibian" },
  reptile: { q: "Does it have no legs (is it a snake)?", yes: "snake", no: "legReptile" },
  snake: { q: "Is it venomous?", yes: "guessCobraViper", no: "guessBoaPython" },
  legReptile: { q: "Does it carry a hard shell on its back?", yes: "guessTurtle", no: "legReptile2" },
  legReptile2: { q: "Is it a very large reptile that lives near tropical rivers?", yes: "guessCrocodile", no: "guessLizard" },
  amphibian: { q: "Does it hop and croak near water?", yes: "guessFrog", no: "guessSalamander" },

  /* ── MAMMALS ── */
  mammal: { q: "Does it live with humans regularly (domestic/pet animal)?", yes: "domestic", no: "wildMammal" },
  domestic: { q: "Is it the single most popular pet in the world?", yes: "catDog", no: "otherDomestic" },
  catDog: { q: "Does it bark?", yes: "guessDog", no: "guessCat" },
  otherDomestic: { q: "Is it a farm animal?", yes: "farmMammal", no: "smallPet" },
  farmMammal: { q: "Does it produce milk for humans?", yes: "milkAnimal", no: "workFarm" },
  milkAnimal: { q: "Is it the most common dairy animal worldwide?", yes: "guessCow", no: "milkAnimal2" },
  milkAnimal2: { q: "Is it smaller than a cow and known for climbing?", yes: "guessGoat", no: "guessSheep" },
  workFarm: { q: "Is it used for riding?", yes: "rideAnimal", no: "guessPig" },
  rideAnimal: { q: "Does it have a flowing mane?", yes: "guessHorse", no: "guessDonkey" },
  smallPet: { q: "Does it run on a wheel inside a cage?", yes: "guessHamster", no: "smallPet2" },
  smallPet2: { q: "Does it have long ears and hop?", yes: "guessRabbit", no: "guessBudgie" },

  wildMammal: { q: "Is it native to Africa or Asia primarily?", yes: "tropicalMammal", no: "tempMammal" },
  tropicalMammal: { q: "Is it the largest land animal on Earth?", yes: "guessElephant", no: "bigCat" },
  bigCat: { q: "Is it a large cat (lion, tiger, leopard, cheetah)?", yes: "bigCatType", no: "primate" },
  bigCatType: { q: "Does it have stripes?", yes: "guessTiger", no: "bigCat2" },
  bigCat2: { q: "Does it have spots?", yes: "guessLeopard", no: "guessLion" },
  primate: { q: "Is it a primate (ape or monkey)?", yes: "primate2", no: "african" },
  primate2: { q: "Is it the largest primate?", yes: "guessGorilla", no: "primate3" },
  primate3: { q: "Is it known for being very similar to humans?", yes: "guessChimpanzee", no: "guessMonkey" },
  african: { q: "Does it have an extremely long neck?", yes: "guessGiraffe", no: "african2" },
  african2: { q: "Is it large with a horn on its nose?", yes: "guessRhino", no: "african3" },
  african3: { q: "Does it look like a horse with black-and-white stripes?", yes: "guessZebra", no: "guessHippo" },

  tempMammal: { q: "Is it found in cold or Arctic regions?", yes: "arcticMammal", no: "forestMammal" },
  arcticMammal: { q: "Is it a large white bear?", yes: "guessPolarBear", no: "arctic2" },
  arctic2: { q: "Does it swim in cold water (seal or walrus)?", yes: "guessSeal", no: "guessArcticFox" },
  forestMammal: { q: "Is it a bear?", yes: "bear2", no: "otherForest" },
  bear2: { q: "Is it black and white and eats bamboo?", yes: "guessPanda", no: "guessGrizzly" },
  otherForest: { q: "Does it have antlers?", yes: "guessDeer", no: "otherForest2" },
  otherForest2: { q: "Is it a dog-like predator that hunts in packs?", yes: "guessWolf", no: "otherForest3" },
  otherForest3: { q: "Is it a small clever reddish animal?", yes: "guessFox", no: "defenseAnimal" },
  defenseAnimal: { q: "Does it roll into a ball when threatened?", yes: "guessHedgehog", no: "guessPorcupine" },

  /* ── LEAF GUESSES ── */
  guessCrab: { guess: "Crab" }, guessLobster: { guess: "Lobster" }, guessClam: { guess: "Clam" },
  guessSnail: { guess: "Snail" }, guessOctopus: { guess: "Octopus" }, guessSquid: { guess: "Squid" },
  guessJellyfish: { guess: "Jellyfish" }, guessScorpion: { guess: "Scorpion" },
  guessTarantula: { guess: "Tarantula" }, guessSpider: { guess: "Spider" },
  guessCentipede: { guess: "Centipede" }, guessMillipede: { guess: "Millipede" },
  guessBee: { guess: "Bee" }, guessSilkworm: { guess: "Silkworm" },
  guessMosquito: { guess: "Mosquito" }, guessMoth: { guess: "Moth" },
  guessButterfly: { guess: "Butterfly" }, guessDragonfly: { guess: "Dragonfly" },
  guessAnt: { guess: "Ant" }, guessBeetle: { guess: "Beetle" }, guessCockroach: { guess: "Cockroach" },
  guessEarthworm: { guess: "Earthworm" }, guessSlug: { guess: "Slug" },
  guessOwl: { guess: "Owl" }, guessEagle: { guess: "Eagle" }, guessHawk: { guess: "Hawk" },
  guessPenguin: { guess: "Penguin" }, guessSwan: { guess: "Swan" }, guessDuck: { guess: "Duck" },
  guessRooster: { guess: "Rooster" }, guessChicken: { guess: "Chicken" },
  guessParrot: { guess: "Parrot" }, guessPeacock: { guess: "Peacock" },
  guessPigeon: { guess: "Pigeon" }, guessCrow: { guess: "Crow" },
  guessShark: { guess: "Shark" }, guessTuna: { guess: "Tuna" },
  guessGoldfish: { guess: "Goldfish" }, guessSalmon: { guess: "Salmon" },
  guessCobraViper: { guess: "Cobra" }, guessBoaPython: { guess: "Python" },
  guessTurtle: { guess: "Turtle" }, guessCrocodile: { guess: "Crocodile" }, guessLizard: { guess: "Lizard" },
  guessFrog: { guess: "Frog" }, guessSalamander: { guess: "Salamander" },
  guessDog: { guess: "Dog" }, guessCat: { guess: "Cat" },
  guessCow: { guess: "Cow" }, guessGoat: { guess: "Goat" }, guessSheep: { guess: "Sheep" },
  guessPig: { guess: "Pig" }, guessHorse: { guess: "Horse" }, guessDonkey: { guess: "Donkey" },
  guessHamster: { guess: "Hamster" }, guessRabbit: { guess: "Rabbit" }, guessBudgie: { guess: "Budgerigar" },
  guessElephant: { guess: "Elephant" }, guessTiger: { guess: "Tiger" },
  guessLeopard: { guess: "Leopard" }, guessLion: { guess: "Lion" },
  guessGorilla: { guess: "Gorilla" }, guessChimpanzee: { guess: "Chimpanzee" }, guessMonkey: { guess: "Monkey" },
  guessGiraffe: { guess: "Giraffe" }, guessRhino: { guess: "Rhinoceros" },
  guessZebra: { guess: "Zebra" }, guessHippo: { guess: "Hippopotamus" },
  guessPolarBear: { guess: "Polar Bear" }, guessSeal: { guess: "Seal" }, guessArcticFox: { guess: "Arctic Fox" },
  guessPanda: { guess: "Giant Panda" }, guessGrizzly: { guess: "Grizzly Bear" },
  guessDeer: { guess: "Deer" }, guessWolf: { guess: "Wolf" },
  guessFox: { guess: "Fox" }, guessHedgehog: { guess: "Hedgehog" }, guessPorcupine: { guess: "Porcupine" }
};

/* ═══════════════════════════════════════════════════════════
   ITEM TREE  (~130 nodes)
═══════════════════════════════════════════════════════════ */
const ITEM_TREE = {
  start: { q: "Is it something a person can physically hold or carry?", yes: "holdable", no: "notHoldable" },

  notHoldable: { q: "Is it a large structure or place?", yes: "largeStructure", no: "notHoldable2" },
  notHoldable2: { q: "Is it a vehicle?", yes: "bigVehicle", no: "guessTime" },
  largeStructure: { q: "Is it a building where people live or stay?", yes: "guessHouse", no: "otherBuilding" },
  otherBuilding: { q: "Is it a place of worship?", yes: "guessTemple", no: "guessBuilding" },
  bigVehicle: { q: "Does it travel on water?", yes: "guessShip", no: "bigVehicle2" },
  bigVehicle2: { q: "Does it fly through the sky?", yes: "guessAirplane", no: "guessRocket" },
  guessTime: { guess: "Clock" },

  holdable: { q: "Is it an electronic device?", yes: "electronic", no: "nonElectronic" },

  /* ── ELECTRONICS ── */
  electronic: { q: "Does it have a screen?", yes: "hasScreen", no: "noScreen" },
  hasScreen: { q: "Can you make phone calls with it?", yes: "phone2", no: "screenOnly" },
  phone2: { q: "Is it a modern touchscreen smartphone?", yes: "guessSmartphone", no: "guessLandline" },
  screenOnly: { q: "Can you hold it in one hand comfortably?", yes: "handheld", no: "bigScreen" },
  handheld: { q: "Is it primarily for reading digital books?", yes: "guessEreader", no: "guessTablet" },
  bigScreen: { q: "Is it a thin portable computer for work?", yes: "guessLaptop", no: "guessMonitor" },
  noScreen: { q: "Does it produce or play sound?", yes: "audioDevice", no: "inputDevice" },
  audioDevice: { q: "Does it sit inside the ear canal?", yes: "guessEarbuds", no: "audioDevice2" },
  audioDevice2: { q: "Is it worn over both ears on the head?", yes: "guessHeadphones", no: "guessBtSpeaker" },
  inputDevice: { q: "Is it used to control a computer cursor?", yes: "guessMouse", no: "guessRemote" },

  /* ── NON-ELECTRONICS ── */
  nonElectronic: { q: "Is it made of fabric and worn on the body?", yes: "clothing", no: "notClothing" },
  clothing: { q: "Is it worn on the feet?", yes: "footwear", no: "otherClothing" },
  footwear: { q: "Is it casual or sports footwear?", yes: "guessSneakers", no: "footwear2" },
  footwear2: { q: "Does it have a high heel?", yes: "guessHeels", no: "guessSandals" },
  otherClothing: { q: "Is it worn on the upper body?", yes: "upperBody", no: "lowerBody" },
  upperBody: { q: "Does it have buttons down the front?", yes: "guessShirt", no: "upperBody2" },
  upperBody2: { q: "Is it thick and worn for warmth as an outer layer?", yes: "guessJacket", no: "guessTshirt" },
  lowerBody: { q: "Does it cover both legs separately?", yes: "guessTrousers", no: "guessDress" },

  notClothing: { q: "Is it used in a kitchen?", yes: "kitchenItem", no: "notKitchen" },
  kitchenItem: { q: "Is it used for cutting food?", yes: "guessKnife", no: "kitchen2" },
  kitchen2: { q: "Is it a container for liquid?", yes: "liquidContainer", no: "kitchen3" },
  liquidContainer: { q: "Is it used for hot drinks like tea or coffee?", yes: "guessMug", no: "guessBottle" },
  kitchen3: { q: "Is it a flat cooking vessel (pan, pot)?", yes: "guessPan", no: "guessCuttingBoard" },

  notKitchen: { q: "Is it a hand tool or power tool for building/fixing?", yes: "tool", no: "notTool" },
  tool: { q: "Is it powered by electricity?", yes: "powerTool", no: "handTool" },
  powerTool: { q: "Is it used to drill holes?", yes: "guessDrill", no: "guessSaw" },
  handTool: { q: "Does it drive nails or screws?", yes: "hammerScrewdriver", no: "handTool2" },
  hammerScrewdriver: { q: "Does it have a rotating tip?", yes: "guessScrewdriver", no: "guessHammer" },
  handTool2: { q: "Is it used to measure length?", yes: "guessTape", no: "guessWrench" },

  notTool: { q: "Is it used for writing or drawing?", yes: "writingItem", no: "notWriting" },
  writingItem: { q: "Does it use liquid ink?", yes: "inkItem", no: "dryWrite" },
  inkItem: { q: "Is it a standard ballpoint pen?", yes: "guessPen", no: "guessMarker" },
  dryWrite: { q: "Does it need to be sharpened?", yes: "guessPencil", no: "guessCrayon" },

  notWriting: { q: "Is it used for personal hygiene or grooming?", yes: "hygiene", no: "notHygiene" },
  hygiene: { q: "Is it used in the shower or bath?", yes: "bathItem", no: "hygieneDesk" },
  bathItem: { q: "Is it used to clean teeth?", yes: "guessToothbrush", no: "bathItem2" },
  bathItem2: { q: "Is it a liquid for hair?", yes: "guessShampoo", no: "guessTowel" },
  hygieneDesk: { q: "Does it spray fragrance?", yes: "guessPerfume", no: "guessMirror" },

  notHygiene: { q: "Is it used for sport or exercise?", yes: "sportItem", no: "notSport" },
  sportItem: { q: "Is it a ball?", yes: "ball2", no: "sportGear" },
  ball2: { q: "Is it used in a team sport?", yes: "teamBall", no: "soloball" },
  teamBall: { q: "Is it kicked with the foot?", yes: "guessFootball", no: "teamBall2" },
  teamBall2: { q: "Is it thrown through a hoop?", yes: "guessBasketball", no: "guessCricketBall" },
  soloball: { q: "Is it used in tennis?", yes: "guessTennisBall", no: "guessGolfBall" },
  sportGear: { q: "Is it used for swimming?", yes: "guessGoggles", no: "guessWeights" },

  notSport: { q: "Is it a toy or board game?", yes: "toy", no: "notToy" },
  toy: { q: "Is it a board game or card game?", yes: "boardGame", no: "physicalToy" },
  boardGame: { q: "Does it involve building a property empire?", yes: "guessMonopoly", no: "boardGame2" },
  boardGame2: { q: "Does it use a board with 64 black and white squares?", yes: "guessChess", no: "guessCardGame" },
  physicalToy: { q: "Is it made of interlocking plastic bricks?", yes: "guessLego", no: "physToy2" },
  physToy2: { q: "Is it a soft stuffed animal?", yes: "guessTeddy", no: "guessDoll" },

  notToy: { q: "Is it a personal transport vehicle?", yes: "transport", no: "notTransport" },
  transport: { q: "Does it have two wheels?", yes: "twoWheel", no: "transport2" },
  twoWheel: { q: "Does it have a motor or engine?", yes: "guessMotorbike", no: "guessBicycle" },
  transport2: { q: "Is it a personal car?", yes: "guessCar", no: "guessScooter" },

  notTransport: { q: "Is it a book or paper-based item?", yes: "bookOrPaper", no: "misc" },
  bookOrPaper: { q: "Does it tell a fictional story?", yes: "guessNovel", no: "bookOrPaper2" },
  bookOrPaper2: { q: "Is it used to organise notes or papers?", yes: "guessNotebook", no: "guessNewspaper" },
  misc: { q: "Is it used to store money or cards?", yes: "guessWallet", no: "guessPlant" },

  /* ── LEAVES ── */
  guessHouse: { guess: "House" }, guessTemple: { guess: "Temple" }, guessBuilding: { guess: "Office Building" },
  guessShip: { guess: "Ship" }, guessAirplane: { guess: "Airplane" }, guessRocket: { guess: "Rocket" },
  guessSmartphone: { guess: "Smartphone" }, guessLandline: { guess: "Telephone" },
  guessEreader: { guess: "E-reader" }, guessTablet: { guess: "Tablet" },
  guessLaptop: { guess: "Laptop" }, guessMonitor: { guess: "Computer Monitor" },
  guessEarbuds: { guess: "Earbuds" }, guessHeadphones: { guess: "Headphones" }, guessBtSpeaker: { guess: "Bluetooth Speaker" },
  guessMouse: { guess: "Computer Mouse" }, guessRemote: { guess: "TV Remote" },
  guessSneakers: { guess: "Sneakers" }, guessHeels: { guess: "High Heels" }, guessSandals: { guess: "Sandals" },
  guessShirt: { guess: "Shirt" }, guessJacket: { guess: "Jacket" }, guessTshirt: { guess: "T-Shirt" },
  guessTrousers: { guess: "Trousers" }, guessDress: { guess: "Dress" },
  guessKnife: { guess: "Kitchen Knife" }, guessMug: { guess: "Mug" }, guessBottle: { guess: "Water Bottle" },
  guessPan: { guess: "Frying Pan" }, guessCuttingBoard: { guess: "Cutting Board" },
  guessDrill: { guess: "Power Drill" }, guessSaw: { guess: "Saw" },
  guessScrewdriver: { guess: "Screwdriver" }, guessHammer: { guess: "Hammer" },
  guessTape: { guess: "Tape Measure" }, guessWrench: { guess: "Wrench" },
  guessPen: { guess: "Pen" }, guessMarker: { guess: "Marker" }, guessPencil: { guess: "Pencil" }, guessCrayon: { guess: "Crayon" },
  guessToothbrush: { guess: "Toothbrush" }, guessShampoo: { guess: "Shampoo" }, guessTowel: { guess: "Towel" },
  guessPerfume: { guess: "Perfume" }, guessMirror: { guess: "Mirror" },
  guessFootball: { guess: "Football" }, guessBasketball: { guess: "Basketball" }, guessCricketBall: { guess: "Cricket Ball" },
  guessTennisBall: { guess: "Tennis Ball" }, guessGolfBall: { guess: "Golf Ball" },
  guessGoggles: { guess: "Swimming Goggles" }, guessWeights: { guess: "Dumbbells" },
  guessMonopoly: { guess: "Monopoly" }, guessChess: { guess: "Chess Set" }, guessCardGame: { guess: "Playing Cards" },
  guessLego: { guess: "LEGO" }, guessTeddy: { guess: "Teddy Bear" }, guessDoll: { guess: "Action Figure / Doll" },
  guessMotorbike: { guess: "Motorbike" }, guessBicycle: { guess: "Bicycle" },
  guessCar: { guess: "Car" }, guessScooter: { guess: "Scooter" },
  guessNovel: { guess: "Novel" }, guessNotebook: { guess: "Notebook" }, guessNewspaper: { guess: "Newspaper" },
  guessWallet: { guess: "Wallet" }, guessPlant: { guess: "Indoor Plant" }
};

/* ═══════════════════════════════════════════════════════════
   CHARACTER TREE  (~200+ nodes)
═══════════════════════════════════════════════════════════ */
const CHARACTER_TREE = {

  start: { q: "Is this a REAL person (alive or historical) rather than a fictional character?", yes: "realPerson", no: "fictional" },

  realPerson: { q: "Is this person primarily known for science, invention, or discovery?", yes: "scientist", no: "notScientist" },

  scientist: { q: "Are they from the 20th or 21st century?", yes: "modernScientist", no: "historicScientist" },

  modernScientist: { q: "Are they known mainly for physics or mathematics?", yes: "modernPhysics", no: "modernOther" },
  modernPhysics: { q: "Did they develop the theory of relativity?", yes: "guessEinstein", no: "modernPhysics2" },
  modernPhysics2: { q: "Did they work on quantum mechanics (Hawking, Bohr, Feynman)?", yes: "modernPhysics3", no: "guessCurie" },
  modernPhysics3: { q: "Did they write 'A Brief History of Time' and use a wheelchair?", yes: "guessHawking", no: "guessBohr" },
  modernOther: { q: "Are they known for computing or the internet?", yes: "computerPerson", no: "modernBio" },
  computerPerson: { q: "Did they invent the World Wide Web?", yes: "guessTimBerners", no: "computerPerson2" },
  computerPerson2: { q: "Are they a co-founder of Apple or Microsoft?", yes: "techFounder", no: "guessAlanTuring" },
  techFounder: { q: "Did they co-found Apple and are known for the iPhone?", yes: "guessSteve", no: "guessBillGates" },
  modernBio: { q: "Did they discover the structure of DNA?", yes: "guessCrick", no: "modernBio2" },
  modernBio2: { q: "Are they known for working with endangered animals or gorillas?", yes: "guessDian", no: "guessJaneGoodall" },

  historicScientist: { q: "Are they from the 1600s or 1700s (early modern science)?", yes: "earlyScientist", no: "ancientScientist" },
  earlyScientist: { q: "Did they discover gravity and the laws of motion?", yes: "guessNewton", no: "earlyScientist2" },
  earlyScientist2: { q: "Did they build some of the first practical steam engines or electrical experiments?", yes: "guessWatt", no: "guessGalileo" },
  ancientScientist: { q: "Did they work in the 1800s?", yes: "victorianScientist", no: "guessArchimedes" },
  victorianScientist: { q: "Did they develop the theory of evolution?", yes: "guessDarwin", no: "victorianScientist2" },
  victorianScientist2: { q: "Did they invent the telephone or the lightbulb?", yes: "inventorV", no: "guessFaraday" },
  inventorV: { q: "Did they invent the telephone?", yes: "guessBell", no: "guessEdison" },

  notScientist: { q: "Are they known for art, music, literature, or entertainment?", yes: "artEntertain", no: "notArtist" },

  artEntertain: { q: "Are they primarily a musician or singer?", yes: "musician", no: "artEntertain2" },
  musician: { q: "Are they considered one of the greatest musicians of all time?", yes: "legendMusician", no: "modernMusician" },
  legendMusician: { q: "Are they known as the 'King of Rock and Roll'?", yes: "guessElvis", no: "legend2" },
  legend2: { q: "Are they from The Beatles?", yes: "beatles", no: "legend3" },
  beatles: { q: "Were they the main songwriter with round glasses?", yes: "guessLennon", no: "guessMcCartney" },
  legend3: { q: "Are they known as the 'King of Pop' and famous for moonwalking?", yes: "guessMJackson", no: "legend4" },
  legend4: { q: "Did they perform at Woodstock and are known for guitar wizardry?", yes: "guessHendrix", no: "guessElton" },
  modernMusician: { q: "Are they famous worldwide in the last 20 years?", yes: "modernMus2", no: "guessBowie" },
  modernMus2: { q: "Are they a female pop superstar?", yes: "femalePopStar", no: "maleMod" },
  femalePopStar: { q: "Are they known for albums about breakups and 'Eras Tour'?", yes: "guessTaylor", no: "femPop2" },
  femPop2: { q: "Are they from Barbados and known for 'Umbrella'?", yes: "guessRihanna", no: "guessBeyonce" },
  maleMod: { q: "Are they a rapper who is one of the best-selling of all time?", yes: "guessEminem", no: "guessEd" },

  artEntertain2: { q: "Are they an actor or film director?", yes: "actor", no: "artEntertain3" },
  actor: { q: "Are they one of the most famous actors of all time?", yes: "famousActor", no: "modernActor" },
  famousActor: { q: "Did they appear in Charlie Chaplin films or old black-and-white movies?", yes: "guessChaplin", no: "famousActor2" },
  famousActor2: { q: "Are they known for a famous director role (Spielberg, Kubrick, Hitchcock)?", yes: "director", no: "guessMarlon" },
  director: { q: "Did they direct Jurassic Park and ET?", yes: "guessSpielberg", no: "guessHitchcock" },
  modernActor: { q: "Are they known for superhero films?", yes: "guessRDowney", no: "guessDeCaprio" },
  artEntertain3: { q: "Are they a famous painter or visual artist?", yes: "painter", no: "guessShakespeare" },
  painter: { q: "Did they live during the Renaissance?", yes: "renaissance", no: "modernPainter" },
  renaissance: { q: "Did they paint the Mona Lisa and invent many things?", yes: "guessLeonardo", no: "guessMichelangelo" },
  modernPainter: { q: "Are they known for Cubism and a blue period?", yes: "guessPicasso", no: "guessVanGogh" },

  notArtist: { q: "Are they known for politics, leadership, or changing the world?", yes: "leader", no: "athlete" },

  leader: { q: "Are they from the ancient or medieval world (before 1500)?", yes: "ancientLeader", no: "modernLeader" },
  ancientLeader: { q: "Are they a philosopher, thinker, or teacher?", yes: "philosopher", no: "ancientWarrior" },
  philosopher: { q: "Are they from ancient Greece?", yes: "greekPhilosopher", no: "eastPhilosopher" },
  greekPhilosopher: { q: "Did they teach Plato and drink hemlock?", yes: "guessSocrates", no: "greek2" },
  greek2: { q: "Did they write about logic and taught Alexander the Great?", yes: "guessAristotle", no: "guessPlato" },
  eastPhilosopher: { q: "Are they the founder of Confucianism?", yes: "guessConfucius", no: "guessBuddha" },
  ancientWarrior: { q: "Did they conquer most of the known world by age 30?", yes: "guessAlexander", no: "ancientWarrior2" },
  ancientWarrior2: { q: "Are they from ancient Rome?", yes: "rome", no: "ancientOther" },
  rome: { q: "Were they the most famous Roman emperor or general?", yes: "guessCaesar", no: "guessCleopatra" },
  ancientOther: { q: "Are they known for leading an army across the Alps with elephants?", yes: "guessHannibal", no: "guessSunTzu" },

  modernLeader: { q: "Are they from the 20th or 21st century?", yes: "c20Leader", no: "c19Leader" },
  c20Leader: { q: "Did they lead a nation or empire in a World War?", yes: "wwLeader", no: "peacefulLeader" },
  wwLeader: { q: "Were they a dictator or authoritarian leader during WWII?", yes: "ww2dictator", no: "wwAllied" },
  ww2dictator: { q: "Were they the Nazi leader of Germany?", yes: "guessHitler", no: "ww2dict2" },
  ww2dict2: { q: "Were they the leader of Fascist Italy?", yes: "guessMussol", no: "guessStalin" },
  wwAllied: { q: "Were they the British Prime Minister during WWII?", yes: "guessChurchill", no: "wwAllied2" },
  wwAllied2: { q: "Were they the US president who led the Allied forces in WWII?", yes: "guessRoosevelt", no: "guessDeGaulle" },
  peacefulLeader: { q: "Are they known for a non-violent freedom movement?", yes: "peacefulLeader2", no: "modernPres" },
  peacefulLeader2: { q: "Did they lead India's independence using non-violence?", yes: "guessGandhi", no: "peaceLeader3" },
  peaceLeader3: { q: "Did they fight apartheid in South Africa and become president?", yes: "guessMandela", no: "guessMLK" },
  modernPres: { q: "Are they a US President from the last 30 years?", yes: "usPresident", no: "otherLeader" },
  usPresident: { q: "Were they the first Black President of the USA?", yes: "guessObama", no: "usPresident2" },
  usPresident2: { q: "Are they known for large hair and 'Make America Great Again'?", yes: "guessTrump", no: "guessBiden" },
  otherLeader: { q: "Are they a tech billionaire known for Tesla and SpaceX?", yes: "guessMusk", no: "otherLeader2" },
  otherLeader2: { q: "Are they known for founding Amazon and being one of the richest people ever?", yes: "guessBezos", no: "otherLeader3" },
  otherLeader3: { q: "Are they a female leader of a country?", yes: "femaleLeader", no: "guessNapoleon" },
  femaleLeader: { q: "Are they a famous British queen from the Tudor period?", yes: "guessElizabeth1", no: "femaleLeader2" },
  femaleLeader2: { q: "Were they the first female Prime Minister of the UK?", yes: "guessThatcher", no: "guessAngelaMerkel" },
  c19Leader: { q: "Did they free slaves and lead the US during the Civil War?", yes: "guessLincoln", no: "c19Leader2" },
  c19Leader2: { q: "Did they conquer much of Europe as Emperor of France?", yes: "guessNapoleon", no: "guessQueenVic" },

  athlete: { q: "Are they a sports star?", yes: "sports", no: "guessUnknown" },
  sports: { q: "Do they play football (soccer)?", yes: "soccer", no: "notSoccer" },
  soccer: { q: "Are they widely considered the greatest of all time?", yes: "soccerGOAT", no: "soccerMod" },
  soccerGOAT: { q: "Are they from Argentina?", yes: "guessMessi", no: "guessRonaldo" },
  soccerMod: { q: "Are they a young French superstar?", yes: "guessMbappe", no: "guessBrazilian" },
  notSoccer: { q: "Do they play basketball?", yes: "basketball", no: "notBasketball" },
  basketball: { q: "Are they widely considered the GOAT of basketball?", yes: "guessMJ", no: "guessLeBron" },
  notBasketball: { q: "Do they play cricket?", yes: "cricket", no: "notCricket" },
  cricket: { q: "Are they an Indian batsman considered the greatest of their era?", yes: "guessTendulkar", no: "guessVirat" },
  notCricket: { q: "Are they a boxer?", yes: "boxer", no: "otherSport" },
  boxer: { q: "Did they call themselves 'The Greatest' and float like a butterfly?", yes: "guessAli", no: "guessTyson" },
  otherSport: { q: "Are they a tennis player?", yes: "tennis", no: "otherSport2" },
  tennis: { q: "Are they known as one of the greatest of all time in men's tennis?", yes: "guessFederer", no: "guessSerena" },
  otherSport2: { q: "Are they known for being the fastest human ever (sprinting)?", yes: "guessBolt", no: "guessWoods" },

  fictional: { q: "Is the character from a movie or TV show?", yes: "screenChar", no: "bookComic" },

  screenChar: { q: "Is it animated (cartoon, anime, or CGI character)?", yes: "animated", no: "liveAction" },

  animated: { q: "Is it from a Japanese anime series?", yes: "anime", no: "westernAnim" },
  anime: { q: "Is the character known for incredible physical combat abilities?", yes: "animeAction", no: "animeOther" },
  animeAction: { q: "Is the character a ninja who dreams of being Hokage?", yes: "guessNaruto", no: "animeAction2" },
  animeAction2: { q: "Can the character power up to extreme levels (Super Saiyan, etc.)?", yes: "guessGoku", no: "animeAction3" },
  animeAction3: { q: "Are they a pirate captain who can stretch their body?", yes: "guessLuffy", no: "animeAction4" },
  animeAction4: { q: "Do they hunt demons with a checkered outfit?", yes: "guessTanjiro", no: "guessZoro" },
  animeOther: { q: "Is the character from a magical girl or isekai series?", yes: "guessSailorMoon", no: "guessYugi" },

  westernAnim: { q: "Is it from a Disney or Pixar film?", yes: "disney", no: "otherAnim" },
  disney: { q: "Is the character a princess or lead hero in a fairy tale?", yes: "disneyHero", no: "disneyOther" },
  disneyHero: { q: "Can they control ice and snow?", yes: "guessElsa", no: "disneyHero2" },
  disneyHero2: { q: "Do they talk to animals and forest creatures?", yes: "guessSnowWhite", no: "disneyHero3" },
  disneyHero3: { q: "Are they set in a Pacific Island culture and chosen by the ocean?", yes: "guessMoana", no: "guessAladdin" },
  disneyOther: { q: "Is it a talking animal?", yes: "talkAnim", no: "disneySide" },
  talkAnim: { q: "Is it a lion cub who becomes king?", yes: "guessSimba", no: "talkAnim2" },
  talkAnim2: { q: "Is it a small clownfish?", yes: "guessNemo", no: "talkAnim3" },
  talkAnim3: { q: "Is it a small robot left alone on Earth?", yes: "guessWalle", no: "guessBuzz" },
  disneySide: { q: "Is it an iconic mouse?", yes: "guessMickey", no: "guessWoodyTS" },

  otherAnim: { q: "Is it from a long-running adult animated series?", yes: "adultAnim", no: "otherAnim2" },
  adultAnim: { q: "Is the character bright yellow (skin or body)?", yes: "yellowAnim", no: "adultAnim2" },
  yellowAnim: { q: "Is the character an overweight dad who loves donuts?", yes: "guessHomer", no: "guessSpongebob" },
  adultAnim2: { q: "Is the character from Family Guy?", yes: "guessPeter", no: "guessCartman" },
  otherAnim2: { q: "Is the character a superhero in animated form?", yes: "guessSpideyAnim", no: "guessTomJerry" },

  liveAction: { q: "Is the character a superhero?", yes: "superhero", no: "notSuper" },
  superhero: { q: "Is the character from Marvel?", yes: "marvel", no: "dc" },
  marvel: { q: "Are they known for a powered iron suit?", yes: "guessIronMan", no: "marvel2" },
  marvel2: { q: "Do they carry a vibranium shield?", yes: "guessCap", no: "marvel3" },
  marvel3: { q: "Were they bitten by a radioactive spider?", yes: "guessSpidey", no: "marvel4" },
  marvel4: { q: "Are they a giant green rage monster?", yes: "guessHulk", no: "marvel5" },
  marvel5: { q: "Do they wield a magical hammer named Mjolnir?", yes: "guessThor", no: "marvel6" },
  marvel6: { q: "Are they a king of an African nation with vibranium?", yes: "guessBlackPanther", no: "guessDrStrange" },
  dc: { q: "Can they fly and are nearly invulnerable (from Krypton)?", yes: "guessSuperman", no: "dc2" },
  dc2: { q: "Do they dress as a bat and live in Gotham City?", yes: "guessBatman", no: "dc3" },
  dc3: { q: "Are they the fastest person alive?", yes: "guessFlash", no: "dc4" },
  dc4: { q: "Are they an Amazonian warrior princess?", yes: "guessWonderWoman", no: "guessAquaman" },

  notSuper: { q: "Is the character from a fantasy or magical world?", yes: "fantasy", no: "realWorldFic" },
  fantasy: { q: "Is the character a wizard, witch, or uses magic?", yes: "wizard", no: "fantasy2" },
  wizard: { q: "Are they from the Harry Potter series?", yes: "hpChar", no: "wizard2" },
  hpChar: { q: "Are they the main hero with a lightning bolt scar?", yes: "guessHP", no: "hpChar2" },
  hpChar2: { q: "Are they known for bushy hair and extreme intelligence?", yes: "guessHermione", no: "guessVoldemort" },
  wizard2: { q: "Are they an old wise wizard who says 'you shall not pass'?", yes: "guessGandalf", no: "guessWitch" },
  fantasy2: { q: "Is the setting medieval with dragons and noble houses?", yes: "guessJonSnow", no: "guessAragorn" },

  realWorldFic: { q: "Is the character a spy or secret agent?", yes: "guessJamesBond", no: "realWorldFic2" },
  realWorldFic2: { q: "Are they a brilliant detective?", yes: "detective", no: "realWorldFic3" },
  detective: { q: "Do they live at 221B Baker Street?", yes: "guessSherlock", no: "guessHercule" },
  realWorldFic3: { q: "Are they from science fiction set in space?", yes: "scifi", no: "guessForrest" },
  scifi: { q: "Is the character from Star Wars?", yes: "starwars", no: "scifi2" },
  starwars: { q: "Do they wear a black mask and breathe loudly (villain)?", yes: "guessVader", no: "sw2" },
  sw2: { q: "Are they a young Jedi from a desert planet?", yes: "guessLuke", no: "sw3" },
  sw3: { q: "Are they a small green Jedi master who speaks in reverse?", yes: "guessYoda", no: "guessHanSolo" },
  scifi2: { q: "Is the character from Star Trek?", yes: "guessPicard", no: "guessNeo" },

  bookComic: { q: "Is it from a comic book or graphic novel?", yes: "comic", no: "bookOnly" },
  comic: { q: "Is it a villain?", yes: "guessJoker", no: "guessSpideyComic" },
  bookOnly: { q: "Is the character from a classic novel (before 1950)?", yes: "classicBook", no: "modernBook" },
  classicBook: { q: "Are they from a Dickens novel?", yes: "guessScrooges", no: "classicBook2" },
  classicBook2: { q: "Are they from 19th-century fiction (Pride & Prejudice, etc.)?", yes: "guessDarcy", no: "guessHolmesBook" },
  modernBook: { q: "Are they from a fantasy book series (LOTR, Narnia, etc.)?", yes: "guessGollum", no: "guessAnimalFarm" },

  /* ── LEAF GUESSES — Real People ── */
  guessEinstein: { guess: "Albert Einstein" },
  guessHawking: { guess: "Stephen Hawking" },
  guessBohr: { guess: "Niels Bohr" },
  guessCurie: { guess: "Marie Curie" },
  guessTimBerners: { guess: "Tim Berners-Lee" },
  guessAlanTuring: { guess: "Alan Turing" },
  guessSteve: { guess: "Steve Jobs" },
  guessBillGates: { guess: "Bill Gates" },
  guessCrick: { guess: "Francis Crick" },
  guessDian: { guess: "Dian Fossey" },
  guessJaneGoodall: { guess: "Jane Goodall" },
  guessNewton: { guess: "Isaac Newton" },
  guessWatt: { guess: "James Watt" },
  guessGalileo: { guess: "Galileo Galilei" },
  guessArchimedes: { guess: "Archimedes" },
  guessDarwin: { guess: "Charles Darwin" },
  guessBell: { guess: "Alexander Graham Bell" },
  guessEdison: { guess: "Thomas Edison" },
  guessFaraday: { guess: "Michael Faraday" },
  guessElvis: { guess: "Elvis Presley" },
  guessLennon: { guess: "John Lennon" },
  guessMcCartney: { guess: "Paul McCartney" },
  guessMJackson: { guess: "Michael Jackson" },
  guessHendrix: { guess: "Jimi Hendrix" },
  guessElton: { guess: "Elton John" },
  guessBowie: { guess: "David Bowie" },
  guessTaylor: { guess: "Taylor Swift" },
  guessRihanna: { guess: "Rihanna" },
  guessBeyonce: { guess: "Beyoncé" },
  guessEminem: { guess: "Eminem" },
  guessEd: { guess: "Ed Sheeran" },
  guessChaplin: { guess: "Charlie Chaplin" },
  guessMarlon: { guess: "Marlon Brando" },
  guessSpielberg: { guess: "Steven Spielberg" },
  guessHitchcock: { guess: "Alfred Hitchcock" },
  guessRDowney: { guess: "Robert Downey Jr." },
  guessDeCaprio: { guess: "Leonardo DiCaprio" },
  guessLeonardo: { guess: "Leonardo da Vinci" },
  guessMichelangelo: { guess: "Michelangelo" },
  guessPicasso: { guess: "Pablo Picasso" },
  guessVanGogh: { guess: "Vincent van Gogh" },
  guessShakespeare: { guess: "William Shakespeare" },
  guessSocrates: { guess: "Socrates" },
  guessAristotle: { guess: "Aristotle" },
  guessPlato: { guess: "Plato" },
  guessConfucius: { guess: "Confucius" },
  guessBuddha: { guess: "Siddhartha Gautama (Buddha)" },
  guessAlexander: { guess: "Alexander the Great" },
  guessCaesar: { guess: "Julius Caesar" },
  guessCleopatra: { guess: "Cleopatra" },
  guessHannibal: { guess: "Hannibal Barca" },
  guessSunTzu: { guess: "Sun Tzu" },
  guessHitler: { guess: "Adolf Hitler" },
  guessMussol: { guess: "Benito Mussolini" },
  guessStalin: { guess: "Joseph Stalin" },
  guessChurchill: { guess: "Winston Churchill" },
  guessRoosevelt: { guess: "Franklin D. Roosevelt" },
  guessDeGaulle: { guess: "Charles de Gaulle" },
  guessGandhi: { guess: "Mahatma Gandhi" },
  guessMandela: { guess: "Nelson Mandela" },
  guessMLK: { guess: "Martin Luther King Jr." },
  guessObama: { guess: "Barack Obama" },
  guessTrump: { guess: "Donald Trump" },
  guessBiden: { guess: "Joe Biden" },
  guessMusk: { guess: "Elon Musk" },
  guessBezos: { guess: "Jeff Bezos" },
  guessElizabeth1: { guess: "Queen Elizabeth I" },
  guessThatcher: { guess: "Margaret Thatcher" },
  guessAngelaMerkel: { guess: "Angela Merkel" },
  guessLincoln: { guess: "Abraham Lincoln" },
  guessNapoleon: { guess: "Napoleon Bonaparte" },
  guessQueenVic: { guess: "Queen Victoria" },
  guessMessi: { guess: "Lionel Messi" },
  guessRonaldo: { guess: "Cristiano Ronaldo" },
  guessMbappe: { guess: "Kylian Mbappé" },
  guessBrazilian: { guess: "Neymar Jr." },
  guessMJ: { guess: "Michael Jordan" },
  guessLeBron: { guess: "LeBron James" },
  guessTendulkar: { guess: "Sachin Tendulkar" },
  guessVirat: { guess: "Virat Kohli" },
  guessAli: { guess: "Muhammad Ali" },
  guessTyson: { guess: "Mike Tyson" },
  guessFederer: { guess: "Roger Federer" },
  guessSerena: { guess: "Serena Williams" },
  guessBolt: { guess: "Usain Bolt" },
  guessWoods: { guess: "Tiger Woods" },
  guessUnknown: { guess: "A famous person" },

  /* ── FICTIONAL LEAVES ── */
  guessNaruto: { guess: "Naruto Uzumaki" },
  guessGoku: { guess: "Son Goku" },
  guessLuffy: { guess: "Monkey D. Luffy" },
  guessTanjiro: { guess: "Tanjiro Kamado" },
  guessZoro: { guess: "Roronoa Zoro" },
  guessSailorMoon: { guess: "Sailor Moon" },
  guessYugi: { guess: "Yugi Muto" },
  guessElsa: { guess: "Elsa (Frozen)" },
  guessSnowWhite: { guess: "Snow White" },
  guessMoana: { guess: "Moana" },
  guessAladdin: { guess: "Aladdin" },
  guessSimba: { guess: "Simba (The Lion King)" },
  guessNemo: { guess: "Nemo" },
  guessWalle: { guess: "WALL-E" },
  guessBuzz: { guess: "Buzz Lightyear" },
  guessMickey: { guess: "Mickey Mouse" },
  guessWoodyTS: { guess: "Woody (Toy Story)" },
  guessHomer: { guess: "Homer Simpson" },
  guessSpongebob: { guess: "SpongeBob SquarePants" },
  guessPeter: { guess: "Peter Griffin" },
  guessCartman: { guess: "Eric Cartman" },
  guessSpideyAnim: { guess: "Spider-Man (animated)" },
  guessTomJerry: { guess: "Tom (Tom & Jerry)" },
  guessIronMan: { guess: "Iron Man" },
  guessCap: { guess: "Captain America" },
  guessSpidey: { guess: "Spider-Man" },
  guessHulk: { guess: "Hulk" },
  guessThor: { guess: "Thor" },
  guessBlackPanther: { guess: "Black Panther" },
  guessDrStrange: { guess: "Doctor Strange" },
  guessSuperman: { guess: "Superman" },
  guessBatman: { guess: "Batman" },
  guessFlash: { guess: "The Flash" },
  guessWonderWoman: { guess: "Wonder Woman" },
  guessAquaman: { guess: "Aquaman" },
  guessHP: { guess: "Harry Potter" },
  guessHermione: { guess: "Hermione Granger" },
  guessVoldemort: { guess: "Voldemort" },
  guessGandalf: { guess: "Gandalf" },
  guessWitch: { guess: "The White Witch" },
  guessJonSnow: { guess: "Jon Snow" },
  guessAragorn: { guess: "Aragorn" },
  guessJamesBond: { guess: "James Bond" },
  guessSherlock: { guess: "Sherlock Holmes" },
  guessHercule: { guess: "Hercule Poirot" },
  guessForrest: { guess: "Forrest Gump" },
  guessVader: { guess: "Darth Vader" },
  guessLuke: { guess: "Luke Skywalker" },
  guessYoda: { guess: "Yoda" },
  guessHanSolo: { guess: "Han Solo" },
  guessPicard: { guess: "Captain Picard" },
  guessNeo: { guess: "Neo (The Matrix)" },
  guessJoker: { guess: "The Joker" },
  guessSpideyComic: { guess: "Spider-Man" },
  guessScrooges: { guess: "Ebenezer Scrooge" },
  guessDarcy: { guess: "Mr. Darcy" },
  guessHolmesBook: { guess: "Sherlock Holmes" },
  guessGollum: { guess: "Gollum" },
  guessAnimalFarm: { guess: "Napoleon (Animal Farm)" }
};

/* ═══════════════════════════════════════════════════════════
   TREE MAP
═══════════════════════════════════════════════════════════ */
const TREES = { animal: ANIMAL_TREE, item: ITEM_TREE, character: CHARACTER_TREE };
const TREE_LABELS = { animal: "🐾 Animal", item: "📦 Object", character: "🧙 Character" };

/* ═══════════════════════════════════════════════════════════
   GAME STATE
═══════════════════════════════════════════════════════════ */
let category = null;
let currentNodeId = 'start';
let questionCount = 0;
let done = false;
let questionHistory = [];

// Confirmation flow state
let confirmState = {
  active: false,
  prelimGuess: '',
  confirmQuestions: [],      // [{q, expectedYes: true}]  — 2 AI-generated questions
  confirmAnswers: [],        // answers collected so far
  currentConfirmIdx: 0
};

// Deep-dive AI flow state
let deepDiveState = {
  active: false,
  aiQuestions: [],           // extra questions from AI when unsure
  aiAnswers: [],
  currentIdx: 0
};

const orbScene   = document.getElementById('orbScene');
const thinkLabel = document.getElementById('thinkLabel');
const gameEl     = document.getElementById('game');

function setOrb(state, msg) {
  orbScene.className = 'orb-scene ' + (state || '');
  thinkLabel.innerHTML = msg
    ? `${msg} <span class="dots"><span>·</span><span>·</span><span>·</span></span>`
    : '';
}

function esc(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* ═══════════════════════════════════════════════════════════
   SCREENS
═══════════════════════════════════════════════════════════ */
function showIntro() {
  category = null; currentNodeId = 'start'; questionCount = 0; done = false; questionHistory = [];
  confirmState = { active: false, prelimGuess: '', confirmQuestions: [], confirmAnswers: [], currentConfirmIdx: 0 };
  deepDiveState = { active: false, aiQuestions: [], aiAnswers: [], currentIdx: 0 };
  setOrb('', '');
  gameEl.innerHTML = `
    <div class="card">
      <p class="intro-text">Think of something in your mind.</p>
      <p class="intro-subtext">An animal you know · An everyday object · A character or person<br>Buthaya will read your thoughts through the cosmic orb.</p>
      <div class="cat-grid">
        <button class="cat-btn" onclick="startCategory('animal')">
          <span class="cat-icon">🐾</span>Animal
        </button>
        <button class="cat-btn" onclick="startCategory('item')">
          <span class="cat-icon">📦</span>Object
        </button>
        <button class="cat-btn" onclick="startCategory('character')">
          <span class="cat-icon">🧙</span>Character
        </button>
      </div>
    </div>
  `;
}

function startCategory(cat) {
  category = cat;
  currentNodeId = 'start';
  questionCount = 0;
  done = false;
  questionHistory = [];
  confirmState = { active: false, prelimGuess: '', confirmQuestions: [], confirmAnswers: [], currentConfirmIdx: 0 };
  deepDiveState = { active: false, aiQuestions: [], aiAnswers: [], currentIdx: 0 };
  setOrb('thinking', 'Connecting to your mind');
  setTimeout(askNode, 800);
}

function askNode() {
  if (done) return;
  const tree = TREES[category];
  const node = tree[currentNodeId];
  if (!node) { beginConfirmationPhase("Something mysterious"); return; }
  if (node.guess !== undefined) { beginConfirmationPhase(node.guess); return; }
  showQuestion(node.q, currentNodeId);
}

/* ═══════════════════════════════════════════════════════════
   QUESTION DISPLAY
═══════════════════════════════════════════════════════════ */
function showQuestion(question, nodeId) {
  questionCount++;
  setOrb('', '');
  const pct = Math.min(Math.round(questionCount / 20 * 100), 100);

  gameEl.innerHTML = `
    <div class="card">
      <div class="q-meta">${esc(TREE_LABELS[category])} · Question ${questionCount}</div>
      <div class="q-num">${questionCount}</div>
      <div class="q-text">${esc(question)}</div>
      <div class="ans-grid">
        <button class="ans-btn btn-yes"   onclick="answer('yes','${esc(nodeId)}')">✓ Yes</button>
        <button class="ans-btn btn-no"    onclick="answer('no','${esc(nodeId)}')">✗ No</button>
        <button class="ans-btn btn-prob"  onclick="answer('yes','${esc(nodeId)}')">Probably yes</button>
        <button class="ans-btn btn-probn" onclick="answer('no','${esc(nodeId)}')">Probably not</button>
        <button class="ans-btn btn-dk"    onclick="answer('unknown','${esc(nodeId)}')">I'm not sure</button>
      </div>
      <div class="prog-wrap">
        <div class="prog-header"><span>Progress</span><span>${pct}%</span></div>
        <div class="prog-track"><div class="prog-fill" style="width:${pct}%"></div></div>
      </div>
    </div>
  `;
}

/* ═══════════════════════════════════════════════════════════
   ANSWER HANDLER
═══════════════════════════════════════════════════════════ */
function answer(direction, nodeId) {
  const tree = TREES[category];
  const node = tree[nodeId];
  if (!node) { beginConfirmationPhase("Something mysterious"); return; }

  questionHistory.push({ q: node.q, a: direction });

  let nextId;
  if (direction === 'yes')     nextId = node.yes;
  else if (direction === 'no') nextId = node.no;
  else                          nextId = Math.random() > 0.5 ? node.yes : node.no;

  if (!nextId) { beginConfirmationPhase("Something unique"); return; }

  currentNodeId = nextId;
  const nextNode = tree[nextId];

  if (nextNode && nextNode.guess !== undefined) {
    setOrb('guessing', 'I sense something...');
    setTimeout(() => beginConfirmationPhase(nextNode.guess), 700);
  } else {
    setOrb('thinking', 'Narrowing down...');
    setTimeout(askNode, 450);
  }
}


/* ═══════════════════════════════════════════════════════════
   BIT-X API HELPER
═══════════════════════════════════════════════════════════ */
async function askAI(prompt) {
  const res = await fetch('https://bit-x-apis.vercel.app/askai?q=' + encodeURIComponent(prompt));
  const data = await res.json();
  return (data.response || '').trim();
}

/* ═══════════════════════════════════════════════════════════
   PHASE 2: CONFIRMATION — Ask AI for 2 confirm questions
═══════════════════════════════════════════════════════════ */
async function beginConfirmationPhase(prelimGuess) {
  if (done) return;

  confirmState.prelimGuess = prelimGuess;
  confirmState.confirmAnswers = [];
  confirmState.currentConfirmIdx = 0;
  confirmState.active = true;

  setOrb('guessing', 'Focusing the orb');
  gameEl.innerHTML = `
    <div class="card">
      <div class="ai-thinking">
        <div class="spinner-ring"></div>
        <p class="ai-text">The orb is forming verification questions...</p>
      </div>
    </div>
  `;

  const historyText = questionHistory.map(h => '"' + h.q + '" -> ' + h.a).join(' | ');
  const prompt = 'You are Buthaya playing 20 Questions. Category: ' + category + '. Preliminary guess: "' + prelimGuess + '". Q&A so far: ' + (historyText || 'none') + '. Generate exactly 2 short yes/no confirmation questions that ONLY "' + prelimGuess + '" would answer YES to. Specific distinguishing traits only. Reply ONLY with valid JSON no markdown: {"q1":"<question 1>","q2":"<question 2>"}';

  try {
    const raw = await askAI(prompt);
    let parsed;
    try {
      parsed = JSON.parse(raw.replace(/```json|```/g, '').trim());
    } catch {
      parsed = {
        q1: 'Is it commonly known as "' + prelimGuess + '"?',
        q2: 'Would most people immediately recognise "' + prelimGuess + '" by that name?'
      };
    }
    confirmState.confirmQuestions = [parsed.q1, parsed.q2];
    showConfirmQuestion(0);
  } catch {
    confirmState.confirmQuestions = [
      'Is it commonly known as "' + prelimGuess + '"?',
      'Would most people immediately recognise "' + prelimGuess + '" by that name?'
    ];
    showConfirmQuestion(0);
  }
}

/* ═══════════════════════════════════════════════════════════
   SHOW A CONFIRMATION QUESTION
═══════════════════════════════════════════════════════════ */
function showConfirmQuestion(idx) {
  const q = confirmState.confirmQuestions[idx];
  const step = idx + 1;
  setOrb('thinking', 'Verifying...');

  gameEl.innerHTML = `
    <div class="card">
      <div class="q-meta">${esc(TREE_LABELS[category])} · Verification ${step} of 2</div>
      <div class="confirm-badge">🔮 Orb Verification</div>
      <div class="q-text" style="margin-top:.8rem">${esc(q)}</div>
      <div class="ans-grid" style="grid-template-columns:1fr 1fr">
        <button class="ans-btn btn-yes"  onclick="answerConfirm(true,${idx})">✓ Yes</button>
        <button class="ans-btn btn-no"   onclick="answerConfirm(false,${idx})">✗ No</button>
      </div>
      <div class="prog-wrap" style="margin-top:1.2rem">
        <div class="prog-header"><span>Verification Progress</span><span>${step * 50}%</span></div>
        <div class="prog-track"><div class="prog-fill" style="width:${step * 50}%"></div></div>
      </div>
    </div>
  `;
}

/* ═══════════════════════════════════════════════════════════
   HANDLE CONFIRMATION ANSWER
═══════════════════════════════════════════════════════════ */
function answerConfirm(isYes, idx) {
  confirmState.confirmAnswers.push({
    q: confirmState.confirmQuestions[idx],
    a: isYes ? 'yes' : 'no'
  });

  if (idx === 0) {
    showConfirmQuestion(1);
    return;
  }

  const bothYes = confirmState.confirmAnswers.every(a => a.a === 'yes');

  if (bothYes) {
    setOrb('guessing', 'I see it clearly now');
    setTimeout(() => doFinalReveal(confirmState.prelimGuess, true), 600);
  } else {
    setOrb('thinking', 'Re-focusing the cosmic signal');
    setTimeout(() => aiReGuessOrAskMore(), 600);
  }
}

/* ═══════════════════════════════════════════════════════════
   AI RE-GUESS OR ASK MORE QUESTIONS
   Called when at least 1 confirm answer was 'no'
═══════════════════════════════════════════════════════════ */
async function aiReGuessOrAskMore() {
  if (done) return;

  gameEl.innerHTML = `
    <div class="card">
      <div class="ai-thinking">
        <div class="spinner-ring"></div>
        <p class="ai-text">The orb is recalibrating across the cosmos...</p>
      </div>
    </div>
  `;

  const historyText = questionHistory.map(h => '"' + h.q + '" -> ' + h.a).join(' | ');
  const confirmText = confirmState.confirmAnswers.map(a => '"' + a.q + '" -> ' + a.a).join(' | ');
  const deepText = deepDiveState.aiAnswers.map(a => '"' + a.q + '" -> ' + a.a).join(' | ');

  const prompt = 'You are Buthaya playing 20 Questions. Category: ' + category + '. My guess "' + confirmState.prelimGuess + '" is likely WRONG - at least one verification was NO. ALL Q&A: ' + (historyText || 'none') + '. Verifications: ' + (confirmText || 'none') + '. ' + (deepText ? 'Extra Q&A: ' + deepText + '.' : '') + ' Analyse all carefully. If confident of a better specific guess reply: {"action":"guess","guess":"<name>"}. If you need more info reply: {"action":"ask","questions":["<q1>","<q2>","<q3>"]}. Be VERY specific (e.g. "Lionel Messi", "Laptop", "Naruto Uzumaki"). Do NOT repeat already-asked questions. Reply ONLY valid JSON no markdown no extra text.';

  try {
    const raw = await askAI(prompt);
    let parsed;
    try {
      parsed = JSON.parse(raw.replace(/```json|```/g, '').trim());
    } catch {
      parsed = { action: 'guess', guess: confirmState.prelimGuess };
    }

    if (parsed.action === 'guess' && parsed.guess) {
      setOrb('guessing', 'I see it now');
      setTimeout(() => doFinalReveal(parsed.guess, false), 600);
    } else if (parsed.action === 'ask' && Array.isArray(parsed.questions) && parsed.questions.length > 0) {
      deepDiveState.active = true;
      deepDiveState.aiQuestions = parsed.questions.filter(q => typeof q === 'string' && q.trim());
      deepDiveState.aiAnswers = [];
      deepDiveState.currentIdx = 0;
      showDeepDiveQuestion(0);
    } else {
      setOrb('guessing', 'Making final call');
      setTimeout(() => doFinalReveal(confirmState.prelimGuess, false), 400);
    }
  } catch {
    setOrb('guessing', 'Making final call');
    setTimeout(() => doFinalReveal(confirmState.prelimGuess, false), 400);
  }
}

/* ═══════════════════════════════════════════════════════════
   SHOW A DEEP-DIVE AI QUESTION
═══════════════════════════════════════════════════════════ */
function showDeepDiveQuestion(idx) {
  const q = deepDiveState.aiQuestions[idx];
  const total = deepDiveState.aiQuestions.length;
  questionCount++;
  setOrb('thinking', 'Searching deeper...');

  gameEl.innerHTML = `
    <div class="card">
      <div class="q-meta">${esc(TREE_LABELS[category])} · Deep Search ${idx + 1} of ${total}</div>
      <div class="confirm-badge" style="background:linear-gradient(135deg,#6040c0,#a060ff)">🌌 Cosmic Deep Scan</div>
      <div class="q-num">${questionCount}</div>
      <div class="q-text">${esc(q)}</div>
      <div class="ans-grid">
        <button class="ans-btn btn-yes"   onclick="answerDeepDive(true,${idx})">✓ Yes</button>
        <button class="ans-btn btn-no"    onclick="answerDeepDive(false,${idx})">✗ No</button>
        <button class="ans-btn btn-dk"    onclick="answerDeepDive(null,${idx})">I'm not sure</button>
      </div>
    </div>
  `;
}

/* ═══════════════════════════════════════════════════════════
   HANDLE DEEP-DIVE ANSWER
═══════════════════════════════════════════════════════════ */
function answerDeepDive(isYes, idx) {
  const ans = isYes === null ? 'unknown' : (isYes ? 'yes' : 'no');
  deepDiveState.aiAnswers.push({
    q: deepDiveState.aiQuestions[idx],
    a: ans
  });

  const nextIdx = idx + 1;
  if (nextIdx < deepDiveState.aiQuestions.length) {
    showDeepDiveQuestion(nextIdx);
  } else {
    setOrb('guessing', 'The pattern is clear now');
    setTimeout(() => aiFinalGuessFromDeepDive(), 700);
  }
}

/* ═══════════════════════════════════════════════════════════
   AI FINAL GUESS AFTER DEEP-DIVE
═══════════════════════════════════════════════════════════ */
async function aiFinalGuessFromDeepDive() {
  if (done) return;

  gameEl.innerHTML = `
    <div class="card">
      <div class="ai-thinking">
        <div class="spinner-ring"></div>
        <p class="ai-text">The cosmos reveals all...</p>
      </div>
    </div>
  `;

  const historyText = questionHistory.map(h => '"' + h.q + '" -> ' + h.a).join(' | ');
  const confirmText = confirmState.confirmAnswers.map(a => '"' + a.q + '" -> ' + a.a).join(' | ');
  const deepText = deepDiveState.aiAnswers.map(a => '"' + a.q + '" -> ' + a.a).join(' | ');

  const prompt = 'You are Buthaya playing 20 Questions. Category: ' + category + '. Original guess: "' + confirmState.prelimGuess + '". ALL Q&A collected: ' + (historyText || 'none') + '. Verifications: ' + (confirmText || 'none') + '. Deep scan: ' + (deepText || 'none') + '. Based on ALL answers make your BEST SPECIFIC final guess. Name the exact person, animal, object or character. What fits ALL yes answers and no answers? Reply ONLY with JSON: {"guess":"<specific final guess>"}';

  try {
    const raw = await askAI(prompt);
    let parsed;
    try {
      parsed = JSON.parse(raw.replace(/```json|```/g, '').trim());
    } catch {
      parsed = { guess: confirmState.prelimGuess };
    }
    setOrb('guessing', 'Final answer incoming');
    setTimeout(() => doFinalReveal(parsed.guess || confirmState.prelimGuess, false), 500);
  } catch {
    setOrb('guessing', 'Final answer incoming');
    setTimeout(() => doFinalReveal(confirmState.prelimGuess, false), 500);
  }
}

/* ═══════════════════════════════════════════════════════════
   FINAL REVEAL — AI generates mystical paragraph then shows guess
═══════════════════════════════════════════════════════════ */
async function doFinalReveal(finalGuess, highConfidence) {
  if (done) return;
  done = true;

  setOrb('guessing', 'Reading the cosmic signals');
  gameEl.innerHTML = `
    <div class="card">
      <div class="ai-thinking">
        <div class="spinner-ring"></div>
        <p class="ai-text">The orb is forming your answer...</p>
      </div>
    </div>
  `;

  const historyText = questionHistory.map(h => '"' + h.q + '" -> ' + h.a).join(' | ');
  const confirmText = confirmState.confirmAnswers.map(a => '"' + a.q + '" -> ' + a.a).join(' | ');
  const deepText = deepDiveState.aiAnswers.map(a => '"' + a.q + '" -> ' + a.a).join(' | ');

  const prompt = 'You are Buthaya, a mystical cosmic mind reader. Category: ' + category + '. You identified: "' + finalGuess + '". Confidence: ' + (highConfidence ? 'HIGH - both verifications passed' : 'MODERATE - used deep analysis') + '. Q&A trail: ' + (historyText || 'none') + '. Verifications: ' + (confirmText || 'none') + '. Deep scan: ' + (deepText || 'none') + '. Write a mystical 2-3 sentence paragraph describing "' + finalGuess + '" poetically - hint at traits without naming it directly. Under 65 words. Be evocative and mysterious. Output ONLY the paragraph, nothing else.';

  let paragraph = 'Through the swirling mists of the cosmos, the orb has focused its ancient sight upon your thoughts. I sense its presence clearly — something familiar and profound that has left its mark upon the universe.';

  try {
    const txt = await askAI(prompt);
    if (txt) paragraph = txt;
  } catch { /* use fallback paragraph */ }

  showGuess(finalGuess, paragraph, highConfidence);
}

/* ═══════════════════════════════════════════════════════════
   SHOW GUESS
═══════════════════════════════════════════════════════════ */
function showGuess(name, paragraph, highConfidence) {
  setOrb('', '');
  const imgUrl = 'https://bit-x-apis.vercel.app/aiimg2?q=' + encodeURIComponent(name);
  const confidenceBadge = highConfidence
    ? '<div class="confirm-badge" style="background:linear-gradient(135deg,#20a060,#40e090);margin-bottom:.8rem">✓ Verified by the Orb</div>'
    : '<div class="confirm-badge" style="background:linear-gradient(135deg,#8040c0,#c080ff);margin-bottom:.8rem">🌌 Cosmic Analysis</div>';

  gameEl.innerHTML = `
    <div class="card guess-reveal">
      <div class="guess-label">The orb reveals...</div>
      ${confidenceBadge}
      ${paragraph ? `<div class="para-card">${esc(paragraph)}</div>` : ''}
      <div class="guess-name">${esc(name)}</div>
      <div class="img-wrap" id="imgSlot">
        <div class="img-placeholder">🔮</div>
      </div>
      <div style="margin:1rem 0 .5rem;color:var(--muted);font-size:.95rem;font-style:italic">Was Buthaya correct?</div>
      <div class="btn-row">
        <button class="ans-btn btn-yes" onclick="winGame('${esc(name)}')">✨ Yes!</button>
        <button class="ans-btn btn-no"  onclick="loseGame()">Not quite...</button>
      </div>
    </div>
  `;

  const img = new Image();
  img.onload = () => {
    const slot = document.getElementById('imgSlot');
    if (slot) slot.innerHTML = '<img src="' + imgUrl + '" alt="' + esc(name) + '" loading="lazy">';
  };
  img.onerror = () => {};
  img.src = imgUrl;
}

/* ═══════════════════════════════════════════════════════════
   WIN / LOSE
═══════════════════════════════════════════════════════════ */
function winGame(name) {
  done = true;
  setOrb('', '');
  fireConfetti();
  gameEl.innerHTML = `
    <div class="card" style="animation: cardIn .5s cubic-bezier(.22,1,.36,1)">
      <span class="result-icon">🎉</span>
      <div class="result-title">The cosmic orb read your mind!</div>
      <div class="guess-name">${esc(name)}</div>
      <p class="result-body">Your thoughts resonated across the stars.<br>The universe held no secrets from Buthaya today.</p>
      <div class="btn-row">
        <button class="btn-primary" onclick="showIntro()">✦ Play Again</button>
      </div>
    </div>
  `;
}

function loseGame() {
  done = true;
  setOrb('', '');
  gameEl.innerHTML = `
    <div class="card">
      <span class="result-icon">🌌</span>
      <div class="result-title">The stars hid your secret...</div>
      <p class="result-body">Even the cosmic orb is sometimes humbled by the vast mystery of the human mind. The cosmos will study harder next time.</p>
      <div class="btn-row">
        <button class="btn-primary" onclick="showIntro()">✦ Play Again</button>
      </div>
    </div>
  `;
}

/* ─────────────────── START ─────────────────── */
showIntro();