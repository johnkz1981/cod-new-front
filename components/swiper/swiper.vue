<template>

</template>
<script>
  export default {
    props:{
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
    }
  }
</script>