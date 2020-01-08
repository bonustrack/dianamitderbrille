<template>
  <div id="nav" class="position-fixed py-4" style="width: 260px;">
    <ul class="list-style-none border-top border-left">
      <li class="border-bottom">
        <router-link to="/home" class="p-3 d-block text-white">
          <i class="iconfont iconhome mr-2" /> Home
        </router-link>
      </li>
      <li class="border-bottom">
        <router-link to="/messages" class="p-3 d-block text-white">
          <i class="iconfont iconmessage mr-2" /> Messages
        </router-link>
      </li>
      <li class="border-bottom">
        <router-link to="/account" class="p-3 d-block text-white">
          <i class="iconfont iconuser mr-2" /> Account
        </router-link>
      </li>
    </ul>
  </div>
</template>
