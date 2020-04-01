<template>
  <div>
    <div v-if="back" class="p-4 text-center border-bottom position-relative">
      <router-link
        :to="back"
        class="iconfont iconback p-4 position-absolute left-0 top-0 text-gray"
      />
      <span class="text-white" v-text="title" />
    </div>
    <h2 v-else class="p-4 border-bottom mb-0" v-text="title" />
  </div>
</template>

<script>
export default {
  props: ['title', 'back']
};
</script>
