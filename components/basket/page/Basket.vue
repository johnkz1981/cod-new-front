<template>
    <div :class="{ 'isMounted': isMounted }">
      <div class="basket__head">
        <h1>Корзина товаров</h1>
        <div class="basket__head__total" v-if="this.basketTotalCount">
          <span>Товаров на:</span>
          {{ basketTotal | formatPrice }} р.
        </div>
      </div>
      <basket-item class="basket-item"
                   v-for="(basketItem, index) in basketItems"
                   v-if="basketItem.type !== 'service'"
                   :key="basketItem.basketId"
                   :basket-item-data="basketItem"
                   @changed="updateItem($event)"
                   @basket-item-delete="deleteItem($event)">

      </basket-item>
      <div v-if="serviceAdded()" class="service-basket-item basket-item--order">
        <div class="basket-item__name">
                              <span class="left">Сервисный сбор Page
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

      <div class="basket__summary" v-if="this.basketTotalCount">
        <div>
          <a href="/catalog/level2/" class="btn btn--default btn--lg">
            Продолжить покупки
          </a>
        </div>
        <div>
          <ul>
            <li v-if="basketServicePrice > 0">
              <div>Товаров на:</div>
              <div>{{ basketTotal | formatPrice }} р.</div>
            </li>
            <li>
              <div>Итого:</div>
              <div>{{ basketTotal + basketServicePrice | formatPrice }} р.</div>
            </li>
          </ul>
          <a href="/order/" class="btn btn--gradient btn--lg btn--block">
            <span>Оформить заказ <div>на {{ basketTotal | formatPrice }} р.</div></span>
          </a>
        </div>
      </div>

      <div class="basket__empty" v-if="this.basketTotalCount === 0">
        <p>Корзина пуста</p>
      </div>
    </div>
</template>
<script>
  // Components
  import BasketItem from '~/components/basket/page/BasketItem'
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