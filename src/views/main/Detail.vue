<template>
  <div>
    <nav class="breadcrumb notification is-info" aria-label="breadcrumbs">
      <ul>
        <li>
          <router-link to="/open">
            <span class="icon">
              <i class="fas fa-home"></i>
            </span>
            VOLVER</router-link
          >
        </li>
        <li>
          PARTE DE TRABAJO
        </li>
      </ul>
    </nav>
    <div>
      <form @submit.prevent="onSubmit">
        <div class="field">
          <label for="date" class="label">FECHA</label>
          <div class="control">
            <input
              type="date"
              name="date"
              id="date"
              v-model="localOrder.date"
              class="input"
            />
          </div>
        </div>

        <div class="field">
          <label for="fault" class="label">AVERIA</label>
          <div class="control">
            <textarea
              class="textarea"
              placeholder="Textarea"
              name="fault"
              id="fault"
              v-model="localOrder.fault"
            ></textarea>
          </div>
        </div>

        <div class="field">
          <label class="label" for="">VEHICULO</label>
          <div class="control">
            <div class="select">
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
          </div>
        </div>

        <div class="field">
          <label for="price" class="label">PRECIO</label>
          <div class="control">
            <input
              class="input"
              type="number"
              name="price"
              step="any"
              id="price"
              v-model="localOrder.price"
            />
          </div>
        </div>

        <div class="field">
          <label class="label" for="hours">HORAS</label>
          <div class="control">
            <input
              class="input"
              type="number"
              name="hours"
              step="any"
              id="hours"
              v-model="localOrder.hours"
            />
          </div>
        </div>

        <div class="field">
          <label class="label" for="materials">MATERIALES</label>
          <div class="control">
            <input
              class="input"
              type="number"
              step="any"
              name="materials"
              id="materials"
              v-model="localOrder.materials"
            />
          </div>
        </div>

        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input
                type="checkbox"
                name="closed"
                id="closed"
                v-model="localOrder.closed"
                disabled
              />TERMINADO
            </label>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input
                type="checkbox"
                name="finished"
                id="finished"
                v-model="localOrder.finished"
                disabled
              />CERRADO
            </label>
          </div>
        </div>

        <div>
          <input ref="file" type="file" id="file" @change="onFileChange" />
        </div>

        <div>
          <div
            class="card"
            v-for="(image, index) in localOrder.images"
            :key="image.index"
          >
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img :src="image.thumb_url" width="128px" height="auto" />
                  </figure>
                </div>
                <div class="media-content">
                  <div class="field is-grouped">
                    <div>
                      <button
                        class="button is-danger"
                        type="button"
                        @click="deleteLocalImage(image, index)"
                      >
                        BORRAR
                      </button>
                    </div>
                    <div>
                      <button
                        class="button is-success"
                        type="button"
                        @click="showImage(image)"
                      >
                        VER
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="notification is-warning" v-if="waitImage">
          PROCESANDO LA IMAGEN ESPERA
        </div>
        <div class="field is-grouped">
          <div>
            <button
              class="button is-link is-warning"
              type="button"
              @click="clickButton"
            >
              CAMERA
            </button>
          </div>
          <div>
            <button class="button is-link" type="submit">ACEPTAR</button>
          </div>
          <div>
            <button
              class="button is-link is-light"
              type="button"
              @click="onCancel"
            >
              CANCELAR
            </button>
          </div>
        </div>
      </form>
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
      'getOrders',
      'deleteImage'
    ]),
    ...mapMutations('workshopStore', ['setOrder', 'setCurrentImage']),
    onFileChange(e) {
      let image = {
        id: null,
        image_name: null,
        image_url: null,
        thumb_name: null,
        thumb_url: null,
        delete_url: null
      };

      this.waitImage = true;

      const file = e.target.files[0];
      this.getBase64(file).then(data => {
        this.postImage({ name: file.name, data: data }).then(result => {
          image.id = result.id;
          image.image_name = result.image.name;
          image.image_url = result.image.url;
          image.thumb_name = result.thumb.name;
          image.thumb_url = result.thumb.url;
          image.delete_url = result.delete_url;
          this.localOrder.images.push(image);
          this.waitImage = false;
        });
      });
    },
    clickButton() {
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
          this.$router.push({ name: 'open' });
        });
      } else {
        // this.putOrder(this.localOrder).then(() => {
        //   this.getOrders(false).then(() => this.$router.go(-1));
        this.putOrder(this.localOrder).then(() => {
          this.$router.push({ name: 'open' });
        });
      }
    },
    onCancel() {
      this.$router.push({ name: 'open' });
    },
    deleteLocalImage(data, index) {
      this.localOrder.images.splice(index, 1);
      // this.deleteImage(data.delete_url).then(result => {
      //   console.log(result);
      //   this.localOrder.images.splice(index, 1);
      // });
    },
    showImage(data) {
      console.log(data);
      this.setOrder(this.localOrder);
      this.setCurrentImage(data);
      this.$router.push({ name: 'showimage' });
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
