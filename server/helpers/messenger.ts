import db from './db';
import { usernameToId } from './utils';

export const getContacts = async (id) => {
  let query = 'SELECT * FROM subscriptions WHERE user_id = ? OR subscription = ?';
  const subscriptions = await db.queryAsync(query, [id, id]);
  const ids = subscriptions.map(subscription =>
    subscription.user_id === id ? subscription.subscription : subscription.user_id
  );
  if (ids.length > 0) {
    query = `
      SELECT u.id, u.username, u.meta, (
        SELECT m.body FROM messages m 
        WHERE (m.sender = u.id AND m.receiver = ?) OR (m.sender = ? AND m.receiver = u.id) 
        ORDER BY m.created DESC LIMIT 1
      ) AS last_message 
      FROM users u WHERE u.id IN (?)
    `;
    const result = await db.queryAsync(query, [id, id, ids]);
    return result.map(i => ({ ...i, meta: JSON.parse(i.meta) }));
  }
  return [];
};

export const getMessages = async (id, username) => {
  const contact = await usernameToId(username);
  const query = 'SELECT * FROM messages WHERE (sender = ? AND receiver = ?) OR (sender = ? AND receiver = ?) ORDER BY created ASC LIMIT 100';
  return await db.queryAsync(query, [id, contact, contact, id]);
};
