<template>
    <aside class="personal__aside-right col-3">
      <div class="personal-manager">
        <div class="personal-manager__ava">
          <img src="https://101optovik.ru/upload/iblock/0cc/0ccdaca4eef747007c4d91ef107a0fbd.png">
        </div>
        <div class="personal-manager__name">
          <span>Ваш персональный менеджер</span>
          Селиверстов Роман Сергеевич        </div>
        <a href="#" class="btn btn--default btn--md" v-b-modal="'manager-feedback-modal'">
          Написать
        </a>
        <a href="#" class="btn btn--default btn--md" v-b-modal="'manager-callback-modal'">
          Заказать звонок
        </a>
        <a href="https://api.whatsapp.com/send?phone=7" class="personal-manager__whatsapp">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><g fill="none" fill-rule="nonzero"><path fill="#2CB742" d="M0 20l1.72-5.16A9.776 9.776 0 0 1 .345 9.828C.345 4.4 4.745 0 10.172 0 15.6 0 20 4.4 20 9.828c0 5.427-4.4 9.827-9.828 9.827A9.784 9.784 0 0 1 5.6 18.527L0 20z"/><path fill="#FFF" d="M15.894 13.328c-.438-.829-2.056-1.777-2.056-1.777-.366-.209-.808-.232-1.016.14 0 0-.526.63-.66.721-.61.414-1.176.398-1.747-.173l-1.327-1.327-1.327-1.327c-.571-.571-.587-1.137-.173-1.747.09-.134.72-.66.72-.66.373-.209.35-.65.14-1.016 0 0-.947-1.618-1.776-2.056a.909.909 0 0 0-1.068.16l-.586.586c-1.86 1.86-.944 3.958.915 5.817l1.7 1.699 1.698 1.699c1.86 1.859 3.958 2.774 5.817.915l.586-.586a.91.91 0 0 0 .16-1.068z"/></g></svg>
          +7        </a>
        <a href="#" class="btn btn--default btn--sm" v-b-modal="'personal-manager-review-modal'">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14"><path fill="#B0B0B0" fill-rule="evenodd" d="M7.543 1.026L5.817 4.9H1.422a.5.5 0 0 0-.313.89L4.363 8.4 3.2 12.877a.5.5 0 0 0 .725.564L8 11.2l4.071 2.24a.5.5 0 0 0 .725-.563L11.634 8.4l3.256-2.61a.5.5 0 0 0-.313-.89H10.18L8.456 1.026a.5.5 0 0 0-.913 0z"/></svg>
          Оценить менеджера
        </a>
      </div>
      <personal-manager-review-modal/>
      <manager-feedback/>
      <manager-callback/>
    </aside>
</template>
<script>
  import PersonalManagerReviewModal from '~/components/personal/PersonalManagerReviewModalForm'
  import ManagerFeedback from '~/components/personal/pages/ManagerFeedback'
  import ManagerCallback from '~/components/personal/pages/ManagerCallback'

  export default {
    components: {
      PersonalManagerReviewModal,
      ManagerFeedback,
      ManagerCallback
    },
    methods: {
    }
  }
</script>
