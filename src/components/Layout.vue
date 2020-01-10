<template>
  <div>
    <div class="px-5 pt-4 border-bottom">
      <h2 v-if="title" v-text="title" />
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  props: ['title']
};
</script>
