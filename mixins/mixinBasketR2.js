import numeral from "numeral";
import qs from "qs";

export default {
  computed: {
    /**
     * Calculate basket total sum
     * @returns {number}
     */
    basketTotal() {
      let basketTotal = 0;

      this.basketItems && this.basketItems.forEach((item) => {
        if (item.type !== 'service') {
          basketTotal += item.sum;
        }
      });

      return Math.round(basketTotal * 100) / 100;
    },

    basketTotalForPrint() {
      let basketTotal = 0;

      this.basketItems && this.basketItems.forEach((item) => {
        if (item.type !== 'service') {
          basketTotal += item.sum;
        }
      });

      basketTotal = Math.round(basketTotal * 100) / 100;

      return numeral(basketTotal).format('0,0.00');
    },

    basketTotalCount() {
      let basketTotal = 0;

      this.basketItems && this.basketItems.forEach((item) => {
        if (item.type !== 'service') {
          basketTotal += 1;
        }
      });

      return basketTotal;
    },

    basketServicePrice() {
      let basketTotal = this.serviceAdded() ? 700 : 0;

      this.basketItems && this.basketItems.forEach((item) => {
        if (item.type === 'service') {
          basketTotal += item.sum;
        }
      });

      return basketTotal;
    }
  },

  methods: {
    serviceAdded() {
      return this.basketTotalCount > 0 && +this.basketTotal < 10000;
    },

    updateItem($event) {
      const item = $event.params;

      this.$store.dispatch('basket/updateItem', item);
    },

    hideModal($ev) {
      this.$emit('exit', true);
    },

    recreateOrder(orderId) {

      $('.dozakaz-button').addClass('loading');
      this.$axios.$post('/api/v1/order/addCurrentToOrder', qs.stringify({id: orderId}, {encode: false}))
          .then((res) => {

            this.$emit('exit', true);
            $('.dozakaz-button').removeClass('loading');
          })
          .catch((err) => {
            console.log(err);
            this.$root.loading = false;
          });
    },

    /**
     * Delete item from basket
     * @param item
     */
    deleteItem(item) {

      this.$store.dispatch('basket/deleteItem', item);
    },

  },

  watch: {
    basketData() {
      this.basketItems = this.basketData;
    }
  },

  mounted() {
    this.isMounted = true;
    this.basketItems = this.basketData;
  }
}