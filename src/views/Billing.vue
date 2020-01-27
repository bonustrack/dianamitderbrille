<template>
  <div>
    <div class="p-4">
      <h3>Wallet credits</h3>
      <h1 class="mb-4">$0.000</h1>
      <div class="mb-4">
        <h3 class="mb-2">Add funds to your wallet</h3>
        <span class="form-control rounded-right-0 d-inline-block pl-4 v-align-bottom pt-3">$</span>
        <input type="number" class="form-control rounded-left-0 pl-0 mr-2" placeholder="0.00" /><a
          href="#"
          class="btn-mktg"
          >Deposit</a
        >
        <div id="paypal-button-container" />
      </div>
      <h3>Payments</h3>
    </div>
    <div class="border-top">
      <div class="px-4 py-3 border-bottom">
        <span class="float-right">Amount</span>
        Designation
      </div>
      <div class="px-4 py-3 border-bottom">
        <span class="float-right">$29</span>
        Subscription to @dianamitderbrille
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    paypal
      .Buttons({
        createOrder: (data, actions) =>
          actions.order.create({
            purchase_units: [{ amount: { value: '0.01' } }]
          })
      })
      .render('#paypal-button-container');
  }
};
</script>
