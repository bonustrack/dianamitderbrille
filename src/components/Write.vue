<template>
  <div class="d-flex p-4">
    <div class="hide-sm"><Avatar class="mr-3" :ipfsHash="accountMeta.avatar" /></div>
    <form @submit.prevent="handleSubmit" class="d-flex flex-column flex-auto">
      <textarea
        class="form-control flex-auto width-full mb-3"
        placeholder="Compose new post..."
        rows="3"
        v-model="form.body"
      />
      <div v-if="file">
        <div class="position-relative d-inline-block">
          <img
            v-if="file.mimetype.includes('image/')"
            :src="`https://gateway.pinata.cloud/ipfs/${file.ipfs_hash}`"
            class="rounded-2"
            style="max-height: 160px;"
          />
          <a href="#" @click="file = false" class="iconfont icondelete position-absolute top-0 right-0 m-2"/>
        </div>
        <video
          v-if="file.mimetype.includes('video/')"
          :src="`https://gateway.pinata.cloud/ipfs/${file.ipfs_hash}`"
          class="width-full"
          preload="metadata"
          controlslist="nodownload"
          controls
          playsinline
        />
      </div>
      <div class="d-flex">
        <div>
          <Upload v-model="file">
            <i class="btn-outline-mktg iconfont iconimage d-inline-block px-0" />
          </Upload>
        </div>
        <div class="flex-auto text-right">
          <button class="btn-mktg" type="submit" :disabled="isLoading">Post</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import client from '@/helpers/client';

export default {
  data() {
    return {
      file: false,
      error: '',
      form: {
        body: ''
      },
      isLoading: false
    };
  },
  computed: {
    accountMeta() {
      return this.$store.state.settings.account.meta;
    }
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true;
      const values = this.form;
      values.meta = this.file
        ? JSON.stringify({ files: [this.file.ipfs_hash] })
        : JSON.stringify({});
      try {
        await client.request('post', values);
        await this.$store.dispatch('getTimeline');
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
