import ejs from 'ejs';
import path from 'path';
import axios from 'axios';
import * as utils from '../../utils';
import config from '../../../config/config.json';

const { appId, appSecret } = config;
const wxpay = new utils.WechatOAuth({ appId, appSecret});

export default {
  async show(ctx) {
    const html = await ejs.renderFile(path.join(__dirname, '../../../views/home.ejs'), {
      title: '个人页'
    });
    ctx.body = html;
  },
  async pay(ctx) {
    const codeUrl = wxpay.getAuthorizeURL();
    console.log(codeUrl, 'codeUrl');
    const codeData = await axios.get(codeUrl);
    console.log(codeData);
    ctx.body = codeData;
  }
}