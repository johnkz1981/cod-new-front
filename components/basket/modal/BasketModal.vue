<template>
  <b-modal id="basket-modal"
           ref="basketModalRef"
           hide-footer
           modalClass="basket-modal">
    <basket class="basket basket--order" :basket-data="basketData">
    </basket>
  </b-modal>
</template>
<script>
  import Basket from '~/components/basket/modal/Basket';
  // import BasketFromModal from "../../../mixins/mixinBasket";

  export default {
    name: 'BasketModal',
    data: () => ({
      // basketData: []
    }),
    components: {
      Basket,
    },
    methods: {
      async getBasket(){
        await this.$store.dispatch('basket/fetch');
      }
    },
    computed: {
      basketData() {
        return this.$store.getters['basket/basket'];
      },
      basketTotal() {
        return this.$store.getters['basket/basketTotal'];
      }
    },
    created() {
      this.getBasket();
    }
  }
</script>