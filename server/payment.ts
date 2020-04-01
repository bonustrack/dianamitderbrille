import checkout from '@paypal/checkout-server-sdk';
import router from './helpers/router';
import { sendResponse, sendErrorResponse } from './helpers/ws';
import db from './helpers/db';
import paypal from './helpers/paypal';
import { cardPaymentWithToken } from './helpers/paysafe';
import { uid, getBalance } from './helpers/utils';

const TOKEN_RATE = 4;

router.add('pay', async (params, tag, ws) => {
  if (!ws.id) return;
  const receiver = params.receiver;
  const amount = parseFloat(params.amount);
  const balance = await getBalance(ws.id);
  // @ts-ignore
  if (amount <= 0 || amount > balance || receiver === ws.id)
    return sendErrorResponse(ws, tag, 'invalid payment');
  const payment = {
    id: uid(),
    sender: ws.id,
    receiver,
    memo: 'Tip',
    amount,
    meta: JSON.stringify({})
  };
  let query = 'INSERT IGNORE INTO payments SET ?;';
  await db.queryAsync(query, [payment]);
  return sendResponse(ws, tag, { success: true });
});

router.add('get_payments', async (params, tag, ws) => {
  if (!ws.id) return;
  const query = `
    SELECT 
      p.*, 
      UNIX_TIMESTAMP(p.created) AS created, 
      u1.username AS sender_username,
      u1.meta AS sender_meta,
      u2.username AS receiver_username,
      u2.meta AS receiver_meta  
    FROM payments p, users u1, users u2
    WHERE 
      (p.sender = ? OR p.receiver = ?) 
      AND sender = u1.id
      AND receiver = u2.id
    ORDER BY created DESC LIMIT 20
  `;
  let result = await db.queryAsync(query, [ws.id, ws.id]);
  result = result.map(i => ({
    ...i,
    sender_meta: JSON.parse(i.sender_meta),
    receiver_meta: JSON.parse(i.receiver_meta)
  }));
  return sendResponse(ws, tag, result);
});

router.add('get_balance', async (params, tag, ws) => {
  if (!ws.id) return;
  const result = await getBalance(ws.id);
  return sendResponse(ws, tag, result);
});

router.add('/paypal/verify', async (params, tag, ws) => {
  if (!ws.id) return;
  const orderId = params.order_id;
  let request = new checkout.orders.OrdersGetRequest(orderId);
  let order;
  try {
    order = await paypal.client().execute(request);
    console.log(order);
  } catch (e) {
    console.error(e);
    return sendErrorResponse(ws, tag, 'invalid payment');
  }
  const usd = parseFloat(order.result.purchase_units[0].amount.value);
  const amount = (usd * TOKEN_RATE).toFixed(2);
  // @ts-ignore
  if (amount <= 0 || order.result.purchase_units[0].amount.currency_code !== 'USD')
    return sendErrorResponse(ws, tag, 'invalid payment');
  const payment = {
    id: `paypal/${order.result.id}`,
    sender: 'paypal',
    receiver: ws.id,
    memo: 'Deposit with Paypal',
    amount,
    meta: JSON.stringify(order)
  };
  const query = 'INSERT INTO payments SET ?';
  await db.queryAsync(query, [payment]);
  return sendResponse(ws, tag, { success: true });
});

router.add('/paysafe/verify', async (params, tag, ws) => {
  if (!ws.id) return;
  let { token, amount } = params;
  let order;
  try {
    order = await cardPaymentWithToken(token, token, parseInt(amount));
    console.log(order);
  } catch (e) {
    console.error(e);
    return sendErrorResponse(ws, tag, 'invalid payment');
  }
  const usd = (order.amount / 100).toFixed(2);
  // @ts-ignore
  amount = (usd * TOKEN_RATE).toFixed(2);
  if (amount <= 0 || order.status !== 'COMPLETED')
    return sendErrorResponse(ws, tag, 'invalid payment');
  const payment = {
    id: `paysafe/${token}`,
    sender: 'paysafe',
    receiver: ws.id,
    memo: 'Deposit with Paysafe',
    amount,
    meta: JSON.stringify(order)
  };
  const query = 'INSERT INTO payments SET ?';
  await db.queryAsync(query, [payment]);
  return sendResponse(ws, tag, { success: true });
});

export default router;
