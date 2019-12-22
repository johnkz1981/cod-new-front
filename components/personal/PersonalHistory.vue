<template>
  <div>
    <transition name="slideIn" mode="out-in">
      <div v-if="!orderInfoPage" :key="'b1'">
        <h1>
          История заказов <span>({{ orders.length }})</span>
        </h1>
        <div class="personal-history-list row" v-if="!orders.length && !$root.loading">
          <div class="col-12 col-md-6">
            Ваша история заказов пуста.
          </div>
        </div>
        <div class="personal-history-list row" v-if="orders.length && !orderInfoPage && !$root.loading">
          <div class="personal-history-list__item-wrap col-12 col-md-6" v-for="order in orders">
            <div class="personal-history-item">
              <a href="#" class="personal-history-item__number" @click="showOrderInfo(order, $event)">
                №: {{ order.number }}
              </a>
              <table>
                <tr>
                  <td>Дата:</td>
                  <td>{{ order.date }}</td>
                </tr>
                <tr>
                  <td>Стоимость:</td>
                  <td>{{ order.price | formatPrice }}р.</td>
                </tr>
                <tr>
                  <td>Доставка:</td>
                  <td>{{ order.delivery }}</td>
                </tr>
                <tr>
                  <td>Оплата:</td>
                  <td>{{ order.payment }}</td>
                </tr>
                <tr>
                  <td>Статус:</td>
                  <td>{{ order.status }}</td>
                </tr>
              </table>
              <div class="personal-history-item__bottom">
                <button class="btn btn--gradient"
                        v-if="order.statusId !== 'N'"
                        @click="repeatOrder(order.number)">
                  <span>Повторить</span>
                </button>
                <button class="btn btn--default btn--sm"
                        v-if="orderForCombine(order)"
                        @click="addToOrder(order.number)">
                  <span>Объединить с текущей корзиной</span>
                </button>
                <!--                                    <a href="#" class="btn btn--default btn--sm">-->
                <!--                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="13" height="14" viewBox="0 0 13 14"><defs><rect id="a" width="7" height="3" x="3" y="10" rx="1"/></defs><g fill="none" fill-rule="evenodd"><rect width="13" height="9" y="2" fill="#B0B0B0" rx="1"/><rect width="5" height="4" x="4" fill="#B0B0B0" rx="1"/><use fill="#B0B0B0" xlink:href="#a"/><rect width="8" height="4" x="2.5" y="9.5" stroke="#FFF" rx="1"/><rect width="4" height="2" x="7" y="4" fill="#FFF" rx="1"/></g></svg>-->
                <!--                                        Распечатать-->
                <!--                                    </a>-->
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="orderInfoPage" :key="'b2'">
        <h2 class="h1 d-block">
          <button type="button" class="personal__back-btn" @click="orderInfoPage = false">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="12" viewBox="0 0 22 12">
              <path fill="none" fill-rule="evenodd" stroke="#6B30AB" stroke-linecap="round"
                    stroke-width="2" d="M4 6l17 .063M7 11L2 6l5-5"></path>
            </svg>
          </button>
          Заказ №{{ selectedOrder.number }}
        </h2>
        <div class="order-form-goods">
          <basket class="basket basket--order"
                  :basket-data="selectedOrder.orderGoods">
          </basket>
        </div>

        <a href="#"
           v-if="selectedOrder.statusId !== 'N'"
           class="btn btn--gradient btn--lg"
           @click="repeatOrder(selectedOrder.number)">
          <span>Повторить заказ</span>
        </a>
        <button class="btn btn--default btn--sm"
                v-if="orderForCombine(selectedOrder)"
                @click="addToOrder(selectedOrder.number)">
          <span>Объединить с текущей корзиной</span>
        </button>
      </div>
    </transition>
  </div>
</template>
<script>
  import qs from 'qs';
  import Basket from '~/components/basket/personal/Basket'
  export default {
    components: {
      Basket
    },
    data() {
      return {
        orderInfoPage: false,
        orders: [],
        selectedOrder: null
      };
    },

    created() {
      this.getOrdersHistory();
    },

    methods: {
      orderForCombine(order) {
        return order.statusId === 'N' && this.orders[0].number === order.number;
      },

      getOrdersHistory() {
        this.$axios.$get('/api/v1/personal/orderList')
            .then((res) => {
              this.orders = res.orders.map((order) => {
                order.price = +order.price;
                return order;
              });
            })
            .catch((err) => {
              console.log(err);
            });
      },

      showOrderInfo(order, $event) {
        $event.preventDefault();
        this.selectedOrder = order;
        this.orderInfoPage = true;
      },

      repeatOrder(order) {

        this.$axios.$post('/api/v1/order/repeat', qs.stringify({id: order}, {encode: false}))
            .then((res) => {
              document.location.href = res.data.result;
            })
            .catch((err) => {
              console.log(err);
            });
      },

      addToOrder(orderId) {

        this.$axios.$post('/api/v1/order/addCurrentToOrder', qs.stringify({id: orderId}, {encode: false}))
            .then((res) => {

              this.selectedOrder = res.result;
              this.orders.forEach((order, index) => {
                if (+order.number === +res.result.number) {
                  this.orders[index] = res.result;
                }
              });
            })
            .catch((err) => {
              console.log(err);
            });
      }
    },
    computed: {
      basket() {
        return this.$store.getters['basket/fetch'];
      }
    }
  }
</script>