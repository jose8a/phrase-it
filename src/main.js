import Vue from 'vue';
import App from './App';
// import Hello from './components/Hello.vue';
import Home from './components/Home.vue';
import About from './components/About.vue';
import BioInfo from './components/BioInfo.vue';

import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

// We want to apply VueResource and VueRouter
// // to our Vue instance
Vue.use(VueResource);
Vue.use(VueRouter);

// Pointing routes to the components they should use
const router = new VueRouter({
  routes: [
    { path: '/home', component: Home },
    { path: '/about',
      component: About,
      children: [
        { path: '/bio', component: BioInfo }
      ]
    },
    { path: '*', redirect: '/home' }  // invalid routes redirect
  ]
});

// TODO: remove the following block of commented code if migration to Vue2 worked!
// Pointing routes to the components they should use
// -- router.map({
// --   '/home': {
// --     component: Home,
// --   },
// --   '/about': {
// --     component: About,
// --     subRoutes: {
// --       '/bio': {
// --         component: BioInfo,
// --       },
// --     },
// --   },
// -- });

// TODO: remove the following block of commented code if migration to Vue2 worked!
// Any invalid route will redirect to home
// -- router.redirect({
// --   '*': '/home',
// -- });
// --
// -- router.start(App, '#app');

