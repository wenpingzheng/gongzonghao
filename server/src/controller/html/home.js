import ejs from 'ejs';
import path from 'path';

export default {
  async show(ctx) {
    const html = await ejs.renderFile(path.join(__dirname, '../../views/home.ejs'), {
      title: '测试'
    });
    ctx.body = html;
  }
}