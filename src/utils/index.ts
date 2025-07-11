import * as crypto from 'crypto';
export * from './response';
export * from './page';
export function md5(str: string) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}
