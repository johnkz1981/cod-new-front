<template>
  <div id="catalog-filter">
    <div>
      <button type="button" class="catalog-filter__toggle btn btn--default" v-b-modal="'catalog-filter-modal'">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14"><rect width="15" height="2" y="1" fill="#522CAF" fill-rule="evenodd" rx="1"/><circle cx="4" cy="2" r="2" fill="#522CAF" fill-rule="evenodd"/><rect width="15" height="2" y="6" fill="#522CAF" fill-rule="evenodd" rx="1"/><circle cx="11" cy="7" r="2" fill="#522CAF" fill-rule="evenodd"/><rect width="15" height="2" y="11" fill="#522CAF" fill-rule="evenodd" rx="1"/><circle cx="6" cy="12" r="2" fill="#522CAF" fill-rule="evenodd"/></svg>
        Фильтр
      </button>
      <div class="catalog-filter__dummy" v-if="!catalogFilterData">
        <div class="catalog-filter__dummy__head"></div>
      </div>
      <div class="catalog-filter__dummy" v-if="!catalogFilterData">
        <div class="catalog-filter__dummy__head"></div>
      </div>

      <catalog-filter-item
              v-for="(catalogFilterItem, index) in catalogFilterData"
              v-if="catalogFilterItem.options.length"
              :catalog-filter-item="catalogFilterItem"
              :key="index"
              :index="index"
              :collapse="collapseItems"
              @catalog-filter-item-changed="$emit('catalog-filter-changed')">
      </catalog-filter-item>
      <div class="catalog-filter__apply">
        <button type="button" class="btn btn--gradient" @click="$emit('catalog-filter-modal-closed');">
          <span>Показать</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
  import catalogFilterItem from '~/components/catalog/catalog-filter/catalog-filter-item.vue';

  export default {
    name: 'catalog-filter',
    props: ['catalogFilterData', 'apiUrl'],
    components: {
      catalogFilterItem
    },
    data: function () {
      return {
        // catalogFilterData: [],
        collapseItems: true
      };
    },

    computed: {

      /**
       * Return request params in Bitrix format
       * @returns {{}}
       */
      requestParams: function () {
        let requestParams = {};

        if (!this.catalogFilterData) return {};

        this.catalogFilterData.forEach((filterItem) => {
          if (filterItem.selected instanceof Array) {
            filterItem.selected.forEach((selectedItem) => {
              switch (filterItem.type) {
                case 'checkbox-list':
                  requestParams[selectedItem] = 'Y';
                  break;
                case 'radio-list-price':
                  Object.assign(requestParams, selectedItem);
                  break;
                default:
                  break;
              }
            });
          } else if (filterItem.selected instanceof Object) {
            Object.assign(requestParams, filterItem.selected);
          }
        });
        return requestParams;
      },
    },

    methods: {

      /**
       * Get filter from server
       * @param $event
       * @param index
       */
// getFilter: function () {
//   axios.get(this.apiUrl + '?clear_cache=Y&set_filter=Y&filter=Y', {params: this.requestParams})
//     .then(response => {
//       if (response.data instanceof Object) {
//         this.catalogFilterData = response.data;
//         this.$emit('catalog-filter-changed');
//       }
//     })
//     .catch(err => {
//       console.log(err);
//     });
// },
      checkCollapse() {
        (() => {
          if (process.client) {
            if (window.innerWidth > 1199) {
              this.collapseItems = true;
            } else {
              this.collapseItems = false;
            }
          }
        })();
      }
    },

    created: function () {
      // this.getFilter();
      this.checkCollapse();

      (() => {
        if (process.client) {
          window.addEventListener('resize', () => {
            this.checkCollapse();
          });
        }
      })();
    },
  }
</script>