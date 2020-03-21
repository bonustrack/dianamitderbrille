<template>
  <div class="position-fixed left-0 right-0 bottom-0 text-center">
    <div class="m-5">
      <div v-for="(item, key) in items" :key="key">
        <a
          class="flash mt-2 px-4 py-2 box-shadow d-inline-block anim-scale-in"
          :class="`flash-${item.type || 'success'}`"
          v-if="now < item.timestamp + duration && !item.hide"
          @click="item.hide = true"
        >
          {{ item.message }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
const DURATION = 4000;

export default {
  data() {
    return {
      now: Date.now(),
      duration: DURATION
    };
  },
  computed: {
    items() {
      return this.$store.state.notifications.items;
    }
  },
  mounted() {
    setInterval(() => (this.now = Date.now()), 1000);
  }
};
</script>
