<template>
  <div
    class="w-full bg-white fixed z-50 top-0 flex flex-col justify-center items-center" :class="isHome ? 'h-[160px]' : 'h-[75px]'"
  >
    <div class="w-full h-full bg-white flex justify-between items-center">
      <div @click="goToHome" class="flex justify-start items-center font-bold hover:cursor-pointer text-Blue-600 text-xl px-8 font-Montserrat">
        MASPOS
      </div>

     <div class="flex justify-end ml-auto items-center p-4 pr-8 gap-4">
      <div class="hidden lg:flex gap-4">
        <ButtonPrimary @click="goToAddCategory" class="flex justify-center items-center p-2 h-10">+ Tambah Kategori</ButtonPrimary>
        <ButtonPrimary @click="goToAddProduct" class="flex justify-center items-center p-2 h-10">+ Tambah Produk</ButtonPrimary>
      </div>
        <div class="relative">
          <buttonPrimary @click="goToAddCart" class="flex justify-center h-0 2xl:w-12 w-0 items-center 2xl:p-2 xl:h-10 hover:bg-transparent lg:hover:bg-Blue-600 text-black bg-transparent lg:bg-Blue-500">
            <i class="ri-shopping-cart-line text-black lg:text-white"></i>
            <span v-if="cartStore.cartItems.length > 0"  class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5" >
              {{ cartStore.cartItems.length }}
            </span>
          </buttonPrimary>
        </div>
          <p v-if="isCart" class="text-xs bg-Blue-50 hidden  h-12 lg:flex justify-center items-center px-4 rounded-lg text-Blue-500">
           Total Tagihan
           <span class="font-bold 2xl:ml-2">
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
    <img :src="user?.profile_picture || Avatar" class="md:w-12 w-8 h-8 md:h-12 rounded-full" alt="">
    <p class="text-sm font-medium text-gray-700">{{ user?.name || 'Guest' }}</p>
  </div>
        <!-- Dropdown -->
        <transition name="fade">
          <div
            v-if="showProfileDropdown"
            class="absolute right-0 mt-2 w-40 bg-white transition-all transform hover:scale-95 duration-300 border rounded-xl shadow-lg py-2 z-10"
          >
            <button
              @click="logout"
              class="w-full text-left px-4 text-gray-700"
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
        <div  v-if="isHome" class="w-full h-full 2xl:px-8 flex flex-col md:flex-row gap-4 items-center">
          <div class="relative w-full max-w-xs bg-[#EDF0F2] rounded-lg">
            <i class="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-Blue-500 text-[18px]"></i>
            <InputFilter
            v-model="search"
            class="w-[256px] rounded-lg text-[12px] pl-6"
            placeholder="Cari nama produk ..." />
          </div>
          <!-- button category -->
          <div class="w-full h-full flex justify-start px-8 mb-6 md:mb-0 items-center gap-4">
            <button
            @click="scrollLeft"
            v-if="showLeftArrow"
            class="absolute md:left-72 2xl:left-80 left-0 z-10 bg-white shadow-md p-2 rounded-full">
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

  <!-- navigasi bagian bawah -->
  <div class="lg:hidden fixed bottom-0 left-0 w-full h-[70px] bg-white shadow-md flex justify-around items-center z-50">
    <button
      class="flex flex-col items-center w-[110px] text-gray-500 transition"
      @click="goToHome"
    >
      <i class="ri-home-4-line text-2xl"></i>
    </button>
    <!-- Tombol Tambah di Mobile -->
    <div class="bg-white relative w-[110px] h-[70px] p-2 -top-2 flex justify-center items-center rounded-xl">
      <button
        class="bg-blue-600 text-white rounded-2xl w-[110px] h-[50px] flex items-center justify-center shadow-lg transition"
        @click="showAddModal = true"
      >
        <i class="ri-add-line text-3xl"></i>
      </button>

      <!-- Modal Pilihan Tambah -->
      <transition name="fade">
        <div
          v-if="showAddModal"
          class="fixed inset-0 flex items-end justify-center bg-black bg-opacity-50 z-50 lg:hidden"
        >
          <div class="bg-white w-full rounded-t-2xl p-6 shadow-xl">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-semibold">Tambah Data</h2>
              <button @click="showAddModal = false" class="text-gray-500 hover:text-gray-700">
                <i class="ri-close-line text-2xl"></i>
              </button>
            </div>

            <div class="flex flex-col gap-3">
              <button
                @click="openAddCategory"
                class="w-full py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                + Tambah Kategori
              </button>
              <button
                @click="goToAddProduct"
                class="w-full py-3 rounded-lg border border-gray-300 font-medium hover:bg-gray-100 transition"
              >
                + Tambah Produk
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <button
      class="flex flex-col items-center w-[110px] text-gray-500 transition"
      @click=""
    >
      <i class="ri-user-line text-2xl"></i>
    </button>
  </div>
  <!-- Modal Tambah Kategori -->
<transition name="fade">
  <div
    v-if="showAddCategoryModal"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div class="bg-white absolute bottom-0 md:relative w-full md:w-[400px] rounded-t-2xl md:rounded-2xl p-6 shadow-xl">
      <div class="flex flex-col items-center">
        <h2 class="text-xl font-semibold mb-4">Tambah Kategori</h2>
        <input
          v-model="categoryName"
          type="text"
          placeholder="Nama kategori..."
          class="w-full border rounded-lg p-2 mb-4 focus:ring focus:ring-blue-300 outline-none"
        />

        <div class="flex justify-between w-full gap-3">
          <button
            @click="showAddCategoryModal = false"
            class="w-1/2 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          >
            Batal
          </button>
          <button
            @click="addCategory"
            class="w-1/2 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
</transition>
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
const showAddModal = ref(false)
const showAddCategoryModal = ref(false)
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
const categoryName = ref("");

const openAddCategory = () => {
  showAddModal.value = false
  showAddCategoryModal.value = true
}

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

const addCategory = async () => {
  if (!categoryName.value.trim()) {
    toast.error("Nama kategori tidak boleh kosong!");
    return;
  }

  try {
    await categoryStore.submit({ name: categoryName.value });
    toast.success("Kategori berhasil ditambahkan!");
    await categoryStore.fetch();
    categoryName.value = "";
    showAddCategoryModal.value = false;
  } catch (err) {
    toast.error("Gagal menambahkan kategori!");
  }
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
