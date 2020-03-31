<template>
  <div>
    <Top :title="$t('settings')"/>
    <div>
      <router-link
        to="/wallet"
        class="d-flex border-bottom v-align-middle px-4 py-3"
        v-text="$t('wallet')"
      />
      <router-link
        v-if="isVerified"
        to="/subscribers"
        class="d-flex border-bottom v-align-middle px-4 py-3"
        v-text="$t('fans')"
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
  data() {
    return {
      isVerified: !!this.$store.state.settings.account.meta.is_verified
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
