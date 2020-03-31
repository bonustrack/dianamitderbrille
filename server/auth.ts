import jwt from 'jsonwebtoken';
import router from './helpers/router';
import db from './helpers/db';
import { sendResponse, sendErrorResponse } from './helpers/ws';
import { issueToken } from './helpers/token';
import { uid } from './helpers/utils';
import { signup, login } from '../common/schemas';

router.add('signup', async (params, tag, ws) => {
  try {
    const values = await signup.validateAsync(params);
    const id = uid();
    const user = {
      id,
      username: id,
      email: values.email,
      password: values.password,
      meta: JSON.stringify({name: values.name})
    };
    await db.queryAsync('INSERT INTO users SET ?', [user]);
    const token = issueToken(user.id);
    sendResponse(ws, tag, { access_token: token });
  } catch (error) {
    sendErrorResponse(ws, tag, error.sqlMessage || 'request failed');
  }
});

router.add('login', async (params, tag, ws) => {
  try {
    const values = await login.validateAsync(params);
    const query = 'SELECT id, username FROM users WHERE email = ? AND password = ?';
    const users = await db.queryAsync(query, [values.email, values.password]);
    if (users && users[0] && users[0].id) {
      const token = issueToken(users[0].id);
      sendResponse(ws, tag, { access_token: token });
    } else {
      sendErrorResponse(ws, tag, 'email or password is wrong');
    }
  } catch (e) {
    sendErrorResponse(ws, tag, 'request failed');
  }
});

router.add('verify', async (params, tag, ws) => {
  try {
    const payload = jwt.verify(params, process.env.JWT_SECRET);
    let query = 'UPDATE users SET logged = CURRENT_TIMESTAMP WHERE id = ?;';
    query += 'SELECT id, username FROM users WHERE id = ?;';
    const result = await db.queryAsync(query, [payload.id, payload.id]);
    if (result[1] && result[1][0] && result[1][0].id) {
      ws.token = params;
      ws.id = result[1][0].id;
      ws.username = result[1][0].username;
    }
  } catch (e) {
    sendErrorResponse(ws, tag, e);
  }
  if (!ws.id) return;
  let query = 'SELECT id, username, email, meta FROM users WHERE id = ? LIMIT 1;';
  query += 'SELECT u.username AS username FROM subscriptions s, users u WHERE s.user_id = ? AND u.id = s.subscription;';
  query += 'SELECT post_id FROM likes WHERE user_id = ?';
  try {
    const result = await db.queryAsync(query, [ws.id, ws.id, ws.id]);
    const subscriptions = result[1].map(subscription => subscription.username);
    const likes = result[2].map(like => like.post_id);
    sendResponse(ws, tag, { account: result[0][0], subscriptions, likes });
  } catch (e) {
    sendErrorResponse(ws, tag, e);
  }
});

router.add('logout', async (params, tag, ws) => {
  delete ws.id;
  sendResponse(ws, tag, true);
});

router.add('edit_profile', async (params, tag, ws) => {
  if (!ws.id) return;
  const { name, about, cover, avatar } = params || {};
  try {
    const query = `UPDATE users SET 
      meta = JSON_SET(meta, "$.name", ?), 
      meta = JSON_SET(meta, "$.about", ?),
      meta = JSON_SET(meta, "$.cover", ?), 
      meta = JSON_SET(meta, "$.avatar", ?)
    WHERE id = ?`;
    await db.queryAsync(query, [name, about, cover, avatar, ws.id]);
    sendResponse(ws, tag, { success: true });
  } catch (e) {
    console.log('Failed to edit profile', e);
    sendErrorResponse(ws, tag, 'request failed');
  }
});

export default router;
