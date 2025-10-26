import { defineStore } from "pinia";

export const useCartStore = defineStore({
  id: "cart",
  state: () => ({
    cartItems: [],
  }),
  getters: {
    totalPrice: (state) =>
      state.cartItems.reduce((sum, item) => sum + item.price * item.qty, 0),
  },
  actions: {
    addToCart(product) {
      const existing = this.cartItems.find((p) => p.id === product.id);
      if (existing) {
        existing.qty++;
      } else {
         this.cartItems.push({ ...product, qty: 1 });
      }
    },
    increaseQty(id) {
      const item = this.cartItems.find((i) => i.id === id);
      if (item) item.qty++;
    },
    decreaseQty(id) {
      const item = this.cartItems.find((i) => i.id === id);
      if (item && item.qty > 1) item.qty--;
    },
    removeItem(id) {
      this.cartItems = this.cartItems.filter((i) => i.id !== id);
    },
    clearCart() {
      this.cartItems = [];
    },
  },
});
