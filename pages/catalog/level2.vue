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
          <li><a href="#">Ранцы и рюкзаки</a></li>
          <li>Рюкзаки городские</li>
        </ol>
      </nav>

      <section class="row">
        <div class="col-12 col-xl-9">
          <section class="main-slider main-slider--md">
            <client-only class="owl-carousel">
              <a href="#" class="main-slider__item">
                <img src="/assets/img/uploads/main-slider-item.jpg">
              </a>
            </client-only>
          </section>
        </div>
        <div class="col-3 d-none d-xl-block">
          <div class="promo-card promo-card--img">
            <a href="#">
              <img src="/assets/img/uploads/promo-card-2.png">
            </a>
          </div>
        </div>
      </section>

      <h1>
        Рюкзаки городские
        <page-favorites :section-id="214" :favorites="$root.user.favoritePages" v-if="$root.user">
          <a href="#" class="page-favorites-btn btn btn--default btn--sm ml-2 d-none d-md-inline-block"
             @click.prevent="addToFavorites()"
             :class="{'in-favorites': inFavorites}">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12">
              <path fill="#A7A6A7" fill-rule="evenodd"
                    d="M7 0L5.09 4.2H0l3.817 3L2.545 12 7 9.6l4.452 2.4-1.272-4.8 3.82-3H8.907z"/>
            </svg>
            <span v-if="!inFavorites">Добавить в избранное</span>
            <span v-if="inFavorites">В избранном</span>
          </a>
        </page-favorites>
      </h1>

      <!-- Catalog-->
      <catalog :section-id="0">

      </catalog>

    </div>
  </main>
  <!-- End Main content-->
</template>
<script>
  import catalog from '~/components/catalog/CatalogComponent'

  export default {

    components: {
      catalog
    }
  }
</script>