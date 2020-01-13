<template>
  <div class="d-flex border-bottom py-5">
    <div>
      <Avatar v-if="accountMeta.avatar" :ipfsHash="accountMeta.avatar" class="mr-3" />
    </div>
    <div class="flex-auto">
      <p>
        <span class="text-white mr-2">Diana Tamara Höfler</span>
        <small>@{{ item.username }} 1d</small>
      </p>
      <IpfsImage class="avatar width-full mb-4" width="660" height="660" :ipfsHash="item.image" />
      <p v-text="item.body" />
      <i class="iconfont iconlove mr-3" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  computed: {
    accountMeta() {
      return this.$store.state.settings.account.meta;
    }
  }
};
</script>
