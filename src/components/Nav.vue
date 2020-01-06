<template>
  <div id="nav" class="p-responsive d-flex">
    <div class="flex-auto"><router-link to="/">Dianamitderbrille</router-link></div>
    <ul class="d-flex list-style-none" v-if="!$store.state.settings.isAuthenticated">
      <li class="ml-2"><router-link to="/signup">Sign up</router-link></li>
      <li class="ml-2"><router-link to="/login">Log in</router-link></li>
    </ul>
    <ul class="d-flex list-style-none" v-else>
      <li class="ml-2"><router-link to="/feed">Feed</router-link></li>
      <li class="ml-2"><a @click="logout">Log out</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout');
    }
  }
};
</script>
