import express from 'express';
import db from './helpers/db';
import { verify } from './helpers/middleware';
import { uid, getBalance, getPlan, subscribe, MODEL_ID } from './helpers/utils';

const router = express.Router();

router.post('/post', verify, async (req, res) => {
  const post = {
    id: uid(),
    user_id: res.locals.id,
    body: req.body.body,
    meta: req.body.meta
  };
  let query = 'INSERT INTO posts SET ?;';
  await db.queryAsync(query, [post]);
  res.json({ success: true });
});

router.post('/like', verify, async (req, res) => {
  const like = {
    user_id: res.locals.id,
    post_id: req.body.post_id
  };
  let query = 'INSERT IGNORE INTO likes SET ?;';
  await db.queryAsync(query, [like]);
  res.json({ success: true });
});

router.post('/profile', verify, async (req, res) => {
  const { name, about } = req.body;
  try {
    const query = 'UPDATE users SET meta = JSON_SET(meta, "$.name", ?), meta = JSON_SET(meta, "$.about", ?) WHERE id = ?;';
    const result = await db.queryAsync(query, [name, about, res.locals.id]);
    console.log(result);
    res.json({ success: true });
  } catch (e) {
    console.log('Failed to edit profile', e);
    res.status(500).json({ error: 'request failed' });
  }
});

router.post('/subscribe', verify, async (req, res) => {
  const planId = req.body.plan_id;
  const plan = getPlan(planId);
  if (!plan)
    return res.status(500).json({ error: 'invalid plan' });
  const balance = await getBalance(res.locals.id);
  // @ts-ignore
  if (plan.price <= 0 || plan.price > balance || MODEL_ID === res.locals.id)
    return res.status(500).json({ error: 'invalid payment' });
  const payment = {
    id: uid(),
    sender: res.locals.id,
    receiver: MODEL_ID,
    memo: 'Subscribe',
    amount: plan.price,
    meta: JSON.stringify({})
  };
  const query = 'INSERT IGNORE INTO payments SET ?';
  await db.queryAsync(query, [payment]);
  await subscribe(res.locals.id, planId);
  res.json({ success: true });
});

router.post('/subscribers', verify, async (req, res) => {
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
  let result = await db.queryAsync(query, [res.locals.id]);
  result = result.map(i => ({ ...i, user_meta: JSON.parse(i.user_meta) }));
  res.json(result);
});

router.post('/:username', verify, async (req, res) => {
  const username = req.params.username;
  const query = 'SELECT id, username, meta FROM users WHERE username = ?';
  const result = await db.queryAsync(query, [username]);
  const user = result[0];
  user.meta = JSON.parse(user.meta);
  res.json(user);
});

router.post('/:username/stories', verify, async (req, res) => {
  const username = req.params.username;
  const interval = 30;
  const query = `
    SELECT p.*, UNIX_TIMESTAMP(p.created) AS timestamp, u.username, u.meta AS user_meta, 
    (SELECT COUNT(l.user_id) FROM likes l WHERE l.post_id = p.id) AS likes
    FROM posts p 
    INNER JOIN users u ON u.id = p.user_id WHERE u.username = ? AND DATE(p.created) > DATE_SUB(CURDATE(), INTERVAL ? DAY) 
    ORDER BY p.created DESC
  `;
  const result = await db.queryAsync(query, [username, interval]);
  res.json(result);
});

export default router;
