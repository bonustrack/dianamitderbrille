<template>
  <label class="file-select">
    <slot v-if="!isLoading" />
    <VueLoadingIndicator class="m-2" v-else />
    <input type="file" @change="handleFileChange" accept="image/*, video/mp4" />
  </label>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    async handleFileChange(e) {
      this.isLoading = true;
      this.$emit('isLoading', this.isLoading);
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append('file', file);
      try {
        const url = `${process.env.VUE_APP_API}/api/upload`;
        const init = {
          method: 'POST',
          headers: { Authorization: this.$store.state.settings.token },
          body: formData
        };
        const result = await fetch(url, init);
        const output = await result.json();
        this.$emit('input', output.file);
        this.isLoading = false;
        this.$emit('isLoading', this.isLoading);
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
