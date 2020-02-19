export default {
  namespaced: true,
  state: {
    logged: false,
    usuarios: [{ nombre: 'Admin', pin: '0000' }]
  },
  mutations: {
    setLogin(state) {
      state.logged = true;
    },
    setLogout(state) {
      state.logged = false;
    }
  },
  actions: {},
  getters: {}
};
