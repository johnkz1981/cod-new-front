<template>
    <b-modal id="personal-manager-review-modal" centered hide-footer title="Оценить менеджера">
      <personal-manager-review-modal class="personal-manager-review-modal-form" :manager="1">
      </personal-manager-review-modal>
    </b-modal>
  </template>
<script>
  import qs from 'qs';
  import PersonalManagerReviewModal from '~/components/personal/pages/PersonalManagerReviewModal';

  export default {
    props: ['manager'],
    components: {
      PersonalManagerReviewModal
    },


  }

</script>