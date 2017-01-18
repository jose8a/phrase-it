

// Read the dictionary file:
//
//


//
var player = {
  // unsure if this object is necessary for GUEST games
  // PLAYER object is necessary only (??) if storing scores, remembering player
  //    configurations, wins, losses, info, etc.
};


// Game state
var game = {
  numRounds: 10,
  roundsLeft: 10,
  gameWord: "",
  targetHits: [
  ],
  letterMisses: [
  ],
  checkLetter: function(letter) {
    // validate letter (non-blank, unused, non-number, non-symbol, etc)
    // check if word contains letter
  },
  checkWord: function(word) {
    //
  },
  checkWin: function() {
    // on word-containing valid-letter, check game-WIN conditions
  },
  checkLoss: function() {
    // on non-word-containing valid-letter, check game-LOSS conditions
  }
};


// All board-related state and functions
var board = {
  setup: function() {
    // ON an HTML canvas element:
    // draw the Location as Background
    // draw the word underlines
    // draw the persona stage (crusher, hangstage, etc)
    // draw the scoreboard (total turns, pts, turns left, etc)
    // draw the used-letters section
  },
  playTurn: function() {
    // on player button press, check for new letter
    //    - validate letter (blank input, previously used, no numbers, symbols, etc)
    // update persona stage
    // update turns scoreboard
    // update used-letters section
    // update word underlines
  },
  displayWin: function() {
    //
  },
  displayLoss: function() {
    //
  },
  clearBoard: function() {
    // clear persona stage
    // clear word blanks
  }
};

var persona = {
  costumes: [
    "clown",
    "cowboy",
    "stormtrooper",
    "penguin",
    "troll",
    "truck",
    "spaceship",
    "robot",
    "flower-pot"
  ],
  bodyParts: [
    "head",
    "neck",
    "torso",
    "right-leg",
    "left-leg",
    "right-arm",
    "left-arm",
    "right-foot",
    "left-foot",
    "right-hand",
    "left-hand",
    "eyes",
    "nose",
    "mouth",
    "ears",
    "tophead"           // clown hair, cowboy hat, helmet, mini horns, etc
  ],
  vehicleParts: [
    "body",
    "nose",
    "rear",
    "cabin-top",
    "doors",
    "windshield",
    "front-wheels",
    "rear-wheels",
    "spoiler",
    "side-mirrors"
  ],
  plantParts: [
    "flower-face",
    "petals",
    "pot",
    "leaves",
    "petal-top",
    "petal-right",
    "petal-left",
    "petal-bottom",
    "stem"
  ],
  locations: [
    "hangstage",
    "dunk-tank",
    "car-crusher"
  ]
};


