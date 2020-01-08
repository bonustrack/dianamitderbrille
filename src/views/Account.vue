<template>
  <div class="p-4">
    <h2>Account</h2>
    <div class="mb-4">
      <span>Name</span>
      <h3>{{ account.name }}</h3>
    </div>
    <div class="mb-4">
      <span>Email</span>
      <h3>{{ account.email }}</h3>
    </div>
    <p><router-link to="/billing">Billing</router-link></p>
    <p><a @click="logout" class="text-red">Log out</a></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: this.$store.state.settings.account
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    }
  }
};
</script>
