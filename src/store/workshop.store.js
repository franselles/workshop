import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    urlImgBb: 'https://api.imgbb.com/1/upload',
    urlApi: '/api/', // http://localhost:8080/api/    // /api/
    order: {
      _id: null,
      order_id: null,
      year: null,
      date: null,
      fault: null,
      vehicle_id: null,
      vehicle: null,
      license_plate: null,
      price: 30,
      hours: null,
      materials: Number,
      closed: false,
      finished: false,
      images: []
    },
    currentImage: null,
    orders: [],
    vehicles: []
  },
  mutations: {
    resetOrder(state) {
      state.order._id = null;
      state.order.order_id = null;
      state.order.year = null;
      state.order.date = new Date().toISOString().split('T')[0];
      state.order.fault = null;
      state.order.vehicle_id = null;
      state.order.vehicle = null;
      state.order.license_plate = null;
      state.order.price = 30;
      state.order.hours = null;
      state.order.materials = null;
      state.order.closed = false;
      state.order.finished = false;
      state.order.images = [];
    },
    setVehicles(state, payload) {
      state.vehicles = payload;
    },
    setOrder(state, payload) {
      state.order._id = payload._id;
      state.order.order_id = payload.order_id;
      state.order.year = payload.year;
      state.order.date = payload.date;
      state.order.fault = payload.fault;
      state.order.vehicle_id = payload.vehicle_id;
      state.order.vehicle = payload.vehicle;
      state.order.license_plate = payload.license_plate;
      state.order.price = payload.price;
      state.order.hours = payload.hours;
      state.order.materials = payload.materials;
      state.order.closed = payload.closed;
      state.order.finished = payload.finished;
      state.order.images = payload.images;
    },
    setOrders(state, payload) {
      state.orders = payload;
    },
    setImagesOrder(state, payload) {
      state.order.images.push(payload);
    },
    setCurrentImage(state, payload) {
      state.currentImage = payload;
    }
  },
  actions: {
    async postImage(context, payload) {
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
        console.log('La petición para crear los datos ha finalizado');
      }
    },
    async deleteImage(context, payload) {
      try {
        const result = await Vue.axios({
          method: 'delete',
          url: payload,
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        });
        return result;
      } catch (e) {
        console.log(e.message);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      } finally {
        console.log('La petición para borrar los datos ha finalizado');
      }
    },
    async postOrder({ state }, payload) {
      try {
        const result = await Vue.axios({
          method: 'post',
          url: state.urlApi + 'workshop/order',
          data: payload
        });
        return result;
      } catch (e) {
        console.log(e.message);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      } finally {
        console.log('La petición para crear los datos ha finalizado');
      }
    },
    async putOrder({ state }, payload) {
      try {
        const result = await Vue.axios({
          method: 'put',
          url: state.urlApi + `workshop/order/${payload._id}`,
          data: payload
        });
        return result;
      } catch (e) {
        console.log(e.message);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      } finally {
        console.log('La petición para actualizar los datos ha finalizado');
      }
    },
    async getVehicles({ commit, state }) {
      try {
        const { data } = await Vue.axios({
          method: 'get',
          url: state.urlApi + 'workshop/vehicles'
        });
        commit('setVehicles', data);
      } catch (e) {
        console.log('todosError', e.message);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      } finally {
        console.log('La petición para obtener los datos ha finalizado');
      }
    },
    async getOrders({ commit, state }, payload) {
      try {
        const { data } = await Vue.axios({
          method: 'get',
          url: state.urlApi + `workshop/orders/${payload}`
        });
        commit('setOrders', data);
      } catch (e) {
        console.log('todosError', e.message);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      } finally {
        console.log('La petición para obtener los daros ha finalizado');
      }
    },
    async getOrdersLast({ state }, payload) {
      try {
        const { data } = await Vue.axios({
          method: 'get',
          url: state.urlApi + `workshop/orders/last/${payload}`
        });
        return data.order_id || 0;
      } catch (e) {
        console.log('todosError', e.message);
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      } finally {
        console.log('La petición para obtener los daros ha finalizado');
      }
    }
  },
  getters: {}
};
