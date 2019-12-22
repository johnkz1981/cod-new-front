<template>
  <div :class="{'active': active}">
    <div class="toaster__inner">
      <img src="/assets/img/svg/toaster/basket.svg">
      {{ message }}
    </div>
  </div>
</template>
<script>
  export default {
    props: ['message', 'active'],

    methods: {
      show(){
        this.active = true;

        setTimeout(() => {
          this.active = false;
        }, 3000);
      }
    }
  }
</script>