<template>
  <div>
    <div>
      <h3>ABIERTOS</h3>
    </div>
    <div>
      <h3>LISTADO</h3>
      <ul>
        <li v-for="order in orders" :key="order._id">
          {{ order.fault }} - {{ order.license_plate }}
          <button type="button" @click="goOrder(order)">EDITAR</button>
        </li>
      </ul>
    </div>
    <div>
      <h3>FOOT - NUEVO</h3>
      <router-link :to="{ name: 'detail' }">NUEVO</router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
  name: 'Open',
  data() {
    return {};
  },
  mounted() {
    this.resetOrder();
    this.getOrders(false);
  },
  methods: {
    ...mapMutations('workshopStore', ['setOrder', 'resetOrder']),
    ...mapActions('workshopStore', ['getOrders']),
    goOrder(data) {
      this.setOrder(data);
      this.$router.push('detail');
    }
  },
  computed: {
    ...mapState('workshopStore', ['orders'])
  }
};
</script>
