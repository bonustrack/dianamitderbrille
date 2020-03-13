import express from 'express';
import db from './helpers/db';
import { issueToken } from './helpers/token';
import { verify } from './helpers/middleware';
import { uid } from './helpers/utils';
import { signup, login } from '../common/schemas';

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const values = await signup.validateAsync(req.body);
    const id = uid();
    const user = {
      id,
      username: id,
      email: values.email,
      password: values.password,
      meta: JSON.stringify({ name: values.name })
    };
    await db.queryAsync('INSERT INTO users SET ?', [user]);
    const token = issueToken(user.id);
    res.json({ access_token: token });
  } catch (error) {
    const errorMessage = error.sqlMessage || 'request failed';
    res.status(500).json({ error: errorMessage });
  }
});

router.post('/login', async (req, res) => {
  try {
    const values = await login.validateAsync(req.body);
    const query = 'SELECT id FROM users WHERE email = ? AND password = ?';
    const users = await db.queryAsync(query, [values.email, values.password]);
    if (users && users[0] && users[0].id) {
      const token = issueToken(users[0].id);
      res.json({ access_token: token });
    } else {
      const errorMessage = 'email or password is wrong';
      res.status(500).json({ error: errorMessage });
    }
  } catch (error) {
    const errorMessage = 'request failed';
    res.status(500).json({ error: errorMessage });
  }
});

router.post('/verify', verify, async (req, res) => {
  let query = 'SELECT id, username, email, meta FROM users WHERE id = ? LIMIT 1;';
  query += 'SELECT u.username AS username FROM subscriptions s, users u WHERE s.user_id = ? AND u.id = s.subscription;';
  query += 'SELECT post_id FROM likes WHERE user_id = ?';
  try {
    const result = await db.queryAsync(query, [res.locals.id, res.locals.id, res.locals.id]);
    const subscriptions = result[1].map(subscription => subscription.username);
    const likes = result[2].map(like => like.post_id);
    res.json({ account: result[0][0], subscriptions, likes });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

export default router;
