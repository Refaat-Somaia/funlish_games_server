const wordPuzzleWords = {
  // Nature & Environment 🌿🌎
  Apple: "A sweet fruit that grows on trees.",
  Ocean: "A large body of saltwater.",
  River: "A natural flowing stream of water.",
  Mountain: "A large natural elevation of the earth's surface.",
  Rainbow: "A colorful arc in the sky after rain.",
  Sunflower: "A tall plant with a large yellow flower.",
  Desert: "A hot, dry, and sandy place.",
  Jungle: "A dense forest in a tropical area.",
  Volcano: "A mountain that can erupt with lava.",
  Waterfall: "A stream of water falling from a height.",
  Iceberg: "A large floating mass of ice in the ocean.",
  Tornado: "A violent spinning storm with strong winds.",
  Thunderstorm: "A storm with thunder, lightning, and rain.",
  Earthquake: "A sudden shaking of the Earth's surface.",
  Blizzard: "A severe snowstorm with strong winds.",
  Avalanche: "A large amount of snow or rocks falling suddenly.",
  Tsunami: "A giant sea wave caused by an earthquake.",
  Ecosystem:
    "A community of living organisms interacting with their environment.",
  Photosynthesis: "The process by which plants make food using sunlight.",

  // Animals 🐶🦁🐘
  Tiger: "A large wild cat with orange fur and black stripes.",
  Elephant: "A large, gray animal with a trunk.",
  Kangaroo: "A hopping animal found in Australia.",
  Giraffe: "A tall mammal with a long neck and spots.",
  Dolphin: "A smart sea creature known for jumping out of the water.",
  Penguin: "A flightless bird that lives in cold regions.",
  Octopus: "A sea animal with eight tentacles.",
  Shark: "A large fish with sharp teeth.",
  Parrot: "A colorful bird that can mimic sounds.",
  Butterfly: "An insect with colorful wings.",
  Dinosaur: "An extinct reptile that lived millions of years ago.",
  Cheetah: "The fastest land animal.",
  Crocodile: "A large reptile with a strong jaw and sharp teeth.",
  Whale: "A giant marine mammal that breathes through a blowhole.",
  Chameleon: "A lizard that can change its color.",

  // Objects & Everyday Items 🎒📱⌚
  Chair: "A piece of furniture to sit on.",
  Window: "An opening in a wall that lets light in.",
  Balloon: "A thin rubber bag filled with air or gas.",
  Bottle: "A container for liquids, usually with a narrow neck.",
  Guitar: "A musical instrument with strings.",
  Laptop: "A small portable computer.",
  Mirror: "A reflective surface to see yourself.",
  Pencil: "A tool used for writing or drawing.",
  Clock: "A device that shows time.",
  Bicycle: "A two-wheeled vehicle powered by pedaling.",
  Umbrella: "A tool used to protect from rain.",
  Telescope: "A tool used to see distant objects in space.",
  Microscope: "A tool to see very small objects.",
  Compass: "A tool used for finding directions.",
  Camera: "A device used to take pictures or videos.",
  Telephone: "A device used to talk to people far away.",
  Backpack: "A bag worn on the back to carry things.",
  Thermometer: "A tool used to measure temperature.",
  Calculator: "A device used to do math calculations.",
  Satellite: "An object that orbits a planet in space.",

  // Places 🏡🏫🌉
  School: "A place where students go to learn.",
  Hospital: "A place where sick people are treated.",
  Library: "A place where you can borrow and read books.",
  Playground: "A place for children to play.",
  Bakery: "A place where bread and cakes are made and sold.",
  Lighthouse: "A tower with a light to guide ships.",
  Castle: "A large, strong building for royalty.",
  Airport: "A place where airplanes take off and land.",
  Cinema: "A place where people watch movies.",
  Hotel: "A place where travelers can stay.",
  Kitchen: "A room where food is cooked.",
  Submarine: "A vehicle that travels underwater.",
  Stadium: "A large place where sports are played.",
  Museum: "A place where historical items are displayed.",
  PoliceStation: "A place where police officers work.",
  TrainStation: "A place where trains stop to pick up passengers.",

  // Professions 👨‍⚕️👩‍🏫👨‍🚀
  Doctor: "A person who treats sick people.",
  Teacher: "A person who helps students learn.",
  Firefighter: "A person who puts out fires.",
  Engineer: "A person who designs and builds things.",
  Astronaut: "A person who travels in space.",
  Scientist: "A person who studies and experiments.",
  Pilot: "A person who flies an airplane.",
  Mechanic: "A person who repairs machines and vehicles.",
  Chef: "A person who cooks food professionally.",
  Lawyer: "A person who studies and practices law.",
  Actor: "A person who performs in movies, TV, or theater.",
  Singer: "A person who sings songs professionally.",
  Author: "A person who writes books or articles.",
  Carpenter: "A person who builds wooden structures.",
  Magician: "A person who performs tricks and illusions.",

  // Space & Universe 🌌🚀✨
  Planet: "A large celestial body in space.",
  Star: "A bright point in the sky at night.",
  Galaxy: "A vast collection of stars and planets.",
  Asteroid: "A rocky object that orbits the sun.",
  Meteor: "A small body from space that enters Earth's atmosphere.",
  BlackHole: "A space region with gravity so strong that nothing can escape.",
  SpaceShuttle: "A vehicle used to travel into space.",
  Moon: "A natural satellite that orbits a planet.",
  Sun: "A giant star at the center of our solar system.",
  Orbit: "The path an object takes around another object in space.",

  // Festivals & Holidays 🎄🎉🎆

  Ramadan: "A month of fasting in Islam.",

  // Games & Sports 🏀⚽🎾
  Football: "A popular sport played with a round ball.",
  Basketball: "A sport where players try to score in a hoop.",
  Tennis: "A sport played with a racket and a ball.",
  Chess: "A strategy game played on a checkered board.",
  Baseball: "A game played with a bat and ball.",
  Hockey: "A sport played with a stick and puck.",
  Golf: "A sport where players hit a ball into a hole.",
  Marathon: "A long-distance running race.",
  Skating: "The activity of gliding on ice or wheels.",
  Boxing: "A sport where two opponents fight using their fists.",

  // Science & Inventions 🧪⚛️🛠️
  Electricity: "A form of energy that powers devices.",
  Gravity: "The force that pulls objects toward each other.",
  Magnet: "An object that attracts iron or steel.",
  Robot: "A machine designed to perform tasks.",
  Battery: "A device that stores and provides energy.",
  Antibiotic: "A medicine that kills bacteria.",
  Algorithm: "A step-by-step process to solve a problem.",
  Internet: "A global network connecting computers worldwide.",
};

function getRandomWord(list) {
  const keys = Object.keys(list);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return { word: randomKey, definition: list[randomKey] };
}

const verbSentences = {
  // === Simple Present (Habitual Actions) ===
  eat: "I _____ (eat) breakfast every morning.",
  drinks: "She _____ (drink) coffee before work.",
  "don't like": "They _____ (not like) spicy food.",
  walks: "He _____ (walk) to school every day.",
  "doesn't watch": "My dad _____ (not watch) TV often.",
  play: "We _____ (play) soccer on weekends.",
  rains: "It _____ (rain) a lot in April.",
  opens: "The store _____ (open) at 9 AM.",
  "don't understand": "I _____ (not understand) this math problem.",

  // === Present Continuous (Happening Now) ===
  "am studying": "I _____ (study) for my test right now.",
  "is raining": "Look! It _____ (rain) outside!",
  "are playing": "The kids _____ (play) in the park.",
  "isn't working": "My phone _____ (not work) properly.",
  "am cooking": "Mom _____ (cook) dinner at the moment.",
  "are watching": "We _____ (watch) a movie now.",
  "is sleeping": "The baby _____ (sleep) right now.",

  // === Past Simple (Completed Actions) ===
  went: "We _____ (go) to the beach yesterday.",
  ate: "I _____ (eat) pizza for lunch.",
  "didn't finish": "She _____ (not finish) her homework.",
  called: "He _____ (call) me last night.",
  broke: "Tom _____ (break) his arm last week.",
  "didn't see": "They _____ (not see) the accident.",
  wrote: "Shakespeare _____ (write) many plays.",

  // === Past Continuous (Interrupted Actions) ===
  "was sleeping": "I _____ (sleep) when you called.",
  "were studying": "They _____ (study) when the power went out.",
  "was cooking": "Mom _____ (cook) when the phone rang.",
  "weren't listening": "The students _____ (not listen) during class.",
  "was raining": "It _____ (rain) all day yesterday.",

  // === Future (Will/Going to) ===
  "will visit": "We _____ (visit) Grandma next week.",
  "won't be": "I _____ (not be) at school tomorrow.",
  "is going to rain": "Look at those clouds! It _____ (rain).",
  "are going to travel": "They _____ (travel) to Japan next month.",
  "will call": "She _____ (call) you later.",

  // === Present Perfect (Experiences/Unfinished Time) ===
  "have visited": "I _____ (visit) Paris three times.",
  "has finished": "She _____ (finish) her project.",
  "haven't seen": "We _____ (not see) that movie yet.",
  "has broken": "Someone _____ (break) the window!",
  "have lived": "They _____ (live) here since 2010.",

  // === Past Perfect (Before Another Past Action) ===
  "had left": "The train _____ (leave) before we arrived.",
  "had eaten": "She _____ (eat) before the party started.",
  "hadn't studied": "I _____ (not study) before the test.",
  "had finished": "By 8 PM, I _____ (finish) my homework.",
  "had never seen": "They _____ (never see) snow before last winter.",

  // === Mixed Tenses (For Comparison) ===
  "was walking":
    "I _____ (walk) home when I saw the accident. (Past Continuous)",
  "have walked": "I _____ (walk) this path many times. (Present Perfect)",
  walk: "I _____ (walk) to school every day. (Simple Present)",
  "will walk": "I _____ (walk) to school tomorrow. (Future)",
  "had walked": "I _____ (walk) home before it started raining. (Past Perfect)",

  // === 300+ Total Sentences (Expanded Examples) ===
  // Simple Present
  speaks: "Maria _____ (speak) Spanish fluently.",
  "don't know": "I _____ (not know) the answer.",
  works: "My brother _____ (work) at a hospital.",
  "doesn't play": "She _____ (not play) any instruments.",
  need: "You _____ (need) a passport to travel abroad.",

  // Present Continuous
  "am reading": "I _____ (read) a great book right now.",
  "is making": "Dad _____ (make) dinner in the kitchen.",
  "are moving": "They _____ (move) to a new house this week.",
  "isn't answering": "Why _____ he _____ (not answer) his phone?",
  "are visiting": "We _____ (visit) our grandparents today.",

  // Past Simple
  bought: "I _____ (buy) a new bike last summer.",
  "didn't go": "They _____ (not go) to the party.",
  saw: "We _____ (see) a great movie yesterday.",
  drove: "She _____ (drive) all the way to Chicago.",
  "didn't understand": "I _____ (not understand) the instructions.",

  // Past Continuous
  "were watching": "We _____ (watch) TV when the storm started.",
  "was reading": "She _____ (read) when the lights went out.",
  "weren't paying": "The students _____ (not pay) attention.",
  "was shining": "The sun _____ (shine) all day yesterday.",
  "were talking": "They _____ (talk) about their vacation plans.",

  // Future
  "will help": "I _____ (help) you with your project.",
  "won't forget": "We _____ (not forget) your birthday.",
  "are going to watch": "They _____ (watch) the game tonight.",
  "is going to snow": "The weather report says it _____ (snow) tomorrow.",
  "will be": "The exam _____ (be) next Friday.",

  // Present Perfect
  "have been": "I _____ (be) to Canada twice.",
  "has changed": "The city _____ (change) a lot since 2010.",
  "haven't decided": "We _____ (not decide) where to go yet.",
  "has lost": "John _____ (lose) his keys again.",
  "have known": "I _____ (know) Sarah since we were kids.",

  // Past Perfect
  "had already started": "The movie _____ (already start) when we arrived.",
  "had never tried": "I _____ (never try) sushi before last night.",
  "had left": "By the time I called, she _____ (leave).",
  "hadn't met": "They _____ (not meet) before the conference.",
  "had finished": "After I _____ (finish) my work, I went to bed.",

  // === More Examples ===
  // Simple Present
  "wakes up": "She _____ (wake up) at 7 AM every day.",
  "don't believe": "I _____ (not believe) in ghosts.",
  tastes: "This soup _____ (taste) delicious!",
  "doesn't fit": "This shirt _____ (not fit) me anymore.",
  costs: "A new laptop _____ (cost) a lot of money.",

  // Present Continuous
  "am writing": "I _____ (write) an email to my teacher.",
  "is improving": "Your English _____ (improve) quickly!",
  "are waiting": "We _____ (wait) for the bus right now.",
  "isn't feeling": "Mom _____ (not feel) well today.",
  "are building": "They _____ (build) a new school in our neighborhood.",

  // Past Simple
  forgot: "I _____ (forget) to bring my lunch today.",
  "didn't have": "We _____ (not have) time to finish.",
  took: "She _____ (take) a photo of the sunset.",
  met: "I _____ (meet) my best friend in kindergarten.",
  "didn't rain": "It _____ (not rain) at all last week.",

  // Past Continuous
  "was snowing": "It _____ (snow) when we left the house.",
  "were driving": "They _____ (drive) to the airport when they heard the news.",
  "was teaching": "Mr. Smith _____ (teach) math for 30 years before retiring.",
  "weren't looking": "I _____ (not look) when the accident happened.",
  "was shining": "The moon _____ (shine) brightly last night.",

  // Future
  "will arrive": "The train _____ (arrive) at 3:15 PM.",
  "won't believe": "You _____ (not believe) what happened!",
  "are going to study": "We _____ (study) together for the test.",
  "is going to be": "Tomorrow _____ (be) a busy day.",
  "will snow": "I think it _____ (snow) this weekend.",

  // Present Perfect
  "have finished": "We _____ (finish) our project finally!",
  "has broken": "My computer _____ (break) three times this year.",
  "haven't visited": "I _____ (not visit) the new museum yet.",
  "has grown": "Your hair _____ (grow) so long!",
  "have learned": "I _____ (learn) a lot in this class.",

  // Past Perfect
  "had eaten": "After we _____ (eat), we washed the dishes.",
  "hadn't seen": "I _____ (not see) that movie before last night.",
  "had already left": "When I got there, everyone _____ (already leave).",
  "had forgotten": "She realized she _____ (forget) her wallet at home.",
  "had been": "It was the best concert I _____ (be) to.",

  // === Additional Mixed Practice ===
  "was cooking": "I _____ (cook) dinner when you called. (Past Continuous)",
  "have cooked":
    "I _____ (cook) dinner every night this week. (Present Perfect)",
  cook: "I usually _____ (cook) pasta on Fridays. (Simple Present)",
  "will cook": "I _____ (cook) dinner tomorrow. (Future)",
  "had cooked": "I _____ (cook) dinner before they arrived. (Past Perfect)",

  "were studying":
    "They _____ (study) when the fire alarm rang. (Past Continuous)",
  "have studied": "We _____ (study) this topic before. (Present Perfect)",
  study: "They _____ (study) French at school. (Simple Present)",
  "will study": "She _____ (study) medicine in college. (Future)",
  "had studied":
    "He _____ (study) English before moving to London. (Past Perfect)",
};

const castleEscapeSentenceQuestions = {
  "Correct the sentence: 'She go to the market yesterday.'":
    "She went to the market yesterday.",
  "Correct the sentence: 'He don't like pizza.'": "He doesn't like pizza.",
  "Choose the correct form: 'I (was/were) very tired last night.'": "was",
  "Correct the sentence: 'She can sings beautifully.'":
    "She can sing beautifully.",
  "Correct the sentence: 'They was playing football when it started to rain.'":
    "They were playing football when it started to rain.",
  "Correct the sentence: 'The cat drinked all the milk.'":
    "The cat drank all the milk.",
  "Choose the correct word: 'He has (a/an) idea.'": "an",
  "Correct the sentence: 'She don't has any pencils.'":
    "She doesn't have any pencils.",
  "Correct the sentence: 'Me and John is going to the park.'":
    "John and I are going to the park.",
  "Correct the sentence: 'We seen that movie before.'":
    "We have seen that movie before.",
  "Correct the sentence: 'Him and his friend was late for class.'":
    "He and his friend were late for class.",
  "Correct the sentence: 'She were very excited about the trip.'":
    "She was very excited about the trip.",
  "Correct the sentence: 'They didn't knew the answer.'":
    "They didn't know the answer.",
  "Choose the correct form: 'The book is (more/much) interesting than the movie.'":
    "more",

  // New additions
  "Correct the sentence: 'There is many books on the shelf.'":
    "There are many books on the shelf.",
  "Correct the sentence: 'The team are winning the game.'":
    "The team is winning the game.",
  "Choose the correct form: 'Each of the students (has/have) a textbook.'":
    "has",
  "Correct the sentence: 'I goed to the store yesterday.'":
    "I went to the store yesterday.",
  "Correct the sentence: 'She writed a letter to her friend.'":
    "She wrote a letter to her friend.",
  "Choose the correct word: 'This is (their/there) new house.'": "their",
  "Correct the sentence: 'The children was playing in the garden.'":
    "The children were playing in the garden.",
  "Correct the sentence: 'He doesn't knows the answer.'":
    "He doesn't know the answer.",
  "Choose the correct form: 'Neither John nor Mary (is/are) coming.'": "is",
  "Correct the sentence: 'She has less friends than her sister.'":
    "She has fewer friends than her sister.",
  "Correct the sentence: 'The news are surprising.'": "The news is surprising.",
  "Choose the correct word: 'Would you like (some/any) coffee?'": "some",
  "Correct the sentence: 'I have been waiting since two hours.'":
    "I have been waiting for two hours.",
  "Correct the sentence: 'She look happy today.'": "She looks happy today.",
  "Choose the correct form: 'The police (is/are) investigating the case.'":
    "are",
  "Correct the sentence: 'I and my friend is going shopping.'":
    "My friend and I are going shopping.",
  "Correct the sentence: 'She don't like spicy food.'":
    "She doesn't like spicy food.",
  "Choose the correct word: 'This is (a/an) university.'": "a",
  "Correct the sentence: 'The data shows interesting trends.'":
    "The data show interesting trends.",
  "Correct the sentence: 'He run fast in the race.'":
    "He ran fast in the race.",
  "Choose the correct form: 'Mathematics (is/are) my favorite subject.'": "is",
  "Correct the sentence: 'The committee have made their decision.'":
    "The committee has made its decision.",
  "Correct the sentence: 'She speak three languages.'":
    "She speaks three languages.",
  "Choose the correct word: 'I have (less/fewer) books than you.'": "fewer",
  "Correct the sentence: 'The scissors is on the table.'":
    "The scissors are on the table.",
  "Correct the sentence: 'He have a new car.'": "He has a new car.",
  "Choose the correct form: 'The number of students (has/have) increased.'":
    "has",
  "Correct the sentence: 'She don't goes to the gym often.'":
    "She doesn't go to the gym often.",
  "Correct the sentence: 'The staff are happy with their new manager.'":
    "The staff is happy with its new manager.",
  "Choose the correct word: 'She is (taller/tallest) than her brother.'":
    "taller",
  "Correct the sentence: 'I has finished my homework.'":
    "I have finished my homework.",
  "Correct the sentence: 'The furniture are new.'": "The furniture is new.",
  "Choose the correct form: 'A pair of shoes (was/were) left outside.'": "was",
  "Correct the sentence: 'She don't has a pet.'": "She doesn't have a pet.",
  "Correct the sentence: 'The information are correct.'":
    "The information is correct.",
  "Choose the correct word: 'She is the (older/oldest) in her family.'":
    "oldest",
  "Correct the sentence: 'He don't plays tennis.'": "He doesn't play tennis.",
  "Correct the sentence: 'The criteria is strict.'": "The criteria are strict.",
  "Choose the correct form: 'The jury (has/have) reached their verdict.'":
    "has",
  "Correct the sentence: 'She don't knows the answer.'":
    "She doesn't know the answer.",
  "Correct the sentence: 'The luggage are heavy.'": "The luggage is heavy.",
  "Choose the correct word: 'This is (a/an) honest mistake.'": "an",
  "Correct the sentence: 'The equipment need to be checked.'":
    "The equipment needs to be checked.",
  "Correct the sentence: 'He don't understands the question.'":
    "He doesn't understand the question.",
  "Choose the correct form: 'The majority of students (was/were) present.'":
    "were",
  "Correct the sentence: 'The trousers is too long.'":
    "The trousers are too long.",
  "Correct the sentence: 'She don't has time for this.'":
    "She doesn't have time for this.",
  "Choose the correct word: 'She is (more/most) intelligent than her classmates.'":
    "more",
  "Correct the sentence: 'The glasses is broken.'": "The glasses are broken.",
  "Correct the sentence: 'He don't remembers my name.'":
    "He doesn't remember my name.",
  "Choose the correct form: 'The government (has/have) announced new policies.'":
    "has",
  "Correct the sentence: 'The jeans is fashionable.'":
    "The jeans are fashionable.",
  "Correct the sentence: 'She don't wants to go.'": "She doesn't want to go.",
  "Choose the correct word: 'This is (a/an) hour-long meeting.'": "an",
  "Correct the sentence: 'The stairs is dangerous when wet.'":
    "The stairs are dangerous when wet.",
  "Correct the sentence: 'He don't needs help.'": "He doesn't need help.",
  "Choose the correct form: 'A lot of water (was/were) wasted.'": "was",
  "Correct the sentence: 'The shorts is comfortable.'":
    "The shorts are comfortable.",
  "Correct the sentence: 'She don't seems happy.'": "She doesn't seem happy.",
  "Choose the correct word: 'She is (better/best) at math than her brother.'":
    "better",
};

const castleEscapeWordQuestions = {
  enormous: "huge",
  happy: "joyful",
  fast: "quick",
  angry: "furious",
  beautiful: "gorgeous",
  intelligent: "brilliant",
  lazy: "sluggish",
  strong: "powerful",
  funny: "hilarious",
  tired: "exhausted",
  cold: "chilly",
  weak: "frail",
  boring: "dull",
  brave: "courageous",
  rich: "wealthy",
  shy: "timid",
  evil: "wicked",
  soft: "gentle",
  dangerous: "hazardous",
  tiny: "minuscule",
  smart: "clever",
  sad: "melancholy",
  bright: "luminous",
  quiet: "silent",
  noisy: "raucous",
  clean: "spotless",
  dirty: "filthy",
  wet: "soaked",
  dry: "arid",
  old: "ancient",
  new: "brand-new",
  difficult: "challenging",
  easy: "effortless",
  strange: "bizarre",
  normal: "ordinary",
  loud: "deafening",
  small: "petite",
  big: "gigantic",
  quick: "swift",
  slow: "sluggish",
  hot: "scorching",
  dark: "pitch-black",
  light: "radiant",
  hungry: "starving",
  thirsty: "parched",
  scared: "terrified",
  calm: "serene",
  busy: "hectic",
  empty: "desolate",
  full: "overflowing",
  expensive: "costly",
  cheap: "inexpensive",
  simple: "basic",
  complex: "complicated",
  sweet: "sugary",
  sour: "tart",
  bitter: "acrid",
  salty: "briny",
  spicy: "pungent",
  delicious: "delectable",
  disgusting: "revolting",
  smooth: "silky",
  rough: "coarse",
  hard: "rigid",
  soft: "plush",
  heavy: "weighty",
  light: "feathery",
  sharp: "keen",
  dull: "blunt",
  wide: "broad",
  narrow: "slim",
  deep: "profound",
  shallow: "superficial",
  long: "lengthy",
  short: "brief",
  high: "tall",
  low: "short",
  far: "distant",
  near: "close",
  many: "numerous",
  few: "scarce",
  some: "several",
  all: "every",
  none: "zero",
  always: "forever",
  never: "not ever",
  often: "frequently",
  rarely: "seldom",
  soon: "shortly",
  later: "afterwards",
  early: "premature",
  late: "delayed",
  now: "currently",
  then: "subsequently",
  here: "present",
  there: "absent",
  above: "overhead",
  below: "underneath",
  inside: "within",
  outside: "outdoors",
  up: "upward",
  down: "downward",
  left: "port",
  right: "starboard",
  front: "forward",
  back: "rear",
  start: "begin",
  end: "finish",
  stop: "halt",
  go: "proceed",
  run: "sprint",
  walk: "stroll",
  jump: "leap",
  fall: "tumble",
  fly: "soar",
  swim: "paddle",
  sit: "perch",
  stand: "rise",
  lie: "recline",
  sleep: "slumber",
  wake: "awaken",
  eat: "devour",
  drink: "sip",
  cook: "prepare",
  bake: "roast",
  fry: "sauté",
  boil: "simmer",
  cut: "slice",
  chop: "dice",
  peel: "pare",
  mix: "blend",
  stir: "whisk",
  pour: "decant",
  spill: "slop",
  clean: "scrub",
  wash: "rinse",
  dry: "dehydrate",
  wet: "dampen",
  break: "shatter",
  fix: "repair",
  build: "construct",
  destroy: "demolish",
  create: "invent",
  make: "fabricate",
  do: "perform",
  work: "labor",
  play: "recreate",
  study: "learn",
  teach: "educate",
  read: "peruse",
  write: "compose",
  draw: "sketch",
  paint: "illustrate",
  sing: "chant",
  dance: "waltz",
  act: "perform",
  watch: "observe",
  see: "perceive",
  look: "gaze",
  hear: "listen",
  smell: "sniff",
  taste: "savor",
  touch: "feel",
  hold: "grasp",
  grab: "snatch",
  pull: "tug",
  push: "shove",
  lift: "hoist",
  carry: "transport",
  throw: "toss",
  catch: "capture",
  kick: "boot",
  hit: "strike",
  fight: "battle",
  win: "triumph",
  lose: "fail",
  help: "assist",
  save: "rescue",
  protect: "defend",
  attack: "assault",
  kill: "slay",
  die: "perish",
  live: "exist",
  love: "adore",
  hate: "despise",
  like: "enjoy",
  dislike: "loathe",
  want: "desire",
  need: "require",
  have: "possess",
  own: "retain",
  give: "donate",
  take: "seize",
  steal: "pilfer",
  buy: "purchase",
  sell: "vend",
  pay: "compensate",
  earn: "acquire",
  spend: "expend",
  waste: "squander",
  save: "hoard",
};

// console.log(castleEscapeQuestions);

function generateID() {
  return (Date.now() % 1000000).toString().padStart(5, "0");
}
module.exports = {
  getRandomWord,
  wordPuzzleWords,
  verbSentences,
  castleEscapeSentenceQuestions,
  castleEscapeWordQuestions,
  generateID,
};
