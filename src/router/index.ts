import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home.vue');
const Signup = () => import(/* webpackChunkName: "signup" */ '@/views/Signup.vue');
const Login = () => import(/* webpackChunkName: "login" */ '@/views/Login.vue');
const Feed = () => import(/* webpackChunkName: "feed" */ '@/views/Feed.vue');

Vue.use(VueRouter);

const ifAuthenticated = (to, from, next) => {
  // @ts-ignore
  if (store.state.settings.isAuthenticated) return next();
  next('/login');
};

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/signup', name: 'signup', component: Signup },
  { path: '/login', name: 'login', component: Login },
  { path: '/feed', name: 'feed', component: Feed, beforeEnter: ifAuthenticated }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
