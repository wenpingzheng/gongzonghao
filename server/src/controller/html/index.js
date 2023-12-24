import ejs from 'ejs';
import path from 'path';
import * as utils from '../../utils';
import course from '../../../config/course.json';

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
    // 课程ID
    const kid = ctx.params.id;
    // if (utils.isTestEnv(ctx)) {
    const html = await ejs.renderFile(path.join(__dirname, '../../../views/pay.ejs'), {
      data: {
        kid,
        title: course?.[kid]['title'] || '',
        discountPrice: course?.[kid]['discountPrice'] || '',
      }
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