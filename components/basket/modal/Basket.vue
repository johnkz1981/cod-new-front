<template>
  <div :class="{ 'isMounted': isMounted }">
    <div class="basket-header">
      <p v-if="this.basketTotalCount && showBackorder">
        <a class="dozakaz-button" @click="recreateOrder(911)">Дозаказ</a>
        <b class="info-badge" id="dozakazBadge" tabindex="-1"> ? </b>
        <b-popover :target="'dozakazBadge'"
                   triggers="focus"
                   placement="bottom">
          Корзина может быть объединена с заказом №911
        </b-popover>
      </p>
      <div class="basket-modal__text" v-if="this.basketTotalCount">
        В корзине <span>{{ this.basketTotalCount }}</span> поз. на сумму <span>{{ basketTotalForPrint }}</span> р.
      </div>
      <div class="basket-modal__text empty-basket" v-if="this.basketTotalCount < 1">
        Корзина пуста
      </div>
      <div class="basket-modal__actions">
        <button class="btn btn--default btn--md back-button" @click="hideModal">
          Продолжить покупки
        </button>
        <a href="/basket/" class="btn btn--default btn--md basket-button" v-if="this.basketTotalCount > 0">
          Перейти в корзину
        </a>
        <a href="/order/" style="margin-left: 10px" class="btn btn--gradient btn--md" v-if="this.basketTotalCount > 0">
          <span>Оформить заказ</span>
        </a>
      </div>
    </div>
    <basket-item class="basket-item basket-item--order basket-item--sidebar"
                 v-for="(basketItem, index) in basketItems"
                 v-if="basketItem.type !== 'service'"
                 :key="basketItem.basketId"
                 :basket-item-data="basketItem"
                 @changed="updateItem($event)"
                 @basket-item-delete="deleteItem($event)">
    </basket-item>
    <div v-if="serviceAdded()"
         class="service-basket-item basket-item--order">
      <div class="basket-item__name">
                      <span class="left">Сервисный сбор
                        <b class="info-badge" id="helpAboutServiceInPopup" tabindex="-1">?</b>
                          <b-popover target="helpAboutServiceInPopup"
                                     triggers="focus"
                                     placement="topright">
                              Сервисный сбор не взымается с заказов на сумму больше <strong>10 000</strong> р.
                          </b-popover>
                      </span>
        <span class="right">{{ basketServicePrice }} р.</span>
      </div>
    </div>
  </div>
</template>
<script>
  // Components
  import BasketItem from '~/components/basket/modal/BasketItem'
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
    methods: {
      hideModal() {
        this.$bvModal.hide('basket-modal');
        this.$store.commit('basket/setShowBackorder', false);
      }
    },
    computed: {
      showBackorder() {
        return this.$store.getters['basket/showBackorder'];
      },
    }
  }

</script>
