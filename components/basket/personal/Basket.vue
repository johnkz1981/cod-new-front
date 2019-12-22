<template>
  <div :class="{ 'isMounted': isMounted }">
    <div class="basket__summary" v-if="basketItems.length">
      <div>
        <ul>
          <li>
            <div>Товаров на:</div>
            <div>{{ basketTotal | formatPrice }} р.</div>
          </li>
          <li v-if="basketServicePrice > 0">
            <div>Сервисный сбор:</div>
            <div>{{ basketServicePrice }} р.</div>
          </li>
          <li>
            <div>Доставка:</div>
            <div>{{ 300 }} р.</div>
          </li>
          <li>
            <div>Итого:</div>
            <div>{{ basketTotal + basketServicePrice + 300 | formatPrice }} р.</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  // Components
  import BasketItem from '~/components/basket/personal/BasketItem'
  import basket from '~/mixins/mixinBasketR2'

  export default {
    name: 'BasketFromModal',
    mixins: [basket],
    props: ['basketData'],
    components: {
      BasketItem
    },
    data() {
      return {
        isMounted: false,


        basketItems: []
      };
    },
  }

</script>
