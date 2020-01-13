<template>
  <div class="cover p-responsive">
    <Avatar v-if="accountMeta.avatar" :ipfsHash="accountMeta.avatar" size="128" class="py-8" />
  </div>
</template>

<style lang="scss">
.cover {
  background-image: url('https://cdn2.onlyfans.com/files/k/kj/kj0/kj0yuzrkvdxjagp8cyjqsk4pfmzg4i9e1578834515/header.jpg?Expires=1610422079&Signature=M2vVm4fhy4aNznwf3k7Y-o2uVuuy7yJuoyEnwQoSn9wG-VQDV02F7oDdLIFp6mSYmOzpj-tq5LwmSOlkTtZWBMIyd25L~pkZs5q~9MnszLKG8hi~VEQnqHUoByxwaWVjuCR0ALsLp1k479O~cDARYjoIU6uwr506bxuEi8kzsA8yP3vUC5OWzVIkFhleK2vjCuibPAIotEpL7l6cD7GpWWdc5ReohAnV3gheUKibeY9IARFny8yqisnOVddEHEUVnlvt2QXPnTWUQf5qXRb403isCiSAIPy-tBVzMzaYRhNrkqVQ7UUJRH~oJPKPCo5nAN6Y19EwSN444noV9T-2yQ__&Key-Pair-Id=APKAJKLR6VB3PTZVDEBA');
  background-size: cover;
  background-position: center;
}
</style>

<script>
export default {
  props: ['item'],
  computed: {
    accountMeta() {
      return this.$store.state.settings.account.meta;
    }
  }
};
</script>
