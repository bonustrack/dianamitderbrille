import express from 'express';
import multer from 'multer';
import fs from 'fs';
import pinataSDK from '@pinata/sdk';
import { randomBytes } from 'crypto';
import db from './helpers/db';
import { issueToken } from './helpers/token';
import { verify } from './helpers/middleware';
import { signup, login } from '../common/schemas';

const router = express.Router();
const storage = multer.memoryStorage();
const fileSize = 1000 * 1000;
const upload = multer({ dest: 'uploads/', limits: { fileSize } });
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_API_KEY);

router.post('/signup', async (req, res) => {
  try {
    const values = await signup.validateAsync(req.body);
    const user = {
      id: randomBytes(4).toString('hex'),
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
  const query = 'SELECT id, email, meta FROM users WHERE id = ? LIMIT 1';
  try {
    const result = await db.queryAsync(query, [res.locals.id]);
    res.json(result[0]);
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
    const userUpload = {
      user_id: res.locals.id,
      ipfs_hash: result.IpfsHash,
      meta: JSON.stringify({})
    };
    let query = 'UPDATE users SET meta = JSON_SET(meta, "$.avatar", ?) WHERE id = ?;';
    query += 'INSERT IGNORE INTO users_uploads SET ?;';
    await db.queryAsync(query, [result.IpfsHash, res.locals.id, userUpload]);
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

export default router;
