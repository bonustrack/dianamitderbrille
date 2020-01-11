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
    const account = {
      id: randomBytes(4).toString('hex'),
      name: values.name,
      email: values.email,
      password: values.password
    };
    await db.queryAsync('INSERT INTO accounts SET ?', [account]);
    const token = issueToken(account.id);
    res.json({ access_token: token });
  } catch (error) {
    const errorMessage = error.sqlMessage || 'request failed';
    res.status(500).json({ error: errorMessage });
  }
});

router.post('/login', async (req, res) => {
  try {
    const values = await login.validateAsync(req.body);
    const query = 'SELECT id FROM accounts WHERE email = ? AND password = ?';
    const accounts = await db.queryAsync(query, [values.email, values.password]);
    if (accounts && accounts[0] && accounts[0].id) {
      const token = issueToken(accounts[0].id);
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
  const query = 'SELECT id, name, email FROM accounts WHERE id = ? LIMIT 1';
  const result = await db.queryAsync(query, [res.locals.id]);
  res.json(result[0]);
});

router.post('/upload', upload.single('file'), async (req, res, next) => {
  const path = `./uploads/${req.file.filename}`;
  const readableStreamForFile = fs.createReadStream(path);
  try {
    const result = await pinata.pinFileToIPFS(readableStreamForFile);
    await fs.unlinkSync(path);
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

export default router;
