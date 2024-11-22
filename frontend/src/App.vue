<script>
import axios from "axios"
import RedirectButton from "./components/RedirectButton.vue"
import PostPinModal from "./components/PostPinModal.vue"

export default {
  components: { RedirectButton, PostPinModal},
  data() {
    return {
      pins: [],
      showModal: false,
      err: ""
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
        this.err = "Data download error";
      }
    },

    getImage(imageName) {
      return `http://localhost:5000/${imageName}`;
    },

    deleteToken() {
      localStorage.removeItem("token")
      delete axios.defaults.headers.common["Authorization"]
      console.log(localStorage.token)
    },

    checkText() {
      return this.$refs.RedirectButton.textContent === "Sign out"
    },

    signOutClick() {
      if (this.checkText()) {
        this.deleteToken()
      }
    }
  },

  mounted() {
    this.fetchAllPins();
  },
};
</script>

<template>
  <div>
    <div class="content" v-if="!$route.path.includes('/auth')">
      <div v-if="err" class="error">{{ err }}</div>
      <div class="button-container">
        <button class="add-button" @click="showModal = true">Add</button>
        <RedirectButton to="/auth/login" @click="this.deleteToken()">{{ signButtonText }}</RedirectButton>
      </div>
      <PostPinModal
          v-if="showModal"
          :showModal="showModal"
          @close="showModal = false"
          @published="fetchAllPins"
      />
      <div class="image-container" v-if="pins.length > 0">
        <div v-for="pin in pins" :key="pin._id">
          <img class="image-container__item" :src="getImage(pin.picture)" alt="Pin image">
        </div>
      </div>
      <div v-else-if="!err">No pins available.</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped>

.page {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2f2f2f;
}

.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.error {
  color: red;
}

.button-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin: 48px 0;
}

.add-button {
  padding: 10px 20px;
  background-color: #472dbb;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.add-button:hover {
  background-color: #4565a0;
}

.image-container {
  width: 900px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 60px;
}

.image-container__item {
  width: 240px;
  height: 300px;
  border-radius: 10px;
}
</style>
