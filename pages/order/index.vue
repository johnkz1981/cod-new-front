<template>
  <!-- Main content -->
  <main class="main-content">
    <div class="main-content__inner">
      <div class="row">
        <div class="col-12 col-md-10 offset-md-1 col-xl-7 offset-xl-0">
          <h1>Оформление заказа</h1>
        </div>
      </div>
      <order-form class="order-form">
      </order-form>
    </div>
  </main>
  <!-- End Main content-->
</template>
<script>
  import OrderForm from "~/components/order/OrderForm.vue";

  export default {
    components: {
      OrderForm
    }
  }
</script>