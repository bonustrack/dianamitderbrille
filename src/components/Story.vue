<template>
  <div class="border-bottom py-4">
    <div class="d-flex px-4 mb-2">
      <div>
        <Avatar :ipfsHash="story.user_meta.avatar" class="mr-3" />
      </div>
      <div class="flex-auto mt-1 mb-2">
        <small class="float-right">{{ story.timestamp | prettyMs }}</small>
        <div class="text-white" style="line-height: 1em !important;">
          {{ story.user_meta.name }}
          <Icon
            v-if="story.user_meta.is_verified"
            name="check"
            style="font-size: 20px;"
            class="d-inline-block ml-1"
          />
        </div>
        <div>
          <small class="mt-0 pt-0">@{{ story.username }}</small>
        </div>
      </div>
    </div>
    <div class="px-lg-4" v-if="story.meta.files">
      <IpfsImage
        class="width-full rounded-lg-2 mb-2"
        width="1080"
        height="1080"
        v-for="file in story.meta.files"
        :key="file"
        :ipfsHash="file"
      />
    </div>
    <div class="px-4">
      <p v-text="story.body" class="mb-4" />
      <div>
        <a @click="handleLike"><Icon name="love" class="mr-3"/></a>
        <Icon name="tip" class="mr-3" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  computed: {
    story() {
      const story = JSON.parse(JSON.stringify(this.item));
      story.meta = JSON.parse(story.meta);
      story.user_meta = JSON.parse(story.user_meta);
      return story;
    }
  },
  methods: {
    handleLike() {
      this.story.id;
    }
  }
};
</script>
