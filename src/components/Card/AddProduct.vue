<template>
  <div class="w-[442px] h-[634px] bg-white rounded-2xl">
    <!-- judul -->
    <div class="w-full h-[72px] rounded-t-2xl px-6 flex justify-start items-center">
      <h1 class="font-Plus-Jakarta-Sans font-medium text-[20px]">Tambah Produk</h1>
    </div>
    <!-- form -->
    <div class="w-full h-[466px] px-6 flex justify-center items-center flex-col gap-y-6">
      <div class="w-full h-[158px] border-2"></div>
      <InputText class="w-full" label="Produk" placeholder="Produk" />
      <InputText class="w-full" label="Harga" placeholder="Harga" />
      <InputText class="w-full" label="Pilih Kategori" placeholder="Pilih Kategori" />
    </div>
    <!-- button -->
    <div class="w-full h-[96px] rounded-b-2xl px-6 flex justify-between items-center">
      <ButtonSecondary class="w-[185px] h-[48px] text-[16px] py-2 border-Blue-500 border">Batal</ButtonSecondary>
      <ButtonPrimary class="w-[185px] h-[48px]  text-[16px]">Tambah</ButtonPrimary>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>

</style>
