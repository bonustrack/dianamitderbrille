import fetch from 'node-fetch';

export function cardPaymentWithToken(paymentToken, merchantRefNum, amount) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${process.env.PAYSAFE_API_KEY}`
  };
  const body = {
    merchantRefNum,
    amount,
    settleWithAuth: true,
    card: { paymentToken },
    billingDetails: {
      street: '100 Queen Street West',
      city: 'Toronto',
      state: 'ON',
      country: 'CA',
      zip: 'M5H 2N2'
    }
  };
  const options = { method: 'POST', headers, body: JSON.stringify(body) };
  const url = `https://api.test.paysafe.com/cardpayments/v1/accounts/${process.env.PAYSAFE_ACCOUNT_ID}/auths`;
  return fetch(url, options).then(res => res.json());
}
