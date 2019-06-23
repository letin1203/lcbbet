import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from '@/store';
import './registerServiceWorker';
import '@/firebase';
window.$ = require('jquery');
window.jQuery = require('jquery');

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut);
  const loggedIn = store.state.users.user;

  if (!isPublic && !loggedIn) {
    return next ({
      path: '/login',
      query: { redirect: to.fullPath } // Store the full path to redirect the user to after login
    });
  }
  // Do not allow user to visit login page or register page if they are logged in
  if (loggedIn && onlyWhenLoggedOut) {
    return next('/');
  }

  next();

});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
