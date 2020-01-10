<template>
  <div>
    <div class="border-bottom d-flex">
      <div class="ml-5">
        <Avatar class="mr-3" />
      </div>
      <div class="d-flex flex-column flex-auto">
        <textarea
          class="form-control flex-auto width-full mb-0"
          style="height: 64px;"
          placeholder="Compose new post..."
        />
        <div class="d-flex ove">
          <Upload v-model="file" class="p-3 border-right">
            <div class="iconfont iconimage overflow-hidden" />
          </Upload>
          <div class="flex-auto text-right py-2 px-4">
            <button class="btn btn-primary" @click="handleSubmit">Post</button>
          </div>
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
  methods: {
    handleSubmit() {
      console.log(this.file);
    }
  }
};
</script>
