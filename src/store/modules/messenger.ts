import Vue from 'vue';
import store from '@/store';
import client from '@/helpers/client';

client.subscribe(message => {
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
  contacts: false,
  messages: {}
};

const mutations = {
  setContacts(_state, payload) {
    Vue.set(_state, 'contacts', payload);
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
  getContacts: ({ commit }) => {
    return new Promise((resolve, reject) => {
      client.request('get_contacts').then(contacts => {
        commit('setContacts', contacts);
        resolve();
      });
    });
  },
  getMessages: ({ commit }, username) => {
    return new Promise((resolve, reject) => {
      client.request('get_messages', { username }).then(messages => {
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
