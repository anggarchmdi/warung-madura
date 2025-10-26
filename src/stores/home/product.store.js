import { defineStore } from "pinia";
import { axiosWrapper } from '@/helper/axios-wrapper.js';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useProductStore = defineStore({
  id: 'product',
  state: () => ({
    products: [],
    filteredProducts: [],
  }),
  actions: {
    async fetch() {
      const url = `${baseUrl}/api/v1/product`
      const res = await axiosWrapper.get(url)
      if(res.status === 200) {
        this.products = res.data;
        this.filteredProducts = res.data;
      }
    },

    filterProducts(search = "", categoryId = null) {
      const searchLower = search.toLowerCase();
        this.filteredProducts = this.products.filter((product) => {
      const matchName = product.name.toLowerCase().includes(searchLower);
      const matchCategory = categoryId ? product.category_id === categoryId : true;
        return matchName && matchCategory;
      });
    },



    async submit(data) {
          let url = `${baseUrl}/api/v1/product`
          const res = await axiosWrapper.post(url, data, true, 'multipart/form-data')
        },

        async edit(id, data){
          let url = `${baseUrl}/api/v1/product/${id}`
          const res = await axiosWrapper.put(url, data)
        },

        async delete(id){
          let url = `${baseUrl}/api/v1/product/${id}`
          const res = await axiosWrapper.delete(url)
        }
  }
})
