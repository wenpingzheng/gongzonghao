import { error } from '@wpzheng/koa/lib/controller';
import sha1 from 'sha1';

export default {
  async auth(ctx) {
    const {signature, timestamp, nonce, echostr} = ctx.query;
    const token = 'xiaozheng';
    const array = [timestamp, nonce, token];
    array.sort();
    const str = array.join('');
    const resultStr = sha1(str);
    if (resultStr === signature) {
      ctx.set('Content-Type', 'text/plain');
      ctx.body = echostr;
    } else {
      error(ctx, 'Error');
    }
  }
}