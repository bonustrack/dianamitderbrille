<template>
  <Modal :open="open" @close="$emit('close')">
    <form @submit.prevent="handleSubmit" class="p-4 text-center overflow-y-auto">
      <h1 class="mb-4">Are you 18+?</h1>
      <p class="text-left mb-4">
        This website may contain content of an adult nature. If you are easily offended or are under
        the age of 18, please exit now. The posts and pages within are intended for adults only and
        may include scenes of sexual content, suggestive pictures, or graphic violence. Reader
        discretion is advised.
      </p>
      <button type="submit" class="btn-mktg mb-4">Agree</button>
    </form>
  </Modal>
</template>

<script>
export default {
  props: ['open'],
  methods: {
    handleSubmit() {
      localStorage.setItem('approvedDisclaimer', '1');
      this.$emit('close');
    }
  }
};
</script>
