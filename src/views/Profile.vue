<template>
  <div class="pb-8">
    <VueLoadingIndicator v-if="isLoading" class="p-4"/>
    <div v-else>
      <Cover :username="username" :meta="meta" class="border-bottom" />
      <Story v-for="(item, i) in items" :key="i" :item="item" />
    </div>
  </div>
</template>

<script>
import client from '@/helpers/client';

export default {
  data() {
    return {
      profile: false,
      items: false,
      isLoading: false
    };
  },
  watch: {
    username (value, old) {
      if (value !== old) this.loadFeed();
    }
  },
  computed: {
    username() {
      return this.$route.params.username;
    }
  },
  created() {
    this.loadFeed();
  },
  methods: {
    async loadFeed() {
      this.isLoading = true;
      this.profile = await client.request(this.username);
      this.meta = JSON.parse(this.profile.meta);
      this.items = await client.request(`${this.username}/stories`);
      this.isLoading = false;
    }
  }
};
</script>
