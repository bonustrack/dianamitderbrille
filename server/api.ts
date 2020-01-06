const express = require('express');
const { randomBytes } = require('crypto');
const db = require('./helpers/db.ts');
const { signup } = require('../src/common/schemas.ts');

const router = express.Router();

router.all('/signup', async (req, res) => {
  try {
    const values = await signup.validateAsync(req.body);
    const account = {
      id: randomBytes(4).toString('hex'),
      name: values.name,
      email: values.email,
      password: values.password
    };
    await db.queryAsync('INSERT INTO accounts SET ?', [account]);
    res.json({ success: true });
  } catch (error) {
    const errorMessage = error.sqlMessage || 'request failed';
    res.status(500).json({ error: errorMessage });
  }
});

module.exports = router;
