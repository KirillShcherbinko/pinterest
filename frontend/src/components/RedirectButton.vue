<script>
export default {
  name: "RedirectButton",
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    redirect() {
      this.$router.push(this.to);
    }
  }
};
</script>

<template>
  <button @click="redirect" class="redirect-button">
    <slot></slot>
  </button>
</template>

<style scoped>
.redirect-button {
  padding: 10px 20px;
  background-color: #472dbb;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.redirect-button:hover {
  background-color: #4565a0;
}
</style>
