import * as utils from '../../utils';

export default {
  async getToken(ctx) {
    console.log(utils.convertTime(), utils.getUrl(), 'sss');
    ctx.body = {
      code: 0,
      msg: 'success',
      data: {}
    }
  }
}