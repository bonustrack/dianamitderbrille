<template>
  <div id="app" :class="!isInterface && 'd-flex flex-items-center'">
    <VueLoadingIndicator v-if="isLoading" class="overlay big" />
    <div :class="isInterface ? 'container-lg height-full' : 'width-full'" v-else>
      <Sidebar v-if="isInterface" />
      <router-view
        :id="isInterface && 'content'"
        :class="isInterface && 'border-lg-left border-lg-right'"
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
    this.$store.dispatch('init');
  }
};
</script>

<style lang="scss">
#content {
  min-height: 100vh;
  padding-bottom: 63px;

  @media (min-width: 1012px) {
    margin-left: 260px;
  }
}
</style>
