<template>
  <div class="w-[442px] bg-white rounded-2xl px-6 py-4 shadow">
    <div class="flex justify-start items-center mb-4">
      <p class="text-[20px] font-medium font-Plus-Jakarta-Sans">Tambah Kategori</p>
    </div>

    <div class="flex flex-col justify-start mb-6">
      <InputText
        v-model="localName"
        label="Kategori"
        placeholder="Masukkan kategori"
        class="w-full focus:outline-black"
      />
    </div>

    <div class="flex justify-between items-center h-[64px]">
      <ButtonSecondary
        type="button"
        class="w-[185px] h-[48px] text-[16px] border border-Blue-500"
        @click="$emit('cancel')"
      >
        Batal
      </ButtonSecondary>

      <ButtonPrimary
        type="submit"
        class="w-[185px] h-[48px] text-[16px]"
      >
        Tambah
      </ButtonPrimary>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { axiosWrapper } from '../../helper/axios-wrapper';

export default {
  props: {
    name: String
  },
  emits: ['update:name', 'cancel'],

  computed: {
    localName: {
      get() {
        return this.name
      },
      set(value) {
        this.$emit('update:name', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
