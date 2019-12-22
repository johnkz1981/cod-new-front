<template>
  <!--div class="catalog catalog--carousel">
    <catalog-top
            class="catalog-top d-none"
            ref="catalogTop">
    </catalog-top>
    <catalog-filter
            class="catalog-filter d-none"
            :catalog-filter-data="catalogFilterData"
            :api-url="apiUrl"
            ref="catalogFilter"
    >
    </catalog-filter>
    <div v-swiper:mySwiper="catalogSwiperOptions">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in catalogItems" :key="index">
          <catalog-item class="catalog-item col-12" :item-data="item" :goods-id="item.id"
                        :class="{'with-offers': item.offers.length > 1}">
          </catalog-item>
        </div>
      </div>
      <div class="swiper-button catalog-swiper-button-prev" slot="button-prev">
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="20" viewBox="0 0 11 20">
          <path fill="#7E7E7E" fill-rule="evenodd"
                d="M9.664 20L11 18.677l-8.751-8.675L11 1.324 9.664 0 0 10.002z"></path>
        </svg>
      </div>
      <div class="swiper-button catalog-swiper-button-next" slot="button-next">
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="20" viewBox="0 0 11 20">
          <path fill="#7E7E7E" fill-rule="evenodd"
                d="M1.337 20L0 18.677l8.751-8.675L0 1.324 1.337 0 11 10.002z"></path>
        </svg>
      </div>
    </div>
  </div-->
  <div class="catalog">
    <catalog-top class="catalog-top"
                 @options-changed="getCatalog();view=$event.view"
                 ref="catalogTop">
    </catalog-top>
    <catalog-filter class="catalog-filter"
                    :catalog-filter-data="catalogFilterData"
                    :api-url="apiUrl"
                    @catalog-filter-changed="getCatalog()"
                    ref="catalogFilter">
    </catalog-filter>
    <div class="catalog__right">

      <!-- Catalog items on server Mock-->
      <!--<section class="catalog-items row" v-if="!catalogItems">
        <div v-for="n in 8" class="catalog-item col-12 col-sm-6 col-md-3">
          &lt;!&ndash; Выводить соответствующие бейджи, и не забыть предать их в API, что бы vue выводил такие же&ndash;&gt;
          <ul class="catalog-item__badges">
            <li class="is_new">
              Новинки
            </li>
          </ul>

          &lt;!&ndash; Добавить класс in-favorites если товар в избранном &ndash;&gt;
          <button class="catalog-item__like" :class="{'in-favorites': n % 2}">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10">
              <path fill="#B0B0B0" fill-rule="evenodd"
                    d="M8.727.001A3.623 3.623 0 0 0 6 1.232 3.62 3.62 0 0 0 3.273.002a3.25 3.25 0 0 0-2.34.9 3.021 3.021 0 0 0-.932 2.257c.081.963.461 1.88 1.09 2.632 1.268 1.78 4.34 3.98 4.473 4.074.259.18.608.18.867 0 .137-.094 3.21-2.294 4.477-4.074a4.712 4.712 0 0 0 1.09-2.632 3.021 3.021 0 0 0-.932-2.258 3.25 3.25 0 0 0-2.34-.9z"/>
            </svg>
          </button>

          &lt;!&ndash; Показывть изображение первого товарного предложения!!! &ndash;&gt;
          <div class="catalog-item__img">
            <a href="#">
              <img src="/assets/img/uploads/catalog-item.jpg">
            </a>
          </div>

          <div class="catalog-item__main-info">
            <div class="catalog-item__vendor">
              Артикул: 1326541
            </div>
            <a href="" class="catalog-item__name">
              Кружка "Расти большой"
            </a>
            <div class="catalog-item__more-info">
              <b>Collorista;</b> Китай; Хлопок 95%, эластан 5%; В боксе 400 пар.
            </div>
          </div>

          &lt;!&ndash; Вывести цены первого товарного предложения &ndash;&gt;
          <div class="goods-buy">
            <div class="catalog-item__price">
              <ul>
                <li>
                  <div>Ваша цена</div>
                  <div>от <span>100</span>₽/шт</div>
                </li>
                <li>
                  <div>Базовая цена</div>
                  <div>от <span>200</span>₽/шт</div>
                </li>
              </ul>
            </div>
            <div class="goods-buy__pieces">
              <div class="goods-buy__add">
                <quantity-input :min-quantity="1" :max-quantity="1000"></quantity-input>
                <button type="button" class="goods-buy__add__btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                    <g fill="none" fill-rule="evenodd">
                      <circle cx="20" cy="20" r="20" fill="url(#svg-main-gradient)"/>
                      <ellipse cx="17.826" cy="27.4" fill="#FFF" rx="1.565" ry="1.6"/>
                      <ellipse cx="24.087" cy="27.4" fill="#FFF" rx="1.565" ry="1.6"/>
                      <path stroke="#FFF" stroke-linecap="round" stroke-width="2"
                            d="M11 14h2.5l2.78 8.801a1 1 0 0 0 .953.699h7.09a1 1 0 0 0 .928-.629l2.2-5.5A1 1 0 0 0 26.523 16H14.5"/>
                    </g>
                  </svg>
                </button>
              </div>
            </div>
          </div>


          &lt;!&ndash;<div class="catalog-item__not-available">&ndash;&gt;
          &lt;!&ndash;<div>Нет в наличии</div>&ndash;&gt;
          &lt;!&ndash;<button type="button">&ndash;&gt;
          &lt;!&ndash;Когда появится?&ndash;&gt;
          &lt;!&ndash;</button>&ndash;&gt;
          &lt;!&ndash;</div>&ndash;&gt;

          &lt;!&ndash;<catalog-item-buy :min-quantity="1" :max-quantity="10" @on-buy="onBuy()"></catalog-item-buy>&ndash;&gt;

          &lt;!&ndash;<button type="button" class="catalog-item__get-access" v-b-modal="'login-modal'">&ndash;&gt;
          &lt;!&ndash;<svg xmlns="http://www.w3.org/2000/svg" width="17" height="19" viewBox="0 0 17 19"><g fill="none" fill-rule="evenodd"><rect width="15" height="11" x="1" y="7" stroke="#7332AB" stroke-width="2" rx="3"/><path stroke="#7332AB" stroke-width="2" d="M5 7h7V4.5a3.5 3.5 0 0 0-7 0V7z"/><path fill="#7332AB" d="M8.5 15c.828 0 1.5-.597 1.5-1.333C10 12.93 9.328 11 8.5 11S7 12.93 7 13.667C7 14.403 7.672 15 8.5 15z"/></g></svg>&ndash;&gt;
          &lt;!&ndash;Получить доступ&ndash;&gt;
          &lt;!&ndash;</button>&ndash;&gt;

        </div>
      </section>-->

      <!-- Catalog items on client -->
      <catalog-items class="catalog-items row" :class="{'catalog-items--list': view === 'list'}"
                     v-if="catalogItems">
        <catalog-item class="catalog-item col-12 col-xs-6 col-sm-6 col-md-3"
                      v-for="(item, index) in catalogItems"
                      :item-data="item"
                      :goods-id="item.id"
                      :class="{'with-offers': item.offers.length > 1}"
                      :key="index">

        </catalog-item>
      </catalog-items>


      <!-- Server Mock -->
      <!--div class="catalog-bottom" v-show="!catalogItems">
        <div>
          <button class="btn btn--default btn--block">
            Показать еще
          </button>
          <div class="pagination">
            <nav>
              <ul>
                <li class="active"><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li><a href="#">6</a></li>
                <li><a href="#">7</a></li>
                <li><a href="#">8</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div-->

      <!-- Client -->
      <catalog-bottom class="catalog-bottom"
                      v-show="catalogItems && catalogItemsAllCount > itemsPerPage"
                      :catalog-items-all-count="catalogItemsAllCount"
                      :items-per-page="itemsPerPage"
                      :current-page="currentPage"
                      @page-changed="currentPage=$event.page;getCatalog($event.add);">
      </catalog-bottom>
    </div>

    <b-modal id="catalog-filter-modal"
             v-model="filterModalShow"
             centered
             hide-footer
             title="Фильтр товаров">
      <div>
        <catalog-filter class="catalog-filter catalog-filter--modal"
                        :catalog-filter-data="catalogFilterData"
                        :api-url="apiUrl"
                        @catalog-filter-changed="getCatalog();filterModalShow=false;"
                        ref="catalogFilterMobile">
        </catalog-filter>
      </div>
    </b-modal>

    <b-modal id="catalog-sort-modal"
             v-model="sortModalShow"
             centered
             hide-footer
             title="Сортировать по">
      <div>
        <catalog-top class="catalog-top catalog-top--modal"
                     @options-changed="getCatalog();view=$event.view;sortModalShow=false;"
                     ref="catalogTopMobile">
        </catalog-top>
      </div>
    </b-modal>

  </div>
</template>
<script>

  // Components
  import catalogItems from './catalog-items';
  import catalogItem from './catalog-item/catalog-item';
  import catalogBottom from './catalog-bottom';
  import catalogTop from './catalog-top';
  import catalogFilter from './catalog-filter/catalog-filter';
  import QuantityInput from '~/components/shared/QuantityInput';

  import { unserialize } from '~/mixins/paginationUnserialize.js'
  import mixinCatalog from '~/mixins/get_catalog.js'

  export default {
    mixins: [mixinCatalog],
    props: {
      sectionId: {
        required: true
      },
      elementId: {
        required: false
      },
      onlyAvailable: {
        required: false
      },
      searchQuery: {
        required: false
      },
      isPopular: {
        required: false
      },
      isSlider: {
        required: false
      }
    },
    data() {

      const hash = (() => {
        if (process.client) {

          return location.hash.length > 0 ? unserialize(location.hash.replace('#', '')) : {};
        }
      })();

      let currentPage = 1;
      let perPage = 36;

      if (hash && hash.page > 0) {
        currentPage = +hash.page;
      }

      if (hash && hash.per > 0) {
        perPage = +hash.per;
      }

      return {
        xl: true,
        firstLoading: true,
        filterModalShow: false,
        sortModalShow: false,
        catalogMounted: false,
        catalogBottom: null,
        apiUrl: '/api/v1/product/catalog',

        // Catalog items mock
        catalogItems: null,
        catalogFilterData: null,

        catalogItemsAllCount: 0,
        currentPage: currentPage,
        itemsPerPage: perPage,
        view: 'tile',

        catalogSwiperOptions: {
          slidesPerView: 5,
          spaceBetween: 0,
          simulateTouch: false,
          navigation: {
            nextEl: '.catalog-swiper-button-next',
            prevEl: '.catalog-swiper-button-prev'
          },
          breakpoints: {
            1200: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 3,
            },
            450: {
              slidesPerView: 1,
            },
            320: {
              slidesPerView: 1,
            }
          }
        },
      };
    },
    components: {
      catalogItems,
      catalogTop,
      catalogFilter,
      catalogItem,
      QuantityInput,
      catalogBottom
    },

    // computed: {
    //   itemsPerPage() {
    //     return this.$refs.catalogFilter.requestParams.quantity
    //   }
    // },

  }
</script>