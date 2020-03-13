<template>
  <div>
    <!-- <img src="@/assets/mecanica.png" /> -->
    <section class="hero is-primary is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-5-tablet is-4-desktop is-3-widescreen">
              <form @submit.prevent="login" class="box">
                <div class="field">
                  <label for="" class="label">PIN TALLER</label>
                  <div class="control has-icons-left">
                    <input
                      type="password"
                      placeholder="****"
                      class="input"
                      required
                      maxlength="4"
                      v-model="pin"
                    />
                    <span class="icon is-small is-left">
                      <i class="fa fa-lock"></i>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <button class="button is-success" type="submit">
                    ACCEDER
                  </button>
                </div>
                <div class="field">
                  <label for="">0.1.39</label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
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
