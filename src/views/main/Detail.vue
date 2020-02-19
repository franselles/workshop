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
      <div>
        <video ref="video" id="video" width="640" height="480" autoplay></video>
      </div>
      <div><button id="snap" @click="capture()">Snap Photo</button></div>
      <canvas ref="canvas" id="canvas" width="640" height="480"></canvas>
      <ul>
        <li v-for="c in captures" :key="c.index">
          <img :src="c" height="50" />
        </li>
      </ul>
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
      video: {},
      canvas: {},
      captures: []
    };
  },
  mounted() {
    this.video = this.$refs.video;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.src = window.URL.createObjectURL(stream);
        this.video.play();
      });
    }
  },
  methods: {
    capture() {
      this.canvas = this.$refs.canvas;
      let context = this.canvas
        .getContext('2d')
        .drawImage(this.video, 0, 0, 640, 480);
      this.captures.push(this.canvas.toDataURL('image/png'));
      console.log(context);
    }
  }
};
</script>

<style scoped>
#video {
  background-color: #000000;
}
#canvas {
  display: none;
}
li {
  display: inline;
  padding: 5px;
}
</style>
