<template>
  <div>
    <Write class="border-bottom" />
    <Story v-for="(item, i) in items" :key="i" :item="item" />
  </div>
</template>

<script>
export default {
  computed: {
    items() {
      return this.$store.state.settings.timeline;
    }
  }
};
</script>
