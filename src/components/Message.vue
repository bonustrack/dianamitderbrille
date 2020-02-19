<template>
  <div class="overflow-hidden d-flex mb-2" :class="{ 'flex-row-reverse': isAuthor }">
    <div>
      <Avatar
        :ipfsHash="isAuthor ? account.meta.avatar : profile.meta.avatar"
        class="mx-2"
        :class="isAuthor ? 'float-right' : 'float-left'"
      />
    </div>
    <div class="px-3 py-2 bg-gray-dark rounded-2 d-inline-block" :class="isAuthor && 'float-right'">
      <div v-if="meta.files">
        <IpfsImage
          class="width-full rounded-lg-2 mb-2"
          width="1080"
          height="1080"
          v-for="file in meta.files"
          :key="file"
          :ipfsHash="file"
        />
      </div>
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
    meta() {
      return JSON.parse(this.message.meta);
    },
    isAuthor() {
      return this.message.sender === this.account.id;
    }
  }
};
</script>
