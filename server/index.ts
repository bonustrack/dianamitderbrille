// @ts-ignore
import { randomBytes } from 'crypto';
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './helpers/db';
import { issueToken } from './helpers/token';
import { verify } from './helpers/middleware';
import { signup, login } from '../common/schemas';

export default (app) => {
  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
  app.use(cors());
  app.use(serveStatic(`${__dirname}/../dist`));

  app.post('/api/signup', async (req, res) => {
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

  app.post('/api/login', async (req, res) => {
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

  app.post('/api/verify', verify, (req, res) => {
    const query = 'SELECT id, name, email FROM accounts WHERE id = ? LIMIT 1';
    db.queryAsync(query, [res.locals.id]).then(result => res.json(result[0]));
  });

  app.get('*', (req, res) => res.sendFile(`${__dirname}/../dist/index.html`));
}
