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
    <div v-if="waitImage">
      PROCESANDO LA IMAGEN ESPERA
    </div>
    <div>
      <button @click="clickButton">CAMERA</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

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
      waitImage: false
    };
  },
  mounted() {},
  methods: {
    ...mapActions('workshopStore', ['postImage']),
    onFileChange(e) {
      let images = {
        name: null,
        url: null
      };

      const file = e.target.files[0];
      // console.log(file);
      this.getBase64(file).then(data => {
        this.postImage({ name: file.name, data: data }).then(result => {
          console.log(result);
          images.name = result.id;
          // images.url = URL.createObjectURL(file);
          images.url = result.thumb.url;
          this.part.images.push(images);
          this.waitImage = false;
        });
      });
    },
    clickButton() {
      this.waitImage = true;
      this.$refs.file.click();
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
          if (encoded.length % 4 > 0) {
            encoded += '='.repeat(4 - (encoded.length % 4));
          }
          resolve(encoded);
        };
        reader.onerror = error => reject(error);
      });
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
