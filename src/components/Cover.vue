<template>
  <div class="border-bottom">
    <VueLoadingIndicator v-if="!profile" class="p-4" />
    <div v-else>
      <div
        class="cover text-center width-full bg-gray-dark"
        style="height: 240px;"
        :style="url && `background-image: url('${url}')`"
      />
      <router-link
        v-if="username === account.username"
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
        <div class="mx-auto mx-sm-0">
          <Avatar :ipfsHash="profile.meta.avatar" :size="128" class="mb-4" />
        </div>
        <div class="mt-sm-8 ml-sm-3">
          <div class="text-white">
            <h3 v-text="profile.meta.name" class="d-inline-block" />
            <Icon v-if="profile.meta.is_verified" name="check" class="d-inline-block ml-2" />
          </div>
          <p>@{{ username }}</p>
          <p v-text="profile.meta.about" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { has } from 'lodash';

export default {
  props: ['username'],
  data() {
    return {
      account: this.$store.state.settings.account
    };
  },
  computed: {
    profile() {
      return this.$store.state.settings.profiles[this.username];
    },
    url() {
      if (!has(this.profile, 'meta.cover')) return;
      return `https://steemitimages.com/960x960/https://gateway.pinata.cloud/ipfs/${this.profile.meta.cover}`;
    }
  },
  created() {
    if (!this.profile) this.$store.dispatch('getProfile', this.username);
  }
};
</script>

<style scoped lang="scss">
.cover {
  background-size: cover;
  background-position: center;
}
</style>
