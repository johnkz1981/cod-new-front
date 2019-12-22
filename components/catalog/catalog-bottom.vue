<template>
  <div>
    <button class="btn btn--default btn--block"
            @click="$emit('page-changed', {'page': currentPage + 1, 'add': true})"
            :disabled="currentPage === pages.length">
      Показать еще
    </button>
    <div class="pagination">
      <nav>
        <ul>
          <!--li v-for="(page, index) in pages" :class="{'active': page == currentPage}">
            <a href="#" @click.prevent="$emit('page-changed', {'page': page, 'add': false})">{{ page }}</a>
          </li-->
          <li v-for="(page, index) in pages" :class="{'active': page == currentPage}">
            <a v-if="page !== '...'" href="#" @click.prevent="$emit('page-changed', {'page': page, 'add': false})">{{ page }}</a>
            <span v-if="page === '...'">{{ page }}</span>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script>
import { pagination, unserialize } from '~/mixins/paginationUnserialize.js'

  export default {
    name: 'catalog-bottom',
    props: ['catalog-items-all-count', 'items-per-page', 'current-page'],

    computed: {
      pages() {
        if (this.catalogItemsAllCount > 0) {
          // return Array.from(Array(Math.ceil(this.catalogItemsAllCount / this.itemsPerPage)).keys()).map((page) => ++page );
          return pagination(this.currentPage, Math.ceil(this.catalogItemsAllCount / this.itemsPerPage));
        } else {
          return 1;
        }
      },

      totalPages() {
        return Math.ceil(this.catalogItemsAllCount / this.itemsPerPage);
      }
    },

    watch: {
      currentPage(newVal, oldVal) {
        let hash = location.hash.length > 0 ? unserialize(location.hash.replace('#', '')) : {};
        hash.page = +newVal;
        hash.per = +this.itemsPerPage;
        location.hash = $.param(hash);
      },

      itemsPerPage(newVal) {
        let hash = location.hash.length > 0 ? unserialize(location.hash.replace('#', '')) : {};
        hash.page = +this.currentPage;
        hash.per = +newVal;
        location.hash = $.param(hash);
      }
    }
  }
</script>