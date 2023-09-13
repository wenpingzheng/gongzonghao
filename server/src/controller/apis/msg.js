// Created by WpZheng

// 实现公众号响应事件

import ejs from 'ejs';
import path from 'path';
import * as utils from '../../utils';

export default {
  async reply(ctx) {
    let reportMsg = '';
    if (ctx.method === 'POST') {
      const data = ctx.request.body;
      const content = await utils.parseXML(data);
      const result = utils.formatMessage(content.xml);
      if (result.MsgType === 'event') {
        if (result.Event === 'CLICK') {
          if (result.EventKey === 'download') {
            // 下载响应
            const html = await ejs.renderFile(path.join(__dirname, '../../../views/wx.ejs'), {
              ...result,
              title: '前端面试题下载链接',
              url: 'https://pan.baidu.com/s/1olBN-qPvDVX8reUn_0jfig?pwd=uq8f',
              time: new Date().getTime(),
            });
            reportMsg = html;
          }
        }
      }
    }
    ctx.body = reportMsg;
  },
}