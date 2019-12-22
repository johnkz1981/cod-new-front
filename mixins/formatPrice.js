import Vue from 'vue';
import numeral from 'numeral';

if (numeral.locales['ru'] === undefined) {

  numeral.register('locale', 'ru', {
    delimiters: {
      thousands: ' ',
      decimal: ','
    },
    ordinal : function (number) {
      return number === 1 ? 'er' : 'ème';
    },
    currency: {
      symbol: 'руб.'
    }
  });
}

numeral.locale('ru');

Vue.filter('formatPrice', function (value) {
  if (typeof value !== 'undefined') {
    return numeral(value).format('0,0.00');
  } else {
    return '';
  }
});
