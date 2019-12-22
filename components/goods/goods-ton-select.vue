<script>
  export default {
    name: 'goods-ton-select',
    props: {
      selectedOffer: null,
      tons: {
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