<template>
  <!-- Main content -->
  <main class="main-content">
    <div class="main-content__inner">
      <nav class="breadcrumb">
        <ol>
          <li><a href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13">
              <path fill="#BBB" fill-rule="evenodd"
                    d="M11.667 6.117v6.118a.772.772 0 0 1-.778.765H3.111a.771.771 0 0 1-.778-.765V6.117H0L7 0l7 6.118h-2.333v-.001z"/>
            </svg>
          </a></li>
          <li>Ранцы и рюкзаки</li>
        </ol>
      </nav>

      <h1>
        Ранцы и рюкзаки
      </h1>

      <section class="categories" v-masonry transition-duration="0.2s" item-selector=".categories-item">
        <figure class="categories-item col-12 col-sm-6 col-md-4" v-masonry-tile>
          <a href="#" style="background-color: #EEE6D5">
            <div class="categories-item__img">
              <img src="/assets/img/uploads/categories/category-1.png" alt="Школьные ранцы">
            </div>
            <div class="categories-item__name">
              Школьные ранцы
            </div>
          </a>
        </figure>
        <figure class="categories-item col-12 col-sm-6 col-md-4" v-masonry-tile>
          <a href="#" style="background-color: #E9E9E9">
            <div class="categories-item__img">
              <img src="/assets/img/uploads/categories/category-2.png" alt="Дошкольные ранцы">
            </div>
            <div class="categories-item__name">
              Дошкольные ранцы
            </div>
          </a>
        </figure>
        <figure class="categories-item categories-item--img categories-item--tower col-12 col-sm-6 col-md-4"
                v-masonry-tile>
          <a href="#">
            <div class="categories-item__img">
              <img src="/assets/img/uploads/categories/category-3.png" alt="Городские рюкзаки">
            </div>
            <div class="categories-item__name">
              Городские рюкзаки
            </div>
          </a>
        </figure>
        <figure class="categories-item col-12 col-sm-6 col-md-4" v-masonry-tile>
          <a href="#" style="background-color: #EFE3ED">
            <div class="categories-item__img">
              <img src="/assets/img/uploads/categories/category-4.png" alt="Сумки пеналы">
            </div>
            <div class="categories-item__name">
              Сумки пеналы
            </div>
          </a>
        </figure>
        <figure class="categories-item categories-item--img col-12 col-sm-6 col-md-4" v-masonry-tile>
          <a href="#">
            <div class="categories-item__img">
              <img src="/assets/img/uploads/categories/category-5.png" alt="Шкокльные ранцы Grizzly">
            </div>
          </a>
        </figure>
        <figure class="categories-item categories-item--img categories-item--tower col-12 col-sm-6 col-md-4"
                v-masonry-tile>
          <a href="#">
            <div class="categories-item__img">
              <img src="/assets/img/uploads/categories/category-3.png" alt="Городские рюкзаки">
            </div>
            <div class="categories-item__name">
              Городские рюкзаки
            </div>
          </a>
        </figure>
        <figure class="categories-item col-12 col-sm-6 col-md-4" v-masonry-tile>
          <a href="#" style="background-color: #EEE6D5">
            <div class="categories-item__img">
              <img src="/assets/img/uploads/categories/category-1.png" alt="Школьные ранцы">
            </div>
            <div class="categories-item__name">
              Школьные ранцы
            </div>
          </a>
        </figure>
        <figure class="categories-item col-12 col-sm-6 col-md-4" v-masonry-tile>
          <a href="#" style="background-color: #E9E9E9">
            <div class="categories-item__img">
              <img src="/assets/img/uploads/categories/category-2.png" alt="Дошкольные ранцы">
            </div>
            <div class="categories-item__name">
              Дошкольные ранцы
            </div>
          </a>
        </figure>
        <figure class="categories-item col-12 col-sm-6 col-md-4" v-masonry-tile>
          <a href="#" style="background-color: #EEE6D5">
            <div class="categories-item__img">
              <img src="/assets/img/uploads/categories/category-1.png" alt="Школьные ранцы">
            </div>
            <div class="categories-item__name">
              Школьные ранцы
            </div>
          </a>
        </figure>
        <figure class="categories-item col-12 col-sm-6 col-md-4" v-masonry-tile>
          <a href="#" style="background-color: #E9E9E9">
            <div class="categories-item__img">
              <img src="/assets/img/uploads/categories/category-2.png" alt="Дошкольные ранцы">
            </div>
            <div class="categories-item__name">
              Дошкольные ранцы
            </div>
          </a>
        </figure>
      </section>
    </div>
  </main>
  <!-- End Main content-->
</template>
<script>
  import Vue from 'vue'

  if (process.browser) {
    const VueMasonryPlugin = require('vue-masonry').VueMasonryPlugin;
    Vue.use(VueMasonryPlugin);
  }

  export default {}
</script>