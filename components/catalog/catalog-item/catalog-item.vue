<template>
  <div v-if="selectedOffer" :class="{'with-offers': offers.length > 1}">
    <ul class="catalog-item__badges" v-if="itemDataRender && itemDataRender.labels.length">
      <li v-for="label in itemDataRender.labels" :class="label.code">
        {{ label.title }}
      </li>
    </ul>
    <goods-favorites :goods-id="goodsId" :favorites="user.favoriteProduct" v-if="user">
    </goods-favorites>

    <div class="catalog-item__img">
      <a :href="itemDataRender.url">
        <img :src="itemDataRender.previewPicture" v-if="!images">
        <img :src="images[0]" v-if="images">
      </a>
    </div>

    <div class="catalog-item__main-info">
      <div class="catalog-item__options">

        <!-- Size select -->
        <goods-size-select class="goods-size-select" :sizes="sizes" :selected-offer="selectedOffer"
                           v-if="sizes.length" @size-changed="optionChanged($event)">
        </goods-size-select>

        <!-- Color select -->
        <goods-color-select class="goods-color-select" :colors="colors" :selected-offer="selectedOffer"
                            v-if="colors.length" @color-changed="optionChanged($event)">
        </goods-color-select>
      </div>

      <div class="catalog-item__vendor">
        Артикул: {{ itemDataRender.vendorCode }}
      </div>
      <a :href="itemDataRender.url" class="catalog-item__name">
        {{ itemDataRender.name }}
      </a>
      <div class="catalog-item__more-info">
        {{ itemDataRender.description }}
      </div>
    </div>

    <goods-buy
            class="goods-buy"
            :selected-offer="selectedOffer"
            :price="price"
            :is-in-catalog="true"
            :min-quantity="minQuantity"
            :package-size="packageSize"
            :box-size="boxSize"
            @wholesale-quantity-changed="getPrice($event)"
            @add-to-basket="addToBasket($event)"
            :priceList="priceList"
            v-if="selectedOffer  && priceList">
    </goods-buy>

    <div v-if="false && itemDataRender">
      <div class="catalog-item__not-available">
        <div>Нет в наличии</div>
        <button type="button" v-b-modal="'goods-notification-modal-' + itemDataRender.id">
          Когда появится?
        </button>
      </div>

      <goods-notification-modal inline-template :data="itemDataRender">
        <b-modal :id="'goods-notification-modal-' + data.id" centered hide-footer title="Уведомить об поступлении">
          <transition name="slideIn" mode="out-in">
            <form @submit.prevent="submit()" v-if="!sended" :key="'form'">
              <div class="goods-notification__goods">
                <div class="goods-notification__goods__img">
                  <img :src="data.previewPicture">
                </div>
                <div class="goods-notification__goods__info">
                  <div class="name">{{ data.name }}</div>
                  <span>Необходимое количество</span>
                  <quantity-input :min-quantity="1" :max-quantity="1000" @changed="notificationData.quantity = $event">
                  </quantity-input>
                </div>
              </div>
              <div class="form-group" :class="{'has-error': errors.first('name')}">
                <input type="text" class="form-control" placeholder="Представьтесь пожалуйста:" name="name"
                       v-model="notificationData.name" v-validate="'required'">
              </div>
              <div class="form-group" :class="{'has-error': errors.first('email')}">
                <input type="email" class="form-control" placeholder="Введите ваш e-mail:" name="email"
                       v-model="notificationData.email" v-validate="'required|email'">
              </div>
              <div class="form-submit">
                <button type="submit" class="btn btn--gradient btn--lg btn--block">
                  <span>Отправить</span>
                </button>
                <checkbox name="agreeWithTerms" :value="true" v-model="notificationData.agree">
                  <span>Согласен на обработку персональных данных, а также с условиями оферты.</span>
                </checkbox>
                {{ error }}
              </div>
            </form>
            <div class="review-modal-sended" v-if="sended" :key="'sended'">
              Спасибо! Мы уведомим вас о поступлении товара.
            </div>
          </transition>
        </b-modal>
      </goods-notification-modal>
    </div>
  </div>
</template>
<script>
  import {goodsMixin} from '~/components/goods/goods-mixin';
  import catalogItemBuy from '~/components/catalog/catalog-item/catalog-item-buy';
  import goodsColorSelect from '~/components/goods/goods-color-select';
  import goodsFavorites from '~/components/goods/goods-favorites';
  import goodsSizeSelect from '~/components/goods/goods-size-select';
  import goodsBuy from '~/components/goods/goods-buy'

  export default {

    data() {

      return {
        user: {
          favoriteProduct: []
        },
        inFavorites: '',
      }
    },
    mixins: [goodsMixin],
    components: {
      goodsColorSelect,
      goodsFavorites,
      goodsSizeSelect,
      catalogItemBuy,
      goodsBuy
    },
    created() {
      //this.price();
    }
  }
</script>