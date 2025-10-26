<template>
  <div class="flex flex-col gap-2">
    <label class="font-Plus-Jakarta-Sans font-semibold">{{ label }}</label>

    <div class="relative">
      <input
        :type="showPassword ? 'text' : type"
        class="p-3.5 border rounded-lg w-full h-12 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />

      <!-- Tombol toggle password -->
      <button
        v-if="type === 'password'"
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500 transition"
        @click="togglePassword"
      >
        <i v-if="!showPassword" class="ri-eye-line"></i>
        <i v-else class="ri-eye-off-line"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['label', 'modelValue', 'placeholder', 'type'],
  emits: ['update:modelValue'],
  data() {
    return {
      showPassword: false,
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style lang="scss" scoped></style>
