import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from '@/store';
import './registerServiceWorker';
import '@/firebase';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    if (!store.state.users.isAuthenticated) {
      next({
        path: '/login'
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
