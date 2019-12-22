<template>
  <div class="catalog catalog--carousel">
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