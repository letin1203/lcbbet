export default {
  namespaced: true,

  state: {
    items: [],
    item: {}
  },

  mutations: {
    setItems: (state, items) => {
      state.items = items;
    },
    setItem: (state, item) => {
      state.item = item;
    }
  },

  actions: {
    getAll: ({ commit }, options) => {
      commit('setItems', options.data);
    },
    getOne: ({ commit }, options) => {
      commit('setItem', options.data);
    }
  }
};
