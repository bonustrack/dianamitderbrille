<template>
  <img :src="url" :alt="alt" />
</template>

<script>
export default {
  props: ['ipfsHash', 'alt', 'width', 'height'],
  data() {
    return {
      url: `https://steemitimages.com/${this.width}x${this.height}/https://gateway.pinata.cloud/ipfs/${this.ipfsHash}`
    };
  }
};
</script>
