import ejs from 'ejs';
import path from 'path';

export default {
  async show(ctx) {
    const html = await ejs.renderFile(path.join(__dirname, '../../../views/index.ejs'), {
      title: '首页'
    });
    ctx.body = html;
  }
}