<template>
  <div class="w-[442px] h-[634px] bg-white rounded-2xl shadow-md">
    <!-- Header -->
    <div class="w-full h-[72px] rounded-t-2xl px-6 flex justify-start items-center border-b">
      <h1 class="font-Plus-Jakarta-Sans font-medium text-[20px]">
        Tambah Produk
      </h1>
    </div>

    <!-- Form -->
    <div class="w-full h-[466px] px-6 flex justify-center items-center flex-col gap-y-6">
      <div
        class="w-full h-[158px] border-2 border-dashed border-gray-300 rounded-xl flex flex-col justify-center items-center text-gray-500 cursor-pointer hover:bg-gray-50 transition"
        @click="selectFile"
      >
        <template v-if="preview">
          <img
            :src="preview"
            alt="Preview"
            class="h-[140px] w-auto object-cover rounded-lg"
          />
        </template>
        <template v-else>
          <i class="ri-add-circle-fill text-Blue-500 text-[1.5rem]"></i>
          <p class="text-xs text-Grayscale-950 font-Plus-Jakarta-Sans font-medium">Seret & Letakkan atau <span class="text-blue-600 font-medium">Pilih File</span> untuk di unggah</p>
          <p class="text-xs text-Grayscale-700">Format yang didukung: jpg, png</p>
        </template>
        <input
          type="file"
          ref="fileInput"
          class="hidden"
          accept="image/*"
          @change="handleFileChange"
        />
      </div>

      <InputText
        v-model="form.name"
        class="w-full"
        label="Produk"
        placeholder="Nama produk"
      />

      <InputText
        v-model="form.price"
        type="number"
        class="w-full"
        label="Harga"
        placeholder="Harga produk"
      />

      <div class="w-full">
        <label class="text-sm font-medium text-gray-600 mb-1 block">Pilih Kategori</label>
        <select
          v-model="form.category_id"
          class="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Pilih kategori</option>
          <option
            v-for="cat in categoryStore.categories"
            :key="cat.id"
            :value="cat.id"
          >
            {{ cat.name }}
          </option>
        </select>
      </div>
    </div>

    <div class="w-full h-[96px] rounded-b-2xl px-6 flex justify-between items-center border-t">
      <ButtonSecondary
        @click="resetForm"
        class="w-[185px] h-[48px] text-[16px] py-2 border-Blue-500 border"
      >
        Batal
      </ButtonSecondary>
      <ButtonPrimary
        @click="submitForm"
        class="w-[185px] h-[48px] text-[16px]"
      >
        Tambah
      </ButtonPrimary>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useCategoryStore } from "@/stores/home/category.store";
import { useProductStore } from "@/stores/home/product.store";
import { toast } from "vue3-toastify";

const categoryStore = useCategoryStore();
const productStore = useProductStore();

const fileInput = ref(null);
const preview = ref(null);

const form = reactive({
  name: "",
  price: "",
  category_id: "",
  picture: null,
});

onMounted(() => {
  categoryStore.fetch();
});

const selectFile = () => {
  fileInput.value.click();
};

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (!["image/jpeg", "image/png"].includes(file.type)) {
    toast("Format file harus JPG atau PNG", {
      autoClose: 2000,
      type: "error",
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    toast("Ukuran file maksimal 2MB", {
      autoClose: 2000,
      type: "error",
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    return;
  }

  form.picture = file;
  preview.value = URL.createObjectURL(file);
};

const resetForm = () => {
  form.name = "";
  form.price = "";
  form.category_id = "";
  form.picture = null;
  preview.value = null;
};

const submitForm = async () => {
  if (!form.name || !form.price || !form.category_id || !form.picture) {
    toast("Semua field wajib diisi!", {
      autoClose: 2000,
      type: "error",
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    return;
  }

  const data = new FormData();
  data.append("name", form.name);
  data.append("price", form.price);
  data.append("category_id", form.category_id);
  data.append("picture", form.picture);

  const res = await productStore.submit(data);
  if (res !== false) {
    toast("Produk berhasil ditambahkan!", {
      autoClose: 2000,
      type: "success",
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    resetForm();
  }
};
</script>

<style lang="scss" scoped>
</style>
