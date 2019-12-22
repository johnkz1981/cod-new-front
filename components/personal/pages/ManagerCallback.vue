<template>
  <b-modal id="manager-callback-modal" centered hide-footer title="Заказать звонок">
    <manager-callback class="manger-feedback" :manager="1">
    </manager-callback>
  </b-modal>
</template>
<script>
  import ManagerCallback from '~/components/personal/ManagerCallback'

  export default {
    components: {
      ManagerCallback
    }
  }
</script>