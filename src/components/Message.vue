<template>
  <div class="overflow-hidden mb-2">
    <Avatar
      :ipfsHash="isAuthor ? account.meta.avatar : profile.meta.avatar"
      class="mx-2"
      :class="isAuthor ? 'float-right' : 'float-left'"
    />
    <div class="px-3 py-2 bg-gray-dark rounded-2 d-inline-block" :class="isAuthor && 'float-right'">
      {{ message.body }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['message', 'profile'],
  data() {
    return {
      account: this.$store.state.settings.account
    };
  },
  computed: {
    isAuthor() {
      return this.message.sender === this.account.id;
    }
  }
};
</script>
