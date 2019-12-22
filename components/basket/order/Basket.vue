<template>
  <div :class="{ 'isMounted': isMounted }">
    <basket-item class="basket-item basket-item--order"
                 v-for="(basketItem, index) in basketItems"
                 :key="index"
                 v-if="basketItem.type !== 'service'"
                 :basket-item-data="basketItem">
    </basket-item>
    <div v-if="serviceAdded()"
         class="service-basket-item basket-item--order">
      <div class="basket-item__name">
                                          <span class="left">Сервисный сбор
                                              <b class="info-badge" id="helpAboutServiceInCart" tabindex="-1">?</b>
                                              <b-popover target="helpAboutServiceInCart"
                                                         triggers="focus"
                                                         placement="topright">
                                                  Сервисный сбор не взымается с заказов на сумму больше <strong>10 000</strong> р.
                                              </b-popover>
                                          </span>
        <span class="right">{{ basketServicePrice }} р.</span>
      </div>
    </div>

    <div class="basket__summary" v-if="basketItems.length">
      <div>
        <ul>
          <li v-if="basketServicePrice > 0">
            <div>Товаров на:</div>
            <div>{{ basketTotal | formatPrice }} р.</div>
          </li>
          <li v-if="basketServicePrice > 0">
            <div>Доставка:</div>
            <div>300 р.</div>
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
  import BasketItem from '~/components/basket/order/BasketItem'
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
