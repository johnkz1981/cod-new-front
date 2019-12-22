<template>
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
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'goodsColorSelect',
    props: {
      selectedOffer: null,
      colors: {
        type: Array
      }
    },

    data() {
      return {
        initialSelectedOffer: null,
        swiperOptions: {
          slidesPerView: 5,
          spaceBetween: 10,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          breakpoints: {
            900: {
              slidesPerView: 3,
            },
          },
          on: {
            init: function () {
              setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
              }, 100);
            },
          },
        },
      };
    },

    computed: {
      /**
       * Return colors list in select2 format
       * @returns {Array}
       */
      colorsInSelect() {
        let colorsInSelect = [];

        this.colors.forEach((color) => {
          colorsInSelect.push({id: +color.offerId[0], text: color.name});
        });

        return colorsInSelect;
      },
    },

    methods: {
      getSelectedColor(color) {
        if (typeof this.selectedOffer === 'undefined') {
          return false;
        }

        return color.offerId.indexOf(+this.selectedOffer.id) !== -1;
      },

      getColorById(id) {

      }
    },

    created() {
      this.initialSelectedOffer = +this.selectedOffer.id;
    }

  }
</script>