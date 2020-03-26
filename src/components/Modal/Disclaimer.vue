<template>
  <Modal :open="open" @close="$emit('close')">
    <form @submit.prevent="handleSubmit" class="px-4 py-6 text-center overflow-y-auto">
      <h2 class="mb-4">Are you 18+?</h2>
      <p class="text-left mb-4">
        This website may contain content of an adult nature. If you are easily offended or are under
        the age of 18, please exit now. The posts and pages within are intended for adults only and
        may include scenes of sexual content, suggestive pictures, or graphic violence. Reader
        discretion is advised.
      </p>
      <div class="v-align-middle mb-4">
        <a href="https://google.com" class="btn-outline-mktg mr-3">Exit</a>
        <button type="submit" class="btn-mktg">Agree</button>
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
      localStorage.setItem(DISCLAIMER_LOCALSTORAGE_KEY, '1');
      this.$emit('close');
    }
  }
};
</script>
