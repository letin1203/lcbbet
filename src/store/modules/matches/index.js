import firebase from '@/firebase';
import transform from './transform';
import router from '@/router';
import extract from './extract';

export default {
  namespaced: true,

  state: {
    items: [],
    item: {},
    extractItems: [],
    extractItem: {}
  },

  mutations: {
    setItems: (state, items) => {
      state.items = items;
    },
    setItem: (state, item) => {
      state.item = item;
    },
    setExtractItems: (state, items) => {
      state.extractItems = items;
    },
    setExtractItem: (state, item) => {
      state.extractItem = item;
    }
  },

  actions: {
    getAll: ({ commit }) => {
      firebase.db
        .collection('matches')
        .orderBy('createdAt')
        .onSnapshot(snapShot => {
          commit('setItems', transform.convertListItem(snapShot));
          router.push('/');
        });
    },
    getOne: ({ commit }, payload) => {
      commit('setItem', payload.data);
    },
    postOne: ({ commit }, payload) => {
      firebase.db
        .collection('matches')
        .add({
          tournament: payload.data.tournament,
          bestOf: payload.data.bestOf,
          date: payload.data.date,
          link: payload.data.link,
          gId: payload.data.gId,
          teamRed: payload.data.teamRed,
          teamBlue: payload.data.teamBlue,
          result: payload.data.result,
          createdBy: payload.data.createdBy,
          createdAt: new Date().getTime()
        })
        .then(commit('setItem', payload.data));
    },
    getExtractItems: ({ commit }, payload) => {
      let result = extract.extractListMatch(payload);
      commit('setExtractItems', result);
      if (payload.callback) {
        payload.callback();
      }
    },
    getExtractItem: ({ commit }, payload) => {
      let result = extract.extractMatch(payload);
      commit('setExtractItem', result);
      if (payload.callback) {
        payload.callback();
      }
    }
  }
};
