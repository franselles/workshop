import Vue from 'vue';
import Router from 'vue-router';
import routes from '@/router/routes.js';
import store from '@/store';

Vue.use(Router);

const router = new Router({
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  // const urlLevel = to.matched.some(record => record.meta.level)
  // const level = store.state.login.login.level
  const logged = store.state.loginStore.logged;

  if (logged == false && requiresAuth) {
    next({ path: 'login' });
  } else {
    next();
  }
});

export default router;
