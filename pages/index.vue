<template>
  <main class="main-content">
    <div class="main-content__inner">
      <!-- Main slider -->
      <section class="main-slider">
        <client-only class="owl-carousel" v-for="picture in Pictures" :key="picture.id">
          <a href="#" class="main-slider__item">
            <img :src="picture.path">
          </a>
        </client-only>
        <!--carousel v-if="isNuxtReady" :items="1">
          <img src="assets/img/uploads/main-slider-item.jpg">
          <img src="assets/img/uploads/main-slider-item.jpg">
          <img src="assets/img/uploads/main-slider-item.jpg">
          <img src="assets/img/uploads/main-slider-item.jpg">
        </carousel-->
      </section>

      <!-- Promo section -->
      <section class="promo-cards-tile">
        <div class="row">
          <div class="col-12 col-sm-6 col-lg-4">
            <div class="promo-card">
              <h4>Аксессуары</h4>
              <nav>
                <ul>
                  <li><a href="#">Упаковка</a></li>
                  <li><a href="#">Творчество</a></li>
                  <li><a href="#">Посуда</a></li>
                  <li><a href="#">Текстиль</a></li>
                  <li><a href="#">Товары для праздника</a></li>
                  <li><a href="#">Упаковка</a></li>
                  <li><a href="#">Творчество</a></li>
                </ul>
              </nav>
              <div class="promo-card__img">
                <img src="assets/img/uploads/promo-card-1.png">
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-lg-4">
            <div class="promo-card promo-card--img">
              <a href="#">
                <img src="assets/img/uploads/promo-card-2.png">
              </a>
            </div>
          </div>

          <div class="col-12 col-lg-4">
            <div class="row">
              <div class="col-12 col-sm-6 col-lg-12">
                <div class="promo-card promo-card--half promo-card--2-col">
                  <h4>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                      <g fill="none" fill-rule="evenodd">
                        <circle cx="15" cy="15" r="15" fill="#7ED321"/>
                        <circle cx="10" cy="15" r="3" stroke="#FFF" stroke-width="2"/>
                        <rect width="3" height="2" x="4" y="14" fill="#FFF" rx="1"/>
                        <rect width="3" height="2" x="23" y="14" fill="#FFF" rx="1"/>
                        <path fill="#FFF" d="M12.21 14.804C13.14 13.6 14.07 13 15 13c.93 0 1.86.601 2.79 1.804a1 1 0 0
                        1 .21.611v.71a.368.368 0 0 1-.64.25c-.786-.861-1.573-1.291-2.36-1.291-.787 0-1.574.43-2.36
                         1.29a.368.368 0 0 1-.64-.248v-.71a1 1 0 0 1 .21-.612z"/>
                        <circle cx="20" cy="15" r="3" stroke="#FFF" stroke-width="2"/>
                      </g>
                    </svg>
                    Очки и футляры
                  </h4>
                  <nav>
                    <ul>
                      <li><a href="#">Упаковка</a></li>
                      <li><a href="#">Творчество</a></li>
                      <li><a href="#">Посуда</a></li>
                      <li><a href="#">Текстиль</a></li>
                    </ul>
                  </nav>
                </div>
              </div>

              <div class="col-12 col-sm-6 col-lg-12">
                <div class="promo-card promo-card--half promo-card--2-col">
                  <h4>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                      <g fill="none" fill-rule="evenodd">
                        <circle cx="15" cy="15" r="15" fill="#7ED321"/>
                        <circle cx="10" cy="15" r="3" stroke="#FFF" stroke-width="2"/>
                        <rect width="3" height="2" x="4" y="14" fill="#FFF" rx="1"/>
                        <rect width="3" height="2" x="23" y="14" fill="#FFF" rx="1"/>
                        <path fill="#FFF"
                              d="M12.21 14.804C13.14 13.6 14.07 13 15 13c.93 0 1.86.601 2.79 1.804a1 1 0 0 1 .21.611v.71a.368.368 0 0 1-.64.25c-.786-.861-1.573-1.291-2.36-1.291-.787 0-1.574.43-2.36 1.29a.368.368 0 0 1-.64-.248v-.71a1 1 0 0 1 .21-.612z"/>
                        <circle cx="20" cy="15" r="3" stroke="#FFF" stroke-width="2"/>
                      </g>
                    </svg>
                    Обувь
                  </h4>
                  <nav>
                    <ul>
                      <li><a href="#">Упаковка</a></li>
                      <li><a href="#">Творчество</a></li>
                      <li><a href="#">Посуда</a></li>
                      <li><a href="#">Текстиль</a></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Catalog carousel-->
      <section class="carousel-section">
        <h2>
          <svg xmlns="http://www.w3.org/2000/svg" width="70" height="83" viewBox="0 0 70 83">
            <g fill="none" fill-rule="evenodd">
              <path stroke="url(#svg-main-gradient)" stroke-width="2"
                    d="M36 80.634C58.045 65.792 69 50.572 69 35 69 16.222 53.778 1 35 1S1 16.222 1 35c0 18.837 15.112 34 34 34h1v11.634z"/>
              <path fill="url(#svg-main-gradient)"
                    d="M45 22h-1.077c-.259 2.613-1.416 9.646-6.329 11.52a2.9 2.9 0 0 1 0 2.96c4.912 1.874 6.07 8.907 6.329 11.52H45a1 1 0 0 1 0 2H25a1 1 0 0 1 0-2h1.077c.259-2.613 1.417-9.646 6.329-11.52a2.9 2.9 0 0 1 0-2.96c-4.913-1.874-6.071-8.907-6.329-11.52H25a1 1 0 0 1 0-2h20a1 1 0 0 1 0 2zM28.114 48h13.754C41.446 45.291 39.86 38 35 38c-5.038 0-6.512 7.291-6.886 10zM35 32c4.86 0 6.446-7.291 6.868-10H28.114c.374 2.709 1.848 10 6.886 10z"/>
            </g>
          </svg>
          Успей купить
        </h2>
        <catalog :section-id="0"/>

        <a href="#" class="btn btn--default btn--block">
          Показать все товары
        </a>
      </section>

      <!-- Promo section -->
      <section class="promo-cards-tile">
        <div class="row">
          <div class="col-12 col-sm-6 col-lg-4">
            <div class="promo-card promo-card--img">
              <a href="#">
                <img src="assets/img/uploads/promo-card-3.png">
              </a>
            </div>
          </div>

          <div class="col-12 col-sm-6 col-lg-4">
            <div class="promo-card">
              <h4>Игрушки</h4>
              <nav>
                <ul>
                  <li><a href="#">Упаковка</a></li>
                  <li><a href="#">Творчество</a></li>
                  <li><a href="#">Посуда</a></li>
                  <li><a href="#">Текстиль</a></li>
                  <li><a href="#">Товары для праздника</a></li>
                  <li><a href="#">Упаковка</a></li>
                  <li><a href="#">Творчество</a></li>
                </ul>
              </nav>
              <div class="promo-card__img">
                <img src="assets/img/uploads/promo-card-4.png">
              </div>
            </div>
          </div>

          <div class="col-12 col-sm-5 col-lg-4">
            <div class="promo-card">
              <h4>Спорт и отдых</h4>
              <nav>
                <ul>
                  <li><a href="#">Упаковка</a></li>
                  <li><a href="#">Творчество</a></li>
                  <li><a href="#">Посуда</a></li>
                  <li><a href="#">Текстиль</a></li>
                  <li><a href="#">Товары для праздника</a></li>
                  <li><a href="#">Упаковка</a></li>
                  <li><a href="#">Творчество</a></li>
                </ul>
              </nav>
              <div class="promo-card__img">
                <img src="assets/img/uploads/promo-card-5.png">
              </div>
            </div>
          </div>

          <div class="col-12 col-sm-7 col-lg-8">
            <div class="promo-card promo-card--img">
              <a href="#">
                <img src="assets/img/uploads/promo-card-6.png">
              </a>
            </div>
          </div>

          <div class="col-12 col-lg-4">
            <div class="row">
              <div class="col-12 col-sm-6 col-lg-12">
                <div class="promo-card promo-card--half promo-card--2-col">
                  <h4>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                      <g fill="none" fill-rule="evenodd">
                        <circle cx="15" cy="15" r="15" fill="#7ED321"/>
                        <circle cx="10" cy="15" r="3" stroke="#FFF" stroke-width="2"/>
                        <rect width="3" height="2" x="4" y="14" fill="#FFF" rx="1"/>
                        <rect width="3" height="2" x="23" y="14" fill="#FFF" rx="1"/>
                        <path fill="#FFF"
                              d="M12.21 14.804C13.14 13.6 14.07 13 15 13c.93 0 1.86.601 2.79 1.804a1 1 0 0 1 .21.611v.71a.368.368 0 0 1-.64.25c-.786-.861-1.573-1.291-2.36-1.291-.787 0-1.574.43-2.36 1.29a.368.368 0 0 1-.64-.248v-.71a1 1 0 0 1 .21-.612z"/>
                        <circle cx="20" cy="15" r="3" stroke="#FFF" stroke-width="2"/>
                      </g>
                    </svg>
                    Очки и футляры
                  </h4>
                  <nav>
                    <ul>
                      <li><a href="#">Упаковка</a></li>
                      <li><a href="#">Творчество</a></li>
                      <li><a href="#">Посуда</a></li>
                      <li><a href="#">Текстиль</a></li>
                    </ul>
                  </nav>
                </div>
              </div>

              <div class="col-12 col-sm-6 col-lg-12">
                <div class="promo-card promo-card--half promo-card--2-col">
                  <h4>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                      <g fill="none" fill-rule="evenodd">
                        <circle cx="15" cy="15" r="15" fill="#7ED321"/>
                        <circle cx="10" cy="15" r="3" stroke="#FFF" stroke-width="2"/>
                        <rect width="3" height="2" x="4" y="14" fill="#FFF" rx="1"/>
                        <rect width="3" height="2" x="23" y="14" fill="#FFF" rx="1"/>
                        <path fill="#FFF"
                              d="M12.21 14.804C13.14 13.6 14.07 13 15 13c.93 0 1.86.601 2.79 1.804a1 1 0 0 1 .21.611v.71a.368.368 0 0 1-.64.25c-.786-.861-1.573-1.291-2.36-1.291-.787 0-1.574.43-2.36 1.29a.368.368 0 0 1-.64-.248v-.71a1 1 0 0 1 .21-.612z"/>
                        <circle cx="20" cy="15" r="3" stroke="#FFF" stroke-width="2"/>
                      </g>
                    </svg>
                    Обувь
                  </h4>
                  <nav>
                    <ul>
                      <li><a href="#">Упаковка</a></li>
                      <li><a href="#">Творчество</a></li>
                      <li><a href="#">Посуда</a></li>
                      <li><a href="#">Текстиль</a></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 col-lg-4">
            <div class="row">
              <div class="col-12 col-sm-6 col-lg-12">
                <div class="promo-card promo-card--half promo-card--2-col">
                  <h4>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                      <g fill="none" fill-rule="evenodd">
                        <circle cx="15" cy="15" r="15" fill="#7ED321"/>
                        <circle cx="10" cy="15" r="3" stroke="#FFF" stroke-width="2"/>
                        <rect width="3" height="2" x="4" y="14" fill="#FFF" rx="1"/>
                        <rect width="3" height="2" x="23" y="14" fill="#FFF" rx="1"/>
                        <path fill="#FFF"
                              d="M12.21 14.804C13.14 13.6 14.07 13 15 13c.93 0 1.86.601 2.79 1.804a1 1 0 0 1 .21.611v.71a.368.368 0 0 1-.64.25c-.786-.861-1.573-1.291-2.36-1.291-.787 0-1.574.43-2.36 1.29a.368.368 0 0 1-.64-.248v-.71a1 1 0 0 1 .21-.612z"/>
                        <circle cx="20" cy="15" r="3" stroke="#FFF" stroke-width="2"/>
                      </g>
                    </svg>
                    Очки и футляры
                  </h4>
                  <nav>
                    <ul>
                      <li><a href="#">Упаковка</a></li>
                      <li><a href="#">Творчество</a></li>
                      <li><a href="#">Посуда</a></li>
                      <li><a href="#">Текстиль</a></li>
                    </ul>
                  </nav>
                </div>
              </div>

              <div class="col-12 col-sm-6 col-lg-12">
                <div class="promo-card promo-card--half promo-card--2-col">
                  <h4>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                      <g fill="none" fill-rule="evenodd">
                        <circle cx="15" cy="15" r="15" fill="#7ED321"/>
                        <circle cx="10" cy="15" r="3" stroke="#FFF" stroke-width="2"/>
                        <rect width="3" height="2" x="4" y="14" fill="#FFF" rx="1"/>
                        <rect width="3" height="2" x="23" y="14" fill="#FFF" rx="1"/>
                        <path fill="#FFF"
                              d="M12.21 14.804C13.14 13.6 14.07 13 15 13c.93 0 1.86.601 2.79 1.804a1 1 0 0 1 .21.611v.71a.368.368 0 0 1-.64.25c-.786-.861-1.573-1.291-2.36-1.291-.787 0-1.574.43-2.36 1.29a.368.368 0 0 1-.64-.248v-.71a1 1 0 0 1 .21-.612z"/>
                        <circle cx="20" cy="15" r="3" stroke="#FFF" stroke-width="2"/>
                      </g>
                    </svg>
                    Обувь
                  </h4>
                  <nav>
                    <ul>
                      <li><a href="#">Упаковка</a></li>
                      <li><a href="#">Творчество</a></li>
                      <li><a href="#">Посуда</a></li>
                      <li><a href="#">Текстиль</a></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 col-sm-6 col-lg-4">
            <div class="promo-card promo-card--img">
              <a href="#">
                <img src="assets/img/uploads/promo-card-7.png">
              </a>
            </div>
          </div>

          <div class="col-12 col-sm-6 col-lg-4">
            <div class="promo-card">
              <h4>Подарки и сувениры</h4>
              <nav>
                <ul>
                  <li><a href="#">Упаковка</a></li>
                  <li><a href="#">Творчество</a></li>
                  <li><a href="#">Посуда</a></li>
                  <li><a href="#">Текстиль</a></li>
                  <li><a href="#">Товары для праздника</a></li>
                  <li><a href="#">Упаковка</a></li>
                  <li><a href="#">Творчество</a></li>
                </ul>
              </nav>
              <div class="promo-card__img">
                <img src="assets/img/uploads/promo-card-8.png">
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
<script>

  import catalog from '~/components/catalog/CatalogIndexComponent'

  export default {

    data: () => ({
      Pictures: [
        {id: 1, path: 'assets/img/uploads/main-slider-item.jpg'},
        /*{id: 2, path: 'assets/img/uploads/main-slider-item.jpg'},
        {id: 3, path: 'assets/img/uploads/main-slider-item.jpg'},
        {id: 4, path: 'assets/img/uploads/main-slider-item.jpg'},*/
      ],
      catalogFilterData: null,
      apiUrl: '',
      catalogItems: [],
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
      // isNuxtReady: false,
    }),
    components: {
      catalog,
      // carousel,
    },
    methods: {
      getUser(){
        console.log(this.$store.getters['user/user']);
      }
    }
  }
</script>