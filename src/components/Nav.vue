<template>
  <div id="nav" class="p-responsive d-flex py-4">
    <div class="flex-auto"><router-link to="/">Dianamitderbrille</router-link></div>
    <ul class="d-flex list-style-none" v-if="!$store.state.settings.isAuthenticated">
      <li class="ml-4"><router-link to="/signup">Sign up</router-link></li>
      <li class="ml-4"><router-link to="/login">Log in</router-link></li>
    </ul>
    <ul class="d-flex list-style-none" v-else>
      <li class="ml-4"><router-link to="/account">Account</router-link></li>
      <li class="ml-4"><router-link to="/billing">Billing</router-link></li>
      <li class="ml-4"><a @click="logout">Log out</a></li>
    </ul>
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
