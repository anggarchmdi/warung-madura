<template>
  <div>
    <input
      :type="showPassword ? 'text' : type"
      class="p-3.5 h-8 w-[256px] bg-[#EDF0F2] outline-none transition"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: {
    placeholder: String,
    modelValue: String,
    type: {
      type: String,
      default: 'text'
    },
    showPassword: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue']
}
</script>
