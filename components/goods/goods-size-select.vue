<template>
  <div>
    <ul>
      <!--swiper :options="swiperOptions">
        <swiper-slide v-for="(size, index) in sizes" :key="index">
          <li :class="{active: selectedOffer.id == size.offerId}">
            <a href="#" @click="$emit('size-changed', size.offerId);$event.preventDefault()">{{ size.size }}</a>
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
      </swiper-->
      <div v-swiper:mySwiper="swiperOptions">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(size, index) in sizes" :key="index">
            <li :class="{active: selectedOffer.id == size.offerId}">
              <a href="#" @click="$emit('size-changed', size.offerId);$event.preventDefault()">{{ size.size }}</a>
            </li>
          </div swiper-slide>
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
    name: 'goods-size-select',
    props: {
      selectedOffer: null,
      sizes: {
        type: Array
      },
    },

    data() {
      return {
        swiperOptions: {
          slidesPerView: 4,
          spaceBetween: 10,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          breakpoints: {
            900: {
              slidesPerView: 2,
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
    }
  }

</script>