import ejs from 'ejs';
import path from 'path';

export default {
  async show(ctx) {
    const pageId = ctx.params.id;
    let html = '';
    if (pageId) {
      html = await ejs.renderFile(path.join(__dirname, `../../../views/git-learn-${pageId}.ejs`), {
        title: '文章'
      });
    }
    ctx.body = html;
  }
}