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
      <div class="actions">
        <VueLoadingIndicator v-if="isLoading" class="d-inline-block v-align-middle mr-2" />
        <template v-else>
          <a v-if="!likes.includes(story.id)" @click="handleLike"
            ><Icon name="love" class="mr-2"
          /></a>
          <Icon v-else name="love" class="mr-2 text-red" />
          <span v-if="story.likes + count" v-text="story.likes + count" class="mr-2" />
        </template>
        <Icon name="tip" class="ml-2" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {
      isLoading: false,
      count: 0
    };
  },
  computed: {
    likes() {
      return this.$store.state.settings.likes;
    },
    story() {
      const story = JSON.parse(JSON.stringify(this.item));
      story.meta = JSON.parse(story.meta);
      story.user_meta = JSON.parse(story.user_meta);
      return story;
    }
  },
  methods: {
    handleLike() {
      this.isLoading = true;
      this.$store.dispatch('like', this.story.id).then(() => {
        this.count = 1;
        this.isLoading = false;
      });
    }
  }
};
</script>
<style scoped lang="scss">
@import '../vars.scss';

.actions {
  a {
    color: $color;

    :hover {
      color: $primary;
    }
  }
}
</style>
