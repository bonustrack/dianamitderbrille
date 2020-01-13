<template>
  <div class="d-flex pt-4">
    <div><Avatar class="mr-3" :ipfsHash="accountMeta.avatar" /></div>
    <div class="d-flex flex-column flex-auto">
      <textarea
        class="form-control flex-auto width-full mb-2"
        placeholder="Compose new post..."
        rows="1"
      />
      <img v-if="file" :src="`https://gateway.pinata.cloud/ipfs/${file}`" class="width-fit" />
      <div class="d-flex mb-2">
        <Upload v-model="file" class="p-3">
          <div class="iconfont iconimage overflow-hidden" />
        </Upload>
        <div class="flex-auto text-right py-2">
          <button class="btn-mktg" @click="handleSubmit">Post</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null
    };
  },
  watch: {
    file(value, oldValue) {
      console.log(value);
    }
  },
  computed: {
    accountMeta() {
      return this.$store.state.settings.account.meta;
    }
  },
  methods: {
    handleSubmit() {
      console.log(this.file);
    }
  }
};
</script>
