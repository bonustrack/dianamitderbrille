<template>
  <div>
    <h2 class="p-4 border-bottom mb-0" v-text="$t('settings')" />
    <div>
      <router-link
        to="/wallet"
        class="d-flex border-bottom v-align-middle px-4 py-3"
        v-text="$t('wallet')"
      />
      <a
        @click="logout"
        class="d-flex border-bottom v-align-middle px-4 py-3 text-red"
        v-text="$t('logout')"
      />
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
