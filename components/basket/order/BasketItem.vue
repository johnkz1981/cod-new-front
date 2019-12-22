<template>
<div>
  <div class="basket-item__img">
    <img :src="basketItemData.picture">
  </div>
  <div class="basket-item__name">
    <span class="basket-item__col-head">Артикул: {{ basketItemData.info.vendorCode }}</span>
    <a :href="basketItemData.url" v-html="basketItemData.info.name"></a>
    <div class="basket-item__name__selected-props">
      <div v-if="selectedOfferParams.selectedColor && colors && colors.length > 0">Цвет: <span :style="{'background-color': selectedOffer.color.hex}"></span> {{ selectedOffer.color.name }}</div>
      <div v-if="selectedOfferParams.selectedSize && sizes && sizes.length > 0">Размер: {{ selectedOfferParams.selectedSize }}</div>
      <div v-if="selectedOfferParams.selectedTon && tons && tons.length > 0">Тон: {{ selectedOfferParams.selectedTon }}</div>
    </div>
    <div class="basket-item__name__price">
      {{ basketItemData.quantity }}
      <span class="package-pck" v-if="basketItemData.type == 'package'">({{ basketItemData.quantity / basketItemData.info.packageSize }} уп.)</span>
      <span class="box-pck" v-if="basketItemData.type == 'box'">({{ basketItemData.quantity / basketItemData.info.boxSize }} кор.)</span>
      x {{ basketItemData.price | formatPrice }} р. = {{ basketItemData.sum | formatPrice }} р.
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