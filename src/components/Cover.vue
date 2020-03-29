<template>
  <div class="border-bottom">
    <VueLoadingIndicator v-if="!profile" class="p-4" />
    <div class="position-relative" v-else>
      <div
        class="cover text-center width-full bg-gray-dark position-relative"
        style="height: 240px;"
        :style="cover && `background-image: url('https://gateway.pinata.cloud/ipfs/${cover}')`"
      >
        <Upload
          v-if="editable"
          v-model="coverUpload"
          @isLoading="setUploadCoverLoading"
          class="position-absolute left-0 width-full height-full bg-shadow"
          :class="!coverUploadIsLoading && 'show-on-hover'"
        >
          <div class="pt-10">
            <span class="btn-outline-mktg">
              <Icon name="image" class="mr-2" />
              Upload cover image
            </span>
          </div>
        </Upload>
      </div>
      <router-link
        v-if="username === account.username && !editable"
        to="/profile"
        class="btn-outline-mktg float-right m-4 position-absolute position-sm-static top-0 right-0"
      >
        <Icon name="settings" class="mr-2" />
        Edit profile
      </router-link>
      <div
        class="d-flex flex-column flex-sm-row p-4 text-center text-sm-left"
        style="margin-top: -64px;"
      >
        <div>
          <div class="mx-auto mx-sm-0 position-relative mb-4">
            <Upload
              v-if="editable"
              v-model="avatarUpload"
              @isLoading="setUploadAvatarLoading"
              class="circle position-absolute text-center text-white bg-shadow"
              :class="!avatarUploadIsLoading && 'show-on-hover'"
              style="height: 128px; width: 128px;"
            >
              <div class="pt-7">
                <Icon name="image" class="text-white mt-7" style="font-size: 32px;" />
              </div>
            </Upload>
            <Avatar :ipfsHash="avatar" :size="128" />
          </div>
        </div>
        <div class="mt-sm-8 ml-sm-3">
          <div class="text-white">
            <h3 v-text="profile.meta.name" class="d-inline-block" />
            <Icon
              v-if="profile.meta.is_verified"
              name="check"
              class="text-primary d-inline-block ml-2"
            />
          </div>
          <p>
            <router-link :to="`/${username}`"> @{{ username }} </router-link>
          </p>
          <p v-text="profile.meta.about" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['username', 'editable'],
  data() {
    return {
      account: this.$store.state.settings.account,
      coverUpload: false,
      coverUploadIsLoading: false,
      avatarUpload: false,
      avatarUploadIsLoading: false
    };
  },
  watch: {
    coverUpload(value, oldValue) {
      if (value !== oldValue && value.ipfs_hash) this.$emit('cover', value.ipfs_hash);
    },
    avatarUpload(value, oldValue) {
      if (value !== oldValue && value.ipfs_hash) this.$emit('avatar', value.ipfs_hash);
    }
  },
  computed: {
    profile() {
      return this.$store.state.settings.profiles[this.username];
    },
    cover() {
      return this.coverUpload ? this.coverUpload.ipfs_hash : this.profile.meta.cover;
    },
    avatar() {
      return this.avatarUpload ? this.avatarUpload.ipfs_hash : this.profile.meta.avatar;
    }
  },
  created() {
    if (!this.profile) this.$store.dispatch('getProfile', this.username);
  },
  methods: {
    setUploadCoverLoading(isLoading) {
      this.coverUploadIsLoading = isLoading;
    },
    setUploadAvatarLoading(isLoading) {
      this.avatarUploadIsLoading = isLoading;
    }
  }
};
</script>

<style scoped lang="scss">
.cover {
  background-size: cover;
  background-position: center;
}

.show-on-hover {
  opacity: 0;

  &:hover {
    opacity: 1;
  }
}

.bg-shadow {
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
