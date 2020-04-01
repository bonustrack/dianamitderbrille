<template>
  <div>
    <VueLoadingIndicator v-if="isLoading" class="p-4" />
    <div v-else-if="isVisible && isLoaded">
      <Story v-for="(item, i) in items" :key="i" :item="item" />
    </div>
    <Plans class="p-4" v-else />
  </div>
</template>

<script>
import client from '@/helpers/client';

export default {
  props: ['username'],
  data() {
    return {
      items: false,
      isLoaded: false,
      isLoading: false
    };
  },
  computed: {
    isVisible() {
      const username = this.$store.state.settings.account.username;
      return !!(
        this.$store.state.settings.subscriptions.includes(this.username) ||
        this.username === username
      );
    }
  },
  async mounted() {
    if (this.isVisible) {
      this.isLoading = true;
      this.items = await client.request('get_stories', this.username);
      this.isLoading = false;
      this.isLoaded = true;
    }
  }
};
</script>
