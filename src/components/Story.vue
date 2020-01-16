<template>
  <div class="border-bottom rounded-2 py-4">
    <div class="d-flex px-4 mb-2">
      <div>
        <Avatar :ipfsHash="post.user_meta.avatar" class="mr-3" />
      </div>
      <div class="flex-auto mt-1 mb-2">
        <small class="float-right">{{ post.timestamp | prettyMs }}</small>
        <div class="text-white" style="line-height: 1em !important;">{{ post.user_meta.name }}</div>
        <div>
          <small class="mt-0 pt-0">@{{ post.username }}</small>
        </div>
      </div>
    </div>
    <div class="px-lg-4" v-if="post.meta.files">
      <IpfsImage
        class="width-full rounded-lg-2 mb-2"
        width="1080"
        height="1080"
        v-for="file in post.meta.files"
        :key="file"
        :ipfsHash="file"
      />
    </div>
    <div class="px-4">
      <p v-text="post.body" class="mb-4" />
      <div>
        <i class="iconfont iconlove mr-3" />
        <i class="iconfont icontip mr-3" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  computed: {
    post() {
      const post = JSON.parse(JSON.stringify(this.item));
      post.meta = JSON.parse(post.meta);
      post.user_meta = JSON.parse(post.user_meta);
      return post;
    }
  }
};
</script>
