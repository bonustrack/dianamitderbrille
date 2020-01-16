import Vue from 'vue';
import VueUi from '@vue/ui';
import prettyMs from 'pretty-ms';
import { upperFirst, camelCase } from 'lodash';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@vue/ui/dist/vue-ui.css';
import '@/style.scss';

Vue.use(VueUi);

const requireComponent = require.context('./components', true, /[\w-]+\.vue$/);
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);
  const componentName = upperFirst(camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')));
  Vue.component(componentName, componentConfig.default || componentConfig);
});

Vue.filter('prettyMs', value => prettyMs(new Date().getTime() - value * 1000, { compact: true }));

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
