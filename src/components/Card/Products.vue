<template>
  <div class="border-2 rounded-2xl w-[216px] bg-white h-[298px] p-2 relative">
    <div class="w-full overflow-hidden relative ">
      <img :src="img" alt="" class="h-[177px] w-[200px] rounded-lg object-cover">
      <button
      title="delete?"
        @click="showDeleteModal = true"
        class="absolute bottom-2 right-2 w-6 h-6 flex justify-center items-center transition-all transform hover:scale-90 duration-300 bg-white rounded-md shadow p-0.5"
      >
        <i class="ri-delete-bin-6-line text-red-500 w-4 h-4 bg-white/50 rounded-sm text-xs"></i>
      </button>
    </div>
    <p class="font-medium font-Plus-Jakarta-Sans pt-2 ">{{ title }}</p>
    <p class="text-Green-700 font-bold font-Plus-Jakarta-Sans">Rp {{ price }}</p>
    <div class="pt-2">
      <ButtonPrimary
      @click="addToCart"
      class="flex justify-center gap-x-2 items-center w-[200px] h-[39px] font-medium font-Plus-Jakarta-Sans">
      <i class="ri-add-line"></i>
      Keranjang
    </ButtonPrimary>
    </div>

    <transition name="fade">
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <div class="bg-white w-[442px] rounded-2xl p-6 shadow-xl">
          <div class="flex flex-col items-center">
            <div class="relative w-16 h-16 bg-Red-100 rounded-full flex justify-center items-center">
              <div
              class="absolute w-12 h-12 flex items-center justify-center bg-[#FF2928] rounded-full"
              >
              <i class="ri-delete-bin-6-line text-white text-3xl"></i>
            </div>
          </div>
            <h2 class="text-xl font-semibold mb-2">Hapus Produk</h2>
            <p class="text-gray-600 mb-6">
              Apakah Anda yakin ingin menghapus produk ini?
            </p>

            <div class="flex justify-between w-full gap-3">
              <button
                @click="showDeleteModal = false"
                class="w-1/2 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Batal
              </button>
              <button
                @click="confirmDelete"
                class="w-1/2 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCartStore } from '../../stores/home/cart.store';
import { useProductStore} from '../../stores/home/product.store'
import { toast } from 'vue3-toastify';

const cartStore = useCartStore();
const productStore = useProductStore()
const showDeleteModal = ref(false)

const props = defineProps({
  title: String,
  price: Number,
  img: String,
  id: Number,
});

const formatPrice = (num) => num.toLocaleString('id-ID')

const addToCart = () => {
  cartStore.addToCart({
    id: props.id,
    name: props.title,
    price: props.price,
    picture_url: props.img,
  })
  toast('Produk di tambahkan ke keranjang!', {
    autoClose: 2000,
    type: 'success',
    position: toast.POSITION.BOTTOM_RIGHT,
  })
}

const confirmDelete = async () => {
  try{
     console.log('Deleting product id:', props.id)
    await productStore.delete(props.id)
    toast('Produk berhasil dihapus', {
      autoClose: 2000,
      type: 'success',
      position: toast.POSITION.BOTTOM_RIGHT,
    })
    showDeleteModal.value = false
    await productStore.fetch()
  } catch(error) {
    toast('Gagal menghapus Produk!', {
      autoClose: 2000,
      type: 'error',
      position: toast.POSITION.BOTTOM_RIGHT,
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
