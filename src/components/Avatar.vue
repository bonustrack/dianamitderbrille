<template>
  <div
    v-if="ipfsHash"
    class="avatar circle d-inline-block"
    :style="
      `width: ${size}px; height: ${size}px;
      background-image: url('https://steemitimages.com/600x800/https://gateway.pinata.cloud/ipfs/${ipfsHash}');`
    "
  />
  <div
    v-else
    class="avatar circle d-block text-center bg-gray-8"
    :style="`width: ${size}px; height: ${size}px;`"
  >
    <div class="iconfont iconuser" :style="`font-size: ${size}px; line-height: ${size * 1.3}px;`" />
  </div>
</template>

<script>
export default {
  props: {
    ipfsHash: String,
    size: {
      type: Number,
      default: 48
    }
  }
};
</script>

<style scoped lang="scss">
@import '../vars.scss';

.avatar {
  background-color: $gray-dark;
  background-size: cover;
  background-position: center;

  .iconuser {
    color: $white-fade-50;
  }
}
</style>
