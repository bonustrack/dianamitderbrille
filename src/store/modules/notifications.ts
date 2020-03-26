const state = {
  items: []
};

const mutations = {
  notify(_state, payload) {
    _state.items.push({ ...payload, timestamp: Date.now() });
  }
};

const actions = {
  notify({ commit }, payload) {
    typeof payload === 'string'
      ? commit('notify', { message: payload })
      : commit('notify', payload);
  }
};

export default {
  state,
  mutations,
  actions
};
