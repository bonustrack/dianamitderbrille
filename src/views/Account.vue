<template>
  <div class="container-sm p-responsive">
    <h1 class="text-center">Account</h1>
    <div class="mb-4">
      <span>Name</span>
      <h2>{{ account.name }}</h2>
    </div>
    <div class="mb-4">
      <span>Email</span>
      <h2>{{ account.email }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: this.$store.state.settings.account
    };
  }
};
</script>
