<template>
  <button v-if="isGoods" class="goods-description__like-btn btn btn--default btn--sm" @click.prevent="addToFavorites()"
          :class="{'in-favorites': inFavorites}">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12">
      <path fill="#B0B0B0" fill-rule="evenodd"
            d="M10.181.001A4.177 4.177 0 0 0 7 1.48 4.174 4.174 0 0 0 3.819 0a3.735 3.735 0 0 0-2.73 1.08 3.679 3.679 0 0 0-1.088 2.71 5.743 5.743 0 0 0 1.273 3.158c1.478 2.137 5.063 4.777 5.217 4.889a.87.87 0 0 0 1.012 0c.16-.113 3.745-2.753 5.223-4.89A5.74 5.74 0 0 0 14 3.792a3.679 3.679 0 0 0-1.089-2.71 3.735 3.735 0 0 0-2.729-1.08z"/>
    </svg>
    <span v-if="!inFavorites">Сохранить</span>
    <span v-if="inFavorites">Сохранено</span>
  </button>
  <button v-else class="catalog-item__like" @click.prevent="addToFavorites()" :class="{'in-favorites': inFavorites}">
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10">
      <path fill="#B0B0B0" fill-rule="evenodd"
            d="M8.727.001A3.623 3.623 0 0 0 6 1.232 3.62 3.62 0 0 0 3.273.002a3.25 3.25 0 0 0-2.34.9 3.021 3.021 0 0 0-.932 2.257c.081.963.461 1.88 1.09 2.632 1.268 1.78 4.34 3.98 4.473 4.074.259.18.608.18.867 0 .137-.094 3.21-2.294 4.477-4.074a4.712 4.712 0 0 0 1.09-2.632 3.021 3.021 0 0 0-.932-2.258 3.25 3.25 0 0 0-2.34-.9z"/>
    </svg>
  </button>
</template>
<script>
  import qs from 'qs';

  export default {
    name: 'goodsFavorites',
    props: ['goodsId', 'favorites', 'isGoods'],

    data() {
      return {
        inFavorites: false
      };
    },

    methods: {
      addToFavorites() {
        if (this.user.userInfo) {

          this.$axios.$post('/api/v1/personal/setFavoriteProduct', qs.stringify({productId: this.goodsId}, {encode: false}))
              .then((res) => {
                //this.user;
              })
              .catch((err) => {
                console.log(err);
              });
        } else {
          this.$root.$emit('bv::show::modal', 'login-modal');
          this.$root.loading = false;
        }
      },

      checkFavorites() {
        this.favorites ? this.inFavorites = this.favorites.find(item => +item.id === +this.goodsId): '';
      }
    },

    watch: {
      favorites() {
        this.checkFavorites();
      },
      goodsId() {
        this.checkFavorites();
      }
    },

    mounted() {
      this.checkFavorites();
    },
    computed: {
      user() {
        return this.$store.getters['user/user'];
      },
    }
  }
</script>