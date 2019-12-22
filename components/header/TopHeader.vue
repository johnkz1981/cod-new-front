<template>
  <!-- Main header -->
  <header class="main-header">

    <!-- Main header top-->
    <div class="main-header__inner">
      <a href="/" class="main-header__logo">
        <img src="/assets/img/logo.jpg" alt="ЦОД">
        <img src="/assets/img/logo--white-mini.png" alt="ЦОД">
      </a>

      <form class="main-header__search">
        <input type="search" placeholder="Поиск...">
        <button type="submit"></button>
      </form>

      <nav class="main-header__menu">
        <ul>
          <li>
            <a href="#">Доставка и оплата</a>
          </li>
          <li>
            <a href="#">Прайс-листы</a>
          </li>
          <li>
            <a href="#">Партнёрка</a>
          </li>
          <li>
            <a href="#">Отзывы</a>
            <span class="main-header__menu__quantity">189</span>
          </li>
        </ul>
      </nav>

      <div class="main-header__service-links">
        <a href="#" v-b-modal="'search-modal'">
          <img src="/assets/img/svg/search.svg">
        </a>
        <a href="#" @click="checkUser($event)">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16">
            <path fill="#FFF" fill-rule="evenodd"
                  d="M13.092.002c-1.58.003-3.076.426-4.09 1.636C7.986.428 6.49.005 4.91.002A4.784 4.784 0 0 0 .002 4.91a7.469 7.469 0 0 0 1.636 4.091c1.9 2.769 6.51 6.187 6.709 6.333.388.28.912.28 1.3 0 .207-.146 4.817-3.565 6.717-6.333A7.466 7.466 0 0 0 18 4.911 4.784 4.784 0 0 0 13.092 0zm1.636 8.18C12.919 10.82 9 13.91 9 13.91s-3.917-3.091-5.727-5.727c-.668-.974-1.636-1.995-1.636-3.273A3.341 3.341 0 0 1 4.91 1.638c1.607 0 3.48 1.055 4.091 2.454.612-1.396 2.485-2.454 4.09-2.454a3.24 3.24 0 0 1 3.273 3.272c0 1.073-.969 2.3-1.636 3.273z"/>
          </svg>
          {{ favoriteProductsCount }}
        </a>
        <a href="#" @click="checkUser($event)">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16">
            <path fill="none" stroke="#FFF" stroke-width="2"
                  d="M8.909 1.205L7.08 5.307a1 1 0 0 1-.913.593H1.284a.1.1 0 0 0-.062.178l3.636 2.917a1 1 0 0 1 .342 1.031l-1.233 4.75a.1.1 0 0 0 .145.112l4.406-2.423a1 1 0 0 1 .964 0l4.403 2.423a.1.1 0 0 0 .145-.113l-1.233-4.748a1 1 0 0 1 .342-1.032l3.639-2.917a.1.1 0 0 0-.063-.178H11.83a1 1 0 0 1-.913-.594l-1.825-4.1a.1.1 0 0 0-.182 0z"/>
          </svg>
          {{ favoritePagesCount }}
        </a>
        <button v-b-modal="'basket-modal'">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20">
            <g fill="none" fill-rule="evenodd" transform="translate(1 1)">
              <circle cx="9" cy="17" r="2" fill="#FFF"/>
              <circle cx="17" cy="17" r="2" fill="#FFF"/>
              <path stroke="#FFF" stroke-linecap="round" stroke-width="2"
                    d="M0 0h3l4.257 11.351a1 1 0 0 0 .936.649h9.157a1 1 0 0 0 .914-.594l3.111-7A1 1 0 0 0 20.461 3H4.5"/>
            </g>
          </svg>
          {{ basketData.length }}
        </button>
      </div>

      <button v-if="!authorised" class="btn btn--default main-header__login-toggle" v-b-modal="'login-modal'">
        Войти
      </button>
      <a v-else href="/personal" class="main-header__account">
        <div class="main-header__account__ava">
          <img src="/assets/img/uploads/netlab.png">
        </div>
        <div class="main-header__account__info">
          {{ user.userInfo.LOGIN}}
          <span>МОЯ СКИДКА {{ user.discount }}%</span>
        </div>
      </a>
      <a href="#" class="main-header__logout" v-if="authorised">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 18 24">
          <path fill="none" fill-rule="evenodd" stroke="#949494" stroke-width="2" stroke-linecap="round"
                d="M3.7 16.02a1.739 1.739 0 0 1-1.72-1.756V3.725c-.01-.96.76-1.746 1.72-1.756h11.315"/>
          <path fill="none" fill-rule="evenodd" stroke="#949494" stroke-width="2"
                d="M10 4l5.234-2A1.792 1.792 0 0 1 17 3.818v13.636c.014.989-.506 2.046-1.766 2.546L10.5 22c-1.5.5-2.34-.829-2.325-1.818V6.545C8.161 5.555 9.06 4.273 10 4z"/>
        </svg>
        Выход
      </a>
    </div>

    <!-- Main navigation bar-->
    <div class="main-nav-bar">
      <div class="main-nav-bar__inner">
        <main-header-catalog class="main-header-catalog"/>
        <div class="main-nav-bar__search" @blur="focus = false">
          <search-form-box class="form-box"/>
        </div>

        <div class="main-nav-bar__service-links">
          <a href="#" @click="checkUser">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16">
              <path fill="#202020" fill-rule="evenodd"
                    d="M13.092.002c-1.58.003-3.076.426-4.09 1.636C7.986.428 6.49.005 4.91.002A4.784 4.784 0 0 0 .002 4.91a7.469 7.469 0 0 0 1.636 4.091c1.9 2.769 6.51 6.187 6.709 6.333.388.28.912.28 1.3 0 .207-.146 4.817-3.565 6.717-6.333A7.466 7.466 0 0 0 18 4.911 4.784 4.784 0 0 0 13.092 0zm1.636 8.18C12.919 10.82 9 13.91 9 13.91s-3.917-3.091-5.727-5.727c-.668-.974-1.636-1.995-1.636-3.273A3.341 3.341 0 0 1 4.91 1.638c1.607 0 3.48 1.055 4.091 2.454.612-1.396 2.485-2.454 4.09-2.454a3.24 3.24 0 0 1 3.273 3.272c0 1.073-.969 2.3-1.636 3.273z"/>
            </svg>
            ({{ favoriteProductsCount }})
          </a>
          <a href="#" @click="checkUser">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16">
              <path fill="none" stroke="#202020" stroke-width="2"
                    d="M8.909 1.205L7.08 5.307a1 1 0 0 1-.913.593H1.284a.1.1 0 0 0-.062.178l3.636 2.917a1 1 0 0 1 .342 1.031l-1.233 4.75a.1.1 0 0 0 .145.112l4.406-2.423a1 1 0 0 1 .964 0l4.403 2.423a.1.1 0 0 0 .145-.113l-1.233-4.748a1 1 0 0 1 .342-1.032l3.639-2.917a.1.1 0 0 0-.063-.178H11.83a1 1 0 0 1-.913-.594l-1.825-4.1a.1.1 0 0 0-.182 0z"/>
            </svg>
            ({{ favoritePagesCount }})
          </a>
          <button v-b-modal="'basket-modal'">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20">
              <g fill="none" fill-rule="evenodd" transform="translate(1 1)">
                <circle cx="9" cy="17" r="2" fill="#2a60ec"/>
                <circle cx="17" cy="17" r="2" fill="#2a60ec"/>
                <path stroke="#2a60ec" stroke-linecap="round" stroke-width="2"
                      d="M0 0h3l4.257 11.351a1 1 0 0 0 .936.649h9.157a1 1 0 0 0 .914-.594l3.111-7A1 1 0 0 0 20.461 3H4.5"/>
              </g>
            </svg>
            Корзина ({{ basketData.length }})
          </button>
        </div>
      </div>
    </div>
    <login-modal/>
    <basket-modal/>
  </header>
  <!-- End Main header -->
</template>
<script>
  import MainHeaderCatalog from '~/components/header/MainHeaderCatalog'
  import LoginModal from '~/components/user/LoginModal'
  import BasketModal from '~/components/basket/modal/BasketModal'
  import searchFormBox from '~/components/header/search'

  export default {
    data: () => ({
      // favoriteProductsCount: 0,
      // favoritePagesCount: 0,
      // basketData: [],
      //authorised: false
    }),
    components: {
      MainHeaderCatalog,
      LoginModal,
      BasketModal,
      searchFormBox
    },
    methods: {
      checkUser($event) {
        if (this.user && this.user.userInfo) {
          return void (0);
        } else {
          $event.preventDefault();
          this.$bvModal.show('login-modal');
        }
      },
    },
    computed: {
      favoriteProductsCount() {
        const user = this.$store.getters['user/user'];
        return user.favoriteProductCount;
      },
      favoritePagesCount() {
        const user = this.$store.getters['user/user'];
        return user.favoritePagesCount;
      },
      authorised() {
        const user = this.$store.getters['user/user'];
        return !!user.userInfo;
      },
      basketData() {
        return this.$store.getters['basket/basket'];
      },
      user() {
        return this.$store.getters['user/user'];
      },
    }
  }
</script>