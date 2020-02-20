import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

import axios from 'axios';
import VueAxios from 'vue-axios';

// const baseURL = 'http://localhost:8080/api/';
// const baseURL = '/api/';

// axios.defaults.baseURL = baseURL;
axios.defaults.json = true;
Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
