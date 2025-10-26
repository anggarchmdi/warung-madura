<template>
  <div class="py-36 min-h-screen">
    <div class="grid grid-cols-6 gap-x-6 gap-y-6">
      <!-- <div v-for="item in productStore.filteredProducts" :key="item.id"> -->
        <CardProduct
          v-for="product in productStore.filteredProducts"
          :key="product.id"
          :id="product.id"
          :title="product.name"
          :price="product.price"
          :img="product.picture_url"
        />
      </div>
    </div>
  <!-- </div> -->
</template>

<script setup>
import { onMounted } from "vue";
import { useCategoryStore } from "../../stores/home/category.store";
import { useProductStore } from "../../stores/home/product.store";
import CardProduct from '../../components/Card/Products.vue';
const categoryStore = useCategoryStore();
const productStore = useProductStore();

onMounted(() => {
  categoryStore.fetch();
  productStore.fetch();
});
</script>
