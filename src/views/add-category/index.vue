<template>
  <div class="flex justify-center items-center w-full h-screen 2xl:-mt-20 overflow-hidden">
    <form @submit.prevent="SubmitCategory">
      <CardAddCategory
        v-model:name="form.name"
        @cancel="resetForm"
      />
    </form>
  </div>
</template>

<script>
import { useCategoryStore } from '../../stores/home/category.store'
import AddCategory from '../../components/Card/AddCategory.vue';

export default {
  components: { AddCategory },

  data() {
    return {
      form: { name: '' },
      categoryStore: useCategoryStore(),
    }
  },

  methods: {
    async SubmitCategory() {
      if (!this.form.name.trim()) {
        alert('Kategori tidak boleh kosong!')
        return
      }

      try {
        await this.categoryStore.submit(this.form)
        alert('Kategori berhasil ditambahkan!')
        this.resetForm()
      } catch (error) {
        console.error(error)
        alert('Terjadi kesalahan saat menambahkan kategori.')
      }
    },

    resetForm() {
      this.form.name = ''
    }
  }
}
</script>

<style lang="scss" scoped></style>
