import Vue from 'vue';
import VueRouter from 'vue-router';
import { ifAuthenticated, ifNotAuthenticated } from '@/helpers/utils';

const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home.vue');
const Signup = () => import(/* webpackChunkName: "signup" */ '@/views/Signup.vue');
const Login = () => import(/* webpackChunkName: "login" */ '@/views/Login.vue');
const Profile = () => import(/* webpackChunkName: "timeline" */ '@/views/Profile.vue');
const Write = () => import(/* webpackChunkName: "write" */ '@/views/Write.vue');
const Contacts = () => import(/* webpackChunkName: "contacts" */ '@/views/Contacts.vue');
const Messages = () => import(/* webpackChunkName: "messages" */ '@/views/Messages.vue');
const Account = () => import(/* webpackChunkName: "account" */ '@/views/Account.vue');
const Billing = () => import(/* webpackChunkName: "billing" */ '@/views/Billing.vue');

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
  { path: '/write', name: 'write', component: Write, beforeEnter: ifAuthenticated },
  { path: '/messages', name: 'contacts', component: Contacts, beforeEnter: ifAuthenticated },
  { path: '/messages/:username', name: 'messages', component: Messages, beforeEnter: ifAuthenticated },
  { path: '/account', name: 'account', component: Account, beforeEnter: ifAuthenticated },
  { path: '/billing', name: 'billing', component: Billing, beforeEnter: ifAuthenticated },
  { path: '/:username', name: 'profile', component: Profile, beforeEnter: ifAuthenticated },
  { path: '/*', name: 'error-404', beforeEnter: (to, from, next) => next('/') }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
