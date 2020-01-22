<template>
  <div>
    <h1>Billing</h1>
    <div id="paypal-button-container" />
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
