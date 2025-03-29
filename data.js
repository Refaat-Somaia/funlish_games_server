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
function generateID() {
  return (Date.now() % 1000000).toString().padStart(6, "0");
}
module.exports = { getRandomWord, wordPuzzleWords, verbSentences, generateID };
