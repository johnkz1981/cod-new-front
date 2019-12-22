import numeral from 'numeral'

export const state = () => ({
  basket: [],
  basketTotal: 0,
  basketTotalCount: 0,
  showBackorder: false
});

export const mutations = {

  setBasket(state, basket) {

    state.basketTotal = basketTotal(basket);
    state.basketTotalCount = basketTotalCount(basket);
    state.basket = basket.slice();
  },
  setShowBackorder(state, showBackorder) {

    state.showBackorder = showBackorder;
  }
};

export const actions = {

  async fetch({commit}){

    const basket = await this.$axios.$get('/api/v1/basket/get/');
    commit('setBasket', basket);
  },
  /**
   * Delete item from basket
   * @param item
   */
  async deleteItem({commit}, item) {

    const res = await this.$axios.$get('/api/v1/basket/delete/', {params: {basketId: item.basketId}});

    console.log(res);
    await this.dispatch('basket/fetch');
  },

  async updateItem({commit}, item) {

    const res = await this.$axios.$put('/api/v1/basket/update/', item);
    console.log(res);
    await this.dispatch('basket/fetch');
  },

  /**
   * Add to basket
   * @param quantity
   */
  async addToBasket({commit, state}, {params, selectedOfferId, itemDataRenderHasOffers}) {
    console.log(!!params.showBasket)
    const res = await this.$axios.$get('/api/v1/basket/add/', {
      params: {
        goodsId: selectedOfferId,
        quantity: params.quantity,
        type: params.type,
        isOffer: itemDataRenderHasOffers
      }
    });
    console.log(res);
    this.dispatch('toaster/showToast', 'Товар добавлен в корзину');
    await this.dispatch('basket/fetch');console.log(!!params.showBasket)
    commit('setShowBackorder', !!params.showBasket);
  },
};

export const getters = {
  basket: b => b.basket,
  basketTotal: b => b.basketTotal,
  basketTotalCount: b => b.basketTotalCount,
  showBackorder: b => b.showBackorder,
};

/**
 * Calculate basket total sum
 * @returns {number}
 */
function basketTotal(basket) {
  let basketTotal = 0;

  if (basket) {
    basket.forEach((item) => {
      if (item.type !== 'service') {
        basketTotal += item.sum;
      }
    });
  } else {
    return 0;
  }

  return numeral(basketTotal).format('0,0.00');
}

function basketTotalCount(basket) {
  let basketTotal = 0;

  if (basket) {
    basket.forEach((item) => {
      if (item.type !== 'service') {
        basketTotal += 1;
      }
    });
  } else {
    return 0;
  }

  return basketTotal;
}

