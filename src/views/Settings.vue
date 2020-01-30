<template>
  <div>
    <h2 class="p-4 border-bottom mb-0">Settings</h2>
    <div>
      <router-link to="/wallet" class="d-flex border-bottom v-align-middle px-4 py-3">
        Wallet
      </router-link>
      <a @click="logout" class="d-flex border-bottom v-align-middle px-4 py-3 text-red">
        Log out
      </a>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    }
  }
};
</script>
