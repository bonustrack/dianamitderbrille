<template>
  <div class="overflow-hidden d-flex flex-column" style="height: 100vh;">
    <VueLoadingIndicator v-if="!profile" class="p-4 border-bottom" />
    <template v-else>
      <div class="p-4 text-center border-bottom position-relative">
        <router-link
          to="/messages"
          class="iconfont iconback p-4 position-absolute left-0 top-0 text-gray"
        />
        <span class="text-white" v-text="profile.meta.name" />
      </div>
      <div class="p-4 flex-auto overflow-y-auto">
        <VueLoadingIndicator v-if="messages === undefined" class="p-4" />
        <Message :profile="profile" v-for="(message, i) in messages" :message="message" :key="i" />
      </div>
      <form @submit.prevent="handleSubmit" class="border-top p-4">
        <File v-if="file" :file="file" @delete="file = false" />
        <div class="d-flex">
          <Upload v-model="file" class="p-0 mr-2">
            <Icon name="image" class="btn-outline-mktg p-0" />
          </Upload>
          <a><Icon name="tip" class="btn-outline-mktg mr-2 px-0"/></a>
          <input
            type="text"
            class="form-control width-full"
            placeholder="Type a message"
            v-model="form.body"
          />
          <button class="btn-mktg ml-2 px-4" type="submit" :disabled="isLoading">
            <Icon name="send" />
          </button>
        </div>
      </form>
    </template>
  </div>
</template>

<script>
import kbyte from '@/helpers/kbyte';

export default {
  data() {
    return {
      file: false,
      isLoading: false,
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
      const values = JSON.parse(JSON.stringify(this.form));
      values.meta = this.file
        ? JSON.stringify({ files: [this.file.ipfs_hash] })
        : JSON.stringify({});
      values.username = this.username;
      this.form.body = '';
      this.file = false;
      try {
        await kbyte.requestAsync('send', values);
        this.isLoading = false;
      } catch (error) {
        this.error = error;
        this.isLoading = false;
      }
    }
  }
};
</script>
