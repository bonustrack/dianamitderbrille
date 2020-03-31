import router from './helpers/router';
import db from './helpers/db';
import { uid } from './helpers/utils';
import { getContacts, getMessages} from './helpers/messenger';
import { sendResponse } from './helpers/ws';

router.add('get_contacts', async (params, tag, ws) => {
  if (!ws.id) return;
  const contacts = await getContacts(ws.id);
  sendResponse(ws, tag, contacts);
});

router.add('get_messages', async (params, tag, ws) => {
  if (!ws.id) return;
  const messages = await getMessages(ws.id, params.username);
  sendResponse(ws, tag, messages);
});

router.add('send', async (params, tag, ws) => {
  if (!ws.id) return;
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
  router.notify(ws.id, 'message', message);
  router.notify(users[0].id, 'message', message);
});

export default router;
