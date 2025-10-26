<template>
  <div class="">
    <!-- <router-link to="/" class="link">Home</router-link>
    <router-link to="/" class="link">User</router-link> -->
    <!-- <div class="link" @click="authStore.logout()">Logout</div> -->
    <Navbar />
  </div>
  <div class="p-8 bg-[#EDF0F2]">
    <slot />
  </div>
</template>

<script>
  import {
    useAuthStore
  } from "@/stores/auth.store.js"
  import Navbar from '../components/Navbar/index.vue'
export default {
  name: 'ExampleLayout',
  data(){
    return {
      authStore: useAuthStore()
    }
  }
};
</script>

<style>
  .link{
    @apply px-2 cursor-pointer hover:text-red-400;
  }
</style>
