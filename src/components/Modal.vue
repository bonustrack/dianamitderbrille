<template>
  <div v-if="open" class="modal">
    <div class="backdrop" />
    <div class="shell overflow-hidden container-sm rounded-2">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: ['open']
};
</script>

<style lang="scss">
@import '../vars.scss';

.modal {
  position: fixed;
  display: flex;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  z-index: 9;

  .backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    background: rgba(0, 0, 0, 0.8);
  }

  .shell {
    display: flex;
    flex-direction: column;
    z-index: 999;
    margin: 0 auto;
    width: 100%;
    max-height: 48vh;
    background-color: $bg-color;

    .modal-body {
      overflow-y: scroll;
      overflow-x: hidden;
    }
  }
}
</style>
