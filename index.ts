// @ts-ignore
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';
import cors from 'cors';
import api from './server/api';

export default (app) => {
  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
  app.use(cors());
  app.use(serveStatic(`${__dirname}/dist`));
  app.use('/api', api);
  app.get('*', (req, res) => res.sendFile(`${__dirname}/dist/index.html`));
}
