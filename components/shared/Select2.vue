<template>
  <select
          style="width: 100%"
          :data-placeholder="placeholder"
          :disabled="options.length == 0">
    <slot></slot>
  </select>
</template>
<script>
  /*! Select2 4.0.6-rc.1 | https://github.com/select2/select2/blob/master/LICENSE.md */

  import $ from 'jquery'
  import 'select2';

  /*(function () {
    if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) var e = jQuery.fn.select2.amd;
    return e.define("select2/i18n/ru", [], function () {
      function e(e, t, n, r) {
        return e % 10 < 5 && e % 10 > 0 && e % 100 < 5 || e % 100 > 20 ? e % 10 > 1 ? n : t : r
      }

      return {
        errorLoading: function () {
          return "Невозможно загрузить результаты"
        }, inputTooLong: function (t) {
          var n = t.input.length - t.maximum, r = "Пожалуйста, введите на " + n + " символ";
          return r += e(n, "", "a", "ов"), r += " меньше", r
        }, inputTooShort: function (t) {
          var n = t.minimum - t.input.length, r = "Пожалуйста, введите еще хотя бы " + n + " символ";
          return r += e(n, "", "a", "ов"), r
        }, loadingMore: function () {
          return "Загрузка данных…"
        }, maximumSelected: function (t) {
          var n = "Вы можете выбрать не более " + t.maximum + " элемент";
          return n += e(t.maximum, "", "a", "ов"), n
        }, noResults: function () {
          return "Совпадений не найдено"
        }, searching: function () {
          return "Поиск…"
        }
      }
    }), {define: e.define, require: e.require}
  })();*/

  export default {
    name: 'select2',
    props: ['options', 'value', 'placeholder'],
    mounted: function () {
      let vm = this;
      let opened = false;

      this.listener = (event) => {
        if (opened) {
          $(vm.$el).select2('close');
        }
      };

      $(vm.$el)
          .select2({
            data: this.options,
            minimumResultsForSearch: Infinity
          })
          .val(vm.value)
          .trigger('change')
          .on('change', function () {
            vm.$emit('input', this.value);
          })
          .on('select2:open', function () {
            opened = true;
          })
          .on('select2:close', function () {
            opened = false;
          });

      document.addEventListener('scroll', this.listener, false);
    },
    watch: {
      value: function (value) {
        // update value
        $(this.$el).val(value).trigger('change');
      },
      options: function (options) {
        let el = $(this.$el);
        let val = this.value;
        el.empty();

        options.forEach((option) => {
          el.append(new Option(option.text, option.id, false, false));
        });

        el.val(val)
            .trigger('change');
      }
    },
    destroyed: function () {
      $(this.$el).off('select2:open');
      $(this.$el).off('select2:close');
      $(this.$el).off().select2('destroy');
      document.removeEventListener('scroll', this.listener, false);
    }
  }
</script>