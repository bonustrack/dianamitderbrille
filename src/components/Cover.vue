<template>
  <div>
    <div
      class="cover text-center width-full bg-gray-dark"
      style="height: 240px;"
      :style="`background-image: url('${url}')`"
    />
    <router-link
      v-if="username === account.username"
      to="/profile"
      class="btn-outline-mktg float-right m-4"
    >
      <Icon name="settings" class="mr-2" />
      Edit profile
    </router-link>
    <div class="d-flex p-4" style="margin-top: -64px;">
      <Avatar :ipfsHash="meta.avatar" :size="128" class="mb-4" />
      <div class="mt-8 ml-3">
        <div class="text-white">
          <h3 v-text="meta.name" class="d-inline-block" />
          <Icon v-if="meta.is_verified" name="check" class="d-inline-block ml-2" />
        </div>
        <p>@{{ username }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cover {
  background-size: cover;
  background-position: center;
}
</style>

<script>
export default {
  props: ['username', 'meta'],
  data() {
    return {
      account: this.$store.state.settings.account,
      url: `https://steemitimages.com/960x960/https://gateway.pinata.cloud/ipfs/${this.meta.cover}`
    };
  }
};
</script>
