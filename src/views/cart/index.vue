<template>
  <div class="w-full h-screen overflow-hidden">
    <div class="w-full max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md mt-24">
      <h2 class="text-2xl font-semibold mb-4">Keranjang Belanja</h2>

      <table class="w-full border-collapse">
      <thead>
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
          class="border-b hover:bg-gray-50"
        >
          <td class="flex items-center gap-3 py-4">
            <img :src="item.picture_url" class="w-14 h-14 rounded-md object-cover" />
            <span class="font-medium">{{ item.name }}</span>
          </td>
          <td>Rp {{ item.price.toLocaleString() }}</td>
          <td class="text-center">
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
          <td class="text-right font-semibold">
            Rp {{ (item.price * item.qty).toLocaleString() }}
          </td>
          <td
            class="text-right text-red-500 cursor-pointer hover:underline"
            @click="cartStore.removeItem(item.id)"
          >
            Hapus
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex justify-end items-center mt-6 ml-auto">
      <!-- <h3 class="text-lg font-semibold">
        Total: Rp {{ cartStore.totalPrice.toLocaleString() }}
      </h3> -->
      <div class="flex gap-3">
        <RouterLink
          to="/"
          class="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
        >
          Kembali
        </RouterLink>
        <button
          @click="bayar"
          :disabled="cartStore.cartItems.length === 0"
          class="px-5 py-2 rounded-lg text-white transition-colors"
          :class="cartStore.cartItems.length === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'"
        >
          Bayar
        </button>
      </div>
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
  router.push("/payments");
};
</script>

