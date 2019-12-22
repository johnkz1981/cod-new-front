<template>
  <div>
    <ValidationObserver ref="form" v-slot="{ validate, invalid }">
      <h2>Async Rule - Unqiue Email</h2>
      <p>Enter a unique email, the following emails are already taken in the database</p>
      <ul>
        <li>example@example.com</li>
        <li>test@test.com</li>
      </ul>
      <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
        <input type="text" v-model="email">
        <span>{{ errors[0] }}</span>
      </ValidationProvider>

      <button :disabled="invalid" @click="validate().then(submit)">Check</button>
    </ValidationObserver>
  </div>
</template>

<script>
  import {
    ValidationProvider,
    ValidationObserver
  } from "vee-validate";


  export default {
    name: "Example",
    components: {
      ValidationProvider,
      ValidationObserver
    },
    data: () => ({
      email: ""
    }),
    methods: {
      async submit() {
        console.log("email submitted!");
      }
    }
  };
</script>


<style>
  span {
    display: block;
    margin-top: 20px;
  }

  input + span {
    margin-top: 3px;
  }
</style>
