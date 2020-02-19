<template>
  <div v-if="file">
    <div class="position-relative d-inline-block">
      <img
        v-if="file.mimetype.includes('image/')"
        :src="`https://gateway.pinata.cloud/ipfs/${file.ipfs_hash}`"
        class="rounded-2"
        style="max-height: 160px;"
      />
      <a
        href="#"
        @click="$emit('delete')"
        class="iconfont icondelete position-absolute top-0 right-0 m-2"
      />
    </div>
    <video
      v-if="file.mimetype.includes('video/')"
      :src="`https://gateway.pinata.cloud/ipfs/${file.ipfs_hash}`"
      preload="metadata"
      controlslist="nodownload"
      controls
      playsinline
      style="max-height: 160px;"
    />
  </div>
</template>

<script>
export default {
  props: ['file']
};
</script>
