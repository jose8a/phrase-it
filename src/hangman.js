const burst = new mojs.Burst();
// -- document.addEventListener( 'click' , (e) => {
// --   burst.replay();
// -- });

const store = new Vuex.Store({
  state: {
    phrase: "",
    phraseLetters: [],
    visiblePhraseLetters: [],
    mappedPhrase: {},
    positions: {},
    message: "Start!",
    hits: [],
    misses: [],
    unused: [ 'a', 'b', 'c', 'd',
              'e', 'f', 'g', 'h',
              'i', 'j', 'k', 'l',
              'm', 'n', 'o', 'p',
              'q', 'r', 's', 't',
              'u', 'v', 'w', 'x',
              'y', 'z'],
    level: "easy",
    vizTypes: {
      easy: {
        row1: ['square', 'square', 'square', 'square'],
        row2: ['square', 'square2', 'square2', 'square'],
        row3: ['square', 'square2', 'square2', 'square'],
        row4: ['square', 'square', 'square', 'square']
      }
    }
  },
  mutations: {
    updateMessage (state, message) {
      state.message = message;
    },
    mapLetters (state) {
      const validLetters = state.phrase.split('');

      let mappedPhrase = state.mappedPhrase;
      validLetters.forEach( function(letter, index) {
        if (!mappedPhrase[letter]) {
          mappedPhrase[letter] = [];
        };
        mappedPhrase[letter].push(index);
      });
    },
    playLetter (state, id) {
      // store.commit('updateMisses', id)
      // store.commit('updateHits', id)
      // store.commit('updateVisiblePhrase', id)
      // store.commit('updateVizGraphic', id)
      // store.commit('isGameOver')
      const validLetters = state.phrase.split('');
      const validLetterSet = new Set(validLetters);
      console.log("VL: " + validLetters);

      if (validLetterSet.has(id)) {
        const msg = "BASE HIT!!!";
        //state.hits.push(id);
        console.log(msg);
        store.commit('updateMessage', msg);
      } else {
        const msg = "STEEEEERIKE!";
        console.log(msg);
        state.misses.push(id);
        store.commit('updateMessage', msg);
      }

      const mappedPhrase = state.mappedPhrase;
      if (mappedPhrase[id]) {
        console.log("MAP HITS: " + mappedPhrase[id]);
        store.commit('updateVisiblePhrase', mappedPhrase[id]);
      }

      // check for win/lose condition
      store.commit('checkWinLose');

    },
    setPhrase (state, phrase) {
      state.phrase = phrase.toLowerCase();
      console.log("updated phrase: " + state.phrase);
      let phraseLetters = state.phrase.split('');
      state.phraseLetters = phraseLetters;

      // any non-AtoZ character make visible, else set to "_"
      const alphabet = new Set(state.unused);
      const visiblePhraseLetters = state.visiblePhraseLetters;
      const initialHits = state.hits;
      phraseLetters.forEach( function(letter, index) {
        let isAlpha = alphabet.has(letter);

          // on initial phrase setup, mark all non-alphabet chars
        initialHits[index] = !isAlpha;
        if(!isAlpha) {
          visiblePhraseLetters[index] = letter;
        } else {
          visiblePhraseLetters[index] = "_";
        }
      })
    },
    // -- updateMisses ( ... ) {},
    // -- updateHits ( ... ) {},
    updateVisiblePhrase (state, indices) {
      indices.forEach( function(idx) {
        state.visiblePhraseLetters[idx] = state.phraseLetters[idx];
        state.hits[idx] = true;
      })

      // for reactivity, a new visiblePhraseLetters object should be created
      // when updated
      state.visiblePhraseLetters = state.visiblePhraseLetters.map(function(item) {
        return item;
      })
    },
    // -- checkWinOrLose condition
    checkWinLose (state) {
      if(state.misses.length > 11) {
        console.log("YOU LOSE!!!");
        return;
      }

      let foundAllLetters = state.hits.reduce( function(accumulator, current) {
        return accumulator && current;
      }, true);

      if (foundAllLetters) {
        console.log("YOU GOT 'EM ALL!!!");
        return;
      }

      console.log("GAME CONTINUES ... ");
      console.log("HITS: " + state.hits);
    }
    // -- updateVizGraphic ( ... ) {},
  }
});

Vue.component('letter', {
  template: `<span v-bind:id="content" class="letter">{{ content }}</span>`,
  props: ['content'],
});

Vue.component('letters-container', {
  template: `
            <div v-bind:class="classname" v-on:click="checkLetter($event)">
              <template v-for="letter in letters" class="letter"></letter>
                <letter v-bind:id="letter" v-bind:content="letter"></letter>
              </template>
            </div>
            `,
  props: ['letters', 'classname'],
  methods: {
    checkLetter: function (event) {
      const target = event.target;
      console.log("parent: " + target.parentElement.classList)
      // burst.tune({ x: event.clientX - 200, y: event.clientY-200 }).replay();

      // check if phrase contains letter
      if (target.classList.contains("letter") &&
          target.parentElement.classList.contains("letters-remaining")) {
        const msg = `Letter clicked: ${event.target.id}`
        target.classList.remove("letter");
        target.classList.add("blank");
        //target.innerHtml("");
        store.commit('updateMessage', msg);
        store.commit('playLetter', target.id);
      };
    }
  }
});

Vue.component('letters-remaining', {
  template: `
              <letters-container
                classname="letters-remaining"
                v-bind:letters="unusedLetters">
              </letters-container>
            `,
  computed: {
    unusedLetters: function () {
      return store.state.unused;
    }
  }
});

Vue.component('letters-missed', {
  template: `
              <letters-container
                classname="letters-missed"
                v-bind:letters="missedLetters">
              </letters-container>
            `,
  computed: {
    missedLetters: function () {
      return store.state.misses;
    }
  }
});

Vue.component('display-phrase', {
  template: `
            <div class="display-phrase">
              <template v-for="letter in phraseLetters">
                <span v-bind:class="letter.classlist">
                  {{ letter.content }}
                </span>
              </template>
            </div>
            `,
  computed: {
    phraseLetters: function () {
      const visibleLetters = store.state.visiblePhraseLetters;
      letters = [];

      visibleLetters.forEach( function(letter, index) {
        const alphabet = new Set(store.state.unused);
        const checkLetter = visibleLetters[index];
        const isAlpha = alphabet.has(checkLetter);
        const isUnderscore = (checkLetter === '_');
        const isWhitespace = (checkLetter === ' ');

        let item = {};
        item.content = letter;
        let classlist = {
          letter: true,
          revealed: checkLetter !== '_',
          whitespace: checkLetter === ' ',
          alpha: isAlpha
        };
        item.classlist = classlist;
        letters.push(item);
      })

      return letters;
    }
  }
});

Vue.component('messages', {
  template: `<div class="message">{{ message }}</div>`,
  computed: {
    message: function () {
      return store.state.message;
    }
  }
});

Vue.component('display-viz', {
  template: `
    <div class="display-viz">
        <div id="row-1" class="viz-row">
          <template v-for="type in itemsRow1"><div v-bind:class="type"></template>
        </div>
        <div id="row-2" class="viz-row">
          <template v-for="type in itemsRow2"><div v-bind:class="type"></template>
        </div>
        <div id="row-3" class="viz-row">
          <template v-for="type in itemsRow3"><div v-bind:class="type"></template>
        </div>
        <div id="row-4" class="viz-row">
          <template v-for="type in itemsRow4"><div v-bind:class="type"></template>
        </div>
    </div><!-- END:GAME-VIZ -->
  `,
  data() {
    return {}
  },
  methods: {
    viz: function() {
      const gameLevel = store.state.level;
      return store.state.vizTypes[gameLevel];
    }
  },
  computed: {
    itemsRow1: function() {
      const vizGrid = this.viz();
      return vizGrid["row1"];
    },
    itemsRow2: function() {
      const vizGrid = this.viz();
      return vizGrid["row2"];
    },
    itemsRow3: function() {
      const vizGrid = this.viz();
      return vizGrid["row3"];
    },
    itemsRow4: function() {
      const vizGrid = this.viz();
      return vizGrid["row4"];
    }
  }
});

let vm = new Vue({
  el: '#game',
  created: function () {
    console.log("Initialized!");
    this.initStore();
    this.newPhrase();
  },
  methods: {
    initStore: function () {
      const initMessage = "Game Loaded! Ready to Play ...";
      store.commit('updateMessage', initMessage);
    },
    newPhrase: function () {
      // let phrases = $.get( ... );
      let phrases = ["I'll be back!", "Let's Go Frankie!",
          "Feelin' Good Lewis!", "Mortimer, we're back!", "Yippee kiyay, Mr. Falcon!",
          "Show me the Money!!!", "You had me at hello.", "What's up Doc?",
          "I'm your huckleberry", "In vino veritas", "That's the way the cookie crumbles"];
      // let numPhrases = phrases.length;
      let numPhrases = phrases.length;
      console.log("NP: " + numPhrases);
      // let randPhraseNum = Math.random()*numPhrases;
      let randPhraseIndex = Math.floor(Math.random()*numPhrases);
      console.log("rPI: " + randPhraseIndex);
      // phrases.forEach( function(phrase, index) {localStorage.setItem(index, phrase)}
      phrases.forEach( function(phrase, index) {
        localStorage.setItem(index, phrase);
      });
      // return localStorage.getItem(randPhraseIndex);
      console.log("onInit - new phrase: " + localStorage.getItem(randPhraseIndex));
      store.commit('setPhrase', localStorage.getItem(randPhraseIndex));
      store.commit('mapLetters');
    }
  }
});

