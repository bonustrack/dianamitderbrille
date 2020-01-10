<template>
  <label class="file-select">
    <slot />
    <input type="file" @change="handleFileChange" accept="image/*" />
  </label>
</template>

<script>
export default {
  props: {
    value: File
  },
  methods: {
    handleFileChange(e) {
      this.$emit('input', e.target.files[0]);
    }
  }
};
</script>

<style lang="scss" scoped>
label:hover {
  cursor: pointer;
}
.file-select > input[type='file'] {
  display: none;
  font-weight: normal;
}
label {
  font-weight: normal;
}
</style>
