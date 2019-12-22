<template>
  <b-modal id="login-modal" centered hide-footer :title="title" ref="loginModal">
    <div class="login-modal">
      <transition name="slideIn" mode="out-in">
        <div class="login-modal__auth" v-if="mode === 'auth'" :key="'auth'">
          <ValidationObserver
                  v-if="mode === 'auth'"
                  class="login-modal__auth"
                  v-slot="{ validate, invalid }"
                  ref="observerAuth"
                  :key="'auth'">
            <form class="login-modal__form" @submit.prevent="login()">
              <ValidationProvider
                      rules="required|email"
                      v-slot="{ classes }"
                      tag="div"
                      class="form-group"
                      ref="loginMailRequired"
              >
                <input
                        type="email"
                        class="form-control"
                        :class="classes['is-valid'] || 'has-error'"
                        placeholder="Введите ваш e-mail:"
                        name="email"
                        v-model="loginData.email"
                >
              </ValidationProvider>
              <ValidationProvider
                      rules="required"
                      v-slot="{ classes }"
                      tag="div"
                      class="form-group"
                      ref="loginPasswordRequired"
              >
                <input
                        type="password"
                        class="form-control"
                        :class="classes['is-valid'] || 'has-error'"
                        placeholder="Введите ваш пароль:"
                        name="password"
                        v-model="loginData.password"
                >
              </ValidationProvider>
              <a href="#" class="login-modal__nav-link" @click="switchMode('forgot-password');$event.preventDefault()">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="11" viewBox="0 0 24 11">
                  <rect width="15" height="2" y="4" fill="#555" fill-rule="evenodd" rx="1"/>
                  <rect width="5" height="2" x="2" y="6" fill="#555" fill-rule="evenodd" rx="1"
                        transform="rotate(-90 4.5 7)"/>
                  <rect width="7" height="2" x="5" y="6" fill="#555" fill-rule="evenodd" rx="1"
                        transform="rotate(-90 8.5 7)"/>
                  <path fill="#555" fill-rule="evenodd"
                        d="M19 10a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>
                Забыли пароль?
              </a>
              <div class="login-modal__form__bottom">
                <button type="submit" class="btn btn--gradient btn--lg">
                  <span>Войти</span>
                </button>
                <button type="button" class="btn btn--default btn--lg" @click="switchMode('registration')">
                  Зарегистрироваться
                </button>
              </div>
              <div class="login-modal__form__error" v-if="error">
                {{ error }}
              </div>
            </form>
          </ValidationObserver>
        </div>
        <div class="login-modal__forgot-password" v-if="mode === 'forgot-password'" :key="'forgot-password'">
          <form class="login-modal__form" @submit.prevent="forgotPassword()">
            <ValidationProvider
                    rules="required|email"
                    v-slot="{ classes }"
                    tag="div"
                    class="form-group"
                    ref="loginMailForgotRequired"
            >
              <input
                      type="email"
                      class="form-control"
                      :class="classes['is-valid'] || 'has-error'"
                      placeholder="Введите ваш e-mail:"
                      name="email"
                      v-model="forgotPasswordData.email"
              >
            </ValidationProvider>
            <a href="#" class="login-modal__nav-link" @click="switchMode('auth');$event.preventDefault()">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="10" viewBox="0 0 20 10">
                <path fill="#555" fill-rule="evenodd"
                      d="M20 6H3.331l2.663 2.663-1.33 1.332L0 5l4.664-5 1.33 1.336L3.331 4H20z"/>
              </svg>
              Вернуться назад
            </a>
            <div class="login-modal__form__bottom">
              <button type="submit" class="btn btn--gradient btn--lg">
                <span>Восстановить</span>
              </button>
            </div>
            <div class="login-modal__form__error" v-if="error">
              {{ error }}
            </div>
          </form>
        </div>
        <div class="login-modal__forgot-password-success" v-if="mode === 'forgot-password-success'"
             :key="'forgot-password-success'">
          <p class="text-center" style="font-size: 16px">
            Ссылка для восстановления пароля отправлена вам на e-mail
          </p>
          <button type="button" class="btn btn--lg btn--gradient btn--block" @click="switchMode('auth')">
            <span>Закрыть</span>
          </button>
        </div>
        <ValidationObserver
                v-if="mode === 'registration'"
                class="login-modal__registration"
                v-slot="{ validate, invalid }"
                ref="observerRegistration"
                :key="'registration'">
          <form @submit.prevent="registration()">
            <div class="login-modal__registration__user-type">
              <button type="button" class="btn btn--default btn--lg"
                      @click="registrationData.group='club'"
                      :class="{'active': registrationData.group=='club'}">
                Клубный покупатель
              </button>
              <button type="button" class="btn btn--default btn--lg"
                      @click="registrationData.group='wholesale'"
                      :class="{'active': registrationData.group=='wholesale'}">
                Оптовый покупатель
              </button>
            </div>
            <div v-if="registrationData.group === 'wholesale'">
              <div class="form-group login-modal__registration__wholesale-radio">
                <radio name="wholesaleUserType" v-model="registrationData.wholesaleUserType" value="company">
                  <span>Организация</span>
                </radio>
                <radio name="wholesaleUserType" v-model="registrationData.wholesaleUserType" value="individual">
                  <span>Физ. лицо</span>
                </radio>
              </div>
              <ValidationProvider
                      rules="required"
                      v-slot="{ classes }"
                      tag="div"
                      class="form-group"
                      ref="registrationDataRegion"
              >
                <input
                        type="text"
                        class="form-control"
                        :class="classes['is-valid'] || 'has-error'"
                        placeholder="Укажите ваш регион:"
                        name="region"
                        v-model="registrationData.region"
                >
              </ValidationProvider>
            </div>
            <div v-if="registrationData.group === 'club' || registrationData.group === 'wholesale'">
              <ValidationProvider
                      rules="required|email"
                      v-slot="{ classes }"
                      tag="div"
                      class="form-group"
                      ref="registrationDataEmail"
              >
                <input
                        type="email"
                        class="form-control"
                        :class="classes['is-valid'] || 'has-error'"
                        placeholder="Введите ваш e-mail:"
                        name="email"
                        v-model="registrationData.email"
                >
              </ValidationProvider>
              <ValidationProvider
                      rules="required|min:17"
                      v-slot="{ classes }"
                      tag="div"
                      class="form-group"
                      ref="registrationDataPhone"
              >
                <input
                        type="text"
                        class="form-control"
                        :class="classes['is-valid'] || 'has-error'"
                        placeholder="+7 (___)___-____"
                        name="phone"
                        v-model="registrationData.phone"
                        v-mask="'+7 (###) ###-####'"
                >
              </ValidationProvider>
              <ValidationProvider
                      rules="required|min:6"
                      v-slot="{ classes }"
                      tag="div"
                      class="form-group"
                      ref="registrationDataPassword"
              >
                <input
                        type="password"
                        class="form-control"
                        :class="classes['is-valid'] || 'has-error'"
                        placeholder="Пароль:"
                        name="password"
                        v-model="registrationData.password"
                >
              </ValidationProvider>
              <ValidationProvider
                      rules="required|min:6"
                      v-slot="{ classes }"
                      tag="div"
                      class="form-group"
                      ref="registrationDataPassword2"
              >
                <input
                        type="password"
                        class="form-control"
                        :class="classes['is-valid'] || 'has-error'"
                        placeholder="Пароль:"
                        name="password2"
                        v-model="registrationData.password2"
                >
              </ValidationProvider>
            </div>
            <a href="#" class="login-modal__nav-link" @click="switchMode('auth');$event.preventDefault()">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="10" viewBox="0 0 20 10">
                <path fill="#555" fill-rule="evenodd"
                      d="M20 6H3.331l2.663 2.663-1.33 1.332L0 5l4.664-5 1.33 1.336L3.331 4H20z"/>
              </svg>
              Вернуться назад
            </a>
            <div class="login-modal__form__bottom">
              <button type="submit" class="btn btn--gradient btn--lg">
                <span>Зарегестрироваться</span>
              </button>
            </div>
            <div class="login-modal__form__error" v-if="error">
              {{ error }}
            </div>
          </form>
          <div class="login-modal__registration__terms">
            Регистрируясь вы соглашаетесь с пользовательским соглашением и даете своё согласие murom.ru на обработку
            своих персональных данных, в соответствии с Федеральным законом от 27.07.2006 года №152-ФЗ.
          </div>
        </ValidationObserver>
        <div class="login-modal__auth" v-if="mode=='success-registration'" :key="'success-registration'">
          <p>Вы успешно зарегистрировались на нашем сайте! Для авторизации, воспользуйтесь формой входа.<br></p>
          <div class="login-modal__form__bottom">
            <button type="button"
                    @click="switchMode('auth');$event.preventDefault()"
                    class="btn btn--gradient btn--lg">
              <span>Войти</span>
            </button>
          </div>
        </div>
      </transition>
    </div>
  </b-modal>
</template>
<script>
  import qs from 'qs';
  import {disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks} from '~/mixins/touchfixes';
  import {ValidationProvider, ValidationObserver} from "vee-validate";
  import Vue from "vue";
  import {VueMaskDirective} from 'v-mask'

  Vue.directive('mask', VueMaskDirective);
  import Radio from '~/components/vendors/Radio'

  export default {
    // template: '#login-modal-template',
    name: 'loginModal',
    data() {
      return {
        title: 'Вход в личный кабинет',
        mode: 'auth',
        error: '',
        value: '',

        loginData: {
          email: null,
          password: null,
          rememberme: 'Y',
          backurl: '/'
        },

        registrationData: {
          email: null,
          phone: null,
          region: null,
          password: null,
          password2: null,
          backurl: '/',
          group: null,
          wholesaleUserType: 'company'
        },

        forgotPasswordData: {
          email: null
        }
      };
    },
    components: {
      ValidationProvider,
      ValidationObserver,
      Radio
    },
    methods: {
      onHide() {
        enableBodyScroll(this.$el.querySelector('.modal-content'));
        clearAllBodyScrollLocks();
        if (this.mode === 'success-registration') {
          this.mode = 'auth';
        }
      },
      onShow() {
        disableBodyScroll(this.$el.querySelector('.modal-content'));
      },
      /**
       * Switch mode and set modal title
       * @param mode
       */
      switchMode(mode) {
        this.mode = mode;
        switch (mode) {
          case 'auth':
            this.title = 'Вход в личный кабинет';
            break;
          case 'forgot-password':
          case 'forgot-password-success':
            this.title = 'Восстановление пароля';
            break;
          case 'registration':
            this.title = 'Зарегистрироваться';
            break;
          case 'success-registration':
            this.title = 'Успешная регистрация';
            break;
          default:
            break;
        }
      },

      /**
       * Send login request
       */
      async login() {
        const result = await this.$refs.observerAuth.validate();
        console.log(result)

        if (result) {
          this.$axios.$post('api/v1/auth/login', qs.stringify(this.loginData, {encode: false}))
              .then((res) => {
                if (res.success) {
                  location.reload();
                } else {
                  this.error = res.errors[0];
                }
              })
              .catch((err) => {
                console.log(err);
              });
        }
      },

      /**
       * Send registration request
       */
      async registration() {

        const result = await this.$refs.observerRegistration.validate();

        if (result) {
          this.$axios.$post('api/v1/auth/register', qs.stringify(this.registrationData, {encode: false}))
              .then((res) => {
                if (res.success) {
                  this.mode = 'success-registration';
                  this.error = '';
                  this.$store.dispatch('toaster/showToast', 'Вы успешно зарегистрировались', 2000);
                } else {
                  this.error = res.data.errors[0];
                }
              })
              .catch((err) => {
                console.log(err);
              });
        }

        /*this.$validator.validate().then(result => {
          if (result) {
            this.$axios.$post(`${this.$root.apiUrl}/auth/register`, qs.stringify(this.registrationData, {encode: false}))
                .then((res) => {
                  if (res.data.success) {
                    this.mode = 'success-registration';
                    this.error = '';
                    this.$root.showToast('Вы успешно зарегистрировались', 2000);
                  } else {
                    this.error = res.data.errors[0];
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
          }
        });*/
      },

      async forgotPassword() {
        const {valid: forgotPassword} = await this.$refs.loginMailForgotRequired.validate();

        if (forgotPassword) {
          this.$axios.$post('api/v1/auth/forgot', qs.stringify(this.forgotPasswordData, {encode: false}))
              .then((res) => {
                if (res.success) {
                  this.mode = 'forgot-password-success';
                  this.error = '';
                } else {
                  this.error = res.errors[0];
                }
              })
              .catch((err) => {
                console.log(err);
              });
        }
      },
      async getUser() {
        await this.$store.dispatch('user/fetch');
      }
    },

    mounted() {
      this.mode = 'auth';
    },
    created() {
      this.getUser();
    }
  }
</script>
<style>
  .form-group .has-error.form-control {
    background: #fff;
    border-color: #ef8181;
  }
</style>