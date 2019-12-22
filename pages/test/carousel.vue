<template>
  <carousel v-if="isNuxtReady">
    <img src="https://placeimg.com/200/200/any?1">
    <img src="https://placeimg.com/200/200/any?2">
    <img src="https://placeimg.com/200/200/any?3">
    <img src="https://placeimg.com/200/200/any?4">
  </carousel>
</template>

<script>
  const carousel = () => window && window !== undefined ? import("vue-owl-carousel2") : null;
  export default {
    components: {carousel},
    data() {
      return {
        isNuxtReady: false,
      }
    },
    mounted() {
      const vm = this;
      if (process.browser) {
        window.onNuxtReady(app => {
          console.log("Nuxt ready!");
          vm.isNuxtReady = true;
        });
      }
    },
  }
</script>