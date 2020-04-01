<template>
  <Modal :open="open" @close="$emit('close')">
    <form @submit.prevent="handleSubmit" class="px-4 py-6 text-center overflow-y-auto">
      <h2 class="mb-4">Tip</h2>
      <dl class="form-group text-left">
        <dt>
          <label for="amount">
            Amount
            <span v-if="balance !== false">
              (balance:
              <a @click="amount = balance" v-text="balance" />
              <Coin class="ml-1" />)
            </span>
          </label>
        </dt>
        <input
          id="amount"
          class="form-control input-lg input-block"
          type="number"
          min="1"
          :max="balance"
          placeholder="0.00"
          step="0.01"
          v-model="amount"
        />
      </dl>
      <div class="v-align-middle mb-4">
        <button type="submit" class="btn-mktg" :disabled="isLoading" v-text="'Send'" />
      </div>
    </form>
  </Modal>
</template>

<script>
import client from '@/helpers/kbyte';

export default {
  props: ['open', 'receiver'],
  data() {
    return {
      account: this.$store.state.settings.account,
      amount: '',
      balance: false,
      isLoading: false
    };
  },
  async mounted() {
    this.balance = (await client.requestAsync('get_balance', null)).toFixed(2);
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true;
      const params = {
        receiver: this.receiver,
        amount: parseFloat(this.amount)
      };
      try {
        await client.requestAsync('pay', params);
        this.$store.dispatch('notify', `You've successfully sent a tip`);
      } catch (e) {
        this.$store.dispatch('notify', { type: 'error', message: 'Ooops, something went wrong' });
      }
      this.$emit('close');
      this.isLoading = false;
    }
  }
};
</script>
