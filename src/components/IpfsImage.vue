<template>
  <img :src="url" :alt="alt" />
</template>

<script>
export default {
  props: ['ipfsHash', 'alt', 'width', 'height'],
  data() {
    return {
      url: `https://gateway.pinata.cloud/ipfs/${this.ipfsHash}`
    };
  }
};
</script>

<style scoped>
img {
  max-height: calc(100vh - 100px);
  object-fit: cover;
}
</style>
