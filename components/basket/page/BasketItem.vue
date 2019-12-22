<template>
  <div>
    <div class="basket-item__img">
      <img :src="basketItemData.picture">
    </div>
    <div class="basket-item__name">
      <span class="basket-item__col-head">Артикул: {{ basketItemData.info.vendorCode }}</span>
      <a :href="basketItemData.url" v-html="basketItemData.info.name"></a>
      <div class="basket-item__name__selected-props">
        <div v-if="selectedOfferParams.selectedColor">Цвет: <span :style="{'background-color': selectedOffer.color.hex}"></span>
          {{ selectedOffer.color.name }}</div>
        <div v-if="selectedOfferParams.selectedSize">Размер: {{ selectedOfferParams.selectedSize }}</div>
      </div>
    </div>
    <div class="basket-item__right" v-bind:class="{ loading: loading }">
      <div class="basket-item__props">
        <div v-if="colors.length > 0" class="basket-item__props__color">
          <span class="basket-item__col-head">Цвет</span>
          <select2 :options="colors" v-model="selectedColor"></select2>
        </div>
        <div v-if="sizes.length > 0" class="basket-item__props__size">
          <span class="basket-item__col-head">Размер</span>
          <select2 :options="sizes" v-model="selectedSize"></select2>
        </div>
        <div class="basket-item__props__packageType"
             v-if="packageTypes.length > 0">
          <select2 :options="packageTypes" v-model="wholesalePackageTypeQuantity"></select2>
        </div>
      </div>
      <div class="basket-item__quantity">
        <span class="basket-item__col-head">Количество {{ getPackageTypeName() }}</span>
        <quantity-input
                :default-quantity="getDefaultQuantity"
                :min-quantity="getDefaultMinQuantity"
                :max-quantity="10000"
                @changed="quantityChange($event);">
        </quantity-input>
      </div>
      <div class="basket-item__price">
        <span class="basket-item__col-head">Цена за шт.</span>
        {{ basketItemData.price | formatPrice }} р.
      </div>
      <div class="basket-item__price package-price" v-if="this.basketItemData.type === 'package'">
        <span class="basket-item__col-head">Цена за уп.</span>
        {{ basketItemData.price * wholesaleQuantity | formatPrice }} р.
      </div>
      <div class="basket-item__price box-price" v-if="this.basketItemData.type === 'box'">
        <span class="basket-item__col-head">Цена за кор.</span>
        {{ basketItemData.price * wholesaleQuantity | formatPrice }} р.
      </div>
      <div class="basket-item__sum">
        <span class="basket-item__col-head">Сумма</span>
        {{ basketItemData.sum | formatPrice }} р.
      </div>
      <div class="basket-item__delete">
        <button @click="basketItemDelete()">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14"><path fill="#BABABA" fill-rule="evenodd" d="M12.278 3.665h-.722v9.53a.728.728 0 0 1-.723.734H2.167a.728.728 0 0 1-.723-.734v-9.53H.722A.728.728 0 0 1 0 2.932C0 2.527.323 2.2.722 2.2h11.556c.399 0 .722.328.722.733a.728.728 0 0 1-.722.733zM8.667 1.466H4.333a.728.728 0 0 1-.722-.733c0-.405.323-.733.722-.733h4.334c.399 0 .722.328.722.733a.728.728 0 0 1-.722.733zM3.61 5.865c.399 0 .722.328.722.733v3.665a.728.728 0 0 1-.722.733.728.728 0 0 1-.722-.733V6.598c0-.405.323-.733.722-.733zm2.889 0c.399 0 .722.328.722.733v3.665a.728.728 0 0 1-.722.733.728.728 0 0 1-.722-.733V6.598c0-.405.323-.733.722-.733zm2.889 0c.399 0 .722.328.722.733v3.665a.728.728 0 0 1-.722.733.728.728 0 0 1-.722-.733V6.598c0-.405.323-.733.722-.733z"/></svg>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
  import BasketItemR2 from '~/mixins/mixinBasketItemR2'

  export default {
    mixins: [BasketItemR2],
  }
</script>