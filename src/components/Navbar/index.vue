<template>
  <div
    class="w-full bg-white fixed z-50 top-0 flex flex-col justify-center items-center" :class="isHome ? 'h-[160px]' : 'h-[75px]'"
  >
    <div class="w-full h-full bg-white flex justify-between items-center">
      <div @click="goToHome" class="flex justify-start items-center font-bold hover:cursor-pointer text-Blue-600 text-xl px-8 font-Montserrat">
        MASPOS
      </div>

      <div class="flex justify-end ml-auto items-center p-4 pr-8 gap-4">
        <ButtonPrimary @click="goToAddCategory" class="flex justify-center items-center p-2 h-12">+ Tambah Kategori</ButtonPrimary>
        <ButtonPrimary @click="goToAddProduct" class="flex justify-center items-center p-2 h-12">+ Tambah Produk</ButtonPrimary>
        <div class="relative">
          <buttonPrimary @click="goToAddCart" class="flex justify-center items-center p-2 h-12">
            <i class="ri-shopping-cart-line"></i>
            <span v-if="cartStore.cartItems.length > 0"  class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5" >
              {{ cartStore.cartItems.length }}
            </span>
          </buttonPrimary>
        </div>
          <p v-if="isCart" class="text-xs bg-Blue-50 h-12 flex justify-center items-center  px-4 rounded-lg text-Blue-500">
           Total Tagihan
           <span class="font-bold ml-2">
             Rp {{ cartStore.totalPrice.toLocaleString() }}
           </span>
          </p>
        <div class="w-0.5 bg-Grayscale-200 h-12"></div>
        <!-- <div class="min-w-[97px] h-[48px] gap-2 flex justify-center items-center">
          <img :src="user?.profile_picture || Avatar"
          class="w-12 h-12 rounded-full" alt="">
          <p class="text-sm font-medium text-gray-700">{{ user?.name || 'Guest' }}</p>
        </div> -->

        <div class="relative">
  <div
    @click="toggleProfileDropdown"
    class="min-w-[97px] h-[48px] gap-2 flex justify-center items-center cursor-pointer select-none"
  >
    <img :src="user?.profile_picture || Avatar" class="w-12 h-12 rounded-full" alt="">
    <p class="text-sm font-medium text-gray-700">{{ user?.name || 'Guest' }}</p>
  </div>
        <!-- Dropdown -->
        <transition name="fade">
          <div
            v-if="showProfileDropdown"
            class="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg py-2"
          >
            <button
              @click="logout"
              class="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </transition>
      </div>
      </div>
    </div>

    <!-- layer 2-->
       <div v-if="isHome" class="w-full px-8">
         <hr class="border-t border-gray-200 w-full" />
        </div>
        <!-- search -->
        <div  v-if="isHome" class="w-full h-full px-8 flex gap-4 items-center">
          <div class="relative w-full max-w-xs bg-[#EDF0F2] rounded-lg">
            <i class="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-Blue-500 text-[18px]"></i>
            <InputFilter
            v-model="search"
            class="w-[256px] rounded-lg text-[12px] pl-6"
            placeholder="Cari nama produk ..." />
          </div>
          <!-- button category -->
          <div class="w-full h-full flex justify-start px-8 items-center gap-4">
            <button
            @click="scrollLeft"
            v-if="showLeftArrow"
            class="absolute left-80 z-10 bg-white shadow-md p-2 rounded-full">
              <i class="ri-arrow-left-s-line text-xl text-gray-600"></i>
            </button>
            <div ref="categoryContainer"
            class="w-full flex overflow-x-auto gap-3 scrollbar-hide px-10"
            @scroll="handleScroll"
            >
              <ButtonSecondary
              @click="showAll"
              :class="selectedCategory === null ? 'bg-Blue-500 text-white border border-blue-400' : 'bg-Blue-50'"
              class="whitespace-nowrap h-8 px-4 flex justify-center items-center rounded-lg font-Plus-Jakarta-Sans"
            >
              Semua
            </ButtonSecondary>

              <ButtonSecondary v-for="item in categoryStore.categories"
              :key="item.id"
              @click="selectedCategory = item.id"
              :class="selectedCategory === item.id ? 'bg-Blue-500 w-auto rounded-lg text-white border border-blue-400 whitespace-nowrap' : ''"
              class="whitespace-nowrap h-8 w-auto bg-Blue-50 flex justify-center items-center font-Plus-Jakarta-Sans rounded-lg">
              {{ item.name }}</ButtonSecondary>
            </div>
            <button
            @click="scrollRight"
              class="absolute right-0 z-10 bg-white shadow-md p-2 rounded-full">
            <i class="ri-arrow-right-s-line text-xl text-gray-600"></i>
            </button>
          </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useCategoryStore } from "../../stores/home/category.store";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth.store";
import { storeToRefs } from "pinia";
import { useCartStore } from "../../stores/home/cart.store";
import { useProductStore } from "../../stores/home/product.store";
import Avatar from '../../assets/profil/avatar.jpeg'
import { toast } from "vue3-toastify";

const showLeftArrow = ref(false);
const showRightArrow = ref(false);
const router = useRouter();
const route = useRoute();
const cartStore = useCartStore();
const categoryStore = useCategoryStore();
const selectedCategory = ref(null);
const productStore = useProductStore();
const search = ref("");
const categoryContainer = ref(null);

const scrollLeft = () => {
  categoryContainer.value.scrollBy({ left: -200, behavior: "smooth"});
}
const scrollRight = () => {
  categoryContainer.value.scrollBy({left: 200, behavior: "smooth"});
}

onMounted(async () => {
  await categoryStore.fetch();

  setTimeout(() => {
    updateArrowVisibility();
  }, 300);
});

watch([search, selectedCategory], ([searchVal, categoryVal]) => {
  productStore.filterProducts(searchVal, categoryVal);
});

const isHome = computed(() => route.name === "home");
const isCart = computed(() =>
  ["/cart", "/category/add", "/product/add"].includes(route.path)
);

// const user = computed(() => useAuthStore.user)
const {user} = storeToRefs(useAuthStore());

const showAll = () => {
  selectedCategory.value = null;
  productStore.filterProducts(search.value, null);
};

const updateArrowVisibility = () => {
  const el = categoryContainer.value;
  if (!el) return;

  showLeftArrow.value = el.scrollLeft > 10;
  showRightArrow.value = el.scrollWidth - el.clientWidth - el.scrollLeft > 10;
};

const handleScroll = () => updateArrowVisibility();

const goToHome = () => {
  router.push('/')
}

const goToAddCategory = () => {
  router.push('/category/add')
}

const goToAddProduct = () => {
  router.push('/product/add')
}

const goToAddCart = () => {
  router.push('/cart')
}

const showProfileDropdown = ref(false);

const toggleProfileDropdown = () => {
  showProfileDropdown.value = !showProfileDropdown.value;
};


const logout = () => {
  setTimeout(() => {
    const auth = useAuthStore();
    auth.logout();
    router.push("/login");
  }, 1000);
};

</script>

<style lang="scss" scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

</style>
