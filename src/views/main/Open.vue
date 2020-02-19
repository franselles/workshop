<template>
  <div>
    <div>
      <h3>ABIERTOS</h3>
    </div>
    <div>
      <h3>LISTADO</h3>
    </div>
    <div>
      <h3>FOOT - NUEVO</h3>
      <router-link :to="{ name: 'detail' }">NUEVO</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Open'
};
</script>
