import Vue from 'vue';
import Vuex from 'vuex';
import users from './modules/users';
import tournaments from './modules/tournaments';
import matches from './modules/matches';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
    tournaments,
    matches
  },
  state: {
    dataFetched: ''
  },
  getters: {},
  mutations: {
    setGosuHtml: (state, payload) => {
      state.dataFetched = payload;
    }
  },
  actions: {
    getHtml: ({ commit }, payload) => {
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const url = 'https://www.gosugamers.net/dota2/tournaments';
      fetch(proxyUrl + url)
        .then(response => response.text())
        .then(contents => {
          commit('setGosuHtml', contents);
          if (payload.callback) {
            payload.callback();
          }
        })
        .catch(() => {
          commit('setGosuHtml', '');
          if (payload.error) {
            payload.error();
          }
        });
    }
  }
});
