<template>
  <div class="py-36 min-h-screen">
    <div class="grid grid-cols-6 gap-x-6 gap-y-6">
      <div v-for="item in productStore.filteredProducts" :key="item.id">
        <CardProducts
          :title="item.name"
          :price="item.price"
          :img="item.picture_url"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useCategoryStore } from "../../stores/home/category.store";
import { useProductStore } from "../../stores/home/product.store";

const categoryStore = useCategoryStore();
const productStore = useProductStore();

onMounted(() => {
  categoryStore.fetch();
  productStore.fetch();
});
</script>
