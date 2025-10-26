<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-50 text-center">
    <h1 class="text-6xl font-bold text-blue-600 mb-4">404</h1>
    <h2 class="text-2xl font-semibold mb-2">Halaman Tidak Ditemukan</h2>
    <p class="text-gray-600 mb-6">Sepertinya alamat yang kamu tuju tidak tersedia.</p>
    <router-link
      to="/"
      class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      Kembali ke Beranda
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
</style>
