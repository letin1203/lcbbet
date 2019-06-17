import Vue from 'vue';
import Vuex from 'vuex';
import users from './modules/users';
import tournaments from './modules/tournaments';
import matches from './modules/matches';
import axios from 'axios';

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
    async fetchUrl({ commit }) {
      try {
        let response = await axios.get(
          'https://lcb-fetch-api.herokuapp.com/getData',
          {
            data: {
              url: 'https://www.gosugamers.net/dota2'
            }
          }
        );
        commit('setGosuHtml', response.data.data);
      } catch (error) {
        commit('setGosuHtml', '');
      }
    }
  }
});
