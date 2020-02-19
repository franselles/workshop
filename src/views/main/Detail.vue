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
      <input ref="file" type="file" id="file" @change="onFileChange" />
    </div>

    <div>
      <ul>
        <li v-for="image in part.images" :key="image.index">
          <div id="preview">
            <div>
              <img :src="image.url" width="100px" height="auto" class="thumb" />
            </div>
            <div>
              {{ image.name }}
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <button @click="clickButton">CAMERA</button>
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
      }
    };
  },
  mounted() {},
  methods: {
    onFileChange(e) {
      let images = {
        name: null,
        url: null
      };

      const file = e.target.files[0];
      images.name = file.name;
      images.url = URL.createObjectURL(file);
      this.part.images.push(images);
    },
    clickButton() {
      this.$refs.file.click();
    }
  }
};
</script>

<style scoped>
#preview {
  /* display: flex; */
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
}

#file {
  display: none;
}

.thumb {
  padding: 10px;
}
</style>
