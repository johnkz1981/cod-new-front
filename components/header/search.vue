<template>
  <div :class="{'suggestion-active': suggestionsVisible(), 'focused': focus}">
    <form action="/search/" class="main-header__search__input">
      <!-- <img src="/local/templates/cente/assets/img/svg/search.svg"> -->
      <input type="search" name="q" v-model="query" @focus="focus = true" placeholder="Поиск по сайту"
             value=""/>
      <button type="submit">Искать</button>
      <button class="clear-button" :class="{'active': suggestionsVisible(), 'loading': loading}" type="button"
              @click="clear()">
        <img class="loading-icon" src="/assets/img/loading.svg" alt="">
        <svg class="close-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             version="1.1" viewBox="0 0 212.982 212.982" width="16px" height="16px" xml:space="preserve">
                  <path fill="currentColor" d="M131.804,106.491l75.936-75.936c6.99-6.99,6.99-18.323,0-25.312
                   c-6.99-6.99-18.322-6.99-25.312,0l-75.937,75.937L30.554,5.242c-6.99-6.99-18.322-6.99-25.312,0c-6.989,6.99-6.989,18.323,0,25.312
                   l75.937,75.936L5.242,182.427c-6.989,6.99-6.989,18.323,0,25.312c6.99,6.99,18.322,6.99,25.312,0l75.937-75.937l75.937,75.937
                   c6.989,6.99,18.322,6.99,25.312,0c6.99-6.99,6.99-18.322,0-25.312L131.804,106.491z"></path>
                </svg>
      </button>
    </form>

    <div class="suggestions">
      <div class="suggestion">
        <catalog-item class="suggestion-item" v-for="(item, index) in searchSuggestions" inline-template
                      :item-data="item" :goods-id="item.id" :class="{'with-offers': item.offers.length > 1}"
                      :key="index">
          <div>
            <div class="preview-image">
              <a :href="itemDataRender.url">
                <img :src="previewPicture" v-if="!images">
                <img :src="images.previewPicture" v-if="images">
              </a>
            </div>
            <div class="name-vendor">
              <div class="vendor-name">
                Артикул: {{ itemDataRender.vendorCode }}
              </div>
              <a :href="itemDataRender.url" class="item-name"
                 :class="{ 'long-name': isLargeNameClass(itemDataRender.name) }"
                 v-html="itemDataRender.name"></a>
            </div>

            <div class="catalog-item__main-info">
              <div class="catalog-item__options">
                <!-- Size select -->
                <!--goods-size-select class="goods-size-select" inline-template :sizes="sizes"
                                   :selected-offer="selectedOffer" v-if="sizes.length"
                                   @size-changed="optionChanged($event)">
                  <div>
                    <ul>
                      <swiper :options="swiperOptions">
                        <swiper-slide v-for="(size, index) in sizes" :key="index">
                          <li :class="{active: selectedOffer.id == size.offerId}">
                            <a href="#"
                               @click="$emit('size-changed', size.offerId);$event.preventDefault()">{{ size.size }}</a>
                          </li>
                        </swiper-slide>
                        <div class="swiper-button swiper-button-prev" slot="button-prev">
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="18" viewBox="0 0 11 20">
                            <path fill="#7E7E7E" fill-rule="evenodd"
                                  d="M9.664 20L11 18.677l-8.751-8.675L11 1.324 9.664 0 0 10.002z"></path>
                          </svg>
                        </div>
                        <div class="swiper-button swiper-button-next" slot="button-next">
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="18" viewBox="0 0 11 20">
                            <path fill="#7E7E7E" fill-rule="evenodd"
                                  d="M1.337 20L0 18.677l8.751-8.675L0 1.324 1.337 0 11 10.002z"></path>
                          </svg>
                        </div>
                      </swiper>
                    </ul>
                  </div>
                </goods-size-select-->

                <!-- Size select -->
                <goods-size-select class="goods-size-select" inline-template :sizes="sizes"
                                   :selected-offer="selectedOffer" v-if="sizes.length"
                                   @size-changed="optionChanged($event)">
                  <div>
                    <ul>
                      <div v-swiper:mySwiper="swiperOptions">
                        <template class="swiper-wrapper">
                          <div class="swiper-slide" v-for="(size, index) in sizes" :key="index">
                            <li :class="{active: selectedOffer.id == size.offerId}">
                              <a href="#"
                                 @click="$emit('size-changed', size.offerId);$event.preventDefault()">{{ size.size
                                }}</a>
                            </li>
                          </div>
                          <div class="swiper-button swiper-button-prev" slot="button-prev">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="18" viewBox="0 0 11 20">
                              <path fill="#7E7E7E" fill-rule="evenodd"
                                    d="M9.664 20L11 18.677l-8.751-8.675L11 1.324 9.664 0 0 10.002z"></path>
                            </svg>
                          </div>
                          <div class="swiper-button swiper-button-next" slot="button-next">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="18" viewBox="0 0 11 20">
                              <path fill="#7E7E7E" fill-rule="evenodd"
                                    d="M1.337 20L0 18.677l8.751-8.675L0 1.324 1.337 0 11 10.002z"></path>
                            </svg>
                          </div>
                        </template>
                      </div>
                    </ul>
                  </div>
                </goods-size-select>

                <!-- Color select -->
                <!--goods-color-select class="goods-color-select" inline-template :colors="colors"
                                    :selected-offer="selectedOffer" v-if="colors.length"
                                    @color-changed="optionChanged($event)">
                  <div>
                    <ul>
                      <swiper :options="swiperOptions">
                        <swiper-slide v-for="(color, index) in colors" :key="index">
                          <li :class="{active: getSelectedColor(color)}">
                            <a href="#" :style="{ backgroundColor: color.hex }"
                               @click.prevent="$emit('color-changed', color.offerId[0]);"></a>
                          </li>
                        </swiper-slide>
                        <div class="swiper-button swiper-button-prev" slot="button-prev">
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="18" viewBox="0 0 11 20">
                            <path fill="#7E7E7E" fill-rule="evenodd"
                                  d="M9.664 20L11 18.677l-8.751-8.675L11 1.324 9.664 0 0 10.002z"></path>
                          </svg>
                        </div>
                        <div class="swiper-button swiper-button-next" slot="button-next">
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="18" viewBox="0 0 11 20">
                            <path fill="#7E7E7E" fill-rule="evenodd"
                                  d="M1.337 20L0 18.677l8.751-8.675L0 1.324 1.337 0 11 10.002z"></path>
                          </svg>
                        </div>
                      </swiper>
                    </ul>
                  </div>
                </goods-color-select-->

                <!-- Color select -->
                <goods-color-select class="goods-color-select" inline-template :colors="colors"
                                    :selected-offer="selectedOffer" v-if="colors.length"
                                    @color-changed="optionChanged($event)">
                  <div>
                    <ul>
                      <div v-swiper:mySwiper="swiperOptions">
                        <div class="swiper-wrapper">
                          <div class="swiper-slide" v-for="(color, index) in colors" :key="index">
                            <li :class="{active: getSelectedColor(color)}">
                              <a href="#" :style="{ backgroundColor: color.hex }"
                                 @click.prevent="$emit('color-changed', color.offerId[0]);"></a>
                            </li>
                          </div>
                          <div class="swiper-button swiper-button-prev" slot="button-prev">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="18" viewBox="0 0 11 20">
                              <path fill="#7E7E7E" fill-rule="evenodd"
                                    d="M9.664 20L11 18.677l-8.751-8.675L11 1.324 9.664 0 0 10.002z"></path>
                            </svg>
                          </div>
                          <div class="swiper-button swiper-button-next" slot="button-next">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="18" viewBox="0 0 11 20">
                              <path fill="#7E7E7E" fill-rule="evenodd"
                                    d="M1.337 20L0 18.677l8.751-8.675L0 1.324 1.337 0 11 10.002z"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </ul>
                  </div>
                </goods-color-select>


              </div>
            </div>
            <goods-buy inline-template :has-offers="hasOffers" :selected-offer="selectedOffer"
                       :price-list="priceList" :min-quantity="minQuantity" :package-size="packageSize"
                       :box-size="boxSize" :is-in-catalog="true" @add-to-basket="addToBasket($event)"
                       v-if="selectedOffer && priceList">
              <div>
                <div class="catalog-item__price">
                  <ul>
                    <li>
                      <div>Ваша цена</div>
                      <div>
                                <span
                                        v-if="!isCountEqualToPackage() && !isCountEqualToBox()">{{ selectedPackedPrice | formatPrice }}</span>
                        <span class="goods-buy__price is-package" v-if="isCountEqualToPackage()">
                                  {{ packagePrice | formatPrice }}
                                </span>
                        <span class="goods-buy__price is-box" v-if="isCountEqualToBox()">
                                  {{ boxPrice | formatPrice }}
                                </span>
                        р./шт
                      </div>
                    </li>
                    <li v-if="basePrice > 0">
                      <div>Базовая цена</div>
                      <div><span>{{ basePrice  | formatPrice}}</span> р./шт</div>
                    </li>
                    <li v-if="basePrice === 0 && lowestPrice > 0">
                      <div>Макс. скидка</div>
                      <div>
                        <span class="lowest-price">{{ lowestPrice  | formatPrice}}</span> р./шт
                        <i class="info-badge" :id="'helpAboutLowestPrice_' + selectedOffer.id" tabindex="-1">
                          ?
                        </i>
                        <b-popover :target="'helpAboutLowestPrice_' + selectedOffer.id" triggers="focus"
                                   placement="topright">
                          Цена с максимальной скидкой доступна
                          <strong v-if="lowestPriceFor === 'box'" class="blue-text">при покупке коробками
                            ({{ boxSize }} шт.)</strong>
                          <strong v-if="lowestPriceFor === 'package'" class="green-text">при покупке
                            упаковками ({{ packageSize }} шт.)</strong>
                          <strong v-if="lowestPriceFor === 'goods'">после регистрации</strong>
                        </b-popover>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </goods-buy>
          </div>
        </catalog-item>
      </div>
      <div class="show-all"><a @click="showAll()">Показать все результаты</a></div>
    </div>
  </div>
</template>
<script>
  import {debounce} from 'lodash';
  import catalogItem from '~/components/catalog/catalog-item/catalog-item'
  import goodsBuy from '~/components/goods/goods-buy'
  import '~/mixins/formatPrice'

  export default {
    name: 'search-form-box',
    data() {
      return {
        query: '',
        searchSuggestions: [],
        visible: false,
        focus: false,
        loading: false,
      };
    },
    components: {
      catalogItem,
      goodsBuy
    },
    computed: {},
    methods: {
      suggestionsVisible() {
        return this.focus && this.searchSuggestions.length > 0;
      },
      showAll() {
        document.location.assign('/search/?q=' + this.query);
      },
      clear() {
        this.query = '';
        this.focus = false;
      },
      debounceInput: debounce(function (newQuery) {
        if (newQuery && newQuery.length > 2) {
          this.$axios.$post('/api/v1/product/suggestions', {searchQuery: newQuery})
              .then((res) => {
                this.loading = false;
                this.searchSuggestions = res;
              })
              .catch((err) => {
                this.loading = false;
                console.log(err);
              });
        }

        if (newQuery.length <= 2) {
          this.searchSuggestions = [];
        }
      }, 250)
    },

    watch: {
      query(newQuery) {
        this.loading = true;
        this.debounceInput(newQuery);
      }
    },

    mounted() {
      $(document).on('scroll', (ev) => {
        let top = document.documentElement.scrollTop;
        if (top > 0 && top > 100) {
          top = 100;
        }
        if (this.suggestionsVisible()) {
          $(this.$el).css({transform: `translate3d(0, ${top}px, 0)`});
        } else {
          $(this.$el).css({transform: 'translate3d(0, 0, 0)'});
        }
      });
    }
  }
</script>