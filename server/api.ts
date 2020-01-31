import express from 'express';
import multer from 'multer';
import fs from 'fs';
import pinataSDK from '@pinata/sdk';
import db from './helpers/db';
import { issueToken } from './helpers/token';
import { verify } from './helpers/middleware';
import { uid } from './helpers/utils';
import { signup, login } from '../common/schemas';

const router = express.Router();
const fileSize = 50 * 1000 * 1000;
const upload = multer({ dest: 'uploads/', limits: { fileSize } });
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_API_KEY);

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
    res.json(result[0]);
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

router.post('/subscriptions', verify, async (req, res) => {
  const query = 'SELECT u.username AS username FROM subscriptions s, users u WHERE s.user_id = ? AND u.id = s.subscription';
  const result = await db.queryAsync(query, [res.locals.id]);
  const subscriptions = result.map(subscription => subscription.username);
  res.json(subscriptions);
});

router.post('/likes', verify, async (req, res) => {
  const query = 'SELECT post_id FROM likes WHERE user_id = ?';
  const result = await db.queryAsync(query, [res.locals.id]);
  const likes = result[2].map(like => like.post_id);
  res.json(likes);
});

router.post('/upload', verify, upload.single('file'), async (req, res, next) => {
  const path = `${req.file.destination}${req.file.filename}`;
  const readableStreamForFile = fs.createReadStream(path);
  try {
    const result = await pinata.pinFileToIPFS(readableStreamForFile);
    await fs.unlinkSync(path);
    const file = {
      user_id: res.locals.id,
      ipfs_hash: result.IpfsHash,
      mimetype: req.file.mimetype,
      size: req.file.size,
      meta: JSON.stringify({})
    };
    let query = 'INSERT IGNORE INTO uploads SET ?;';
    // query += 'UPDATE users SET meta = JSON_SET(meta, "$.avatar", ?) WHERE id = ?;';
    await db.queryAsync(query, [file, result.IpfsHash, res.locals.id]);
    res.json({ result: file });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

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

router.post('/payments', verify, async (req, res) => {
  const query = 'SELECT * FROM payments WHERE user_id = ?';
  const result = await db.queryAsync(query, [res.locals.id]);
  res.json(result);
});

router.post('/:username', verify, async (req, res) => {
  const username = req.params.username;
  const query = 'SELECT username, meta FROM users WHERE username = ?';
  const result = await db.queryAsync(query, [username]);
  res.json(result[0]);
});

router.post('/:username/stories', verify, async (req, res) => {
  const username = req.params.username;
  const query = `
    SELECT p.*, UNIX_TIMESTAMP(p.created) AS timestamp, u.username, u.meta AS user_meta, 
    (SELECT COUNT(l.user_id) FROM likes l WHERE l.post_id = p.id) AS likes
    FROM posts p 
    INNER JOIN users u ON u.id = p.user_id WHERE u.username = ? AND DATE(p.created) > DATE_SUB(CURDATE(), INTERVAL 30 DAY) 
    ORDER BY p.created DESC
  `;
  const result = await db.queryAsync(query, [username]);
  res.json(result);
});

export default router;
