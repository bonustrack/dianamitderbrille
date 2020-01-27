<template>
  <label class="file-select">
    <slot v-if="!isLoading" />
    <VueLoadingIndicator class="m-2" v-else/>
    <input type="file" @change="handleFileChange" accept="image/*, video/mp4" />
  </label>
</template>

<script>
import client from '@/helpers/client';

export default {
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    async handleFileChange(e) {
      this.isLoading = true;
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append('file', file);
      try {
        const result = await client.request('upload', formData, { upload: true });
        this.$emit('input', result.result);
        this.isLoading = false;
      } catch (error) {
        console.log(error);
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
