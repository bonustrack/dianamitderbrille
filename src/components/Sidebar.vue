<template>
  <div id="sidebar" class="position-fixed py-lg-4">
    <ul class="list-style-none border-top border-lg-left text-center text-lg-left">
      <li class="border-lg-bottom col-4 col-lg-12">
        <router-link to="/home" class="p-3 d-block text-white">
          <i class="iconfont iconhome mr-2" />
          <span class="hide-sm hide-md hide-lg">Home</span>
        </router-link>
      </li>
      <li class="border-lg-bottom col-4 col-lg-12">
        <router-link to="/messages" class="p-3 d-block text-white">
          <i class="iconfont iconmessage mr-2" />
          <span class="hide-sm hide-md hide-lg">Messages</span>
        </router-link>
      </li>
      <li class="border-lg-bottom col-4 col-lg-12">
        <router-link to="/account" class="p-3 d-block text-white">
          <i class="iconfont iconuser mr-2" />
          <span class="hide-sm hide-md hide-lg">Account</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
#sidebar {
  width: 260px;
  background-color: #202225;

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
