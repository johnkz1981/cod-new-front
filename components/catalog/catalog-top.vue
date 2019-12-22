<template>
  <div id="catalog-top">
    <div class="catalog-top">
      <button type="button" class="catalog-top__toggle btn btn--default" v-b-modal="'catalog-sort-modal'">
        Сортировать
      </button>
      <div class="catalog-top__sort-modal">
        <ul>
          <li :class="{'active': options.sort.name == 'price'}">
            <button type="button" v-b-toggle="'catalog-sort-price-collapse'">
              Цене
              <svg xmlns="http://www.w3.org/2000/svg" width="7" height="4" viewBox="0 0 7 4"><path fill="#D2D2D2" fill-rule="evenodd" d="M0 0h7L3.5 4z" opacity=".6"/></svg>
            </button>
            <b-collapse id="catalog-sort-price-collapse">
              <ul>
                <li :class="{'active': options.sort.name == 'price' && options.sort.order == 'desc'}">
                  <a href="#" @click="options.sort.name = 'price'; options.sort.order = 'desc'">Убыванию</a>
                </li>
                <li :class="{'active': options.sort.name == 'price' && options.sort.order == 'asc'}">
                  <a href="#" @click="options.sort.name = 'price'; options.sort.order = 'asc'">Возрастанию</a>
                </li>
              </ul>
            </b-collapse>
          </li>
          <li v-for="sort in sorts.slice(1,sorts.length)" :class="[{ 'active': sort.name === options.sort.name}, options.sort.order]">
            <a href="#" @click.prevent="changeSort(sort)">
              {{ sort.title }}
            </a>
          </li>
        </ul>
      </div>
      <div class="catalog-top__sort">
        <label>Сортировать:</label>
        <ul>
          <li v-for="sort in sorts" :class="[{ 'active': sort.name === options.sort.name}, options.sort.order]">
            <a href="#" @click.prevent="changeSort(sort)">
              {{ sort.title }}
              <img src="/assets/img/svg/sort.svg" alt="">
            </a>
          </li>
        </ul>
      </div>
      <div class="catalog-top__quantity">
        <label>Выводить по:</label>
        <ul>
          <li v-for="quantity in quantitys" :class="{ 'active': quantity === options.quantity}">
            <a href="#" @click.prevent="options.quantity = quantity">
              {{ quantity }}
            </a>
          </li>
        </ul>
      </div>
      <div class="catalog-top__view">
        <label>Вид товара:</label>
        <ul>
          <li v-for="view in views" :class="{ 'active': view.name === options.view}">
            <a href="#" @click.prevent="options.view = view.name" v-html="view.icon"></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import { unserialize } from '~/mixins/paginationUnserialize.js'

  export default {
    name: 'catalog-top',

    data: function () {
      const hash = (() => {
        if (process.client) {

          return location.hash.length > 0 ? unserialize(location.hash.replace('#', '')) : {};
        }
      })();
      let perPage = 36;

      if (hash && +hash.per > 0) {
        perPage = +hash.per;
      }

      return {
        options: {
          sort: {
            name: 'new',
            order: 'desc'
          },
          quantity: perPage,
          view: 'tile'
        },
        sorts: [
          {
            title: 'Цене',
            name: 'price'
          },
          {
            title: 'Новинкам',
            name: 'new'
          },
          {
            title: 'Популярности',
            name: 'popularity'
          },
          {
            title: 'Уцененные товары',
            name: 'discounted'
          }
        ],
        quantitys: [36, 72, 108],
        views: [
          {
            name: 'tile',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="19" height="15" viewBox="0 0 19 15"><path fill="#A7A6A7" fill-rule="evenodd" d="M0 0h5v3H0zm0 6h5v3H0zm0 6h5v3H0zM7 0h5v3H7zm0 6h5v3H7zm0 6h5v3H7zm7-12h5v3h-5zm0 6h5v3h-5zm0 6h5v3h-5z"></path></svg>'
          },
          {
            name: 'list',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="19" height="15" viewBox="0 0 19 15"><path fill="#A7A6A7" fill-rule="evenodd" d="M0 0h19v3H0zm0 6h19v3H0zm0 6h19v3H0z"></path></svg>'
          }
        ],
      };
    },

    computed: {
      requestParams() {
        return {
          sort: this.options.sort,
          quantity: this.options.quantity
        };
      }
    },

    methods: {
      changeSort(sort) {
        this.options.sort.name = sort.name;
        if (this.options.sort.order === 'asc') {
          this.options.sort.order = 'desc';
        } else {
          this.options.sort.order = 'asc';
        }
      }
    },

    watch: {
      options: {
        handler() {
          this.$emit('options-changed', this.options);
        },
        deep: true
      }
    }
  }
</script>