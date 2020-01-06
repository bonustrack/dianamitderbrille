<template>
  <div id="app">
    <Nav/>
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
