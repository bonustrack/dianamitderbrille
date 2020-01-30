<template>
  <div class="pb-8">
    <VueLoadingIndicator v-if="isLoading || !isLoaded || !profile" class="p-4" />
    <div v-else>
      <Cover :username="username" :meta="profile.meta" class="border-bottom" />
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
      isLoaded: false,
      isLoading: false
    };
  },
  watch: {
    $route(to, from) {
      this.profile = false;
      this.items = false;
      this.isLoaded = false;
      this.loadFeed();
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
      this.profile = false;
      this.items = false;
      this.isLoading = true;
      this.profile = await client.request(this.username);
      this.profile.meta = JSON.parse(this.profile.meta);
      this.items = await client.request(`${this.username}/stories`);
      this.isLoaded = true;
      this.isLoading = false;
    }
  }
};
</script>
