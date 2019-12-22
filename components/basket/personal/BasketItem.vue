<template>
  <div v-if="selectedOffer.id != '42949'">
    <div class="basket-item__img">
      <img :src="basketItemData.picture">
    </div>
    <div class="basket-item__name">
      <span class="basket-item__col-head">Арт.: {{ basketItemData.info.vendorCode }}</span>
      <a :href="basketItemData.url" v-html="basketItemData.info ? basketItemData.info.name : basketItemData.name">

      </a>
      <div class="basket-item__name__selected-props">
        <div v-if="selectedColor">Цвет: <span :style="{'background-color': selectedOffer.color.hex}"></span> {{
          selectedOffer.color.name }}
        </div>
        <div v-if="selectedSize">Размер: {{ selectedSize }}</div>
        <div v-if="selectedTon">Тон: {{ selectedTon }}</div>
      </div>
      <div class="basket-item__name__price">
        {{ basketItemData.quantity }} x {{ basketItemData.price | formatPrice }} р.
        = {{ basketItemData.sum | formatPrice }} р.
      </div>
    </div>
  </div>
</template>
<script>
  import BasketItemR2 from '~/mixins/mixinBasketItemR2'

  export default {
    mixins: [BasketItemR2],
    props: ['basketItemData'],
  }
</script>