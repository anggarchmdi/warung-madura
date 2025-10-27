<template>
  <div class="py-36 min-h-screen">
    <!-- slider banner di mobile-->
     <div class="h-[185px] rounded-2xl justify-center items-center md:hidden bg-white mb-8 mt-8">
      <div class="h-[180px] rounded-lg gap-4 flex md:hidden p-2">
        <Swiper
        :modules="[Autoplay]"
        :slides-per-view="1"
        :loop="true"
        :autoplay="{ delay: 2500, disableOnInteraction: false }"
        :speed="2000"
        :space-between="20"
        class="w-full h-full rounded-2xl p-2 overflow-hidden custom-swiper"
        >
        <SwiperSlide v-for="(banner, index) in banners" :key="index">
          <img
          :src="banner.image"
          class="w-full h-full object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </div>
     </div>

     <!-- produk diminati mobileview -->
      <div class="flex flex-col items-center h-[268px] bg-white mb-12 md:hidden">
        <h1 class="font-Plus-Jakarta-Sans font-bold text-base text-left ">Diminati pembeli 😍</h1>
        <!-- slider produk -->
        <div class="h-[184px] w-full bg-red-400">
          <Swiper
        :slides-per-view="'auto'"
        :space-between="12"
        class="product-swiper w-full h-[200px]"
      >
        <SwiperSlide
          v-for="(product, index) in favoriteProducts"
          :key="index"
          class="!w-[140px] bg-white rounded-xl shadow-md p-2 flex flex-col justify-between"
        >
          <img
            :src="product.img"
            alt="produk"
            class="w-full h-[110px] object-cover rounded-lg"
          />
          <p class="font-semibold text-sm mt-2 truncate">{{ product.title }}</p>
          <p class="text-blue-600 font-bold text-sm">
            Rp {{ product.price.toLocaleString() }}
          </p>
        </SwiperSlide>
      </Swiper>
        </div>
      </div>

    <!-- card produk -->
    <div class="grid
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-5
                xl:grid-cols-6
                gap-x-4 gap-y-4 md:py-8 2xl:py-4">
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
import { onMounted, ref } from "vue";
import { useCategoryStore } from "../../stores/home/category.store";
import { useProductStore } from "../../stores/home/product.store";
import CardProduct from '../../components/Card/Products.vue';
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Banner1 from '../../assets/animations/1.png'
import Banner2 from '../../assets/animations/2.png'
import Banner3 from '../../assets/animations/3.png'

const categoryStore = useCategoryStore();
const productStore = useProductStore();

onMounted(() => {
  categoryStore.fetch();
  productStore.fetch();
});

const banners = ref([
  { image: Banner1 },
  { image: Banner2 },
  { image: Banner3 },
])
</script>

<style scoped>
/* Swiper core style fix (agar slide tidak numpuk) */
.custom-swiper .swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
}

/* Tambahan animasi fade lembut */
.custom-swiper .swiper-slide img {
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
}

.custom-swiper .swiper-slide-active img {
  transform: scale(1.05);
  opacity: 1;
}

.custom-swiper .swiper-slide-next img {
  opacity: 0.9;
}
</style>
