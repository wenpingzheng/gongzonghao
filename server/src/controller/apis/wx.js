import { error } from '@wpzheng/koa/lib/controller';
import config from '../../../config/config.json';
import * as utils from '../../utils';
import sha1 from 'sha1';

export default {
  async auth(ctx) {
    const {signature, timestamp, nonce, echostr} = ctx.query;
    const token = config.token;
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
  },
  async getWxParams(ctx) {
    let { url } = ctx.query;
    url = decodeURIComponent(url);
    const conf = await utils.getSignature(url);
    ctx.body = conf;
  }
}