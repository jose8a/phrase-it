<template>
  <div id="hangman"></div>
  <div id="guesses"></div>
  <div id="remaining-letters"></div>
  <div id="letters">
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="50">
      <text v-for="letter in letters" xpos="init_x" ypos="init_y" >{{ letter }}</text>
    </svg>
  </div>
</template>

<script>
  import Letter from './components/Letter.vue';

  export default {
    components: { svgLetter: Letter },
    data() {
      return {
        letters: '',
        word: "barber"    // this is only here for initial testing
      };
    },
    methods: {
      getWord: function () {},
      getLettersFromWord: function(word) { return word.split() }
    }
    events: {
      'hook:ready': function () { letters = getLettersFromWord( getWord())}
    },
  };
</script>

<style>
  .container {
    width: 60%;
  }
  .sidebar {
    width: 30%;
  }

  .content {
    width: 65%;
  }
</style>
