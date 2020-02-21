<template>
  <section>
    <div>
      <div>
        <div>
          <div>
            <div>Introduce el PIN</div>
            <div>
              <img src="@/assets/mecanica.png" />
              <h4>RA BENIDORM</h4>
              <form @submit.prevent="login">
                <input
                  type="password"
                  placeholder="PIN"
                  maxlength="4"
                  required
                  v-model="pin"
                />
                <button type="submit">Acceder</button>
                <a href="#">0.1.23</a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      pin: null
    };
  },
  methods: {
    ...mapMutations('loginStore', ['setLogin']),
    login() {
      let usuario = this.usuarios.find(data => data.pin === this.pin);
      if (usuario) {
        this.setLogin();
        this.$router.push({ name: 'open' });
      }
    }
  },
  computed: {
    ...mapState('loginStore', ['usuarios'])
  }
};
</script>
