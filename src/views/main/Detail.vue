<template>
  <div>
    <div>
      <div>
        <h3>DETALLE</h3>
      </div>
      <div>
        <h3>AVERIA</h3>
        <form @submit.prevent="onSubmit">
          <div>
            <label for="date">FECHA</label>
            <input
              type="date"
              name="date"
              id="date"
              v-model="localOrder.date"
            />
          </div>
          <div>
            <label for="fault">AVERIA</label>
            <input
              type="text"
              name="fault"
              id="fault"
              v-model="localOrder.fault"
            />
          </div>
          <div>
            <label for="">VEHICULO</label>
            <select
              name="vehicle_id"
              id="vehicle_id"
              v-model="localOrder.vehicle_id"
              @change="cambiaSelect($event)"
            >
              <option
                v-for="vehicle in localVehicles"
                :key="vehicle._id"
                :value="vehicle._id"
                >{{ vehicle.matricula }} - {{ vehicle.nombre }}</option
              >
            </select>
          </div>
          <div>
            <label for="price">PRECIO</label>
            <input
              type="number"
              name="price"
              id="price"
              v-model="localOrder.price"
            />
          </div>
          <div>
            <label for="hours">HORAS</label>
            <input
              type="number"
              name="hours"
              id="hours"
              v-model="localOrder.hours"
            />
          </div>
          <div>
            <label for="materials">MATERIALES</label>
            <input
              type="number"
              name="materials"
              id="materials"
              v-model="localOrder.materials"
            />
          </div>
          <div>
            <input
              type="checkbox"
              name="closed"
              id="closed"
              v-model="localOrder.closed"
            />TERMINADO
          </div>
          <div>
            <input
              type="checkbox"
              name="finished"
              id="finished"
              v-model="localOrder.finished"
            />CERRADO
          </div>

          <div>
            <input ref="file" type="file" id="file" @change="onFileChange" />
          </div>

          <div>
            <ul>
              <li v-for="image in localOrder.images" :key="image.index">
                <div id="preview">
                  <div>
                    <img
                      :src="image.thumb_url"
                      width="180px"
                      height="auto"
                      class="thumb"
                    />
                  </div>
                  <div>
                    {{ image.image_name }}
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div v-if="waitImage">
            PROCESANDO LA IMAGEN ESPERA
          </div>
          <div>
            <button type="button" @click="clickButton">CAMERA</button>
          </div>
          <div>
            <button type="submit">ACEPTAR</button>
            <button type="button" @click="onCancel">CANCELAR</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  name: 'Detail',
  data() {
    return {
      localOrder: {
        _id: null,
        date: null,
        fault: null,
        vehicle_id: null,
        vehicle: null,
        license_plate: null,
        price: null,
        hours: null,
        materials: null,
        closed: false,
        finished: false,
        images: []
      },
      localVehicles: [],
      waitImage: false
    };
  },
  mounted() {
    this.localOrder = this.order;

    this.getVehicles().then(() => {
      this.localVehicles = this.vehicles;
    });
  },
  computed: {
    ...mapState('workshopStore', ['order', 'vehicles'])
  },
  methods: {
    ...mapActions('workshopStore', [
      'postImage',
      'getVehicles',
      'postOrder',
      'putOrder',
      'getOrders'
    ]),
    ...mapMutations('workshopStore', ['setOrder']),
    onFileChange(e) {
      let image = {
        id: null,
        image_name: null,
        image_url: null,
        image_extension: null,
        thumb_name: null,
        thumb_url: null,
        thumb_extension: null,
        delete_url: null
      };

      const file = e.target.files[0];
      // console.log(file);
      this.getBase64(file).then(data => {
        this.postImage({ name: file.name, data: data }).then(result => {
          console.log(result);
          image.id = result.id;
          image.image_name = result.image.name;
          image.image_url = result.image.url;
          image.image_extension = result.imege.extension;
          image.thumb_name = result.thumb.name;
          image.thumb_url = result.thumb.url;
          image.thumb_extension = result.thumb.extension;
          image.delete_url = result.delete_url;
          this.localOrder.images.push(image);
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
    },
    cambiaSelect(event) {
      let sel = this.localVehicles.find(
        item => item._id === event.target.value
      );

      if (sel) {
        this.localOrder.vehicle = sel.nombre;
        this.localOrder.license_plate = sel.matricula;
      }
    },
    onSubmit() {
      if (this.localOrder._id == null) {
        // this.postOrder(this.localOrder).then(() => {
        //   this.getOrders(false).then(() => this.$router.go(-1));
        this.postOrder(this.localOrder).then(() => {
          this.$router.go(-1);
        });
      } else {
        // this.putOrder(this.localOrder).then(() => {
        //   this.getOrders(false).then(() => this.$router.go(-1));
        this.putOrder(this.localOrder).then(() => {
          this.$router.go(-1);
        });
      }
    },
    onCancel() {
      this.$router.go(-1);
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
