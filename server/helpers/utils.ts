import { randomBytes } from 'crypto';
import db from './db';

export const uid = () => randomBytes(4).toString('hex');

export const usernameToId = async (username) => {
  let query = 'SELECT id FROM users WHERE username = ?';
  const users = await db.queryAsync(query, [username]);
  return users[0].id;
};
