import router from './helpers/router';
import { sendResponse, sendErrorResponse } from './helpers/ws';
import db from './helpers/db';
import { uid, getBalance } from './helpers/utils';

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
