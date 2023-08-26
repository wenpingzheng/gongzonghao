import { error } from '@wpzheng/koa/lib/controller';
import config from '../../../config/config.json';
// import * as utils from '../../utils';
import sha1 from 'sha1';

// const dbToken = new utils.Db({ dbname: 'db_token' });

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
  async getTicket(ctx) {
    // 添加
    // await dbToken.add({
    //   name: 'test',
    //   value: 122222222
    // });

    // 更新
    // const item = await dbToken.find('name', 'ticket');
    // await dbToken.update(item.objectId, { 'value': 100000 });

  }
}