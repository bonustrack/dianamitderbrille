import router from './helpers/router';
import { sendResponse, sendErrorResponse } from './helpers/ws';
import db from './helpers/db';
import { uid, getBalance, getPlan, subscribe, MODEL_ID } from './helpers/utils';

router.add('post', async (params, tag, ws) => {
  if (!ws.id) return;
  const post = {
    id: uid(),
    user_id: ws.id,
    body: params.body,
    meta: params.meta
  };
  let query = 'INSERT INTO posts SET ?;';
  await db.queryAsync(query, [post]);
  return sendResponse(ws, tag, { success: true });
});

router.add('like', async (params, tag, ws) => {
  if (!ws.id) return;
  const like = {
    user_id: ws.id,
    post_id: params.post_id
  };
  let query = 'INSERT IGNORE INTO likes SET ?;';
  await db.queryAsync(query, [like]);
  return sendResponse(ws, tag, { success: true });
});

router.add('subscribe', async (params, tag, ws) => {
  if (!ws.id) return;
  const planId = params.plan_id;
  const plan = getPlan(planId);
  if (!plan)
    return sendErrorResponse(ws, tag, 'invalid plan');
  const balance = await getBalance(ws.id);
  // @ts-ignore
  if (plan.price <= 0 || plan.price > balance || MODEL_ID === ws.id)
    return sendErrorResponse(ws, tag, 'invalid payment');
  const payment = {
    id: uid(),
    sender: ws.id,
    receiver: MODEL_ID,
    memo: 'Subscribe',
    amount: plan.price,
    meta: JSON.stringify({})
  };
  const query = 'INSERT IGNORE INTO payments SET ?';
  await db.queryAsync(query, [payment]);
  await subscribe(ws.id, planId);
  return sendResponse(ws, tag, { success: true });
});

router.add('get_subscribers', async (params, tag, ws) => {
  if (!ws.id) return;
  const query = `
    SELECT 
      s.*, 
      UNIX_TIMESTAMP(s.created) AS created, 
      UNIX_TIMESTAMP(s.expired) AS expired, 
      u.username, 
      u.meta AS user_meta
    FROM subscriptions s 
    INNER JOIN users u ON u.id = s.user_id 
    WHERE s.subscription = ? 
    ORDER BY s.created DESC
  `;
  let result = await db.queryAsync(query, [ws.id]);
  result = result.map(i => ({ ...i, user_meta: JSON.parse(i.user_meta) }));
  return sendResponse(ws, tag, result);
});

router.add('get_profile', async (params, tag, ws) => {
  const query = 'SELECT id, username, meta FROM users WHERE username = ?';
  const result = await db.queryAsync(query, [params]);
  const user = result[0];
  user.meta = JSON.parse(user.meta);
  return sendResponse(ws, tag, user);
});

router.add('get_stories', async (params, tag, ws) => {
  if (!ws.id) return;
  const interval = 30;
  const query = `
    SELECT p.*, UNIX_TIMESTAMP(p.created) AS timestamp, u.username, u.meta AS user_meta, 
    (SELECT COUNT(l.user_id) FROM likes l WHERE l.post_id = p.id) AS likes
    FROM posts p 
    INNER JOIN users u ON u.id = p.user_id WHERE u.username = ? AND DATE(p.created) > DATE_SUB(CURDATE(), INTERVAL ? DAY) 
    ORDER BY p.created DESC
  `;
  const result = await db.queryAsync(query, [params, interval]);
  return sendResponse(ws, tag, result);
});

export default router;
