<template id="catalog-filter-item">
  <div class="catalog-filter-item">
    <div v-if="catalogFilterItem">
      <div class="catalog-filter-item__head d-none d-xl-block">
        {{ catalogFilterItem.title }}
      </div>
      <div class="catalog-filter-item__head d-xl-none" v-b-toggle="'catalog-filter-item' + index">
        {{ catalogFilterItem.title }}
        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="4" viewBox="0 0 7 4"><path fill="#D2D2D2" fill-rule="evenodd" d="M0 0h7L3.5 4z" opacity=".6"/></svg>
      </div>
      <b-collapse :id="'catalog-filter-item' + index" v-model="collapseSelf">
        <div class="catalog-filter-item__checkboxes" v-if="catalogFilterItem.type === 'checkbox-list' || catalogFilterItem.type === 'checkbox-list-price'">
          <checkbox v-for="(option, index) in catalogFilterItem.options" name="catalogFilterItem.name[]" :value="option.value" v-model="catalogFilterItem.selected" :disabled="option.disabled" :key="index" @input="getFilter()">
            <span>{{ option.name }}</span>
          </checkbox>
        </div>
        <div class="catalog-filter-item__checkboxes" v-if="catalogFilterItem.type === 'radio-list-price'">
          <!--<radio v-for="(option, index) in catalogFilterItem.options" name="catalogFilterItem.name" :checked="option.checked" :disabled="option.disabled" :key="index" @input="priceChange(option)">-->
          <!--<span>{{ option.name }}</span>-->
          <!--</radio>-->
          <checkbox v-for="(option, index) in catalogFilterItem.options" name="catalogFilterItem.name" :checked="option.checked" :disabled="option.disabled" :key="index" @input="priceChange(option)">
            <span>{{ option.name }}</span>
          </checkbox>
        </div>
      </b-collapse>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import CheckboxRadio from 'vue-checkbox-radio'

  Vue.use(CheckboxRadio);

  export default {
    name: 'catalogFilterItem',
    props: {
      catalogFilterItem: {
        type: Object
      },
      index: {
        type: Number
      },
      collapse: {
        type: Boolean
      }
    },

    data() {
      return {
        collapseSelf: this.collapse
      }
    },

    watch: {
      collapse() {
        this.collapseSelf = this.collapse;
      }
    },

    methods: {
      priceChange: function (option) {
        if (this.catalogFilterItem.selected[0] && this.catalogFilterItem.selected[0]['arrFilter_P8_MIN'] == option.value['arrFilter_P8_MIN']) {
          this.catalogFilterItem.selected = [];
        } else {
          this.catalogFilterItem.selected = option.value;
        }
        this.getFilter();
      },
      getFilter: function () {
        // this.$parent.getFilter();
        this.$emit('catalog-filter-item-changed');
      }
    }

  }
</script>