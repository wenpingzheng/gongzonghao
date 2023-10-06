import ejs from 'ejs';
import path from 'path';

export default {
  async show(ctx) {
    const html = await ejs.renderFile(path.join(__dirname, '../../../views/404.ejs'), {
      title: '首页'
    });
    // const html = await ejs.renderFile(path.join(__dirname, '../../../views/index.ejs'), {
    //   title: '首页'
    // });
    ctx.body = html;
  },
  async pay(ctx) {
    const html = await ejs.renderFile(path.join(__dirname, '../../../views/404.ejs'), {
      title: '支付页'
    });
    // const html = await ejs.renderFile(path.join(__dirname, '../../../views/pay.ejs'), {
    //   title: '支付页'
    // });
    ctx.body = html;
  }
}