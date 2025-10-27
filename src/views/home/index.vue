<template>
  <div class="py-36 min-h-screen">
    <div class="grid
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-5
                xl:grid-cols-6
                gap-x-4 gap-y-4">
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
