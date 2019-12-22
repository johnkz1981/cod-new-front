<template>
  <transition name="slideIn" mode="out-in">
    <form @submit.prevent="submit()" v-if="!sended" :key="'form'">
      <ValidationProvider
              rules="required|min:17"
              v-slot="{ classes }"
              tag="div"
              class="form-group"
              ref="validateManagerReview"
      >
        <label>Телефон:</label>
        <input
                type="text"
                class="form-control data-name"
                :class="[classes['is-valid'] ? 'has-success': 'has-error']"
                placeholder="+7 (___)___-____"
                name="phone"
                v-mask="'+7 (###) ###-####'"
                v-model="data.phone"
        >
      </ValidationProvider>
      <div class="form-submit">
        <button type="submit" class="btn btn--gradient btn--lg btn--block">
          <span>Отправить</span>
        </button>
        <checkbox name="agreeWithTerms" :value="true" v-model="data.agree">
          <span>Согласен на обработку персональных данных, а также с условиями оферты.</span>
        </checkbox>
      </div>
    </form>
    <div class="review-modal-sended" v-if="sended" :key="'sended'">
      Менеджер свяжется с вами в ближайшее время!
    </div>
  </transition>
</template>
<script>
  import qs from 'qs';
  import Vue from 'vue';
  import {ValidationProvider} from "vee-validate";
  import {VueMaskDirective} from 'v-mask'
  Vue.directive('mask', VueMaskDirective);

  export default {
    props: ['manager', 'managerEmail'],
    components: {
      ValidationProvider
    },
    data() {
      return {
        agreeWithTerms: true,
        error: '',
        sended: false,

        data: {
          agree: true,
          manager: this.manager,
          managerEmail: this.managerEmail,
          phone: null
        }
      };
    },

    methods: {
      async submit() {
        const {valid} = await this.$refs.validateManagerReview.validate();

          if (valid) {
            this.data.name = this.user.userInfo.NAME + ' ' + this.user.userInfo.LAST_NAME;
                this.data.email = this.user.userInfo.EMAIL;
            this.$axios.$post('api/v1/review/managercallback', qs.stringify(this.data, {encode: false}))
                .then((res) => {
                  if (res.success == true) {
                    this.sended = true;
                    setTimeout(() => {
                      this.$bvModal.hide('personal-manager-review-modal');
                    }, 3000);
                  } else {
                    this.error = res.errors[0];
                  }
                })
                .catch((err) => {
                  this.error = 'Произошла ошибка. Повторите позже.';
                  console.log(err);
                });
          }
      }
    },
    computed: {
      user() {
        return this.$store.getters['user/user'];
      }
    }
  }
</script>