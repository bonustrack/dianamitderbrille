<template>
  <div id="app" class="height-full">
    <VueLoadingIndicator v-if="isLoading" class="overlay big" />
    <div v-else-if="isLight">
      <router-view />
    </div>
    <div class="container-lg p-responsive height-full" v-else>
      <Sidebar />
      <router-view class="border-x height-full" style="margin-left: 260px; min-height: 100vh;" />
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
    isLight() {
      return this.$route.meta.isLight;
    }
  },
  created() {
    this.$store.dispatch('login');
  }
};
</script>
