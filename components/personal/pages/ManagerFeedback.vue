<template>
  <b-modal id="manager-feedback-modal" centered hide-footer title="Написать менеджеру">
    <manager-feedback class="manger-feedback" :manager="1">
    </manager-feedback>
  </b-modal>
</template>
<script>
  import ManagerFeedback from '~/components/personal/ManagerFeedback.vue'

  export default {
    components: {
      ManagerFeedback
    }
  }

</script>