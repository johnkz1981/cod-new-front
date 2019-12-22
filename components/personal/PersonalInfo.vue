<template>
  <div>
    <transition name="slideIn" mode="out-in">
      <div v-if="!editMode">
        <h1 class="personal-welcome">
          <div class="personal-welcome__ava">
            <img src="assets/img/uploads/netlab.png">
          </div>
          <div class="personal-welcome__text">
            Добро пожаловать, {{ info.user.companyName }}!
            <div class="personal-welcome__discount">
              Моя скидка: <b>{{ user.discount }}%</b>
            </div>
          </div>
        </h1>
        <section class="personal-info__display">
          <div class="personal-info__block">
            <h3>ДАННЫЕ КЛИЕНТА</h3>
            <table>
              <tr>
                <td>Наименование компании:</td>
                <td>{{ info.user.companyName }}</td>
              </tr>
              <tr>
                <td>Федеральный округ:</td>
                <td>{{ info.user.federalDistrict }}</td>
              </tr>
              <tr>
                <td>Телефон:</td>
                <td>{{ info.user.phone }}</td>
              </tr>
              <tr>
                <td>E-mail:</td>
                <td>{{ info.user.email }}</td>
              </tr>
            </table>
            <div v-if="companyInfoEmpty">
              <a href="#" class="btn btn--default btn--sm m-b-20"
                 @click="openEditForm('сompany-details', $event)">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
                  <rect fill="#B0B0B0" fill-rule="evenodd" width="10" height="2" y="4" rx="1"/>
                  <rect fill="#B0B0B0" fill-rule="evenodd" width="10" height="2" y="4" rx="1"
                        transform="rotate(90 5 5)"/>
                </svg>
                Добавить реквизиты
              </a>
              <br>
            </div>
            <a href="#" class="btn btn--gradient" @click="openEditForm('main-info', $event)">
              <span>Изменить</span>
            </a>
          </div>

          <div class="personal-info__block">
            <h3>Реквизиты компании</h3>
            <table>
              <tr>
                <td>Полное наименование:</td>
                <td>{{ info.company.compName }}</td>
              </tr>
              <tr>
                <td>Сокращенное наименование:</td>
                <td>{{ info.company.compShortName }}</td>
              </tr>
              <tr>
                <td>ИНН:</td>
                <td>{{ info.company.compInn }}</td>
              </tr>
              <tr>
                <td>ОГРН:</td>
                <td>{{ info.company.compOgrn }}</td>
              </tr>
              <tr>
                <td>КПП:</td>
                <td>{{ info.company.compKpp }}</td>
              </tr>
              <tr>
                <td>Юридический адрес:</td>
                <td>{{ info.company.compUrAddr }}</td>
              </tr>
              <tr>
                <td>Фактический адрес:</td>
                <td>{{ info.company.compFizAddr }}</td>
              </tr>
              <tr>
                <td>ОКПО:</td>
                <td>{{ info.company.compOkpo }}</td>
              </tr>
              <tr>
                <td>ОКТМО:</td>
                <td>{{ info.company.compOktmo }}</td>
              </tr>
              <tr>
                <td>р/с:</td>
                <td>{{ info.company.compRSchet }}</td>
              </tr>
              <tr>
                <td>к/с:</td>
                <td>{{ info.company.compKSchet }}</td>
              </tr>
              <tr>
                <td>Банк:</td>
                <td>{{ info.company.compBank }}</td>
              </tr>
              <tr>
                <td>БИК:</td>
                <td>{{ info.company.compBik }}</td>
              </tr>
            </table>
            <a href="#" class="btn btn--gradient" @click="openEditForm('сompany-details', $event)">
              <span>Изменить</span>
            </a>
          </div>

          <div class="personal-info__block">
            <h3>ДАННЫЕ ПОЛУЧАТЕЛЯ ГРУЗА</h3>
            <table>
              <tr>
                <td>Ф.И.О. получателя:</td>
                <td>{{ info.recipient.recipientFio }}</td>
              </tr>
              <tr>
                <td>Телефон получателя:</td>
                <td>{{ info.recipient.recipientPhone }}</td>
              </tr>
              <tr>
                <td>Серия и номер паспорта:</td>
                <td>{{ info.recipient.recipientSeria }}&nbsp;&nbsp;&nbsp;{{ info.recipient.resipientNumber }}</td>
              </tr>
            </table>
            <a href="#" class="btn btn--gradient" @click="openEditForm('cargo-receiver', $event)">
              <span>Изменить</span>
            </a>
          </div>

          <div class="personal-info__block">
            <h3>ДАННЫЕ ПО ДОСТАВКЕ</h3>
            <table>
              <tr>
                <td>Транспортная компания:</td>
                <td>{{ info.delivery.deliveryName }}</td>
              </tr>
              <tr>
                <td>Адрес доставки:</td>
                <td>{{ info.delivery.deliveryAddress }}</td>
              </tr>
            </table>
            <a href="#" class="btn btn--gradient" @click="openEditForm('delivery', $event)">
              <span>Изменить</span>
            </a>
          </div>
        </section>
      </div>

      <!-- Main info edit form -->
      <personal-info-form class="personal-info-form"
                          v-if="editMode=='main-info'"
                          :endpoint="'Info'"
                          :dataProp="'user'"
                          @edit-mode-closed="closeEditForm()">
      </personal-info-form>

      <!-- Company details edit form -->
      <personal-info-form class="personal-info-form"
                          v-if="editMode=='сompany-details'"
                          :endpoint="'Company'"
                          :dataProp="'company'"
                          @edit-mode-closed="closeEditForm()">
      </personal-info-form>

      <!-- Cargo-receiver edit form -->
      <personal-info-form class="personal-info-form"
                          v-if="editMode=='cargo-receiver'"
                          :endpoint="'Recipient'"
                          :dataProp="'recipient'"
                          @edit-mode-closed="closeEditForm()">
      </personal-info-form>

      <!-- Cargo-receiver edit form -->
      <personal-info-form class="personal-info-form"
                          v-if="editMode=='delivery'"
                          :endpoint="'Delivery'"
                          :dataProp="'delivery'"
                          @edit-mode-closed="closeEditForm()">
      </personal-info-form>

    </transition>
  </div>
</template>
<script>
  import PersonalInfoForm from '~/components/personal/PersonalInfoForm';
  import Radio from '~/components/vendors/Radio'

  export default {
    name: 'personalInfo',
    components: {
      PersonalInfoForm,
      Radio,
    },
    data() {
      return {
        editMode: ''
      };
    },

    methods: {
      openEditForm(form, $event) {
        this.editMode = form;
        $event.preventDefault();
      },

      closeEditForm() {
        this.editMode = '';
        this.$emit('data-changed');
      }
    },

    computed: {
      companyInfoEmpty() {
        let empty = true;

        for (let item in this.info.company) {
          if (this.info.company[item] == null) {
            empty = true;
          } else if (item != 'compName') {
            return false;
          }
        }
        return empty;
      },
      isCompany() {
        return this.info.user && this.info.user.userType === 'company';
      },
      info() {
        return this.$store.getters['user/info'];
      },
      user() {
        return this.$store.getters['user/user'];
      }
    }
  }
</script>