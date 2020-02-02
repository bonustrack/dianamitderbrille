<template>
  <div class="d-flex flex-column">
    <VueLoadingIndicator v-if="!profile" class="p-4 border-bottom" />
    <template v-else>
      <div class="p-4 text-center border-bottom position-relative">
        <router-link
          to="/messages"
          class="iconfont iconback p-4 position-absolute left-0 top-0 text-gray"
        />
        <span class="text-white" v-text="profile.meta.name" />
      </div>
      <div class="flex-auto" />
      <div class="p-4">
        <VueLoadingIndicator v-if="messages === undefined" class="p-4" />
        <Message :profile="profile" v-for="(message, i) in messages" :message="message" :key="i" />
      </div>
      <form @submit.prevent="handleSubmit" class="p-4 d-flex border-top">
        <a><Icon name="image" class="btn-outline-mktg mr-2 px-0"/></a>
        <a><Icon name="tip" class="btn-outline-mktg mr-2 px-0"/></a>
        <input
          type="text"
          class="form-control width-full"
          placeholder="Type a message"
          v-model="form.body"
        />
        <button class="btn-mktg ml-2 px-4" type="submit"><Icon name="send" /></button>
      </form>
    </template>
  </div>
</template>

<script>
import kbyte from '@/helpers/kbyte';

export default {
  data() {
    return {
      username: this.$route.params.username,
      form: {}
    };
  },
  computed: {
    profile() {
      return this.$store.state.settings.profiles[this.username];
    },
    messages() {
      return this.$store.state.settings.messages[this.username];
    }
  },
  async created() {
    const username = this.username;
    if (!this.profile) await this.$store.dispatch('getProfile', username);
    if (!this.messages) await this.$store.dispatch('getMessages', username);
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true;
      const values = this.form;
      values.meta = this.file
        ? JSON.stringify({ files: [this.file.ipfs_hash] })
        : JSON.stringify({});
      values.username = this.username;
      try {
        await kbyte.requestAsync('send', values);
        this.form.body = '';
        this.file = false;
        this.isLoading = false;
      } catch (error) {
        this.error = error;
        this.isLoading = false;
      }
    }
  }
};
</script>
