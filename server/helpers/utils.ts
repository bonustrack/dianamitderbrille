import { randomBytes } from 'crypto';
import db from './db';
import plans from '../../src/helpers/plans.json';

export const MODEL_ID = 'p0r4p82z';

export const uid = () => randomBytes(4).toString('hex');

export const usernameToId = async (username) => {
  let query = 'SELECT id FROM users WHERE username = ?';
  const users = await db.queryAsync(query, [username]);
  return users[0].id;
};

export const getBalance = (id) => new Promise((resolve) => {
  let query = 'SELECT SUM(amount) AS total FROM payments WHERE receiver = ?;';
  query += 'SELECT SUM(amount) AS total FROM payments WHERE sender = ?;';
  db.queryAsync(query, [id, id]).then(result => {
    const received = result[0][0].total || 0;
    const spent = result[1][0].total || 0;
    const balance = received - spent;
    resolve(balance);
  });
});

export const getPlan = (planId) => plans[planId];

export const subscribe = (id, planId) => new Promise((resolve) => {
  const plan = getPlan(planId);
  let query = 'SELECT * FROM subscriptions WHERE user_id = ? AND subscription = ?';
  db.queryAsync(query, [id, MODEL_ID]).then(result => {
    let params;
    const subscription = result[0];
    if (subscription) {
      const ts = subscription.expired;
      const expired = new Date().getTime() > ts.getTime() ? new Date() : ts;
      expired.setDate(expired.getDate() + plan.duration);
      query = 'UPDATE subscriptions SET expired = ? WHERE user_id = ? and subscription = ?';
      // @ts-ignore
      params = [expired, id, MODEL_ID];
    } else {
      const expired = new Date();
      expired.setDate(expired.getDate() + plan.duration);
      params = {
        user_id: id,
        subscription: MODEL_ID,
        meta: JSON.stringify({}),
        expired
      };
      query = 'INSERT IGNORE INTO subscriptions SET ?';
    }
    db.queryAsync(query, params).then(() => resolve());
  });
});

