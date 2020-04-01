<template>
  <Modal :open="open" @close="$emit('close')">
    <form v-if="plan" @submit.prevent="handleSubmit" class="px-4 py-6 text-center overflow-y-auto">
      <h2 class="mb-4" v-text="$t('Subscribe')" />
      <h4 class="mb-2">
        <span v-if="plan.duration > 30" v-text="`${plan.duration / 30} months`" />
        <span v-else v-text="`${plan.duration} days`" />
      </h4>
      <h1 v-text="$n(plan.price, 'currency')" class="mb-4" />
      <div class="v-align-middle mb-4">
        <button type="submit" class="btn-mktg" :disabled="isLoading" v-text="$t('Subscribe')" />
      </div>
    </form>
  </Modal>
</template>

<script>
import client from '@/helpers/client';
import plans from '@/helpers/plans';

export default {
  props: ['open', 'planId'],
  data() {
    return {
      account: this.$store.state.settings.account,
      balance: false,
      isLoading: false
    };
  },
  computed: {
    plan() {
      return plans[this.planId];
    }
  },
  async mounted() {
    if (this.account) this.balance = (await client.request('get_balance')).toFixed(2);
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true;
      if (this.balance < this.plan.price) return this.$router.push('/wallet');
      try {
        await client.request('subscribe', { plan_id: this.planId });
        this.$store.dispatch('init').then(() => {
          this.$store.dispatch('notify', `You've successfully subscribed`);
        });
      } catch (e) {
        this.$store.dispatch('notify', { type: 'error', message: 'Ooops, something went wrong' });
      }
      this.$emit('close');
      this.isLoading = false;
    }
  }
};
</script>
