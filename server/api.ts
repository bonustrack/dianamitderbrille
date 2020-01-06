const express = require('express');
const { randomBytes } = require('crypto');
const db = require('./helpers/db.ts');
const { issueToken } = require('./helpers/token.ts');
const { signup, login } = require('../src/common/schemas.ts');

const router = express.Router();

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

module.exports = router;
