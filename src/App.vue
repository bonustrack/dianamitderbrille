<template>
  <div>
    <VueLoadingIndicator v-if="isLoading" class="bg-white overlay big" />
    <div id="app" v-else>
      <Nav />
      <router-view />
      <ModalDisclaimer :open="showDisclaimer" @close="showDisclaimer = false" />
    </div>
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
