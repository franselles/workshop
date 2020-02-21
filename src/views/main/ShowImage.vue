<template>
  <div>
    <div>
      <h3>VISUALIZAR IMAGEN</h3>
    </div>
    <div>
      <img :src="url_img.image_url" />
    </div>
    <div>
      <button type="button" @click="backDetail">VOLVER</button>
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
