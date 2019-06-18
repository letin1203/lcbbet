import firebase from '@/firebase';
import transform from './transform';
import router from '@/router';
import extract from './extract';
import utils from '@/utils';

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
        .collection('tournaments')
        .orderBy('createdAt')
        .onSnapshot(snapShot => {
          commit('setItems', transform.convertListTournament(snapShot));
          router.push('/');
        });
    },
    getOne: ({ commit }, payload) => {
      commit('setItem', payload.data);
    },
    postOne: ({ commit }, payload) => {
      let d = new Date();
      let days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ];
      firebase.db
        .collection('tournaments')
        .add({
          imgUrl: payload.data.imgUrl,
          title: payload.data.title,
          info: `Created by ${
            payload.data.createdBy != '' ? payload.data.createdBy : 'Unknow'
          } on ${days[d.getDay()]}`,
          createdAt: new Date().getTime()
        })
        .then(commit('setItem', payload.data));
    },
    getExtractItems: ({ commit }, payload) => {
      let result = extract.extractListTournament(payload);
      commit('setExtractItems', result);
      if (payload.callback) {
        payload.callback();
      }
    },
    getExtractItem: ({ commit }, payload) => {
      let result = extract.extractTournament(payload);

      commit('setExtractItem', result);
      if (payload.callback) {
        payload.callback();
      }
    }
  }
};
