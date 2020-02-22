<template>
  <div>
    <nav class="breadcrumb notification is-info" aria-label="breadcrumbs">
      <ul>
        <li>
          <router-link to="/detail">
            <span class="icon">
              <i class="fas fa-home"></i>
            </span>
            VOLVER</router-link
          >
        </li>
        <li>
          VISIALIZAR IMAGEN
        </li>
      </ul>
    </nav>
    <div>
      <img :src="url_img.image_url" width="100%" height="auto" />
    </div>
    <div>
      <button class="button" type="button" @click="backDetail">VOLVER</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShowImage',
  data() {
    return {};
  },
  methods: {
    backDetail() {
      this.$router.go(-1);
    }
  },
  computed: {
    url_img() {
      return this.$store.state.workshopStore.currentImage;
    }
  }
};
</script>

<style scoped></style>
