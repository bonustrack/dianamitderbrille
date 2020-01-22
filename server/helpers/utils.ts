import { randomBytes } from 'crypto';

export const uid = () => parseInt(randomBytes(4).toString('hex'));
