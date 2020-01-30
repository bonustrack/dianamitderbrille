<template>
  <div>
    <h2 class="p-4 border-bottom mb-0">Wallet</h2>
    <div class="p-4">
      <div class="mb-4">
        <h3 class="mb-2">Add funds to your wallet</h3>
        <div class="d-flex">
          <span
            class="form-control rounded-right-0 pl-4 v-align-bottom pt-3"
            style="width: 50px !important;"
            >$</span
          >
          <input type="number" class="form-control rounded-left-0 pl-0 mr-2" placeholder="0.00" />
          <a href="#" class="btn-mktg">Deposit</a>
        </div>
      </div>
      <h3>Payments</h3>
    </div>
    <div class="border-top">
      <div class="px-4 py-3 border-bottom">
        <span class="float-right">Amount</span>
        Designation
      </div>
      <VueLoadingIndicator v-if="isLoading" class="p-4" />
      <div class="px-4 py-3 border-bottom" v-for="payment in payments" :key="payment.id">
        <span class="float-right">{{ payment.amount }}</span>
        {{ payment.designation }}
      </div>
    </div>
  </div>
</template>

<script>
import client from '@/helpers/client';

export default {
  data() {
    return {
      payments: false,
      isLoading: false
    };
  },
  async created() {
    this.isLoading = true;
    this.payments = await client.request('payments');
    this.isLoading = false;
  }
};
</script>
