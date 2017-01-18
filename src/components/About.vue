<template>
  <div>
    <h2>About ... </h2>
    <hr>

    <router-link
      v-if="$route.path !== '/about/bio'"
      to="'/about/bio'"
      class="btn btn-primary">
      Show Bio
    </router-link>

    <div v-if="$route.path === '/about/bio'">
      <h3>Bio: </h3>
    </div><!-- time-entries container -->

    <router-view></router-view>

  </div><!-- outer div -->
</template>


<script>
  export default {
    data() {
      // we want to start with an existing entry
      return {
        //
      };
    },
    methods: {
    },
    events: {
    },
  };
</script>


<style>
  .avatar {
    height: 75px;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .user-details {
    background-color: #f5f5f5;
    border-right: 1px solid #ddd;
    margin: -10px 0;
  }
  .time-block {
    padding: 10px;
  }
  .comment-section {
    padding: 20px;
  }
</style>


