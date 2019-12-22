<template>

  <!-- Main content -->
  <main class="main-content">
    <div class="main-content__inner">
      <nav class="breadcrumb">
        <ol>
          <li>
            <a href="#">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13"><path fill="#BBB" fill-rule="evenodd" d="M11.667 6.117v6.118a.772.772 0 0 1-.778.765H3.111a.771.771 0 0 1-.778-.765V6.117H0L7 0l7 6.118h-2.333v-.001z"/></svg>
            </a>
          </li>
          <li><a href="#">Ранцы и рюкзаки</a></li>
          <li>Ранец</li>
        </ol>
      </nav>

      <goods class="goods" :goods-id="5192">
      </goods>

      <!-- Catalog carousel-->
      <section class="carousel-section">
        <h2>
          <svg xmlns="http://www.w3.org/2000/svg" width="70" height="83" viewBox="0 0 70 83"><g fill="none" fill-rule="evenodd"><path stroke="url(#svg-main-gradient)" stroke-width="2" d="M36 80.634C58.045 65.792 69 50.572 69 35 69 16.222 53.778 1 35 1S1 16.222 1 35c0 18.837 15.112 34 34 34h1v11.634z"/><path fill="url(#svg-main-gradient)" d="M45 22h-1.077c-.259 2.613-1.416 9.646-6.329 11.52a2.9 2.9 0 0 1 0 2.96c4.912 1.874 6.07 8.907 6.329 11.52H45a1 1 0 0 1 0 2H25a1 1 0 0 1 0-2h1.077c.259-2.613 1.417-9.646 6.329-11.52a2.9 2.9 0 0 1 0-2.96c-4.913-1.874-6.071-8.907-6.329-11.52H25a1 1 0 0 1 0-2h20a1 1 0 0 1 0 2zM28.114 48h13.754C41.446 45.291 39.86 38 35 38c-5.038 0-6.512 7.291-6.886 10zM35 32c4.86 0 6.446-7.291 6.868-10H28.114c.374 2.709 1.848 10 6.886 10z"/></g></svg>
          С этим товаром покупают
        </h2>
        <catalog :section-id="214">
          <!--div class="catalog catalog--carousel">
            <catalog-top class="catalog-top d-none" ref="catalogTop"></catalog-top>
            <catalog-filter class="catalog-filter d-none" :catalog-filter-data="catalogFilterData" :api-url="apiUrl" ref="catalogFilter"></catalog-filter>
            <swiper :options="catalogSwiperOptions" v-if="catalogItems">
              <swiper-slide v-for="(item, index) in catalogItems" :key="index">
                <catalog-item class="catalog-item col-12"
                              :item-data="item"
                              :goods-id="item.id"
                              :class="{'with-offers': item.offers.length > 1}">
                  <%- include('partials/catalog-item.ejs') %>
                </catalog-item>
              </swiper-slide>
              <div class="swiper-button catalog-swiper-button-prev" slot="button-prev">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="20" viewBox="0 0 11 20"><path fill="#7E7E7E" fill-rule="evenodd" d="M9.664 20L11 18.677l-8.751-8.675L11 1.324 9.664 0 0 10.002z"></path></svg>
              </div>
              <div class="swiper-button catalog-swiper-button-next" slot="button-next">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="20" viewBox="0 0 11 20"><path fill="#7E7E7E" fill-rule="evenodd" d="M1.337 20L0 18.677l8.751-8.675L0 1.324 1.337 0 11 10.002z"></path></svg>
              </div>
            </swiper>
          </div-->
        </catalog>
      </section>

      <!-- Catalog carousel-->
      <section class="carousel-section">
        <h2>
          <svg xmlns="http://www.w3.org/2000/svg" width="70" height="83" viewBox="0 0 70 83"><g fill="none" fill-rule="evenodd"><path stroke="url(#svg-main-gradient)" stroke-width="2" d="M36 80.634C58.045 65.792 69 50.572 69 35 69 16.222 53.778 1 35 1S1 16.222 1 35c0 18.837 15.112 34 34 34h1v11.634z"/><path fill="url(#svg-main-gradient)" d="M45 22h-1.077c-.259 2.613-1.416 9.646-6.329 11.52a2.9 2.9 0 0 1 0 2.96c4.912 1.874 6.07 8.907 6.329 11.52H45a1 1 0 0 1 0 2H25a1 1 0 0 1 0-2h1.077c.259-2.613 1.417-9.646 6.329-11.52a2.9 2.9 0 0 1 0-2.96c-4.913-1.874-6.071-8.907-6.329-11.52H25a1 1 0 0 1 0-2h20a1 1 0 0 1 0 2zM28.114 48h13.754C41.446 45.291 39.86 38 35 38c-5.038 0-6.512 7.291-6.886 10zM35 32c4.86 0 6.446-7.291 6.868-10H28.114c.374 2.709 1.848 10 6.886 10z"/></g></svg>
          Похожие товары
        </h2>
        <catalog :section-id="214">
          <!--div class="catalog catalog--carousel">
            <catalog-top class="catalog-top d-none" ref="catalogTop"></catalog-top>
            <catalog-filter class="catalog-filter d-none" :catalog-filter-data="catalogFilterData" :api-url="apiUrl" ref="catalogFilter"></catalog-filter>
            <swiper :options="catalogSwiperOptions" v-if="catalogItems">
              <swiper-slide v-for="(item, index) in catalogItems" :key="index">
                <catalog-item class="catalog-item col-12"
                              :item-data="item"
                              :goods-id="item.id"
                              :class="{'with-offers': item.offers.length > 1}">
                  <%- include('partials/catalog-item.ejs') %>
                </catalog-item>
              </swiper-slide>
              <div class="swiper-button catalog-swiper-button-prev" slot="button-prev">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="20" viewBox="0 0 11 20"><path fill="#7E7E7E" fill-rule="evenodd" d="M9.664 20L11 18.677l-8.751-8.675L11 1.324 9.664 0 0 10.002z"></path></svg>
              </div>
              <div class="swiper-button catalog-swiper-button-next" slot="button-next">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="20" viewBox="0 0 11 20"><path fill="#7E7E7E" fill-rule="evenodd" d="M1.337 20L0 18.677l8.751-8.675L0 1.324 1.337 0 11 10.002z"></path></svg>
              </div>
            </swiper>
          </div-->
        </catalog>
      </section>

    </div>
  </main>
  <!-- End Main content-->
</template>
<script>
  import Goods from '~/components/goods/GoodsComponent'
  import Catalog from '~/components/catalog/CatalogIndexComponent'

  export default {
    components: {
      Goods,
      Catalog
    }
  }
</script>