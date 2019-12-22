<template>
  <div class="row" v-if="info">
    <div class="col-12 col-lg-10 offset-lg-1 col-xl-12 offset-xl-0 d-xl-none">
      <h1 class="personal-welcome personal-welcome--mobile">
        <div class="personal-welcome__ava">
          <img src="assets/img/uploads/netlab.png">
        </div>
        <div class="personal-welcome__text">
          Добро пожаловать, {{ info.user.companyName }}!
          <div class="personal-welcome__discount">
            Моя скидка: <b>{{ user.discount }}%</b>
          </div>
        </div>
      </h1>
    </div>
    <personal-nav/>

    <div class="personal__content col-12 col-lg-10 offset-lg-1 col-xl-6 offset-xl-0">
      <personal-info
              class="personal-info"
              @data-changed="getInfo()"
              v-if="page === 'info'"
      >
      </personal-info>
      <personal-history v-if="page === 'history'">
      </personal-history>
      <personal-favorite-goods :data="this.user" v-if="page === 'favorite'">
      </personal-favorite-goods>
      <personal-favorite-page v-if="page === 'favoritePage'">
      </personal-favorite-page>

    </div>

    <personal-manager/>

  </div>
</template>
<script>
  // Components
  import PersonalInfo from '~/components/personal/PersonalInfo';
  import PersonalHistory from '~/components/personal/PersonalHistory';
  import PersonalManagerReviewModalForm from '~/components/personal/PersonalManagerReviewModalForm';
  import PersonalFavoriteGoods from '~/components/personal/PersonalFavoriteGoods';
  import ManagerFeedbak from '~/components/personal/ManagerFeedback';
  import ManagerCallback from '~/components/personal/ManagerCallback';
  import PersonalNav from '~/components/personal/pages/PersonalNav';
  import PersonalManager from '~/components/personal/pages/PersonalManager';
  import PersonalFavoritePage from '~/components/personal/pages/PersonalFavoritePage';

  export default {
    components: {
      PersonalInfo,
      PersonalHistory,
      PersonalManagerReviewModalForm,
      PersonalFavoriteGoods,
      ManagerFeedbak,
      ManagerCallback,
      PersonalNav,
      PersonalManager,
      PersonalFavoritePage
    },
    props: ['page'],
    data() {
      return {};
    },
    computed: {

      user() {
        return this.$store.getters['user/user'];
      },
      info() {
        if (Object.keys(this.$store.getters['user/info']).length) {
          return this.$store.getters['user/info'];
        }
      },
    },
    methods: {
      getInfow() {
        this.$axios.$get('/api/v1/personal/getInfo')
            .then((res) => {
              this.info = res.result;
            })
            .catch((err) => {
              console.log(err);
            });
      },

      async getInfo() {
        await this.$store.dispatch('user/getInfo');
      },
    },
    created() {
      this.getInfo();
    }
  }
</script>
