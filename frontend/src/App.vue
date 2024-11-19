<script>
import axios from "axios";
import RedirectButton from "./components/RedirectButton.vue";

export default {
  components: { RedirectButton },

  data() {
    return {
      pins: [],
      err: null
    };
  },

  computed: {
    signButtonText() {
      return !localStorage.getItem("token") ? "Sign in" : "Sign out"
    }
  },

  methods: {
    async fetchAllPins() {
      try {
        const res = await axios.get("http://localhost:5000/pins");
        this.pins = res.data.pins;
      } catch (e) {
        console.error(e);
        this.err = "Data download error";
      }
    },

    getImage(imageName) {
      return `http://localhost:5000/${imageName}`;
    },
  },

  mounted() {
    this.fetchAllPins();
  },
};
</script>

<template>
  <div>
    <div v-if="!$route.path.includes('/auth')">
      <h1>Hello, world</h1>
      <div v-if="err" class="error">{{ err }}</div>
      <RedirectButton to="/auth/login">{{ signButtonText }}</RedirectButton>
      <div v-if="pins.length > 0">
        <div v-for="pin in pins" :key="pin._id">
          <img :src="getImage(pin.picture)" alt="Pin image">
        </div>
      </div>
      <div v-else-if="!err">No pins available.</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.error {
  color: red;
}
</style>
