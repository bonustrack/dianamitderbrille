import Vue from 'vue';
import client from '@/helpers/client';
import { TOKEN_LOCALSTORAGE_KEY } from '@/helpers/utils';

const state = {
  account: false,
  subscriptions: [],
  isAuthenticated: false,
  token: false,
  isInit: false,
  isLoading: false
};

const mutations = {
  isInit(_state) {
    Vue.set(_state, 'isInit', true);
  },
  isLoading(_state, payload) {
    Vue.set(_state, 'isLoading', payload);
  },
  login(_state, { account, subscriptions, token }) {
    Vue.set(_state, 'account', account);
    Vue.set(_state, 'subscriptions', subscriptions);
    Vue.set(_state, 'isAuthenticated', true);
    Vue.set(_state, 'token', token);
  },
  logout(_state) {
    Vue.set(_state, 'account', false);
    Vue.set(_state, 'subscriptions', []);
    Vue.set(_state, 'isAuthenticated', false);
    Vue.set(_state, 'token', false);
  }
};

const actions = {
  init: async ({ commit, state, dispatch }) => {
    commit('isLoading', true);
    await dispatch('login');
    commit('isLoading', false);
    commit('isInit');
  },
  login: ({ commit }) => {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY);
      if (!token) {
        return resolve();
      }
      client.setAccessToken(token);
      client
        .request('verify', [])
        .then(result => {
          // @ts-ignore
          const { account, subscriptions } = result;
          account.meta = JSON.parse(account.meta);
          commit('login', { account, subscriptions, token });
          return resolve();
        })
        .catch(() => {
          localStorage.removeItem(TOKEN_LOCALSTORAGE_KEY);
          client.setAccessToken(undefined);
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
