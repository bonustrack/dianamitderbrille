const express = require('express');
const bodyParser = require('body-parser');
const frameguard = require('frameguard');
const serveStatic = require('serve-static');
const cors = require('cors');
const api =  require('./api.ts');

const app = express();
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(frameguard({ action: 'deny' }));
app.use(cors());
app.use(serveStatic(`${__dirname}/dist`));

app.use('/api', api);
app.get('*', (req, res) => res.sendFile(`${__dirname}/../dist/index.html`));

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
