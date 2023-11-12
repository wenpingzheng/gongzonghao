import ejs from 'ejs';
import path from 'path';
import * as utils from '../../utils';

export default {
  async show(ctx) {
    if (utils.isTestEnv(ctx)) {
      const html = await ejs.renderFile(path.join(__dirname, '../../../views/index.ejs'), {
        title: '上课报名'
      });
      ctx.body = html;
    } else {
      const html = await ejs.renderFile(path.join(__dirname, '../../../views/404.ejs'), {
        title: '上课报名'
      });
      ctx.body = html;
    }
  },
  async pay(ctx) {
    // if (utils.isTestEnv(ctx)) {
    const html = await ejs.renderFile(path.join(__dirname, '../../../views/pay.ejs'), {
      title: '好课推荐'
    });
    ctx.body = html;
    // } else {
    //   const html = await ejs.renderFile(path.join(__dirname, '../../../views/404.ejs'), {
    //     title: '好课推荐'
    //   });
    //   ctx.body = html;
    // }
  }
}