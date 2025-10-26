<template>
<div class="">
  <input
        :type="showPassword ? 'text' : type"
        class="p-3.5 h-8 w-[256px] bg-[#EDF0F2] outline-none transition"
        :placeholder="placeholder"
        :value="modelValue"
      />
</div>
</template>

<script>
  export default {
    props: ['placeholder', 'modelValue']
  }
</script>

<style lang="scss" scoped>

</style>
