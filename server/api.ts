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
  const query = 'SELECT id, username, email, meta FROM users WHERE id = ? LIMIT 1; SELECT * FROM subscriptions WHERE user_id = ?;';
  try {
    const result = await db.queryAsync(query, [res.locals.id, res.locals.id]);
    res.json({
      account: result[0][0],
      subscriptions: result[0][1]
    });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
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

router.post('/timeline', verify, async (req, res) => {
  const query = 'SELECT p.*, UNIX_TIMESTAMP(p.created) AS timestamp, u.username, u.meta AS user_meta FROM posts p INNER JOIN users u ON u.id = p.user_id WHERE DATE(p.created) > DATE_SUB(CURDATE(), INTERVAL 30 DAY) ORDER BY p.created DESC';
  const result = await db.queryAsync(query);
  res.json({ result });
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

export default router;
