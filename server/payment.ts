import express from 'express';
import checkout from '@paypal/checkout-server-sdk';
import db from './helpers/db';
import { verify } from './helpers/middleware';
import { uid } from './helpers/utils';
import paypal from './helpers/paypal';
import { cardPaymentWithToken } from './helpers/paysafe';

const router = express.Router();

router.post('/paypal/verify', verify, async (req, res) => {
  const orderId = req.body.order_id;
  let request = new checkout.orders.OrdersGetRequest(orderId);
  let order;
  try {
    order = await paypal.client().execute(request);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
  const amount = parseFloat(order.result.purchase_units[0].amount.value).toFixed(2);
  // @ts-ignore
  if (amount <= 0 || order.result.purchase_units[0].amount.currency_code !== 'USD')
    return res.sendStatus(500);
  const payment = {
    id: uid(),
    user_id: res.locals.id,
    designation: 'Deposit with Paypal',
    amount,
    meta: JSON.stringify(order)
  };
  const query = 'INSERT INTO payments SET ?';
  await db.queryAsync(query, [payment]);
  res.json({ success: true });
});

router.post('/paysafe/verify', verify, async (req, res) => {
  const { token, amount } = req.body;
  let order;
  try {
    order = await cardPaymentWithToken(token, token, parseInt(amount));
    console.log(order);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
  if (order.COMPLETED !== 'USD' && order.status !== 'COMPLETED')
    return res.sendStatus(500);
  const payment = {
    id: uid(),
    user_id: res.locals.id,
    designation: 'Deposit with Paysafe',
    amount: (order.amount / 100).toFixed(2),
    meta: JSON.stringify(order)
  };
  const query = 'INSERT INTO payments SET ?';
  await db.queryAsync(query, [payment]);
  res.json({ success: true });
});

export default router;
