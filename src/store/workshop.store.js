import Vue from 'vue';

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    // eslint-disable-next-line no-empty-pattern
    async postImage({}, payload) {
      let formData = new FormData();
      formData.append('key', 'f3289a4706c9d456ecda5be82225c7f3');
      formData.append('image', payload.data);
      formData.append('name', payload.name);

      try {
        const result = await Vue.axios({
          method: 'post',
          url: 'https://api.imgbb.com/1/upload',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return result.data.data;
      } catch (e) {
        console.log(e.message);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      } finally {
        console.log('La petición para crear creacion ha finalizado');
      }
    },
    async getImages({ commit }) {
      try {
        const { data } = await Vue.axios({
          method: 'get',
          url: '/horarios/secciones'
        });
        commit('setSecciones', data);
      } catch (e) {
        console.log('todosError', e.message);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      } finally {
        console.log('La petición para obtener las secciones ha finalizado');
      }
    }
  },
  getters: {}
};
