<template>
  <div>
    <h2 class="p-4 border-bottom mb-0">Wallet</h2>
    <div class="overflow-hidden border-bottom">
      <div class="p-4 col-6 float-left">
        <h3 class="mb-2">Balance</h3>
        <VueLoadingIndicator v-if="balance === false" class="d-inline-block" />
        <h1 v-else v-text="$n(balance, 'currency')" class="m-0" />
      </div>
      <div class="p-4 col-6 float-left border-left">
        <h3 class="mb-2">Add funds to your wallet</h3>
        <div class="mb-3">
          <div class="d-flex">
            <span
              class="form-control rounded-right-0 pl-4 v-align-bottom pt-3"
              style="width: 50px !important;"
              >$</span
            >
            <input
              type="number"
              class="form-control rounded-left-0 pl-0"
              placeholder="0.00"
              v-model="amount"
            />
          </div>
        </div>
        <div ref="paypal" />
        <button
          class="btn-mktg btn-block border-0"
          style="background-color: #2c2241;"
          @click="paysafe()"
        >
          <Icon name="paysafe" style="font-size: 18px;" />
        </button>
      </div>
    </div>
    <div>
      <h3 class="px-4 pt-4">Payments</h3>
      <div class="px-4 py-3 border-bottom">
        <span class="float-right">Amount</span>
        Designation
      </div>
      <VueLoadingIndicator v-if="isLoading" class="p-4" />
      <div class="px-4 py-3 border-bottom" v-for="payment in payments" :key="payment.id">
        <span class="float-right" v-text="$n(payment.amount, 'currency')" />
        {{ payment.designation }}
      </div>
    </div>
  </div>
</template>

<script>
import client from '@/helpers/client';
import { name } from '@/../package.json';

export default {
  data() {
    return {
      amount: '',
      balance: false,
      payments: false,
      isLoading: false
    };
  },
  async created() {
    this.isLoading = true;
    this.payments = await client.request('payments');
    let balance = 0;
    this.payments.forEach(payment => (balance += payment.amount));
    this.balance = balance;
    this.isLoading = false;
  },
  mounted: function() {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.VUE_APP_PAYPAL_CLIENT_ID}&disable-funding=credit,card`;
    script.addEventListener('load', this.initPaypal);
    document.body.appendChild(script);

    const script2 = document.createElement('script');
    script2.src = 'https://hosted.paysafe.com/checkout/v1/latest/paysafe.checkout.min.js';
    document.body.appendChild(script2);
  },
  methods: {
    initPaypal() {
      window.paypal
        .Buttons({
          style: { shape: 'pill', color: 'blue' },
          createOrder: this.createOrder,
          onApprove: this.onApprove,
          onError: err => console.log(err)
        })
        .render(this.$refs.paypal);
    },
    createOrder(data, actions) {
      const description = 'Deposit';
      const amount = parseFloat(this.amount).toFixed(2);
      const currency = 'USD';
      return actions.order.create({
        purchase_units: [
          {
            description,
            amount: {
              currency_code: currency,
              value: amount
            }
          }
        ]
      });
    },
    async onApprove(data, actions) {
      const order = await actions.order.capture();
      console.log(order);
      try {
        this.payments = await client.request('paypal/verify', { order_id: order.id });
      } catch (e) {
        console.log(e);
      }
    },
    paysafe() {
      const amount = parseFloat(this.amount).toFixed(2) * 100;
      alert(amount);
      const apiKey = process.env.VUE_APP_PAYSAFE_API_KEY;
      paysafe.checkout.setup(
        apiKey,
        {
          amount,
          currency: 'USD',
          companyName: name,
          environment: 'TEST',
          preferredPaymentMethod: 'cards'
        },
        (instance, error, result) => {
          console.log(result, error);
        }
      );
    }
  }
};
</script>
