<template>
  <div>
    <Cover :username="account.username" :meta="account.meta" class="border-bottom" />
    <form @submit.prevent="handleSubmit" class="p-4">
      <dl class="form-group">
        <dt><label for="name">Name</label></dt>
        <input
          id="name"
          class="form-control input-lg input-block"
          type="text"
          :value="account.meta.name"
        />
      </dl>
      <dl class="form-group">
        <dt><label for="bio">Bio</label></dt>
        <textarea id="bio" class="form-control input-lg input-block" />
      </dl>
      <dl class="flash flash-error" v-if="error" v-text="error" />
      <div class="form-actions pt-4">
        <button type="submit" class="btn-mktg" :disabled="isLoading">
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: false,
      form: {},
      isLoading: false,
      account: this.$store.state.settings.account
    };
  },
  methods: {
    handleSubmit() {}
  }
};
</script>
