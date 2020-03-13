import { name } from '@/../package.json';
import store from '@/store';

export const DISCLAIMER_LOCALSTORAGE_KEY = `${name}.disclaimer`;

export const LOCALE_LOCALSTORAGE_KEY = `${name}.locale`;

export const TOKEN_LOCALSTORAGE_KEY = `${name}.access_token`;

const HOMEPAGE = '/dianamitderbrille';

export const ifAuthenticated = (to, from, next) => {
  // @ts-ignore
  const state = store.state.settings;
  const fn = () => {
    if (state.isAuthenticated) return next();
    const redirect = to.fullPath === HOMEPAGE ? undefined : to.fullPath;
    const query = { redirect };
    next({ name: 'login', query });
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
    if (state.isAuthenticated) return next(HOMEPAGE);
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

export const LOCALSTORAGE_KEY = `_${name}`;
