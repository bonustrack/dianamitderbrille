<template>
  <div>
    <div class="cover text-center width-full bg-gray-dark" style="height: 240px;" :style="`background-image: url('${url}')`"/>
    <router-link v-if="username === account.username" to="/account" class="btn-outline-mktg float-right m-4">
      <i class="iconfont iconsettings mr-2"/>
      Edit profile
    </router-link>
    <div class="d-flex p-4" style="margin-top: -64px;">
      <Avatar :ipfsHash="meta.avatar" :size="128" class="mb-4" />
      <div class="mt-8 ml-3">
        <div>
          <h3 v-text="meta.name" class="d-inline-block"/>
          <i class="iconfont iconcheck d-inline-block ml-2"/>
        </div>
        <p>@{{ username }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
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
