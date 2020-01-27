import { randomBytes } from 'crypto';

export const uid = () => randomBytes(4).toString('hex');
