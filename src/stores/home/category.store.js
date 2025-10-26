import { defineStore } from "pinia";
import { axiosWrapper } from '@/helper/axios-wrapper.js';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useCategoryStore = defineStore({
  id: 'category',
  state: () => ({
    categories: [],
  }),
  actions: {
    async fetch() {
      let url = `${baseUrl}/api/v1/category`

       const res = await axiosWrapper.get(url)
       if(res.status == 200) {
        return this.categories = res.data
       }
    },

    async submit(data) {
       const exists = this.categories.some(
    (cat) => cat.name.toLowerCase() === data.name.toLowerCase()
  )

    if (exists) {
      toast('Kategori sudah ada!', {
        autoClose: 2000,
        type: 'error',
        position: toast.POSITION.BOTTOM_RIGHT,
      })
      return
    }


      let url = `${baseUrl}/api/v1/category`
      // console.log("submit");
      const res = await axiosWrapper.post(url, data, true)
      if(res.status === 200) {
        await this.fetch()
      }
    },

    async edit(id, data){
      let url = `${baseUrl}/api/v1/category/${id}`
      const res = await axiosWrapper.put(url, data)
    },

    async delete(id){
      let url = `${baseUrl}/api/v1/category/${id}`
      const res = await axiosWrapper.delete(url)
    }
  }

})
