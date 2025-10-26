<template>
  <div class="border-2 rounded-2xl w-[216px] bg-white h-[298px] p-2">
    <div class="w-full overflow-hidden ">
      <img :src="img" alt="" class="h-[177px] w-[200px] rounded-lg">
    </div>
    <p class="font-medium font-Plus-Jakarta-Sans pt-2 ">{{ title }}</p>
    <p class="text-Green-700 font-bold font-Plus-Jakarta-Sans">Rp {{ price }}</p>
    <div class="pt-2">
      <ButtonPrimary @click="addToCart" class="flex justify-center gap-x-2 items-center w-[200px] h-[39px] font-medium font-Plus-Jakarta-Sans"><i class="ri-add-line"></i> Keranjang</ButtonPrimary>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../../stores/home/cart.store';
const cartStore = useCartStore();

const props = defineProps({
  title: String,
  price: Number,
  img: String,
  id: Number,
});

const addToCart = () => {
  cartStore.addToCart({
    id: props.id,
    name: props.title,
    price: props.price,
    picture_url: props.img,
  });
};
</script>

<style lang="scss" scoped>

</style>
