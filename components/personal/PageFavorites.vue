<template>
  <button type="button" @click.prevent="addToFavorites()">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 13 14">
      <path fill="#BABABA" fill-rule="evenodd"
            d="M12.278 3.665h-.722v9.53a.728.728 0 0 1-.723.734H2.167a.728.728 0 0 1-.723-.734v-9.53H.722A.728.728 0 0 1 0 2.932C0 2.527.323 2.2.722 2.2h11.556c.399 0 .722.328.722.733a.728.728 0 0 1-.722.733zM8.667 1.466H4.333a.728.728 0 0 1-.722-.733c0-.405.323-.733.722-.733h4.334c.399 0 .722.328.722.733a.728.728 0 0 1-.722.733zM3.61 5.865c.399 0 .722.328.722.733v3.665a.728.728 0 0 1-.722.733.728.728 0 0 1-.722-.733V6.598c0-.405.323-.733.722-.733zm2.889 0c.399 0 .722.328.722.733v3.665a.728.728 0 0 1-.722.733.728.728 0 0 1-.722-.733V6.598c0-.405.323-.733.722-.733zm2.889 0c.399 0 .722.328.722.733v3.665a.728.728 0 0 1-.722.733.728.728 0 0 1-.722-.733V6.598c0-.405.323-.733.722-.733z"/>
    </svg>
    Удалить
  </button>
</template>
<script>
  import qs from 'qs';

  export default {
    props: ['sectionId', 'favorites'],

    data() {
      return {
        inFavorites: false
      }
    },

    methods: {
      addToFavorites() {
        if (this.user.userInfo) {
          this.$axios.$post('/api/v1/personal/setFavoritePages', qs.stringify({sectionId: this.sectionId}, {encode: false}))
              .then((res) => {
                console.log(res)
              })
              .catch((err) => {
                console.log(err);
              });
        } else {
          this.$bvModal.show('login-modal');
        }
      },

      checkFavorites() {
        if (this.favorites && this.favorites.find(item => item.id == this.sectionId)) {
          this.inFavorites = true
        } else {
          this.inFavorites = false
        }
      }
    },
    computed: {
      user() {
        return this.$store.getters['user/user'];
      }
    },
    watch: {
      favorites() {
        this.checkFavorites();
      }
    },

    mounted() {
      this.checkFavorites();
    }

  }
</script>