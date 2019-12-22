<template></template>
<script>
  export default {
    name: 'OrderFormGoods',
    data() {
      return {
        orderId: null,
        orderGoods: [
          // TODO Привести формат к такому же как и в корзине, что бы не писать два метода API
          {
            img: 'assets/img/uploads/catalog-item-2.png',
            vendorCode: '1326541',
            name: 'Рюкзак молодежный Зкокожа бабочка',
            color: {
              hex: '#000',
              name: 'черный'
            },
            size: '32',
            packageType: 'Коробка 48 шт.',
            price: 780,
            quantity: 2
          },
          {
            img: 'assets/img/uploads/catalog-item-2.png',
            vendorCode: '1326541',
            name: 'Рюкзак молодежный Зкокожа бабочка',
            color: {
              hex: '#000',
              name: 'черный'
            },
            size: '32',
            packageType: 'Коробка 48 шт.',
            price: 780,
            quantity: 2
          }
        ]
      };
    },

    computed: {
      orderTotal() {
        let orderTotal = 0;

        this.orderGoods.forEach((item) => {
          orderTotal += item.sum
        });

        return orderTotal;
      }
    },


    created() {
      this.getOrderGoods();
    },

    methods: {
      /**
       * Get order goods from server
       */
      getOrderGoods() {
        // axios
        //   .get(`${this.$root.apiUrl}/basket/get/')
        //   .then((res) => {
        //     console.log(res.data);
        //     if (res && res.data) {
        //       this.orderGoods = res.data;
        //     }
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
      },
    }
  }
</script>