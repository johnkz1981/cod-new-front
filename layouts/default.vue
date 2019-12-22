<template>
  <div class="app-container" id="app-container">
    <toaster
            :active="toastActive"
            :message="toastMessage"
            class="toaster"
    >
    </toaster>
    <!-- Main header -->
    <top-header/>
    <Nuxt/>
    <page-footer/>
    <mobile-footer/>
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="20" viewBox="0 0 14 20" class="svg-main-gradient">
      <defs>
        <linearGradient id="svg-main-gradient" x1="0%" x2="99.708%" y1="0%" y2="85.22%">
          <stop offset="0%" stop-color="#F8AA42"/>
          <stop offset="34.068%" stop-color="#8338AA"/>
          <stop offset="66.153%" stop-color="#5328AD"/>
          <stop offset="100%" stop-color="#35B9E6"/>
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>
<script>
  import TopHeader from '~/components/header/TopHeader.vue'
  import Toaster from '~/components/shared/Toaster.vue'
  import PageFooter from '~/components/footer/PageFooter.vue'
  import MobileFooter from '~/components/footer/MobileFooter'

  export default {
    data() {
      return {
      }
    },
    components: {
      TopHeader,
      Toaster,
      PageFooter,
      MobileFooter
    },
    computed: {
      toastActive() {
        return this.$store.getters['toaster/toastActive'];
      },
      toastMessage() {
        return this.$store.getters['toaster/toastMessage'];
      },
    }
  }
</script>
<style>
  .modal-backdrop {
    opacity: .5;
  }
</style>