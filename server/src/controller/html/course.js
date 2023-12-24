import ejs from 'ejs';
import path from 'path';
import * as utils from '../../utils';
import course from '../../../config/course.json';

const dbClass = new utils.Db({ dbname: 'Paylist' });

export default {
  async show(ctx) {
    const kid = ctx.params.id;
    let html = '';
    if (kid) {
      html = await ejs.renderFile(path.join(__dirname, `../../../views/course/interview-hc.ejs`), {
        data: {
          kid,
          title: course?.[kid]['title'] || '',
          originalPrice: course?.[kid]['originalPrice'] || '',
          discountPrice: course?.[kid]['discountPrice'] || '',
        }
      });
    }
    ctx.body = html;
  },
  async learn(ctx) {
    const data = await dbClass.findByConditions('o7h9p64v-B0HhtJ_jgZWgBZ4tmhg', '20231223')
    console.log(data, 'data');
    // const kid = ctx.params.id;
    if (data && Object.keys(data).length > 0) {
      ctx.body = data;
    } else {
      ctx.body = '404';
    }
    // if (kid) {
    //   html = await ejs.renderFile(path.join(__dirname, `../../../views/course/interview-hc.ejs`), {
    //     data: {
    //       kid,
    //       title: course?.[kid]['title'] || '',
    //       originalPrice: course?.[kid]['originalPrice'] || '',
    //       discountPrice: course?.[kid]['discountPrice'] || '',
    //     }
    //   });
    // }
  }
}