<template>
  <div id="sidebar" class="position-fixed py-lg-4">
    <ul class="list-style-none border-top border-lg-top-0 text-center text-lg-left">
      <li class="col-3 col-lg-12">
        <router-link to="/home" class="p-3 d-block">
          <i class="iconfont iconhome mr-3" />
          <span class="hide-sm hide-md hide-lg">Home</span>
        </router-link>
      </li>
      <li class="col-3 col-lg-12">
        <router-link to="#messages" class="p-3 d-block">
          <i class="iconfont iconmessage mr-3" />
          <span class="hide-sm hide-md hide-lg">Messages</span>
        </router-link>
      </li>
      <li class="col-3 col-lg-12">
        <router-link to="/account" class="p-3 d-block">
          <i class="iconfont iconuser mr-3" />
          <span class="hide-sm hide-md hide-lg">Account</span>
        </router-link>
      </li>
      <li class="col-3 col-lg-12">
        <router-link to="#wallet" class="p-3 d-block">
          <i class="iconfont iconwallet mr-3" />
          <span class="hide-sm hide-md hide-lg">Wallet</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@import '../vars.scss';

#sidebar {
  font-family: $font-mktg;
  width: 260px;
  background-color: #202225;

  a {
    color: rgba(255, 255, 255, 0.4);

    &.router-link-exact-active {
      color: white;
    }
  }

  @media (max-width: 1012px - 1) {
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
