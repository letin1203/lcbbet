import firebase from 'firebase';
import router from '@/router';

export default {
  namespaced: true,

  state: {
    items: [],
    item: {},
    user: null
  },

  getters: {
    isAuthenticated: state => {
      return state.user !== null;
    }
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
          router.push('/');
        })
        .catch(() => {
          commit('setUser', null);
        });
    },
    userLogin: ({ commit }, { email, password }) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          commit('setUser', user);
          router.push('/');
        })
        .catch(() => {
          commit('setUser', null);
        });
    },
    userLogout: ({ commit }) => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit('setUser', null);
          router.push('/');
        })
        .catch(() => {
          commit('setUser', null);
          router.push('/');
        });
    }
  }
};
