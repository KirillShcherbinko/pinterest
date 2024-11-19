<script>
  import axios from "axios";

  export default {
    data() {
      return {
        pins: [],
        err: null
      };
    },

    methods: {
      async fetchAllPins() {
        try {
          const res = await axios.get("http://localhost:5000/pins");
          this.pins = res.data.pins;
        } catch (e) {
          this.err = "Data download error";
        }
      },

      getImage(imageName) {
        return `http://localhost:5000/${imageName}`
      }
    },

    mounted() {
      this.fetchAllPins();
    }
  };
</script>

<template>
  <div>
    <h1>Hello, world</h1>
    <div v-if="err" class="error">{{ err }}</div>
    <div v-for="pin in pins":key="pin._id">
      <img :src="getImage(pin.picture)" alt="Pin image">
    </div>
  </div>
</template>

<style scoped>
  .error {
    color: red;
  }
</style>
