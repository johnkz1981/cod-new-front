<template>
  <div class="quantity-input">
    <button type="button" @click="decrement()" :disabled="quantity == minQuantity">
      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="2" viewBox="0 0 8 2">
        <rect width="8" height="2" fill="#747474" fill-rule="evenodd" rx="1"/>
      </svg>
    </button>
    <input type="text" :value="quantity" @blur="onInput($event)">
    <button type="button" @click="increment()" :disabled="quantity == maxQuantity">
      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
        <rect width="8" height="2" y="3" rx="1" fill="#747474" fill-rule="evenodd"/>
        <rect width="8" height="2" y="3" rx="1" transform="rotate(90 4 4)" fill="#747474" fill-rule="evenodd"/>
      </svg>
    </button>
  </div>
</template>
<script>

  export default {
    name: 'QuantityInput',

    props: {
      defaultQuantity: {
        type: Number
      },
      currentMode: {},
      reinitQuantity: {},
      minQuantity: {
        required: true
      },
      maxQuantity: {
        required: true
      }
    },

    data() {
      return {
        quantity: +this.defaultQuantity || +this.minQuantity,
      };
    },

    watch: {
      quantity() {

      },
      defaultQuantity() {
        this.quantity = this.defaultQuantity;
      },
      minQuantity() {
        if (!this.defaultQuantity) {
          this.quantity = this.minQuantity;
        }
      },
      currentMode() {
        if (this.reinitQuantity && this.reinitQuantity > 0) {
          this.quantity = +this.reinitQuantity;
        }
      }
    },

    methods: {
      increment() {
        let newQuantity = +this.quantity + +this.minQuantity;
        if (newQuantity <= +this.maxQuantity) {
          this.quantity = newQuantity;
        }
        this.$emit('changed', this.quantity);
      },

      decrement() {
        let newQuantity = +this.quantity - +this.minQuantity;
        if (newQuantity >= +this.minQuantity) {
          this.quantity = newQuantity;
        }
        this.$emit('changed', this.quantity);
      },

      onInput($event) {
        let fn = (a) => {
          var b = a % +this.minQuantity;
          b && (a = a - b + +this.minQuantity);
          return a;
        };

        this.quantity = fn($event.target.value)
        if (!$event.target.value) {
          this.quantity = +this.minQuantity;
        }

        this.$emit('changed', this.quantity);
        // this.quantity = $event.target.value;
      }
    }
  }
</script>