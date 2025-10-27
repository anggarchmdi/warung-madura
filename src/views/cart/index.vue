<template>
  <div class="w-full h-screen overflow-y-auto">
    <div class="w-full max-w-5xl mx-auto 2xl:p-4 bg-white h-[400px] md:h-[650px] lg:h-[500px] md:p-6 rounded-xl shadow-md mt-24">
      <h2 class="text-xl md:text-2xl font-semibold mb-4 p-2">Keranjang Belanja</h2>

      <!-- Tabel Responsive -->
      <div class="overflow-y-auto h-80 lg:h-[350px] md:h-[550px]">
        <table class="w-full border-collapse text-sm md:text-base">
          <thead class="hidden md:table-header-group">
            <tr class="border-b text-gray-600">
              <th class="text-left py-3">Produk</th>
              <th class="text-left py-3">Harga</th>
              <th class="text-center py-3">Jumlah</th>
              <th class="text-right py-3">Sub Total</th>
              <th class="text-right py-3"></th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="item in cartStore.cartItems"
              :key="item.id"
              class="md:table-row flex flex-col md:flex-row border-b md:border-0 p-3 md:p-0"
            >
              <!-- Produk -->
              <td class="flex items-center gap-3 py-2 md:py-4">
                <img :src="item.picture_url" class="w-16 h-16 rounded-md object-cover" />
                <div class="flex-1">
                  <p class="font-medium">{{ item.name }}</p>
                  <p class="text-gray-500 text-sm md:hidden">
                    Rp {{ item.price.toLocaleString() }}
                  </p>
                </div>
                <!-- Tombol hapus di mobile -->
                <button
                  @click="cartStore.removeItem(item.id)"
                  class="text-red-500 hover:text-red-600 transition-colors md:hidden"
                >
                  <i class="ri-delete-bin-line text-[20px]"></i>
                </button>
              </td>

              <!-- Harga (desktop only) -->
              <td class="hidden md:table-cell">Rp {{ item.price.toLocaleString() }}</td>

              <!-- Jumlah -->
              <td class="text-center md:py-4 py-2">
                <div class="flex justify-center items-center gap-2">
                  <button
                    @click="cartStore.decreaseQty(item.id)"
                    class="px-2 border rounded hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span>{{ item.qty }}</span>
                  <button
                    @click="cartStore.increaseQty(item.id)"
                    class="px-2 border rounded hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </td>

              <!-- Subtotal (desktop only) -->
              <td class="hidden md:table-cell text-right font-semibold">
                Rp {{ (item.price * item.qty).toLocaleString() }}
              </td>

              <!-- Tombol hapus (desktop only) -->
              <td class="hidden md:table-cell text-right">
                <button
                  @click="cartStore.removeItem(item.id)"
                  class="text-red-500 hover:underline"
                >
                  Hapus
                </button>
              </td>

              <!-- Subtotal mobile -->
              <td class="md:hidden text-right font-semibold mt-2">
                Rp {{ (item.price * item.qty).toLocaleString() }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- desktop -->
        <div class="hidden lg:flex gap-3 w-full md:w-auto justify-end">
          <div class="hidden md:flex">
          <RouterLink
          to="/"
          class="flex-1 md:flex-none px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-center"
          >
          Kembali
        </RouterLink>
      </div>
          <button
            @click="bayar"
            :disabled="cartStore.cartItems.length === 0"
            class="flex-1 md:flex-none px-5 py-2 rounded-lg text-white transition-colors"
            :class="cartStore.cartItems.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-Blue-600 hover:bg-blue-700'"
          >
            Bayar
          </button>
      </div>
       </div>

      <div class="flex lg:hidden justify-end items-center gap-3 mt-6 ml-auto bg-white rounded-lg w-full h-[70px]  p-2">
        <!-- Total mobile -->
         <div class="w-[700px] h-[47px] bg-Blue-50 border-Green-500 pb-2 pl-2 pt-1 lg:hidden rounded-lg">
           <h3 class="text-sm font-Plus-Jakarta-Sans text-[12px] text-Blue-400">
             Total Tagihan
            </h3>
            <p class="font-Plus-Jakarta-Sans text-Blue-600 font-semibold">
              Rp {{ cartStore.totalPrice.toLocaleString() }}
            </p>
          </div>

          <!-- mobile -->
        <div class="flex gap-3 w-full md:w-auto justify-end">
          <div class="hidden md:flex">
          <RouterLink
          to="/"
          class="flex-1 md:flex-none px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-center"
          >
          Kembali
        </RouterLink>
      </div>

          <button
            @click="bayar"
            :disabled="cartStore.cartItems.length === 0"
            class="flex-1 md:flex-none px-5 py-2 rounded-lg text-white transition-colors"
            :class="cartStore.cartItems.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-Blue-600 hover:bg-blue-700'"
          >
            Bayar
          </button>
        </div>
      </div>

  </div>
</template>


<script setup>
import { useCartStore } from "@/stores/home/cart.store";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const cartStore = useCartStore();
const router = useRouter();

const bayar = () => {
  if (cartStore.cartItems.length === 0) {
    toast.error("Keranjang masih kosong!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
    });
    return;
  }

  const total = cartStore.totalPrice;
  if (total <= 0) {
    toast.error("Total belanja tidak valid.", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000,
    });
    return;
  }

  toast.success("Pembayaran diproses!", {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 1500,
  });

  // Simpan total dan lanjut ke halaman pembayaran
  localStorage.setItem("totalPrice", total);
  cartStore.clearCart();
  setTimeout(() => {
    router.push("/payments");
  }, 1500)
};
</script>

