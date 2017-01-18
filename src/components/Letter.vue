
<template>
  <!-- Line4 updated as Line5 for migration purposes -->
  <!-- text x={{xpos}} y={{xpos}} -->
  <text v-bind:x="xpos" v-bind:y="xpos"
            transform="rotate(30 20,40)">
        {{ letter }}
      </text>
</template>

<script>
  export default {
    data() {
      return {
        sectionTitle: 'Stuff',
      };
    },
    props: ['xpos', 'ypos'],
    events: {
      // ------
    },
  };
</script>

<style>
</style>
