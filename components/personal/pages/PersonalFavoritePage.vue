<template>
  <div>
    <h1>Избранные страницы <span v-if="this.user">({{ this.user.favoritePagesCount }})</span></h1>
    <section class="personal-favorites-goods" v-if="this.user && this.user.favoritePages.length < 1">
      Список избранных страниц пуст
    </section>
    <section class="personal-favorites-pages" v-if="this.user">
      <ul>
        <li v-for="item in this.user.favoritePages">
          <a :href="item.url">
            {{ item.name }}
          </a>
          <page-favorites :section-id="item.id">
          </page-favorites>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
  import PageFavorites from  '~/components/personal/PageFavorites'

  export default {
    components: {
      PageFavorites
    },
    computed: {
      user() {
        return this.$store.getters['user/user'];
      }
    }
  }
</script>