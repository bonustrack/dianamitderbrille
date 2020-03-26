<template>
  <div>
    <h2 class="p-4 border-bottom mb-0">Fans</h2>
    <div v-if="items !== false">
      <div v-if="items.length === 0" class="d-flex border-bottom v-align-middle p-4 text-white">
        You don't have any fans
      </div>
      <div v-else>
        <h3 class="p-4 border-bottom mb-0">Active ({{ items.length }})</h3>
        <router-link
          class="d-flex border-bottom v-align-middle p-4"
          v-for="(item, i) in items"
          :key="i"
          :to="`/${item.username}`"
        >
          <Avatar :ipfsHash="item.user_meta.avatar" class="mr-4" />
          <div>
            <div class="text-white" v-text="item.user_meta.name" />
            <div class="text-gray">
              Started {{ item.created | prettyMs }}
              <template v-if="item.expired"> expire {{ item.expired | prettyMs }} </template>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <VueLoadingIndicator v-else class="p-4" />
  </div>
</template>

<script>
export default {
  computed: {
    items() {
      return this.$store.state.settings.subscribers;
    }
  },
  async created() {
    if (!this.items) await this.$store.dispatch('getSubscribers');
  }
};
</script>
