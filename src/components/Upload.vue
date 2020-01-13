<template>
  <label class="file-select">
    <slot />
    <input type="file" @change="handleFileChange" accept="image/*" />
  </label>
</template>

<script>
import client from '@/helpers/client';

export default {
  methods: {
    async handleFileChange(e) {
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append('file', file);
      try {
        const result = await client.request('upload', formData, { upload: true });
        this.$emit('input', result.result.IpfsHash);
        console.log('Result', result);
      } catch (error) {
        console.log('Error', error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.file-select > input[type='file'] {
  display: none;
  font-weight: normal;
}
label {
  all: initial;
  all: unset;

  &:hover {
    cursor: pointer;
  }
}
</style>
