<template>
  <div class="container-sm p-responsive">
    <h1 class="text-center">Sign up</h1>
    <form @submit.prevent="handleSubmit" style="max-width: 320px;" class="mx-auto">
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
      <dl class="form-group">
        <input
          class="form-control input-lg input-block"
          type="text"
          placeholder="Name"
          v-model="form.name"
        />
      </dl>
      <dl class="flash flash-error" v-if="error" v-text="error" />
      <div class="form-actions">
        <button type="submit" class="btn btn-primary btn-block" :disabled="isLoading">
          Sign up
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import client from '@/helpers/client';
import { signup } from '@/helpers/schemas';

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
        const values = await signup.validateAsync(this.form);
        this.error = '';
        this.submit(values);
      } catch (err) {
        this.error = err.details[0].message;
        this.isLoading = false;
      }
    },
    async submit(values) {
      try {
        await client.request('signup', values);
        this.isLoading = false;
      } catch (err) {
        this.error = err;
        this.isLoading = false;
      }
    }
  }
};
</script>
