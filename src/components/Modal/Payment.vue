<template>
  <Modal :open="open" @close="$emit('close')">
    <form @submit.prevent="handleSubmit" class="px-4 py-6 text-center overflow-y-auto">
      <h1 class="mb-4">Tip</h1>
      <dl class="form-group text-left">
        <dt><label for="amount">Amount</label></dt>
        <input id="amount" class="form-control input-lg input-block" type="number" min="5" />
      </dl>
      <div class="v-align-middle mb-4">
        <button type="submit" class="btn-mktg">Send tip</button>
      </div>
    </form>
  </Modal>
</template>

<script>
import { DISCLAIMER_LOCALSTORAGE_KEY } from '@/helpers/utils';

export default {
  props: ['open'],
  methods: {
    handleSubmit() {
      this.$emit('close');
    }
  }
};
</script>
