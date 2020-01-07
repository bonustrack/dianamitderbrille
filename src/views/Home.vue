<template>
  <div class="text-center">
    <h1>[Landing page]</h1>
  </div>
</template>

<script>
export default {
  created() {
    if (this.$store.state.settings.isAuthenticated) {
      this.$router.push('/feed');
    }
  }
};
</script>
