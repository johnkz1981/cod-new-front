<template>
  <!-- Main content -->
  <main class="main-content">
    <div class="main-content__inner">
      <div class="row">
        <div class="col-12 col-lg-10 offset-lg-1 col-xl-12 offset-xl-0">
          <basket class="basket" :basket-data="basketData"/>
        </div>
      </div>
    </div>
  </main>
  <!-- End Main content-->
</template>
<script>
  import Basket from '~/components/basket/page/Basket'

  export default {
    data() {
      return {
      }
    },
    components: {
      Basket
    },
    computed: {
      basketData() {
        return this.$store.getters['basket/basket'];
      }
    }
  }
</script>