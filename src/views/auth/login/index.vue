<template>
  <div class="w-full h-screen p-10 flex ">
    <!-- kiri -->
    <div class="flex flex-1 ">

    </div>
    <!-- kanan -->
    <div class="w-[558px] flex flex-col justify-center">
      <form @submit.prevent="login">
        <InputText label="username" placeholder="masukkan nama" v-model="formData.email" type="text" />
        <InputText label="password" placeholder="masukkan password" v-model="formData.password" type="password" />
        <ButtonPrimary type="submit">Masuk</ButtonPrimary>
      </form>
    </div>
  </div>
</template>

<script>
  import {
    useAuthStore
  } from "@/stores/auth.store.js"

  export default {
    data() {
      return {
        authStore: useAuthStore(),
        formData: {
          email: "",
          password: "",
        }
      }
    },
    methods: {
      login() {
        this.authStore.login(this.formData)
      }
    }
  }

</script>
