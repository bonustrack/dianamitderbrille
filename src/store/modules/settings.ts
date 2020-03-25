import Vue from 'vue';
import client from '@/helpers/client';
import kbyte from '@/helpers/kbyte';
import { TOKEN_LOCALSTORAGE_KEY } from '@/helpers/utils';

const state = {
  isInit: false,
  isLoading: false,
  isAuthenticated: false,
  token: false,
  account: false,
  subscriptions: [],
  subscribers: false,
  likes: [],
  profiles: {}
};

const mutations = {
  isInit(_state) {
    Vue.set(_state, 'isInit', true);
  },
  isLoading(_state, payload) {
    Vue.set(_state, 'isLoading', payload);
  },
  login(_state, { account, subscriptions, likes, token }) {
    Vue.set(_state, 'account', account);
    Vue.set(_state, 'subscriptions', subscriptions);
    Vue.set(_state, 'likes', likes);
    Vue.set(_state, 'isAuthenticated', true);
    Vue.set(_state, 'token', token);
  },
  logout(_state) {
    Vue.set(_state, 'account', false);
    Vue.set(_state, 'subscriptions', []);
    Vue.set(_state, 'isAuthenticated', false);
    Vue.set(_state, 'token', false);
  },
  like(_state, payload) {
    // @ts-ignore
    state.likes.push(payload);
  },
  addProfile(_state, { username, user }) {
    Vue.set(_state.profiles, username, user);
  },
  addSubscribers(_state, payload) {
    Vue.set(_state, 'subscribers', payload);
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
      if (!token) return resolve();
      client.setAccessToken(token);
      client
        .request('verify', [])
        .then(result => {
          // @ts-ignore
          const { account, subscriptions, likes } = result;
          account.meta = JSON.parse(account.meta);
          commit('login', { account, subscriptions, likes, token });
          kbyte.requestAsync('login', { token }).then(() => resolve());
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
  },
  like: ({ commit }, id) => {
    return new Promise((resolve, reject) => {
      client.request('like', { post_id: id }).then(() => {
        commit('like', id);
        resolve();
      });
    });
  },
  getProfile: ({ commit }, username) => {
    return new Promise((resolve, reject) => {
      client.request(username).then(user => {
        commit('addProfile', { username, user });
        resolve();
      });
    });
  },
  getSubscribers: ({ commit }) => {
    return new Promise((resolve, reject) => {
      client.request('subscribers').then(result => {
        commit('addSubscribers', result);
        resolve();
      });
    });
  }
};

export default {
  state,
  mutations,
  actions
};
