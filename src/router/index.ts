import Vue from 'vue';
import VueRouter from 'vue-router';
import { ifAuthenticated, ifNotAuthenticated } from '@/helpers/utils';

const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home.vue');
const Signup = () => import(/* webpackChunkName: "signup" */ '@/views/Signup.vue');
const Login = () => import(/* webpackChunkName: "login" */ '@/views/Login.vue');
const Feed = () => import(/* webpackChunkName: "feed" */ '@/views/Feed.vue');
const Account = () => import(/* webpackChunkName: "account" */ '@/views/Account.vue');
const Billing = () => import(/* webpackChunkName: "billing" */ '@/views/Billing.vue');
const Messages = () => import(/* webpackChunkName: "messages" */ '@/views/Messages.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { isLight: true },
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    meta: { isLight: true },
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { isLight: true },
    beforeEnter: ifNotAuthenticated
  },
  { path: '/home', name: 'feed', component: Feed, beforeEnter: ifAuthenticated },
  { path: '/account', name: 'account', component: Account, beforeEnter: ifAuthenticated },
  { path: '/billing', name: 'billing', component: Billing, beforeEnter: ifAuthenticated },
  { path: '/messages', name: 'messages', component: Messages, beforeEnter: ifAuthenticated },
  { path: '/*', name: 'error-404', beforeEnter: (to, from, next) => next('/') }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
