import Vue from 'vue';
import VueUi from '@vue/ui';
import VueI18n from 'vue-i18n';
import prettyMs from 'pretty-ms';
import { upperFirst, camelCase } from 'lodash';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import { LOCALSTORAGE_KEY } from '@/helpers/utils';
import messages from '@/helpers/messages.json';
import numberFormats from '@/helpers/number.json';
import '@vue/ui/dist/vue-ui.css';
import '@/style.scss';

Vue.use(VueUi);
Vue.use(VueI18n);

const getLocale = () =>
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language || 'en';
const localStorageLocale = localStorage.getItem(LOCALSTORAGE_KEY);
const locale = localStorageLocale ? localStorageLocale : getLocale() === 'th' ? 'th' : 'en';
const i18n = new VueI18n({ locale, messages, numberFormats });

const requireComponent = require.context('./components', true, /[\w-]+\.vue$/);
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);
  const componentName = upperFirst(camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')));
  Vue.component(componentName, componentConfig.default || componentConfig);
});

Vue.filter('prettyMs', value =>
  prettyMs(new Date().getTime() - value * 1000, { compact: true }).replace('~', '')
);

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
