import express from 'express';
import checkout from '@paypal/checkout-server-sdk';
import db from './helpers/db';
import { verify } from './helpers/middleware';
import paypal from './helpers/paypal';
import { cardPaymentWithToken } from './helpers/paysafe';
import { uid, getBalance } from './helpers/utils';

const router = express.Router();

router.post('/payment', verify, async (req, res) => {
  const receiver = req.body.receiver;
  const amount = parseFloat(req.body.amount);
  const balance = await getBalance(res.locals.id);
  // @ts-ignore
  if (amount <= 0 || amount > balance || receiver === res.locals.id)
    return res.status(500).json({ error: 'invalid payment' });
  const payment = {
    id: uid(),
    sender: res.locals.id,
    receiver,
    memo: 'Tip',
    amount,
    meta: JSON.stringify({})
  };
  let query = 'INSERT IGNORE INTO payments SET ?;';
  await db.queryAsync(query, [payment]);
  res.json({ success: true });
});

router.post('/payments', verify, async (req, res) => {
  const query = 'SELECT * FROM payments WHERE sender = ? OR receiver = ? ORDER BY created DESC LIMIT 20';
  const result = await db.queryAsync(query, [res.locals.id, res.locals.id]);
  res.json(result);
});

router.post('/balance', verify, async (req, res) => {
  const balance = await getBalance(res.locals.id);
  res.json(balance);
});

router.post('/paypal/verify', verify, async (req, res) => {
  const orderId = req.body.order_id;
  let request = new checkout.orders.OrdersGetRequest(orderId);
  let order;
  try {
    order = await paypal.client().execute(request);
    console.log(order);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
  const amount = parseFloat(order.result.purchase_units[0].amount.value).toFixed(2);
  // @ts-ignore
  if (amount <= 0 || order.result.purchase_units[0].amount.currency_code !== 'USD')
    return res.sendStatus(500);
  const payment = {
    id: `paypal/${order.result.id}`,
    sender: 'paypal',
    receiver: res.locals.id,
    memo: 'Deposit with Paypal',
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
  if (order.status !== 'COMPLETED')
    return res.sendStatus(500);
  const payment = {
    id: `paysafe/${token}`,
    sender: 'paysafe',
    receiver: res.locals.id,
    memo: 'Deposit with Paysafe',
    amount: (order.amount / 100).toFixed(2),
    meta: JSON.stringify(order)
  };
  const query = 'INSERT INTO payments SET ?';
  await db.queryAsync(query, [payment]);
  res.json({ success: true });
});

export default router;
