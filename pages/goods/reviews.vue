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
          <li><a href="#">Ранец</a></li>
          <li>Отзывы о товаре</li>
        </ol>
      </nav>

      <div class="d-block d-lg-flex align-items-center justify-content-between m-b-20">
        <h1>Отзывы о товаре: <span class="d-lg-none d-xl-none text-purple h3"><br>Кружка "Расти большой" Медвежонок Винни и его друзья</span>
        </h1>
        <button class="btn btn--default btn--md" v-b-modal="'review-modal'">Написать отзыв</button>
      </div>

      <div class="row">
        <div class="col-3 d-none d-lg-block d-xl-block">
            <catalog-item class="catalog-item catalog-item--in-review"
                          :goods-id="11074">
            </catalog-item>

        </div>
        <div class="col-12 col-lg-9">
          <div class="reviews-list">
            <div class="review" v-for="n in 3">
              <div class="review__head">
                <div class="review__author">
                  Кригер Игорь
                </div>
                <div class="review__date">
                  (2 недели назад)
                </div>
                <client-only class="review__rating">
                  <star-rating
                    :rating="3"
                    :read-only="true"
                    :show-rating="false"
                    :star-size="14"
                    :padding="4"
                    :active-color="'#F7B71D'"
                    :inactive-color="'#BCBCBC'">
                  </star-rating>
                </client-only>
              </div>
              <div class="review__text">
                Отличная юбка. Соответствует размерной сетке. ЗапАх не такой уж и откровенный, всё в рамках разумного.
                смотрится с сапогами, но это сугубо на мой вкус.
              </div>
              <div class="review__answer">
                <div class="review__answer__head">
                  Ответ компании
                </div>
                <div class="review__answer__text">
                  Отличная юбка. Соответствует размерной сетке. ЗапАх не такой уж и откровенный, всё в рамках разумного.
                  смотрится с сапогами, но это сугубо на мой вкус.
                </div>
              </div>
            </div>
            <div class="review">
              <div class="review__head">
                <div class="review__author">
                  Кригер Игорь
                </div>
                <div class="review__date">
                  (2 недели назад)
                </div>
                <client-only class="review__rating">
                  <star-rating
                    :rating="1"
                    :read-only="true"
                    :show-rating="false"
                    :star-size="14"
                    :padding="4"
                    :active-color="'#F7B71D'"
                    :inactive-color="'#BCBCBC'">
                  </star-rating>
                </client-only>
              </div>
              <div class="review__text">
                Отличная юбка. Соответствует размерной сетке. ЗапАх не такой уж и откровенный, всё в рамках разумного.
                смотрится с сапогами, но это сугубо на мой вкус.
              </div>
            </div>
          </div>
          <div class="pagination-wrap">
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
        </div>
      </div>

    </div>
  </main>
  <!-- End Main content-->

</template>
<script>
  import CatalogItem from '~/components/catalog/catalog-item/catalog-item';

  export default {
    components: {
      CatalogItem
    }
  }
</script>