<template>
  <div id="app">
    <VueLoadingIndicator v-if="isLoading" class="bg-white overlay big" />
    <template v-else>
      <Nav />
      <router-view class="height-full" />
      <ModalDisclaimer :open="showDisclaimer" @close="showDisclaimer = false" />
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDisclaimer: !localStorage.getItem('approvedDisclaimer')
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.settings.isLoading;
    }
  },
  created() {
    this.$store.dispatch('login');
  }
};
</script>
