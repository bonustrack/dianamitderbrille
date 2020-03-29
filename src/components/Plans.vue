<template>
  <div>
    <div class="text-center">
      <a
        v-for="(plan, i) in plans"
        :key="i"
        @click="openModal(i)"
        class="btn-outline-mktg btn-block my-2"
      >
        {{ plan.name }} for {{ $n(plan.price) }} <Coin class="ml-1"/>
      </a>
    </div>
    <ModalSubscribe :open="showModal" @close="showModal = false" :planId="planId" />
  </div>
</template>

<script>
import plans from '@/helpers/plans';

export default {
  data() {
    return {
      plans,
      account: this.$store.state.settings.account,
      showModal: false,
      planId: false
    };
  },
  methods: {
    openModal(planId) {
      if (!this.account) return this.$router.push('/signup');
      this.planId = planId;
      this.showModal = true;
    }
  }
};
</script>
