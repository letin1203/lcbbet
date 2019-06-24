import firebaseInstance from 'firebase';
import firebase from '@/firebase';
import router from '@/router';
import transform from './transform';

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
    pushItem: (state, item) => {
      state.items.push(item);
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
    addUserTournament: ({ commit }, payload) => {
      const collection = payload.data.userEmail + payload.data.tournament.gId;
      firebase.db
        .collection(collection)
        .add({
          tournament: payload.data.tournament,
          createdBy: payload.data.createdBy,
          createdAt: new Date().getTime(),
          updateField: 'oh yeah'
        })
        .then((docRef) => {
          docRef.get().then(function(doc) {
              if (doc.exists) {
                let transformDoc = transform.convertItem(doc);
                commit('pushItem', transformDoc);
                commit('setItem', transformDoc);
                if (payload.callback) {
                  payload.callback();
                }
              } else {
                  // doc.data() will be undefined in this case
                  console.log("No such document!");
              }
          }).catch(function(error) {
              console.log("Error getting document:", error);
          });
        });
    },
    userJoin: ({ commit }, { email, password }) => {
      firebaseInstance
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
      firebaseInstance
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
      firebaseInstance
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
