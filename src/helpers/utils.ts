import { name } from '@/../package.json';
import store from '@/store';

export const TOKEN_LOCALSTORAGE_KEY = `${name}.access_token`;

export const DISCLAIMER_LOCALSTORAGE_KEY = `${name}.disclaimer`;

export const ifAuthenticated = (to, from, next) => {
  // @ts-ignore
  const state = store.state.settings;
  const fn = () => {
    if (state.isAuthenticated) return next();
    next('/login');
  };
  if (!state.isInit) {
    store.watch(
      () => state.isInit,
      newValue => {
        if (newValue === true) fn();
      }
    );
  } else {
    fn();
  }
};

export const ifNotAuthenticated = (to, from, next) => {
  // @ts-ignore
  const state = store.state.settings;
  const fn = () => {
    if (state.isAuthenticated) return next('/home');
    next();
  };
  if (!state.isInit) {
    store.watch(
      () => state.isInit,
      newValue => {
        if (newValue === true) fn();
      }
    );
  } else {
    fn();
  }
};
