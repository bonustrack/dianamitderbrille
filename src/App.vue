<template>
  <div id="app" class="height-full">
    <VueLoadingIndicator v-if="isLoading" class="overlay big" />
    <div :class="isInterface && 'container-lg height-full'" v-else>
      <Sidebar v-if="isInterface" />
      <router-view
        :id="isInterface && 'content'"
        :class="isInterface && 'border-lg-left border-lg-right height-full'"
      />
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
    isInterface() {
      return !this.$route.meta.isLight && this.$store.state.settings.isAuthenticated;
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
