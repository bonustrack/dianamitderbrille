<template>
  <div id="app" class="height-full">
    <VueLoadingIndicator v-if="isLoading" class="overlay big" />
    <div v-else-if="isLight">
      <router-view />
    </div>
    <div v-else-if="isAuthenticated" class="container-lg p-responsive height-full">
      <Sidebar />
      <router-view id="content" class="border-lg-left border-lg-right height-full container-lg" />
    </div>
    <ModalDisclaimer :open="showDisclaimer" @close="showDisclaimer = false" />
  </div>
</template>

<script>
import { DISCLAIMER_LOCALSTORAGE_KEY } from '@/helpers/utils';

export default {
  data() {
    return {
      showDisclaimer: !localStorage.getItem(DISCLAIMER_LOCALSTORAGE_KEY)
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.settings.isLoading;
    },
    isAuthenticated() {
      return this.$store.state.settings.isAuthenticated;
    },
    isLight() {
      return this.$route.meta.isLight;
    }
  },
  created() {
    this.$store.dispatch('login');
  }
};
</script>

<style lang="scss">
#content {
  min-height: 100vh;

  @media (min-width: 1012px) {
    margin-left: 260px;
    padding-bottom: 0;
  }
}
</style>
