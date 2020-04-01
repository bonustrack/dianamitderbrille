<template>
  <div>
    <Cover
      :username="account.username"
      :meta="account.meta"
      :editable="true"
      @cover="setCover"
      @avatar="setAvatar"
      class="border-bottom"
    />
    <form @submit.prevent="handleSubmit" class="p-4">
      <dl class="form-group">
        <dt><label for="name">Name</label></dt>
        <input
          id="name"
          class="form-control input-lg input-block"
          type="text"
          v-model="form.name"
        />
      </dl>
      <dl class="form-group">
        <dt><label for="about">Bio</label></dt>
        <textarea id="about" class="form-control input-lg input-block" v-model="form.about" />
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
import client from '@/helpers/client';

export default {
  data() {
    return {
      error: false,
      form: {},
      isLoading: false,
      account: this.$store.state.settings.account
    };
  },
  mounted() {
    this.form = JSON.parse(JSON.stringify(this.account.meta));
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true;
      try {
        await client.request('edit_profile', this.form);
        await this.$store.dispatch('getProfile', this.account.username);
        this.$store.dispatch('notify', `You've successfully updated your profile`);
        this.$router.push(`/${this.account.username}`);
      } catch (error) {
        this.error = error;
      }
      this.isLoading = false;
    },
    setCover(value) {
      this.form.cover = value;
    },
    setAvatar(value) {
      this.form.avatar = value;
    }
  }
};
</script>
