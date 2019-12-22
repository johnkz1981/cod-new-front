<template>
  <div class="row">
    <div class="goods__mobile-head col-12">
      <div class="goods__mobile-head__vendor-code">
        Артикул: 1326541
      </div>
      <div class="h1">Рюкзак молодежный bobby</div>
    </div>
    <div class="col-12 col-md-5 col-lg-6 col-xl-5">
      <ul class="catalog-item__badges" v-if="itemDataRender && itemDataRender.labels.length">
        <li v-for="label in itemDataRender.labels" :class="label.code">
          {{ label.title }}
        </li>
      </ul>
      <!-- goods images gallery -->
      <goods-images class="goods-images"
                    :images="images">
      </goods-images>
    </div>
    <div class="goods-description col-12 col-md-7 col-lg-6 offset-xl-1">
      <h1>Рюкзак молодежный bobby</h1>
      <div class="goods-description__head d-none d-md-flex align-items-center justify-content-between">
        <div class="goods-description__vendor-code">
          Артикул: 1326541
        </div>
        <goods-favorites
                :goods-id="goodsId"
                :favorites="user.favoriteProduct"
                v-if="user"
                :is-goods="true"
        >
        </goods-favorites>
      </div>

      <!-- Color select -->
      <goods-color-select class="goods-color-select"
                          :colors="colors"
                          :selected-offer="selectedOffer"
                          v-if="colors.length"
                          @color-changed="optionChanged($event)">
        <div>
          <div class="goods-color-select__head">
            Цвет
          </div>
          <ul>
            <li
                    v-for="(color, index) in colors"
                    :key="index"
                    :class="{active: getSelectedColor(color)}">
              <a href="#" :style="{ backgroundColor: color.hex }" @click.prevent="$emit('color-changed', color.offerId[0]);"></a>
            </li>
          </ul>
          <div class="goods-color-select__select2-wrap">
            <select2 :options="colorsInSelect" v-model="initialSelectedOffer" @input="$emit('color-changed', $event);"></select2>
          </div>
        </div>
      </goods-color-select>

      <!-- Size select -->
      <goods-size-select class="goods-size-select"
                         :sizes="sizes"
                         :selected-offer="selectedOffer"
                         v-if="sizes.length"
                         @size-changed="optionChanged($event)">
        <div>
          <div class="goods-size-select__head">
            Размер
          </div>
          <ul>
            <li
                    v-for="(size, index) in sizes"
                    :key="index"
                    :class="{active: selectedOffer.id == size.offerId}">
              <a href="#" @click="$emit('size-changed', size.offerId);$event.preventDefault()">{{ size.size }}</a>
            </li>
          </ul>
        </div>
      </goods-size-select>

      <!-- goods buy -->
      <goods-buy class="goods-buy"
                 :selected-offer="selectedOffer"
                 :price="price"
                 :min-quantity="minQuantity"
                 :package-size="packageSize"
                 :box-size="boxSize"
                 @wholesale-quantity-changed="getPrice($event)"
                 @add-to-basket="addToBasket($event)"
                 v-if="selectedOffer && price">
        <div>
          <div class="goods-buy__pieces">
            <div class="goods-buy__price">
              <span>{{ selectedOffer.price | formatPrice }}</span> ₽/шт
            </div>
            <div class="goods-buy__add">
              <quantity-input :min-quantity="minQuantity" :max-quantity="1000" @changed="quantity = $event"></quantity-input>
              <button type="button" class="goods-buy__add-btn btn btn--gradient" @click="$emit('add-to-basket', {quantity: quantity, type: 'goods'})">
                <span>В корзину</span>
              </button>
            </div>
          </div>
          <div class="goods-buy__wholesale" v-if="packageTypes.length">
            <div class="goods-buy__wholesale__head">
              Купить оптом
            </div>
            <div class="goods-buy__wholesale__select-wrap">
              <select2 :options="packageTypes" v-model="wholesalePackageTypeQuantity"></select2>
            </div>
            <div class="goods-buy__price">
              <span>{{ wholesalePackageTypeQuantity * price.price | formatPrice }}</span> ₽/шт
              <div class="goods-buy__price__saving">
                Экономия <span>{{ selectedOffer.price * wholesalePackageTypeQuantity - wholesalePackageTypeQuantity * price.price | formatPrice }}</span>₽/шт
              </div>
            </div>
            <div class="goods-buy__add">
              <quantity-input :min-quantity="1" :max-quantity="1000" @changed="wholesaleQuantity = $event"></quantity-input>
              <button type="button" class="goods-buy__add-btn btn btn--gradient" @click="$emit('add-to-basket', {quantity: wholesaleQuantity  * wholesalePackageTypeQuantity, type: wholesalePackageTypeName})">
                <span>В корзину</span>
              </button>
            </div>
          </div>
        </div>
      </goods-buy>

      <!-- Goods characteristics -->
      <div class="goods-characteristics">
        <button type="button" v-b-toggle="'goods-characteristics-collapse'" class="goods-characteristics__collapse-btn d-xl-none">
          Характеристики и описание
          <svg xmlns="http://www.w3.org/2000/svg" width="7" height="4" viewBox="0 0 7 4"><path fill="#202020" fill-rule="evenodd" d="M0 0h7L3.5 4z" opacity=".6"/></svg>
        </button>
        <div class="h1 d-none d-xl-block">Характеристики и описание</div>
        <b-collapse v-model="characteristicsCollapse" id="goods-characteristics-collapse" class="mt-2">
          <div class="table-wrap">
            <table class="table">
              <tbody v-for="n in 3">
              <tr>
                <td>
                  Вес:
                </td>
                <td>
                  1255
                </td>
              </tr>
              <tr>
                <td>
                  Габариты:
                </td>
                <td>
                  42 х 30 х 15 см
                </td>
              </tr>
              <tr>
                <td>
                  Тип:
                </td>
                <td>
                  Рюкзак,Рюкзак городской
                </td>
              </tr>
              </tbody>
            </table>
          </div>

          <p>
            Сейчас молодое поколение людей вместо обычных сумок носят городские рюкзаки, представляющие собой
            достаточно удобные и вместительные изделия. В такую сумку помещается много вещей.
          </p>
        </b-collapse>
      </div>

      <a href="#" class="goods-description__reviews-link">
        Отзывы о товаре <span>(54)</span>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="10" viewBox="0 0 20 10"><path fill="#555" fill-rule="evenodd" d="M0 6h16.669l-2.663 2.663 1.33 1.332L20 5l-4.664-5-1.33 1.336L16.669 4H0z" opacity=".4"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="7" height="4" viewBox="0 0 7 4"><path fill="#202020" fill-rule="evenodd" d="M0 0h7L3.5 4z" opacity=".6"/></svg>
        </div>
      </a>
    </div>
  </div>

</template>
<script>
  import './goods-color-select';
  import './goods-size-select';
  import './goods-buy';
  import GoodsImages from './GoodsImages';
  import goodsFavorites from '~/components/goods/goods-favorites';
  import { goodsMixin } from './goods-mixin';

  export default {
    name: 'goods',
    mixins: [
      goodsMixin
    ],
    components: {
      GoodsImages,
      goodsFavorites
    },
    data() {
      return {
        // price: null,
        // wholesalePrice: null
        // My mock
          thumbs: [],
          packageTypes: [],
      };
    },

    /**
     * Get goods offers on created
     */
    created() {
      this.checkCollapse();
      this.getPrice();

      // Set collapse on resize
      if (process.client) {
        window.addEventListener('resize', () => {
          this.checkCollapse();
        });
      }
    },

    methods: {

    },
    computed: {
      user() {
        return this.$store.getters['user/user'];
      },
    }
  }
</script>