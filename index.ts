// @ts-ignore
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Server } from 'ws';
import jwt from 'jsonwebtoken';
import api from './server/api';
import auth from './server/auth';
import payment from './server/payment';
import upload from './server/upload';
import db from './server/helpers/db';
import { uid } from './server/helpers/utils';
import { sendResponse, sendErrorResponse, justsaying } from './server/helpers/ws';

export default (app, server) => {
  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
  app.use(cors());
  app.use(serveStatic(`${__dirname}/dist`));
  app.use('/api', auth);
  app.use('/api', payment);
  app.use('/api', upload);
  app.use('/api', api);
  app.get('*', (req, res) => res.sendFile(`${__dirname}/dist/index.html`));

  const wss = new Server({ server });
  wss.on('connection', ws => {
    console.log('Got connection from new peer');
    ws.on('error', () => console.log('Error on connection with peer'));
    ws.on('close', () => console.log('Connection with peer closed'));
    ws.on('message', async message => {
      console.log('Message', message);
      let call = {};
      try {
        call = JSON.parse(message);
      } catch (e) {
        console.error(e);
      }
      if (call[0] && call[0] === 'request' && call[1] && call[1].command) {
        const command = call[1].command;
        const params = call[1].params ? call[1].params : null;
        const tag = call[1].tag;
        switch (command) {
          case 'login': {
            try {
              const payload = jwt.verify(params.token, process.env.JWT_SECRET);
              const query = 'SELECT username FROM users WHERE id = ?';
              const users = await db.queryAsync(query, [payload.id]);
              ws.id = payload.id;
              ws.token = params.token;
              ws.username = users[0].username;
              sendResponse(ws, tag, true);
            } catch (e) {
              sendErrorResponse(ws, tag, 'invalid access_token');
            }
            break;
          }
          case 'get_contacts': {
            let query = 'SELECT * FROM subscriptions WHERE user_id = ? OR subscription = ?';
            const subscriptions = await db.queryAsync(query, [ws.id, ws.id]);
            const contacts = subscriptions.map(subscription =>
              subscription.user_id === ws.id ? subscription.subscription : subscription.user_id
            );
            query = 'SELECT id, username, meta FROM users WHERE id IN (?)';
            const users = await db.queryAsync(query, [contacts]);
            console.log(users);

            const fake = [{
              user_meta: {
                name: 'Diana Tamara Höfler',
                avatar: 'QmNZz6n2LYLAUwnDvGi79CFj5UJNGgyRyV6758nCtajUHJ'
              },
              last_message: 'Say hi!'
            }];
            sendResponse(ws, tag, fake);
            break;
          }
          case 'get_messages': {
            let query = 'SELECT id FROM users WHERE username = ?';
            const users = await db.queryAsync(query, [params.username]);
            query = 'SELECT * FROM messages WHERE (sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?) ORDER BY created ASC LIMIT 100';
            const messages = await db.queryAsync(query, [ws.id, users[0].id, users[0].id, ws.id]);
            sendResponse(ws, tag, messages);
            break;
          }
          case 'send': {
            const query = 'SELECT id FROM users WHERE username = ?';
            const users = await db.queryAsync(query, [params.username]);
            const message = {
              id: uid(),
              sender: ws.id,
              receiver: users[0].id,
              body: params.body,
              meta: params.meta
            };
            await db.queryAsync('INSERT INTO messages SET ?', [message]);
            sendResponse(ws, tag, true);
            // @ts-ignore
            message.sender_username = ws.username;
            // @ts-ignore
            message.receiver_username = params.username;
            notify(ws.id, 'message', message);
            notify(users[0].id, 'message', message);
            break;
          }
          case 'logout': {
            delete ws.id;
            sendResponse(ws, tag, true);
            break;
          }
        }
      }
    });
  });

  const notify = (id, subject, body) => {
    wss.clients.forEach((ws) => {
      if (ws.id === id) justsaying(ws, subject, body);
    })
  };
}
