import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () =>
        import(/* webpackChunkName: "home" */ './components/Home.vue')
    },
    {
      path: '/join',
      name: 'join',
      component: () =>
        import(/* webpackChunkName: "join" */ './components/Join.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "login" */ './components/Login.vue')
    },
    {
      path: '/add-tournament',
      name: 'add-tournament',
      meta: {
        authRequired: true
      },
      component: () =>
        import(/* webpackChunkName: "add-tournament" */ './components/AddTournament.vue')
    }
  ]
});
