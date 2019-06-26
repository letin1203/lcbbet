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
      meta: {
        public: true,
        onlyWhenLoggedOut: true
      },
      component: () =>
        import(/* webpackChunkName: "join" */ './components/Join.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        public: true,
        onlyWhenLoggedOut: true
      },
      component: () =>
        import(/* webpackChunkName: "login" */ './components/Login.vue')
    },
    {
      path: '/tournament-participants',
      name: 'tournament-participants',
      component: () =>
        import(/* webpackChunkName: "tournament-participants" */ './components/Tournaments/TournamentParticipants.vue')
    },
    {
      path: '/add-tournaments',
      name: 'add-tournaments',
      component: () =>
        import(/* webpackChunkName: "add-tournaments" */ './components/Tournaments/AddTournaments.vue')
    },
    {
      path: '/add-matches/:id',
      name: 'add-matches',
      component: () =>
        import(/* webpackChunkName: "add-match" */ './components/Matches/AddMatches.vue')
    },
    {
      path: '/:id/matches',
      name: 'tournament-matches',
      component: () =>
        import(/* webpackChunkName: "list-matches" */ './components/Matches/ListMatches.vue')
    }
  ]
});
