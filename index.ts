// @ts-ignore
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Server } from 'ws';
import jwt from 'jsonwebtoken';
import api from './server/api';
import db from './server/helpers/db';
import { uid } from './server/helpers/utils';
import { sendResponse, sendErrorResponse } from './server/helpers/ws';

export default (app) => {
  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
  app.use(cors());
  app.use(serveStatic(`${__dirname}/dist`));
  app.use('/api', api);
  app.get('*', (req, res) => res.sendFile(`${__dirname}/dist/index.html`));

  const port = 5000;
  const server = app.listen(port, () => console.log(`Listening on port ${port}`));
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
              ws.token = params.token;
              ws.id = payload.id;
              let query = 'UPDATE accounts SET logged = CURRENT_TIMESTAMP WHERE id = ?';
              await db.queryAsync(query, payload.id);
              query = 'SELECT * FROM accounts WHERE id = ?';
              const account = await db.queryAsync(query, payload.id);
              sendResponse(ws, tag, account[0]);
            } catch (e) {
              sendErrorResponse(ws, tag, 'invalid access_token');
            }
            break;
          }
          case 'get_messages': {
            const query = 'SELECT * FROM messages WHERE sender = ? OR receiver = ? ORDER BY created ASC LIMIT 100';
            const messages = await db.queryAsync(query, ['fabien', 'fabien']);
            sendResponse(ws, tag, messages);
            break;
          }
          case 'send': {
            const message = {
              id: uid(),
              sender: 'fabien',
              receiver: 'dianamitderbrille',
              body: params.body,
              meta: params.meta
            };
            console.log(message);
            await db.queryAsync('INSERT INTO messages SET ?', [message]);
            sendResponse(ws, tag, true);
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
}
