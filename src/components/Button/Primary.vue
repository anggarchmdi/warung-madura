<template>
  <button class="bg-Blue-500 py-3.5 px-6 rounded-lg text-white hover:bg-Blue-600" :type="type">
    <slot/>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'button',
    },
  }
}
</script>
