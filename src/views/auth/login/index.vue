<template>
  <div class="w-full h-screen flex p-6">
    <!-- kiri -->
    <div class="flex flex-col w-3/6 h-full bg-gradient-to-br from-5% from-[#4288F2] to-[#113E82] rounded-[40px] pt-8">
      <div class="flex-1 rounded-r-xl w-3/5 object-cover bg-center">
        <img :src="Gambar" alt="" class="absolute w-[700px] rounded-r-xl -translate-x-20">
      </div>
      <div class="p-6 mb-20">
        <p class="font-Plus-Jakarta-Sans text-Grayscale-50 font-medium text-lg fixed w-[552px]">
          Desain yang user-friendly membuat navigasi cepat dan mudah, bahkan bagi pemula.
        </p>
      </div>
    </div>

    <!-- kanan -->
    <div class="w-[558px] flex flex-col justify-center p-6 gap-y-4">
      <div>
        <h1 class="font-Plus-Jakarta-Sans text-[#1963D2] font-bold text-[40px] absolute top-0 right-3">
          MASPOS
        </h1>
      </div>

      <div class="w-[510px] gap-y-6">
        <h1 class="font-Plus-Jakarta-Sans text-gray-950 text-[30px] font-medium">
          Selamat Datang di MASPOS
        </h1>
        <p class="font-Plus-Jakarta-Sans text-[20px]">
          Masuk untuk mengelola bisnis Anda dengan mudah dan efisien. MASPOS menghadirkan solusi
          point-of-sale terbaik untuk kemudahan operasional sehari-hari.
        </p>
      </div>

      <form @submit.prevent="login">
        <div class="mb-2">
          <InputText
            label="username"
            placeholder="masukkan nama"
            v-model="formData.email"
            type="text"
          />
        </div>

        <div class="mb-2">
          <InputText
            label="password"
            placeholder="masukkan password"
            v-model="formData.password"
            type="password"
            :class="{'border-red-500': validasiData}"
          />
          <p v-if="validasiData" class="text-red-500 text-sm mt-1">silahkan cek kembali email & password anda</p>
        </div>

        <ButtonPrimary class="w-full" type="submit">Masuk</ButtonPrimary>
      </form>
    </div>
  </div>
</template>

<script>
import Gambar from '../../../assets/animations/produk.png'
import { useAuthStore } from "@/stores/auth.store.js"

export default {
  data() {
    return {
      Gambar,
      authStore: useAuthStore(),
      formData: {
        email: "",
        password: "",
      },
      validasiData: false,
    }
  },
  methods: {
    async login() {
      this.validasiData = false
      const res = await this.authStore.login(this.formData)
      if (!res || res.status === 401 || res.message === "Password salah" || res.success === false) {
        this.validasiData = true
        return
      }
      this.$router.push("/dashboard")
    }
  }
}
</script>
