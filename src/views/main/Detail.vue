<template>
  <div>
    <div>
      <div>
        <h3>DETALLE</h3>
      </div>
      <div>
        <h3>AVERIA</h3>
        <form>
          <div>
            <label for="date">FECHA</label>
            <input type="date" name="date" id="date" />
          </div>
          <div>
            <label for="">VEHICULO</label>
            <select name="vehicle_id" id="vehicle_id">
              <option value="1388CTW">1388CTW - NISSAN</option>
              <option value="4051TWE">4051TWE - MERCEDES</option>
            </select>
          </div>
          <div>
            <label for="price">PRECIO</label>
            <input type="number" name="price" id="price" />
          </div>
          <div>
            <label for="hours">HORAS</label>
            <input type="number" name="hours" id="hours" />
          </div>
          <div>
            <label for="materials">MATERIALES</label>
            <input type="number" name="materials" id="materials" />
          </div>
        </form>
      </div>
    </div>
    <div>
      <input type="file" @change="onFileChange" />
    </div>

    <div id="preview">
      <img v-if="url" :src="url" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data() {
    return {
      part: {
        date: null,
        vehicle_id: null,
        vehicle: null,
        price: null,
        hours: null,
        materials: Number,
        closed: null,
        finished: null,
        images: []
      },
      url: null
    };
  },
  mounted() {},
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    }
  }
};
</script>

<style scoped>
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
}
</style>
