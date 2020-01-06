import Vue from 'vue';
import router from '@/router';
import client from '@/helpers/client';
import { TOKEN_LOCALSTORAGE_KEY } from '@/helpers/utils';

const state = {
  account: false,
  isAuthenticated: false,
  token: false,
  isLoading: false
};

const mutations = {
  isLoading(_state, payload) {
    Vue.set(_state, 'isLoading', payload);
  },
  login(_state, { account, token }) {
    Vue.set(_state, 'account', account);
    Vue.set(_state, 'isAuthenticated', true);
    Vue.set(_state, 'token', token);
  },
  logout(_state) {
    Vue.set(_state, 'account', false);
    Vue.set(_state, 'isAuthenticated', false);
    Vue.set(_state, 'token', false);
  }
};

const actions = {
  login: ({ commit }) => {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY);
      if (!token) return resolve();
      commit('isLoading', true);
      client.setAccessToken(token);
      client.request('verify', []).then(account => {
        commit('login', { account, token });
        router.push('/feed');
        commit('isLoading', false);
        return resolve();
      });
    });
  },
  logout: ({ commit }) => {
    localStorage.removeItem(TOKEN_LOCALSTORAGE_KEY);
    client.setAccessToken(undefined);
    commit('logout');
  }
};

export default {
  state,
  mutations,
  actions
};
