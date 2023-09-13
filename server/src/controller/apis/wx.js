
// Created by WpZheng

// 实现WX相关的功能

import sha1 from 'sha1';
import { error } from '@wpzheng/koa/lib/controller';
import config from '../../../config/config.json';
import * as utils from '../../utils';

const wx = new utils.Wechat();

export default {
  // 微信授权
  async auth(ctx) {
    if (ctx.method === 'GET') {
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
    }
  },

  // 获取微信参数
  async getWxParams(ctx) {
    let { url } = ctx.query;
    url = decodeURIComponent(url);
    const conf = await utils.getSignature(url);
    ctx.body = conf;
  },

  // 创建微信菜单
  async createMenu(ctx) {
    const result = await wx.createMenu();
    ctx.body = {
      code: 0,
      msg: 'success',
      data: result
    }
  }
}