import { Client } from 'kbyte';
import { promisifyAll } from 'bluebird';

promisifyAll(Client.prototype);
const address = process.env.VUE_APP_WS_API;
const client = new Client(address);

setInterval(() => client.request('heartbeat', null), 10 * 1000);

client.ws.addEventListener('close', () => console.log('The connection has been closed'));

export default client;
