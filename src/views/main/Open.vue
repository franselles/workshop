<template>
  <section class="section">
    <nav class="breadcrumb notification is-primary" aria-label="breadcrumbs">
      <ul>
        <li>
          <router-link to="/">
            <span class="icon">
              <i class="fas fa-home"></i>
            </span>
            SALIR</router-link
          >
        </li>
        <li>
          DETALLE
        </li>
      </ul>
    </nav>
    <div>
      <table class="table">
        <tr>
          <th>MATRICULA</th>
          <th>AVERIA</th>
          <th>EDITAR</th>
        </tr>
        <tr v-for="order in orders" :key="order._id">
          <td>{{ order.license_plate }}</td>
          <td>{{ order.fault }}</td>
          <td>
            <button class="button" type="button" @click="goOrder(order)">
              EDITAR
            </button>
          </td>
        </tr>
      </table>
    </div>
    <div>
      <router-link class="button is-primary" :to="{ name: 'detail' }"
        >NUEVO</router-link
      >
    </div>
  </section>
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
    },
  },
  computed: {
    ...mapState('workshopStore', ['orders']),
  },
};
</script>
