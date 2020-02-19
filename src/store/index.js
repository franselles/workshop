import Vue from 'vue';
import Vuex from 'vuex';
import loginStore from '@/store/login.store.js';
import workshopStore from '@/store/workshop.store.js';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {},
  mutations: {},
  actions: {},
  modules: {
    loginStore,
    workshopStore
  }
});
