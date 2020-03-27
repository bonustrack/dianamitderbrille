<template>
  <div>
    <h2 class="p-4 border-bottom mb-0" v-text="$t('wallet')" />
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
            >
              $
            </span>
            <input
              type="number"
              class="form-control rounded-left-0 pl-0"
              placeholder="0.00"
              step="0.01"
              min="5"
              v-model="amount"
            />
          </div>
        </div>
        <div ref="paypal" />
        <template v-if="enablePaysafe">
          <button
            class="btn-mktg btn-block border-0"
            style="background-color: #2c2241;"
            @click="paysafeCheckout()"
          >
            <Icon name="paysafe" style="font-size: 18px;" />
          </button>
        </template>
      </div>
    </div>
    <div class="pb-6">
      <h3 class="px-4 pt-4">Payments</h3>
      <div class="px-4 py-3 border-bottom">
        <span class="float-right">Amount</span>
        Designation
      </div>
      <div class="px-4 py-3 border-bottom" v-for="payment in payments" :key="payment.id">
        <span :class="payment.receiver === account.id && 'text-green'" class="float-right">
          <span v-if="payment.receiver === account.id" v-text="'+'" /><span v-else v-text="'-'" />{{
            $n(payment.amount, 'currency')
          }}
        </span>
        {{ payment.memo }}
      </div>
      <VueLoadingIndicator v-if="isLoading" class="p-4" />
    </div>
  </div>
</template>

<script>
import client from '@/helpers/client';
import { name } from '@/../package.json';

export default {
  data() {
    return {
      enablePaysafe: false,
      account: this.$store.state.settings.account,
      amount: '',
      balance: false,
      payments: false,
      isLoading: false
    };
  },
  async created() {
    this.load();
  },
  mounted: function() {
    this.initPaypal();
    this.initPaysafe();
  },
  methods: {
    async load() {
      this.payments = false;
      this.isLoading = true;
      this.payments = await client.request('payments');
      this.balance = await client.request('balance');
      this.isLoading = false;
    },
    initPaypal() {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.VUE_APP_PAYPAL_CLIENT_ID}&disable-funding=credit,card`;
      script.addEventListener('load', this.initPaypalButton);
      document.body.appendChild(script);
    },
    initPaypalButton() {
      window.paypal
        .Buttons({
          style: { shape: 'pill', color: 'blue' },
          createOrder: this.paypalCreateOrder,
          onApprove: this.paypalOnApprove,
          onError: err => console.log(err)
        })
        .render(this.$refs.paypal);
    },
    paypalCreateOrder(data, actions) {
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
    async paypalOnApprove(data, actions) {
      const order = await actions.order.capture();
      console.log(order);
      this.isLoading = true;
      this.amount = '';
      this.balance = false;
      this.payments = false;
      try {
        await client.request('paypal/verify', { order_id: order.id });
        this.load();
      } catch (e) {
        console.log(e);
      }
    },
    initPaysafe() {
      const script = document.createElement('script');
      script.src = 'https://hosted.paysafe.com/checkout/v1/latest/paysafe.checkout.min.js';
      document.body.appendChild(script);
    },
    paysafeCheckout() {
      const amount = parseFloat(this.amount).toFixed(2) * 100;
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
        this.paysafeOnApprove
      );
    },
    async paysafeOnApprove(instance, error, result) {
      const amount = parseFloat(this.amount).toFixed(2) * 100;
      this.isLoading = true;
      this.amount = '';
      this.balance = false;
      this.payments = false;
      try {
        await client.request('paysafe/verify', { token: result.token, amount });
        this.load();
        instance.showSuccessScreen();
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
