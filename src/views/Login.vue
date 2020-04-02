<template>
  <div class="container-sm p-responsive">
    <div class="text-center mb-4">
      <img src="~/@/assets/logo.svg" style="max-width: 220px;" />
    </div>
    <h4 class="text-center eyebrow mb-4" v-text="$t('login')" />
    <form @submit.prevent="handleSubmit" style="max-width: 360px;" class="mx-auto">
      <dl class="form-group">
        <input
          class="form-control input-lg input-block"
          type="email"
          placeholder="Email"
          v-model="form.email"
        />
      </dl>
      <dl class="form-group">
        <input
          class="form-control input-lg input-block"
          type="password"
          placeholder="Password"
          v-model="form.password"
        />
      </dl>
      <dl class="flash flash-error" v-if="error" v-text="error" />
      <div class="form-actions">
        <button
          type="submit"
          class="btn-mktg btn-block"
          :disabled="isLoading"
          v-text="$t('login')"
        />
      </div>
      <dl class="form-group text-center">Or, <router-link to="/signup">sign up</router-link></dl>
    </form>
  </div>
</template>

<script>
import client from '@/helpers/client';
import { login } from '@/../common/schemas';
import { TOKEN_LOCALSTORAGE_KEY } from '@/helpers/utils';

export default {
  data() {
    return {
      error: '',
      form: {},
      isLoading: false
    };
  },
  methods: {
    async handleSubmit() {
      try {
        this.isLoading = true;
        const values = await login.validateAsync(this.form);
        this.error = '';
        this.submit(values);
      } catch (error) {
        this.error = error.details[0].message;
        this.isLoading = false;
      }
    },
    async submit(values) {
      try {
        const result = await client.request('login', values);
        localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, result.access_token);
        this.$store.dispatch('init').then(() => {
          const redirect = this.$route.query.redirect;
          this.$router.push(redirect || '/dianamitderbrille');
        });
      } catch (error) {
        this.error = error;
        this.isLoading = false;
      }
    }
  }
};
</script>
