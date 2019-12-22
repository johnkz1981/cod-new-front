<template>
  <div :class="{mounted: mounted, 'full-screen': fullScreen}">
    <div class="goods-images__inner-wrap animated" :class="{fadeInLeft: fullScreen}">
      <div class="goods-images__slider"
           @click="!fullScreen ? toggleFullScreen($event) : $event.preventDefault()">
        <div v-swiper:mySwiper="goodsImagesSliderOptions" ref="goodsImagesSlider" v-if="!images">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img src="assets/img/uploads/goods-img.jpg">
            </div>
            <div class="swiper-slide">
              <img src="assets/img/uploads/goods-img.jpg">
            </div>
            <div class="swiper-slide">
              <img src="assets/img/uploads/goods-img.jpg">
            </div>
            <div class="swiper-slide">
              <img src="assets/img/uploads/goods-img.jpg">
            </div>
            <div class="swiper-slide">
              <img src="assets/img/uploads/goods-img.jpg">
            </div>
          </div>
        </div>
        <div v-swiper:mySwiper="goodsImagesSliderOptions" ref="goodsImagesSlider" v-if="images">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(image, index) in images" :key="index">
              <img :src="image">
            </div>
          </div>
        </div>
      </div>
      <ul class="goods-images__thumbs" v-if="thumbs.length > 0">
        <li v-for="(thumb, index) in thumbs" v-if="index < 4 || fullScreen"><a href="#"
                                                                               @click="slideTo(index);$event.preventDefault()"><img
                :src="thumb"></a></li>
        <li v-if="thumbs.length > 4 && !fullScreen" class="toggle-full-screen"><a href="#"
                                                                                  @click="toggleFullScreen();$event.preventDefault()">Еще
          {{ thumbs.length - 4}}</a></li>
      </ul>
      <button type="button" class="goods-images__full-screen-close" @click="toggleFullScreen()">
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19">
          <path fill="#111" fill-rule="evenodd"
                d="M18.995 16.766l-2.227 2.228-7.266-7.26L2.235 19 .008 16.766 7.266 9.5 0 2.234 2.235.004l7.267 7.262L16.768 0l2.227 2.234-7.26 7.266z"/>
        </svg>
      </button>
    </div>
    <div class="goods-images__full-screen-bg"></div>
  </div>
</template>
<script>
  export default {
    name: 'GoodsImages',
    props: ['images'],

    data() {
      return {
        mounted: false,
        fullScreen: false,
        goodsImagesSliderOptions: {},
        thumbs: []
      };
    },

    computed: {
      swiper() {
        return this.$refs.goodsImagesSlider.swiper;
      }
    },

    methods: {
      /**
       * Change slide
       * @param slideIndex
       */
      slideTo(slideIndex) {
        this.swiper.slideTo(slideIndex, 700, false);
      },

      playVideo(link) {
        console.log(link);
      },

      /**
       * Generate thumbs from slides
       */
      generateThumbs() {
        this.thumbs = [];

        for (let i = 0; i < this.images.length; i++) {
          this.thumbs.push(
              this.images[i]
          );
        }
      },

      /**
       * Toggle gallery full-screen mode
       */
      toggleFullScreen() {
        this.fullScreen = !this.fullScreen;
      }
    },

    watch: {
      images() {
        this.generateThumbs();
      }
    },

    mounted() {
      this.mounted = true;
    }
  }

</script>