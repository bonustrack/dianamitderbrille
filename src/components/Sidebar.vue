<template>
  <div id="sidebar" class="position-fixed py-lg-4">
    <ul class="list-style-none border-top border-lg-top-0 text-center text-lg-left">
      <li class="col-3 col-lg-12">
        <router-link to="/dianamitderbrille" class="p-3 d-block">
          <i class="iconfont iconhome" />
          <span class="hide-sm hide-md hide-lg ml-3">Home</span>
        </router-link>
      </li>
      <li class="col-3 col-lg-12">
        <router-link to="/write" class="p-3 d-block">
          <i class="iconfont iconpen" />
          <span class="hide-sm hide-md hide-lg ml-3">New post</span>
        </router-link>
      </li>
      <li class="col-3 col-lg-12">
        <router-link to="/messages" class="p-3 d-block">
          <i class="iconfont iconmessage" />
          <span class="hide-sm hide-md hide-lg ml-3">Messages</span>
        </router-link>
      </li>
      <li class="col-3 col-lg-12">
        <router-link :to="`/${account.username}`" class="p-3 d-block">
          <i class="iconfont iconuser" />
          <span class="hide-sm hide-md hide-lg ml-3">Profile</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        account: this.$store.state.settings.account
      };
    },
  };
</script>

<style lang="scss">
@import '../vars.scss';

#sidebar {
  font-family: $font-mktg;
  width: 260px;

  a {
    color: $color;

    &.router-link-exact-active {
      color: white;
    }
  }

  @media (max-width: 1012px - 1) {
    background-color: $bg-color;
    width: auto;
    left: 0;
    right: 0;
    bottom: 0;

    ul {
      display: flex;
    }
  }
}
</style>
