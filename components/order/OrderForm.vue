<template>
  <transition-group name="slideIn" mode="out-in">
    <div class="row" v-if="!orderId" :key="'orderForm'">
      <ValidationObserver
              class="col-12 col-md-10 offset-md-1 col-xl-7 offset-xl-0"
              v-slot="{ validate, invalid }"
              ref="observer"
      >
        <form v-if="orderData" @submit="sendOrder($event)">
          <div class="order-form__block">
            <h2>
              Информация о покупателе
            </h2>
            <!--div class="form-group" :class="{'has-error': errors.first('name'), 'has-success': isSuccessValidate('name') }">
              <input
                      type="text"
                      class="form-control"
                      placeholder="Наименование компании:"
                      v-model="orderData.currentData.name"
                      name="name" v-validate="'required'">
            </div-->
            <div class="form-group" v-if="!isLogged">
              <select2 :options="[{id: 1, text: 'Физическое лицо'}, {id: 2, text: 'Юридическое лицо'}]"
                       v-model="orderData.currentData.personTypeId"></select2>
            </div>
            <ValidationProvider
                    rules="required"
                    v-slot="{ classes }"
                    tag="div"
                    class="form-group"
            >
              <input
                      type="text"
                      class="form-control data-name"
                      :class="[classes['is-valid'] ? 'has-success': 'has-error']"
                      placeholder="ФИО или наименование компании"
                      name="name"
                      v-model="orderData.currentData.name"
              >
            </ValidationProvider>
            <!--div class="form-group" :class="{'has-error': errors.first('email'), 'has-success': isSuccessValidate('email') }">
              <input type="text" class="form-control" placeholder="Email:" v-model="orderData.currentData.email" name="email" v-validate="'required|email'">
            </div>
            <div class="form-group" :class="{'has-error': errors.first('phone'), 'has-success': isSuccessValidate('phone') }">
              <input type="text" class="form-control" placeholder="+7 (___)___-____" v-model="orderData.currentData.phone" name="phone" v-validate="'required|min:17'" v-mask="'+7 (###) ###-####'">
            </div-->
            <ValidationProvider
                    rules="required|email"
                    v-slot="{ classes }"
                    tag="div"
                    class="form-group"
            >
              <input
                      type="text"
                      class="form-control data-email"
                      :class="[classes['is-valid'] ? 'has-success': 'has-error']"
                      placeholder="Email:"
                      name="email"
                      v-model="orderData.currentData.email"
              >
            </ValidationProvider>
            <ValidationProvider
                    rules="required|min:17"
                    v-slot="{ classes }"
                    tag="div"
                    class="form-group"
            >
              <input
                      type="text"
                      class="form-control data-phone"
                      :class="[classes['is-valid'] ? 'has-success': 'has-error']"
                      placeholder="+7 (___)___-____"
                      v-mask="'+7 (###) ###-####'"
                      name="email"
                      v-model="orderData.currentData.phone"
              >
            </ValidationProvider>
          </div>

          <!--div class="order-form__block">
            <h2>Способы доставки</h2>
            <div class="order-form-options">
              <div v-for="delivery in orderData.deliveryList">
                <div v-if="!delivery.items">
                  <button type="button"
                          @click="deliveryType = delivery.text; deliveryCompanies = []; orderData.currentData.deliveryId = delivery.id"
                          :class="{ 'active': deliveryType == delivery.text }">
                    <span v-html="delivery.icon" class="icon"></span>
                    {{ delivery.text }}
                    <span>Стоимость: {{ delivery.price | formatPrice }} ₽</span>
                  </button>
                </div>
                <div v-if="delivery.items">
                  <button type="button"
                          @click="deliveryType = delivery.text; deliveryCompanies = delivery.items; orderData.currentData.deliveryId = null"
                          :class="{ 'active': deliveryType == delivery.text }">
                    <span v-html="delivery.icon" class="icon"></span>
                    {{ delivery.text }}
                    <span>Стоимость: от {{ delivery.items[0].price | formatPrice }} ₽</span>
                  </button>
                </div>
              </div>
            </div-->

          <div class="order-form__block">
            <h2>Способы доставки</h2>
            <div class="order-form-options">
              <div v-for="delivery in orderData.deliveryList">
                <div v-if="!delivery.items">
                  <button type="button"
                          @click="deliveryGroup = null;
                                                        deliveryType = delivery.id;
                                                        deliveryCompanies = []"
                          :class="{ 'active': deliveryType == delivery.id }">
                    <span v-html="delivery.icon" class="icon"></span>
                    {{ delivery.text }}
                    <span>Стоимость: {{ delivery.price | formatPrice }} р.</span>
                  </button>
                </div>
                <div v-if="delivery.items">
                  <button type="button"
                          @click="deliveryGroup = delivery.id;
                                                        deliveryType = delivery.items[0].id;
                                                        deliveryCompanies = delivery.items"
                          :class="{ 'active': deliveryGroup == delivery.id }">
                    <span v-html="delivery.icon" class="icon"></span>
                    {{ delivery.text }}
                    <span v-if="delivery.minPrice > 0">Стоимость: от {{ delivery.minPrice | formatPrice }} р.</span>
                  </button>
                </div>
              </div>
            </div>

            <transition-group name="slideIn" mode="out-in">
              <div
                      v-for="(delivery, index) in orderData.deliveryList"
                      v-if="deliveryType == delivery.id || deliveryGroup == delivery.id"
                      :key="index"
              >
                <transition name="slideIn" mode="out-in">
                  <div v-show="deliveryCompanies.length" class="p-b-30">
                    <h3>Выберите транспортную компанию</h3>
                    <div class="select2--big">
                      <select2 :options="deliveryCompanies" v-model="orderData.currentData.deliveryId"></select2>
                    </div>
                  </div>
                </transition>
                <h3>
                  Введите адрес доставки:
                </h3>
                <!--div class="form-group" :class="{'has-error': errors.first('deliveryAddress'), 'has-success': isSuccessValidate('deliveryAddress') }">
                  <textarea type="text" class="form-control" v-model="orderData.currentData.deliveryAddress" name="deliveryAddress" v-validate="'required'"></textarea>
                </div>
                <div class="form-group" :class="{'has-error': errors.first('deliveryDate'), 'has-success': isSuccessValidate('deliveryDate') }">
                  <input type="text" class="form-control" placeholder="Желаемая дата доставки:" v-model="orderData.currentData.deliveryDate" name="orderData.currentData.deliveryDate">
                </div-->
                <ValidationProvider
                        rules="required"
                        v-slot="{ classes }"
                        tag="div"
                        class="form-group"
                >
                  <input
                          type="text"
                          class="form-control data-deliveryCity"
                          :class="[classes['is-valid'] ? 'has-success': 'has-error']"
                          placeholder="Город доставки"
                          name="deliveryCity"
                          v-model="orderData.currentData.deliveryCity"
                  >
                </ValidationProvider>
                <ValidationProvider
                        rules="required"
                        v-slot="{ classes }"
                        tag="div"
                        class="form-group"
                >
                  <textarea
                          type="text"
                          class="form-control data-deliveryAddress"
                          :class="[classes['is-valid'] ? 'has-success': 'has-error']"
                          placeholder=""
                          name="deliveryAddress"
                          v-model="orderData.currentData.deliveryAddress"
                  ></textarea>
                </ValidationProvider>
                <ValidationProvider
                        rules=""
                        v-slot="{ classes }"
                        tag="div"
                        class="form-group"
                >
                  <input
                          type="text"
                          class="form-control data-deliveryDate"
                          :class="[classes['is-valid'] ? 'has-success': 'has-error']"
                          placeholder="Желаемая дата доставки:"
                          name="deliveryDate"
                          v-model="orderData.currentData.deliveryDate"
                  >
                </ValidationProvider>

                <transition name="slideIn" mode="out-in">
                  <div v-if="deliveryCompanies.length" class="p-t-10">
                    <h3>Данные получателя груза</h3>
                    <!--div class="form-group" :class="{'has-error': errors.first('recipientFullName'), 'has-success': isSuccessValidate('recipientFullName') }">
                      <input type="text" class="form-control" placeholder="ФИО получателя груза:" v-model="orderData.currentData.recipientFullName" name="recipientFullName" v-validate="'required'">
                    </div-->
                    <ValidationProvider
                            rules="required"
                            v-slot="{ classes }"
                            tag="div"
                            class="form-group"
                    >
                      <input
                              type="text"
                              class="form-control"
                              :class="[classes['is-valid'] ? 'has-success': 'has-error']"
                              placeholder="ФИО получателя груза:"
                              name="recipientFullName"
                              v-model="orderData.currentData.recipientFullName"
                      >
                    </ValidationProvider>
                    <!--div class="form-group" :class="{'has-error': errors.first('recipientPhone'), 'has-success': isSuccessValidate('recipientPhone') }">
                      <input type="text" class="form-control" placeholder="Номер телефона получателя груза:" v-model="orderData.currentData.recipientPhone" name="recipientPhone" v-validate="'required'">
                    </div-->
                    <ValidationProvider
                            rules="required"
                            v-slot="{ classes }"
                            tag="div"
                            class="form-group"
                    >
                      <input
                              type="text"
                              class="form-control"
                              :class="[classes['is-valid'] ? 'has-success': 'has-error']"
                              placeholder="Номер телефона получателя груза:"
                              name="deliveryDate"
                              v-model="orderData.currentData.recipientPhone"
                      >
                    </ValidationProvider>
                    <!--div class="form-group" :class="{'has-error': errors.first('recipientId'), 'has-success': isSuccessValidate('recipientId') }">
                      <input type="text" class="form-control" placeholder="Серия, Номер паспорта и(или) ИНН:" v-model="orderData.currentData.recipientId" name="recipientId" v-validate="'required'">
                    </div-->
                    <ValidationProvider
                            rules="required"
                            v-slot="{ classes }"
                            tag="div"
                            class="form-group"
                    >
                      <input
                              type="text"
                              class="form-control"
                              :class="[classes['is-valid'] ? 'has-success': 'has-error']"
                              placeholder="Серия, Номер паспорта и(или) ИНН:"
                              name="recipientId"
                              v-model="orderData.currentData.recipientId"
                      >
                    </ValidationProvider>
                    <p class="text-muted">
                      Данные являются обязательными для Транспортной Компании. На основании ФЗ от 06.07.2016 г. № 374
                    </p>
                  </div>
                </transition>
              </div>
            </transition-group>
          </div>

          <div class="order-form__block">
            <h2>Способы оплаты</h2>
            <div class="order-form-options order-form-options--payment">
              <div v-for="payment in orderData.paymentList">
                <button type="button" @click="orderData.currentData.paymentId = payment.id; paymentType = payment.id;"
                        :class="{ 'active': paymentType == payment.id }">
                  <span v-html="payment.icon" class="icon"></span>
                  {{ payment.text }}
                  <span>{{ payment.text }}</span>
                </button>
              </div>
            </div>
          </div>

          <div class="order-form__block m-b-30">
            <h2>Комментарий к заказу</h2>
            <!--div class="form-group" :class="{'has-error': errors.first('orderComment'), 'has-success': isSuccessValidate('orderComment') }">
              <textarea type="text" class="form-control form-control--comment" placeholder="Введите комментарий к заказу" v-model="orderData.currentData.orderComment" name="orderComment"></textarea>
            </div-->
            <ValidationProvider
                    rules=""
                    v-slot="{ classes }"
                    tag="div"
                    class="form-group"
            >
              <textarea
                      type="text"
                      class="form-control has-success"
                      :class="[classes['is-valid'] ? 'has-success': 'has-error']"
                      placeholder="Введите комментарий к заказу"
                      name="orderComment"
                      v-model="orderData.currentData.orderComment"
              ></textarea>
            </ValidationProvider>
          </div>

          <div class="order-form__block m-b-30" v-if="deliveryError || paymentError">
            <h2 class="mb-1">Ошибки</h2>
            <div style="color: red">
              <div v-if="deliveryError">
                Выберите способ доставки
              </div>
              <div v-if="paymentError">
                Выберите спосбо оплаты
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn--gradient btn--lg btn--block">
            <span>Оформить заказ</span>
          </button>

          <checkbox name="agreeWithTerms" :value="true" v-model="agreeWithTerms">
            <span>Согласен на обработку персональных данных, а также с условиями оферты.</span>
          </checkbox>
        </form>
      </ValidationObserver>

      <div class="col-4 offset-1 d-none d-xl-block">
        <div class="order-form-goods">
          <div class="order-form-goods__head">
            <h2>Состав заказа</h2>
            <a href="#" class="btn btn--default btn--sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                <path d="M8.244.564l1.732 1a1 1 0 0 1 .366 1.366l-5.44 9.422-2.722.787-.742-2.787L6.878.93A1 1 0 0 1 8.244.564z"
                      fill="#B0B0B0" fill-rule="evenodd"/>
                <rect width="2" height="2" x="7" y="11" rx="1" fill="#B0B0B0" fill-rule="evenodd"/>
                <rect width="2" height="2" x="10" y="11" rx="1" fill="#B0B0B0" fill-rule="evenodd"/>
                <rect width="2" height="2" x="13" y="11" rx="1" fill="#B0B0B0" fill-rule="evenodd"/>
              </svg>
              Редактировать
            </a>
          </div>
          <basket class="basket basket--order" :basket-data="basketData">

          </basket>
        </div>
      </div>
    </div>

    <!-- Order done -->
    <div class="row" v-if="orderId">:key="'orderForm'"
      <div class="col-7">
        <order-form-goods inline-template class="order-form-goods order-form-goods--success" :orderId="orderId">
          <div>
            <div class="order-form-goods__head">
              <p>Заказ <span>№{{ orderId }}</span> 12.07.2014 16:46 принят</p>
            </div>
            <div class="order-form-goods__list">
              <div class="order-form-goods__item" v-for="goods in orderGoods">
                <div class="order-form-goods__item__img">
                  <img :src="goods.picture">
                </div>
                <div class="order-form-goods__item__info">
                  <div class="order-form-goods__item__vendor-code">
                    Артикул: {{ goods.vendorCode }}
                  </div>
                  <a :href="goods.url" class="order-form-goods__item__name">
                    {{ goods.name }}
                  </a>
                  <!--<div class="order-form-goods__item__props">-->
                  <!--Цвет: <span class="color" :style="{'background-color': goods.color.hex}"></span> {{ goods.color.name }}<br>-->
                  <!--Размер: {{ goods.size }}<br>-->
                  <!--{{ goods.packageType }}-->
                  <!--</div>-->
                  <div class="order-form-goods__item__price">
                    {{ goods.quantity }} х {{ goods.price | formatPrice }} ₽
                  </div>
                </div>
              </div>
            </div>
            <div class="order-form-goods__summary">
              <ul>
                <!--<li>-->
                <!--<div>Сервисный сбор:</div>-->
                <!--<div>700 ₽</div>-->
                <!--</li>-->
                <li>
                  <div>Товаров на:</div>
                  <div>{{ orderTotal | formatPrice }} ₽</div>
                </li>
                <li>
                  <div>Итого:</div>
                  <div>{{ orderTotal | formatPrice }} ₽</div>
                </li>
              </ul>
            </div>
          </div>
        </order-form-goods>
      </div>

      <div class="col-4 offset-1">
        <div class="order-info">
          <h2>Информация о заказе</h2>
          <div class="order-info__table">
            <table>
              <tr>
                <td>Компания:</td>
                <td>{{ orderData.currentData.name }}</td>
              </tr>
              <tr>
                <td>Телефон:</td>
                <td>{{ orderData.currentData.phone }}</td>
              </tr>
              <tr>
                <td>E-mail:</td>
                <td>{{ orderData.currentData.email }}</td>
              </tr>
              <tr>
                <td>Доставка:</td>
                <td>СДЭК</td>
              </tr>
              <tr>
                <td>Оплата:</td>
                <td>Банковской картой онлайн</td>
              </tr>
            </table>

            <a href="#" class="btn btn--default btn--sm">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="13" height="14"
                   viewBox="0 0 13 14">
                <defs>
                  <rect id="a" width="7" height="3" x="3" y="10" rx="1"/>
                </defs>
                <g fill="none" fill-rule="evenodd">
                  <rect width="13" height="9" y="2" fill="#B0B0B0" rx="1"/>
                  <rect width="5" height="4" x="4" fill="#B0B0B0" rx="1"/>
                  <use fill="#B0B0B0" xlink:href="#a"/>
                  <rect width="8" height="4" x="2.5" y="9.5" stroke="#FFF" rx="1"/>
                  <rect width="4" height="2" x="7" y="4" fill="#FFF" rx="1"/>
                </g>
              </svg>
              Распечатать
            </a>
          </div>
        </div>
      </div>
    </div>
  </transition-group>
</template>
<script>
  // Components
  import './OrderFormGoods';
  import Basket from '~/components/basket/order/Basket'
  import select2 from '~/components/shared/Select2'
  import {ValidationProvider, ValidationObserver} from "vee-validate";
  import CheckboxRadio from 'vue-checkbox-radio'
  import Vue from 'vue'

  Vue.use(CheckboxRadio);
  import {VueMaskDirective} from 'v-mask'

  Vue.directive('mask', VueMaskDirective);

  export default {
    name: 'OrderForm',
    components: {
      Basket,
      ValidationProvider,
      ValidationObserver,
      select2
    },
    data() {
      return {
        showCompanyDate: false,
        orderData: null,
        deliveryGroup: null,
        deliveryType: null,
        deliveryCompanies: [],

        deliveryAddress: '',
        deliveryDate: '',
        recipientFullName: '',
        recipientPhone: '',
        recipientId: '',

        paymentType: null,
        orderComment: '',
        agreeWithTerms: true,

        orderId: null,
        deliveryError: null,
        paymentError: null,
        emailError: null
      };
    },

    computed: {
      formValidated() {
        return Object.keys(this.fields).some(key => this.fields[key].validated)
            && Object.keys(this.fields).some(key => this.fields[key].valid)
            && this.deliveryType !== null
            && this.paymentType !== null;
      },
      basketData() {
        return this.$store.getters['basket/basket'];
      },
      isLogged() {
        return this.$store.getters['user/isLogged'];
      },
    },

    methods: {
      checkEmailErrorField() {
        this.emailError = false;
      },

      hasEmailError(errors) {
        return errors.first('email') || !!this.emailError;
      },

      isSuccessValidate(inputName) {
        if (inputName === 'email' && !!this.emailError) {
          return false;
        }

        if (this.$validator.fields.find({name: inputName})) {
          let inputFlags = this.$validator.fields.find({name: inputName}).flags;
          return inputFlags.valid && inputFlags.validated;
        } else {
          return false;
        }
      },

      toggleShowCompanyDate() {
        this.showCompanyDate = !this.showCompanyDate;
      },
      // TODO My mock /api/v1/order/get/ /mock.html
      getOrderData() {
        this.$axios
            .$get('/api/v1/order/get/')
            .then((res) => {console.log(res)
              if(res.length){
                this.orderData = res;
                this.setDeliveryType(res);
                this.setPaymentType(res);
                this.setCity(res);

                if (!this.orderData.currentData.personTypeId) {
                  this.orderData.currentData.personTypeId = 1;
                }
              }
            })
            .catch((err) => {
              console.log(err);
            });
      },

      setCity(data) {
        this.orderData.currentData.deliveryCity = data.currentData.deliveryCity === '' ? 'Москва' : data.currentData.deliveryCity;
      },

      setDeliveryType(data) {
        if (+data.currentData.deliveryId > 0) {
          this.deliveryType = data.currentData.deliveryId;
          data.deliveryList.forEach(deliveryGroup => {
            if (typeof deliveryGroup.items !== 'undefined' && deliveryGroup.items.length > 0) {
              deliveryGroup.items.forEach(deliveryItem => {
                if (+deliveryItem.id === +this.deliveryType) {
                  this.deliveryGroup = deliveryGroup.id;
                  this.deliveryCompanies = deliveryGroup.items;
                }
              });
            }
          });
        }
      },

      setPaymentType(data) {
        if (+data.currentData.paymentId > 0) {
          this.paymentType = data.currentData.paymentId;
        }
      },

      needToSendCompanyData() {
        if (+this.paymentType > 0) {
          let thisPayment = null;
          this.orderData.paymentList.forEach(payment => {
            if (+payment.id === +this.paymentType) {
              thisPayment = payment;
            }
          });
          return thisPayment && thisPayment.type === 'bill';
        } else {
          return false;
        }
      },

      async sendOrder($event) {
        $event.preventDefault();
        // this.$root.loading = true;
        let body = $('html, body');

        // const result = await this.$refs.observer.validate();
        const observer = this.$refs.observer;

        observer.validate().then(result => {
          if (!result) { // Mock result
            if (!this.orderData.currentData.name) {
              let item = $('.data-name').parent().get(0);
              body.stop().animate({scrollTop: item.offsetTop}, 220, 'swing', function () {
              });
              return;
            }

            if (!this.orderData.currentData.email) {
              let item = $('.data-email').parent().get(0);
              body.stop().animate({scrollTop: item.offsetTop}, 220, 'swing', function () {
              });
              return;
            }

            if (!this.orderData.currentData.phone) {
              let item = $('.data-phone').parent().get(0);
              body.stop().animate({scrollTop: item.offsetTop}, 220, 'swing', function () {
              });
              return;
            }

            if (!this.orderData.currentData.deliveryCity) {
              let item = $('.data-deliveryCity').parent().get(0);
              body.stop().animate({scrollTop: item.offsetTop}, 220, 'swing', function () {
              });
              return;
            }

            if (!this.orderData.currentData.deliveryAddress) {
              let item = $('.data-deliveryAddress').parent().get(0);
              body.stop().animate({scrollTop: item.offsetTop}, 220, 'swing', function () {
              });
              return;
            }

            if (!this.orderData.currentData.deliveryDate) {
              let item = $('.data-deliveryDate').parent().get(0);
              body.stop().animate({scrollTop: item.offsetTop}, 220, 'swing', function () {
              });
              return;
            }

            return;
          }

          if (!this.deliveryType) this.deliveryError = true;
          if (!this.paymentType) this.paymentError = true;

          if (!this.paymentError && !this.deliveryError) {
            this.$axios
                .$post('/api/v1/order/add/', JSON.stringify(Object.assign(this.orderData.currentData, {save: 'y'})))
                .then((res) => {
                  console.log(res);
                  if (res && +res.orderId > 0) {
                    // this.orderId = res.data.orderId;
                    window.location.href = `?orderId=${res.orderId}`;
                  }

                  if (res.errors && res.errors.currentData) {
                    this.emailError = res.errors.currentData.email;
                    let item = $('.data-email').parent().get(0);
                    body.stop().animate({scrollTop: item.offsetTop}, 220, 'swing', function () {
                    });
                  } else {
                    this.emailError = false;
                  }
                })
                .catch((err) => {
                  // this.$root.loading = false;
                  console.log(err);
                });

            return;
          }

          if (this.paymentError) {
            let item = $('.order-form-options').parent().get(0);
            body.stop().animate({scrollTop: item.offsetTop}, 220, 'swing', function () {
            });
            return;
          }

          if (this.deliveryError) {
            let item = $('.order-form-options').parent().get(0);
            body.stop().animate({scrollTop: item.offsetTop}, 220, 'swing', function () {
            });
          }
        });
      }
    },

    created() {
      this.getOrderData();
    },

    watch: {
      deliveryType() {
        this.deliveryError = false;
        this.orderData.currentData.deliveryId = this.deliveryType;
      },
      paymentType() {
        this.paymentError = false;
        this.orderData.currentData.paymentId = this.paymentType;
      }
    }
  }
</script>
<style>
  .form-group .form-control.has-success {
    border-color: #7ed321;
    background: #fff;
  }

  .form-group .has-error.form-control {
    background: #fff;
    border-color: #ef8181;
  }

  .form-group :after {
    -webkit-transform: translateX(0);
    -ms-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
</style>