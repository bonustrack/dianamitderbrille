<template>
  <div id="app" :class="!isInterface && 'd-flex flex-items-center'">
    <div v-if="isLoading" class="overlay big vue-ui-loading-indicator p-6">
      <img
        src="~/@/assets/logo.svg"
        class="anim-pulse mb-6"
        style="max-width: 100%; width: 460px;"
      />
    </div>
    <div :class="isInterface ? 'container-lg height-full' : 'width-full'" v-else>
      <Sidebar v-if="isInterface" :class="isHeadless && 'hide-sm hide-md hide-lg'" />
      <router-view
        :id="isInterface && 'content'"
        :class="{ 'border-lg-left border-lg-right': isInterface, headless: isHeadless }"
      />
    </div>
    <ModalDisclaimer :open="showDisclaimer" @close="showDisclaimer = false" />
    <Notifications />
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
      return !this.$route.meta.light && this.$store.state.settings.isAuthenticated;
    },
    isHeadless() {
      return this.$route.meta.headless && this.$store.state.settings.isAuthenticated;
    }
  },
  created() {
    this.$store.dispatch('init').then(() => {
      const account = this.$store.state.settings.account;
      if (!account || account.username !== 'fabien') {
        document.addEventListener('contextmenu', event => event.preventDefault());
      }
    });
  }
};
</script>

<style lang="scss">
#content {
  min-height: 100vh;
  padding-bottom: 63px;

  &.headless {
    padding-bottom: 0;
  }

  @media (min-width: 1012px) {
    margin-left: 260px;
    padding-bottom: 0;
  }
}
</style>
