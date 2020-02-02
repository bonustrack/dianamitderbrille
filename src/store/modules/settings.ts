import Vue from 'vue';
import store from '@/store';
import client from '@/helpers/client';
import kbyte from '@/helpers/kbyte';
import { TOKEN_LOCALSTORAGE_KEY } from '@/helpers/utils';

kbyte.subscribe(message => {
  if (message[1].subject === 'message') {
    const body = message[1].body;
    const username =
      // @ts-ignore
      body.sender_username === store.state.settings.account.username
        ? body.receiver_username
        : body.sender_username;
    store.dispatch('addMessage', { username, message: body });
  }
});

const state = {
  isInit: false,
  isLoading: false,
  isAuthenticated: false,
  token: false,
  account: false,
  subscriptions: [],
  likes: [],
  profiles: {},
  messages: {}
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
  setMessages(_state, { username, messages }) {
    Vue.set(_state.messages, username, messages);
  },
  addMessage(_state, { username, message }) {
    if (!state.messages[username]) state.messages[username] = [];
    state.messages[username].push(message);
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
  getMessages: ({ commit }, username) => {
    return new Promise((resolve, reject) => {
      kbyte.requestAsync('get_messages', { username }).then(messages => {
        commit('setMessages', { username, messages });
        resolve();
      });
    });
  },
  addMessage: ({ commit }, { username, message }) => {
    commit('addMessage', { username, message });
  }
};

export default {
  state,
  mutations,
  actions
};
