// @ts-ignore
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Server } from 'ws';
import api from './server/api';
import payment from './server/payment';
import upload from './server/upload';
import router from './server/helpers/router';
import './server/routes';
import './server/auth';
import './server/messenger';

export default (app, server) => {
  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
  app.use(cors());
  app.use(serveStatic(`${__dirname}/dist`));
  app.use('/api', payment);
  app.use('/api', upload);
  app.use('/api', api);
  app.get('*', (req, res) => res.sendFile(`${__dirname}/dist/index.html`));

  const wss = new Server({ server });
  router.wss = wss;

  wss.on('connection', ws => {
    console.log('Got connection from new peer');
    ws.on('error', () => console.log('Error on connection with peer'));
    ws.on('close', () => console.log('Connection with peer closed'));
    ws.on('message', async message => {
      let call = {};
      try {
        call = JSON.parse(message);
      } catch (e) {
        console.error(e);
      }
      if (call[0] && call[0] === 'request' && call[1] && call[1].command) {
        const { command, params, tag } = call[1];
        await router.render(command, params, tag, ws);
      }
    });
  });
}
