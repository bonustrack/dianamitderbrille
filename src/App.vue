<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
    <ModalDisclaimer :open="showDisclaimer" @close="showDisclaimer = false" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDisclaimer: !localStorage.getItem('approvedDisclaimer')
    };
  }
};
</script>
