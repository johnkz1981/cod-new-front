<template>
  <div>
    <h2 class="h1">
      <button type="button" class="personal__back-btn" @click="$emit('edit-mode-closed')">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="12" viewBox="0 0 22 12">
          <path fill="none" fill-rule="evenodd" stroke="#6B30AB" stroke-linecap="round" stroke-width="2"
                d="M4 6l17 .063M7 11L2 6l5-5"/>
        </svg>
      </button>
      Редактировать данные клиента
    </h2>
    <ValidationObserver
            v-if="dataProp === 'user'"
            class="col-12 col-md-10 offset-md-1 col-xl-7 offset-xl-0"
            v-slot="{ validate, invalid }"
            ref="observer"
    >
      <form @submit.prevent="submit($event)">
        <ValidationProvider
                rules="required"
                v-slot="{ classes }"
                tag="div"
                class="form-group"
        >
          <label>Наименование компании:</label>
          <input
                  type="text"
                  class="form-control data-name"
                  :class="[classes['is-valid'] ? 'has-success': 'has-error']"
                  placeholder="Введите наименование компании"
                  name="companyName"
                  v-model="data.companyName"
          >
        </ValidationProvider>
        <ValidationProvider
                rules="required"
                v-slot="{ classes }"
                tag="div"
                class="form-group"
        >
          <label>Федеральный округ:</label>
          <input
                  type="text"
                  class="form-control data-name"
                  :class="[classes['is-valid'] ? 'has-success': 'has-error']"
                  placeholder="Введите ваш федеральный округ"
                  name="federalDistrict"
                  v-model="data.federalDistrict"
          >
        </ValidationProvider>
        <ValidationProvider
                rules="required|min:17"
                v-slot="{ classes }"
                tag="div"
                class="form-group"
        >
          <label>Телефон:</label>
          <input
                  type="required|min:17"
                  class="form-control data-name"
                  :class="[classes['is-valid'] ? 'has-success': 'has-error']"
                  placeholder="+7 (___)___-____"
                  name="phone"
                  v-mask="'+7 (###) ###-####'"
                  v-model="data.phone"
          >
        </ValidationProvider>
        <ValidationProvider
                rules="required|email"
                v-slot="{ classes }"
                tag="div"
                class="form-group"
        >
          <label>Email:</label>
          <input
                  type="email"
                  class="form-control"
                  :class="[classes['is-valid'] ? 'has-success': 'has-error']"
                  placeholder="Введите ваш email"
                  name="email"
                  v-model="data.email"
          >
        </ValidationProvider>
        <h3>
          Изменить пароль
        </h3>
        <div class="form-group">
          <label>Введите старый пароль:</label>
          <input type="password" class="form-control" name="oldPassword">
        </div>
        <div class="form-group">
          <label>Введине новый пароль:</label>
          <input type="password" class="form-control" name="newPassword">
        </div>
        <div class="form-group">
          <label>Повторите пароль:</label>
          <input type="password" class="form-control" name="confirmPassword">
        </div>

        <div class="personal-info-form__bottom">
          <button type="submit" class="btn btn--gradient btn--lg">
            <span>Сохранить</span>
          </button>
          <button type="button" class="btn btn--default btn--lg" @click="$emit('edit-mode-closed')">
            Отменить
          </button>
        </div>
      </form>
    </ValidationObserver>
    <div v-if="dataProp === 'company'">
      <h2 class="h1">
        <button type="button" class="personal__back-btn" @click="$emit('edit-mode-closed')">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="12" viewBox="0 0 22 12">
            <path fill="none" fill-rule="evenodd" stroke="#6B30AB" stroke-linecap="round" stroke-width="2"
                  d="M4 6l17 .063M7 11L2 6l5-5"/>
          </svg>
        </button>
        Добавить реквизиты компании
      </h2>
      <form @submit.prevent="submit($event)">
        <div class="form-group">
          <label>Полное наименование:</label>
          <input type="text" class="form-control" name="compName" v-model="data.compName">
        </div>
        <div class="form-group">
          <label>Сокращенное наименование:</label>
          <input type="text" class="form-control" name="compShortName" v-model="data.compShortName">
        </div>
        <div class="form-group">
          <label>ИНН:</label>
          <input type="text" class="form-control" name="compInn" v-model="data.compInn">
        </div>
        <div class="form-group">
          <label>ОГРН:</label>
          <input type="text" class="form-control" name="compOgrn" v-model="data.compOgrn">
        </div>
        <div class="form-group">
          <label>КПП:</label>
          <input type="text" class="form-control" name="compKpp" v-model="data.compKpp">
        </div>
        <div class="form-group">
          <label>Юридический адрес:</label>
          <input type="text" class="form-control" name="compUrAddr" v-model="data.compUrAddr">
        </div>
        <div class="form-group">
          <label>Фактический адрес:</label>
          <input type="text" class="form-control" name="compFizAddr" v-model="data.compFizAddr">
        </div>
        <div class="form-group">
          <label>ОКПО:</label>
          <input type="text" class="form-control" name="compOkpo" v-model="data.compOkpo">
        </div>
        <div class="form-group">
          <label>ОКТМО:</label>
          <input type="text" class="form-control" name="compOktmo" v-model="data.compOktmo">
        </div>
        <div class="form-group">
          <label>р/с:</label>
          <input type="text" class="form-control" name="compRSchet" v-model="data.compRSchet">
        </div>
        <div class="form-group">
          <label>к/с:</label>
          <input type="text" class="form-control" name="compKSchet" v-model="data.compKSchet">
        </div>
        <div class="form-group">
          <label>Банк:</label>
          <input type="text" class="form-control" name="compBank" v-model="data.compBank">
        </div>
        <div class="form-group">
          <label>БИК:</label>
          <input type="text" class="form-control" name="compBik" v-model="data.compBik">
        </div>

        <div class="personal-info-form__bottom">
          <button type="submit" class="btn btn--gradient btn--lg">
            <span>Сохранить</span>
          </button>
          <button type="button" class="btn btn--default btn--lg" @click="$emit('edit-mode-closed')">
            Отменить
          </button>
        </div>
      </form>
    </div>
    <ValidationObserver
            v-if="dataProp === 'recipient'"
            class="col-12 col-md-10 offset-md-1 col-xl-7 offset-xl-0"
            v-slot="{ validate, invalid }"
            ref="observer"
    >
      <h2 class="h1">
        <button type="button" class="personal__back-btn" @click="$emit('edit-mode-closed')">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="12" viewBox="0 0 22 12">
            <path fill="none" fill-rule="evenodd" stroke="#6B30AB" stroke-linecap="round" stroke-width="2"
                  d="M4 6l17 .063M7 11L2 6l5-5"/>
          </svg>
        </button>
        Редактировать данные получателя груза
      </h2>

      <form @submit.prevent="submit($event)">
        <div class="form-group">
          <label>Ф.И.О. получателя:</label>
          <input type="text" class="form-control" name="recipientFio" v-model="data.recipientFio">
        </div>
        <ValidationProvider
                rules="required|min:17"
                v-slot="{ classes }"
                tag="div"
                class="form-group"
        >
          <label>Ф.И.О. получателя:</label>
          <input
                  type="text"
                  class="form-control"
                  :class="[classes['is-valid'] ? 'has-success': 'has-error']"
                  placeholder="+7 (___)___-____"
                  name="recipientPhone"
                  v-mask="'+7 (###) ###-####'"
                  v-model="data.recipientPhone"
          >
        </ValidationProvider>
        <div class="form-group">
          <label>Серия и номер получателя:</label>
          <div style="flex: 0 0 75px;margin-right: 10px;">
            <input type="text" class="form-control" placeholder="0000" name="recipientSeria"
                   v-model="data.recipientSeria">
          </div>
          <div style="flex: 0 0 90px">
            <input type="text" class="form-control" placeholder="000000" name="resipientNumber"
                   v-model="data.resipientNumber">
          </div>
        </div>

        <div class="personal-info-form__bottom">
          <button type="submit" class="btn btn--gradient btn--lg">
            <span>Сохранить</span>
          </button>
          <button type="button" class="btn btn--default btn--lg" @click="$emit('edit-mode-closed')">
            Отменить
          </button>
        </div>
      </form>
    </ValidationObserver>
    <div>
      <h2 class="h1">
        <button type="button" class="personal__back-btn" @click="$emit('edit-mode-closed')">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="12" viewBox="0 0 22 12">
            <path fill="none" fill-rule="evenodd" stroke="#6B30AB" stroke-linecap="round" stroke-width="2"
                  d="M4 6l17 .063M7 11L2 6l5-5"/>
          </svg>
        </button>
        Редактировать данные по доставке
      </h2>
      <form @submit.prevent="submit($event)">
        <div class="form-group align-items-start">
          <label>Транспортная компания:</label>
          <div style="padding-top: 15px;">
            <radio name="deliveryId" :value="item.ID" v-model="data.deliveryId"
                   v-for="(item, index) in data.deliveryList" :key="index">
              <span>{{ item.NAME }}</span>
            </radio>
          </div>
        </div>
        <div class="form-group align-items-start">
          <label>Адрес доставки:</label>
          <textarea type="text" class="form-control" name="deliveryAddress"
                    v-model="data.deliveryAddress"></textarea>
        </div>

        <div class="personal-info-form__bottom">
          <button type="submit" class="btn btn--gradient btn--lg">
            <span>Сохранить</span>
          </button>
          <button type="button" class="btn btn--default btn--lg" @click="$emit('edit-mode-closed')">
            Отменить
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import {ValidationProvider, ValidationObserver} from "vee-validate";
  import {VueMaskDirective} from 'v-mask'
  Vue.directive('mask', VueMaskDirective);
  import Radio from '~/components/vendors/Radio'

  Vue.directive('mask', VueMaskDirective);
  import qs from 'qs';

  export default {
    props: ['endpoint', 'dataProp'],
    data() {
      return {
      }
    },
    components: {
      ValidationProvider,
      ValidationObserver,
      Radio
    },
    computed: {
      data() {

        const newData = Object.assign({}, this.$store.getters['user/info'][this.dataProp]);
        console.log(newData);
        return newData;
      },
    },
    methods: {
      async submit($event) {

        const formData = new FormData($event.target);
        const data = {};
        formData.forEach((value, key) => {
          data[key] = value;
        });

        await this.$store.dispatch('user/set', {setter: this.endpoint, data: qs.stringify(data, {encode: false})});
        this.$emit('edit-mode-closed');

      }
    }
  }
</script>