<template>
  <div>
    <h1>Избранные товары <span v-if="user">({{ data.favoriteProductCount || 0 }})</span></h1>
    <section class="personal-favorites-goods" v-if="user && data.favoriteProductCount < 1">
      Список избранных товаров пуст
    </section>
    <section class="personal-favorites-goods" v-if="user && data.favoriteProductCount > 0">
      <div class="personal-favorites-goods-item" v-for="item in data.favoriteProduct">
        <div class="personal-favorites-goods-item__img">
          <img :src="item.previewPicture">
        </div>
        <div class="personal-favorites-goods-item__info">
          <div class="personal-favorites-goods-item__vendor-code">
            Артикул: {{ item.vendorCode }}
          </div>
          <a :href="item.url" class="personal-favorites-goods-item__name" v-html="item.name"></a>
          <div class="personal-favorites-goods-item__price">
            <div>
              Ваша цена
              <div>от <span>{{ item.minPrice | formatPrice }}</span> р../шт</div>
            </div>
            <div>
              Базовая цена
              <div>от <span>{{ item.basePrice | formatPrice }}</span> р../шт</div>
            </div>
          </div>
          <goods-favorites :goods-id="item.id" :favorites="user.favoriteProduct" v-if="user">
          </goods-favorites>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import GoodsFavorites from '~/components/personal/GoodsFavorites'
export default {
  props: ['data'],
  components: {
    GoodsFavorites
  },
  computed: {
    user() {
      return this.$store.getters['user/user'];
    }
  }
}
</script>