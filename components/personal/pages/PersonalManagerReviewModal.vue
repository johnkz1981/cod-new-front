<template>
  <transition name="slideIn" mode="out-in">
    <form @submit.prevent="submit()" v-if="!sended" :key="'form'">
      <div class="review-modal-form__stars">
        <star-rating
                v-model="reviewData.rating"
                :rating="0"
                :show-rating="false"
                :star-size="23"
                :padding="4"
                :active-color="'#F7B71D'"
                :inactive-color="'#BCBCBC'">
        </star-rating>
      </div>
      <ValidationProvider
              rules="required"
              v-slot="{ classes, validate }"
              tag="div"
              class="form-group"
              ref="validateManagerReview"
      >
        <label>Наименование компании:</label>
        <textarea
                type="text"
                class="form-control"
                :class="[classes['is-valid'] ? 'has-success': 'has-error']"
                placeholder="Ваш отзыв:"
                name="reviewText"
                v-model="reviewData.text"
        ></textarea>
      </ValidationProvider>
      <div class="form-submit">
        <button type="submit" class="btn btn--gradient btn--lg btn--block">
          <span>Оставить отзыв</span>
        </button>
        <checkbox name="agreeWithTerms" :value="true" v-model="reviewData.agree">
          <span>Согласен на обработку персональных данных, а также с условиями оферты.</span>
        </checkbox>
      </div>
    </form>
    <div class="review-modal-sended" v-if="sended" :key="'sended'">
      Спасибо за ваш отзыв!
    </div>
  </transition>
</template>
<script>
  import {ValidationProvider} from "vee-validate";
  import CheckboxRadio from 'vue-checkbox-radio'
  import Vue from 'vue'
  import qs from 'qs'

  Vue.use(CheckboxRadio);

  export default {
    components: {
      ValidationProvider
    },
    data() {
      return {
        rating: 0,
        agreeWithTerms: true,
        error: '',
        sended: false,

        reviewData: {
          agree: true,
          rating: 0,
          manager: this.manager,
          text: null
        }
      };
    },

    methods: {
      async submit() {

        const {valid} = await this.$refs.validateManagerReview.validate();
        if (valid) {
          this.reviewData.name = this.user.userInfo.NAME + ' ' + this.user.userInfo.LAST_NAME;
          this.reviewData.email = this.user.userInfo.EMAIL;
          this.$axios.$post('/api/v1/review/add', qs.stringify(this.reviewData, {encode: false}))
              .then((res) => {
                if (res.success) {
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
      },
    },
    computed: {
      user() {
        return this.$store.getters['user/user'];
      }
    }
  }
</script>