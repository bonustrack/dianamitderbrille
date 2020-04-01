import { Client } from 'kbyte';
import store from '@/store';

const address = process.env.VUE_APP_WS_API;
const client = new Client(address);

client.requestSync = client.request;
client.request = (command, params) =>
  new Promise((resolve, reject) => {
    client.requestSync(command, params || null, (e, result) => {
      if (e) return reject(e);
      resolve(result);
    });
  });

setInterval(() => client.request('heartbeat'), 10 * 1000);

client.ws.addEventListener('close', () => {
  store.dispatch('notify', { message: 'The connection has been closed', type: 'error' });
});

export default client;
