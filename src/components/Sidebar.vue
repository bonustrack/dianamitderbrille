<template>
  <div id="sidebar" class="position-fixed py-lg-4">
    <ul class="list-style-none border-top border-lg-top-0 text-center text-lg-left">
      <li class="col-3 col-lg-12">
        <router-link :to="`/${model}`" class="p-3 d-block">
          <Icon name="home" />
          <span class="hide-sm hide-md hide-lg ml-3" v-text="$t('home')" />
        </router-link>
      </li>
      <li class="col-3 col-lg-12" v-if="account.username === model">
        <router-link to="/write" class="p-3 d-block">
          <Icon name="pen" />
          <span class="hide-sm hide-md hide-lg ml-3">New post</span>
        </router-link>
      </li>
      <li class="col-3 col-lg-12">
        <router-link to="/messages" class="p-3 d-block">
          <Icon name="message" />
          <span class="hide-sm hide-md hide-lg ml-3" v-text="$t('messages')" />
        </router-link>
      </li>
      <li class="col-3 col-lg-12" v-if="account.username !== model">
        <router-link :to="`/${account.username}`" class="p-3 d-block">
          <Icon name="user" />
          <span class="hide-sm hide-md hide-lg ml-3" v-text="$t('profile')" />
        </router-link>
      </li>
      <li class="col-3 col-lg-12">
        <router-link to="/settings" class="p-3 d-block">
          <Icon name="settings" />
          <span class="hide-sm hide-md hide-lg ml-3" v-text="$t('settings')" />
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import pkg from '@/../package.json';

export default {
  data() {
    return {
      model: pkg.name,
      account: this.$store.state.settings.account
    };
  }
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
