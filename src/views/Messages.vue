<template>
  <div class="d-flex flex-column">
    <VueLoadingIndicator v-if="!profile" class="p-4 border-bottom" />
    <div v-else class="p-4 text-center border-bottom position-relative">
      <router-link
        to="/messages"
        class="iconfont iconback p-4 position-absolute left-0 top-0 text-gray"
      />
      {{ profile.meta.name }}
    </div>
    <div class="flex-auto" />
    <div class="p-4">
      <div class="overflow-hidden mb-2" v-for="(message, i) in messages" :key="i">
        <Avatar
          class="mx-2"
          :class="message.receiver === account.id ? 'float-right' : 'float-left'"
        />
        <div
          class="px-3 py-2 bg-gray-dark rounded-2 d-inline-block"
          :class="message.receiver === account.id && 'float-right'"
        >
          {{ message.body }}
        </div>
      </div>
      <VueLoadingIndicator v-if="isLoading" class="p-4" />
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
      <a><Icon name="send" class="btn-mktg ml-2 px-0"/></a>
    </form>
  </div>
</template>

<script>
import kbyte from '@/helpers/kbyte';

export default {
  data() {
    return {
      account: this.$store.state.settings.account,
      messages: false,
      form: {
        username: this.$route.params.username
      },
      isLoading: false
    };
  },
  computed: {
    profile() {
      return this.$store.state.settings.profiles[this.form.username];
    }
  },
  created() {
    if (!this.profile) this.$store.dispatch('getProfile', this.form.username);
    this.isLoading = true;
    kbyte.requestAsync('get_messages', this.username).then(result => {
      this.messages = result;
      this.isLoading = false;
    });
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true;
      const values = this.form;
      values.meta = this.file
        ? JSON.stringify({ files: [this.file.ipfs_hash] })
        : JSON.stringify({});
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
