<template>
  <div class="2xl:w-[442px] h-[452px] flex flex-col justify-center items-center gap-y-8 md:bg-white bg-transparent px-6 rounded-2xl">
    <div class="flex flex-col justify-center items-center w-[200px] h-[219px] ">
      <!-- animasi payment -->
      <Vue3Lottie
        :animationData="paymentAnimation"
        :loop="false"
        :autoplay="true"
        class="w-[200px] h-[200px]"
      />
      <p class="font-Plus-Jakarta-Sans text-Green-700 font-bold text-[16px] mt-4">
        Pembayaran Sukses
      </p>
    </div>
      <div class="w-[394px] h-[73px] p-2 flex flex-col justify-center items-center gap-y-2">
        <p class="text-gray-400 font-Plus-Jakarta-Sans text-base">Total</p>
        <p class="font-Plus-Jakarta-Sans font-bold text-base">RP. {{ totalPrice.toLocaleString() }}</p>
        <p class="font-Plus-Jakarta-Sans text-base text-Grayscale-400">{{ currentDate }}</p>
      </div>
      <div class="pt-4 bottom-3">
        <ButtonPrimary @click="goToHome" class="w-full h-[48px] font-Plus-Jakarta-Sans text-xs">
      <i class="ri-arrow-left-line mr-2"></i>
          Kembali
      </ButtonPrimary>
      </div>
  </div>
</template>

<script setup>
import { Vue3Lottie } from 'vue3-lottie'
import paymentAnimation from '@/assets/animations/success.json'
import { useCartStore } from '../../stores/home/cart.store';
import { useRouter } from 'vue-router';

const cartStore = useCartStore()
const router = useRouter()

const totalPrice = Number(localStorage.getItem("totalPrice")) || 0;

const currentDate = new Date().toLocaleDateString('id-ID', {
  day: 'numeric',
  month:'long',
  year: 'numeric'
})

const goToHome = () => {
  cartStore.clearCart();
  router.push('/')
}
</script>

<style lang="scss" scoped></style>
