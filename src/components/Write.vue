<template>
  <div class="border-bottom d-flex">
    <Upload v-model="file" class="p-4 border-right">
      <div class="iconfont iconimage overflow-hidden" />
    </Upload>
    <div class="flex-auto text-right py-3 px-4">
      <button class="btn btn-primary" @click="handleSubmit">Post</button>
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
  methods: {
    handleSubmit() {
      console.log(this.file);
    }
  }
};
</script>
