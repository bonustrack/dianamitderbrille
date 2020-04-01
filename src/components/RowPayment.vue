<template>
  <div class="d-flex">
    <router-link :to="`/${isReceiver ? item.sender_username : item.receiver_username}`">
      <Avatar
        :ipfsHash="isReceiver ? item.sender_meta.avatar : item.receiver_meta.avatar"
        class="mr-4"
      />
    </router-link>
    <div class="flex-auto">
      <div class="text-white">
        <div v-if="isReceiver">From {{ item.sender_meta.name || `@${item.sender_username}` }}</div>
        <div v-else>To {{ item.receiver_meta.name || `@${item.receiver_username}` }}</div>
      </div>
      {{ item.memo }}
    </div>
    <div :class="isReceiver && 'text-green'" class="mt-3">
      <span v-if="isReceiver" v-text="'+'" /><span v-else v-text="'-'" />
      {{ $n(item.amount) }}
      <Coin class="ml-1" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {
      account: this.$store.state.settings.account
    };
  },
  computed: {
    isReceiver() {
      return this.item.receiver === this.account.id;
    }
  }
};
</script>
