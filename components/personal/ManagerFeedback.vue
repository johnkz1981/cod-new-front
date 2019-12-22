<template>
  <transition name="slideIn" mode="out-in">
    <form @submit.prevent="submit()" v-if="!sended" :key="'form'">
      <!--div class="form-group" :class="{'has-error': errors.first('reviewText')}">
        <textarea class="form-control" placeholder="Ваше сообщение:"
                  name="reviewText" v-model="reviewData.text" v-validate="'required'">

        </textarea>
      </div-->
      <ValidationProvider
              rules="required"
              v-slot="{ classes, validate }"
              tag="div"
              class="form-group"
              ref="validateManagerReview"
      >
        <textarea
                type="text"
                class="form-control"
                :class="[classes['is-valid'] ? 'has-success': 'has-error']"
                placeholder="Ваше сообщение:"
                name="reviewText"
                v-model="reviewData.text"
        ></textarea>
      </ValidationProvider>
      <div class="form-submit">
        <button type="submit" class="btn btn--gradient btn--lg btn--block">
          <span>Отправить</span>
        </button>
        <checkbox name="agreeWithTerms" :value="true" v-model="reviewData.agree">
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
  import {ValidationProvider} from "vee-validate";

  export default {
    props: ['manager', 'managerEmail'],
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
          managerEmail: this.managerEmail,
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
            this.$axios.$post('/api/v1/review/managerfeedback', qs.stringify(this.reviewData, {encode: false}))
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
      }
    },
    computed: {
      user() {
        return this.$store.getters['user/user'];
      }
    }
  }
</script>