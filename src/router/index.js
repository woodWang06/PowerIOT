import Vue from 'vue';
import Router from 'vue-router';
import routers from './router';
import store from '../store';
import { getSen, setSen } from 'utils'
Vue.use(Router)
let route = new Router(
  {
    mode: 'hash',
    routes: routers
  }
);
route.beforeEach((to, from, next) => {
  if(to.path == "/") {
    next();
  } else {
    store.commit('login/clearCancelToken')
    next();
    if(getSen('token')) {
      next()
    } else {
      next({ path: "/" })
    }
  };
})
export default route