<template>
  <div class="d-inline-block">
    <div
      class="avatar circle"
      :style="
        `width: ${size || '48'}px; height: ${size ||
          '48'}px; background-image: url('https://steemitimages.com/600x800/https://gateway.pinata.cloud/ipfs/${ipfsHash}');`
      "
    />
  </div>
</template>

<script>
export default {
  props: ['ipfsHash', 'size']
};
</script>

<style scoped lang="scss">
.avatar {
  background-size: cover;
  background-position: center;
}
</style>
