import firebase from 'firebase';
import router from '@/router';

export default {
  namespaced: true,

  state: {
    items: [],
    item: {},
    user: null,
    isAuthenticated: false
  },

  mutations: {
    setItems: (state, payload) => {
      state.items = payload;
    },
    setItem: (state, payload) => {
      state.item = payload;
    },
    setUser: (state, payload) => {
      state.user = payload;
    },
    setIsAuthenticated: (state, payload) => {
      state.isAuthenticated = payload;
    }
  },

  actions: {
    getAll: ({ commit }, options) => {
      commit('setItems', options.data);
    },
    getOne: ({ commit }, options) => {
      commit('setItem', options.data);
    },
    userJoin: ({ commit }, { email, password }) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          commit('setUser', user);
          commit('setIsAuthenticated', true);
          router.push('/');
        })
        .catch(() => {
          commit('setUser', null);
          commit('setIsAuthenticated', false);
        });
    },
    userLogin: ({ commit }, { email, password }) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          commit('setUser', user);
          commit('setIsAuthenticated', true);
          router.push('/');
        })
        .catch(() => {
          commit('setUser', null);
          commit('setIsAuthenticated', false);
        });
    },
    userLogout({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit('setUser', null);
          commit('setIsAuthenticated', false);
          router.push('/');
        })
        .catch(() => {
          commit('setUser', null);
          commit('setIsAuthenticated', false);
          router.push('/');
        });
    }
  }
};
