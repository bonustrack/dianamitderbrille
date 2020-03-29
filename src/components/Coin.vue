<template>
  <img src="~/@/assets/coin.svg" :style="`max-width: ${size || 22}px;`" class="v-align-middle" />
</template>

<script>
export default {
  props: ['size']
};
</script>
