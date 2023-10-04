import { Plugin, registerPlugin } from '@wpzheng/koa';
import * as utils from '../utils';
import config from '../../config/config.json';

const { appId, appSecret } = config;
const wxpay = new utils.WechatOAuth({ appId, appSecret});

class Info extends Plugin {
  constructor() {
    super('plugin', 'info');
  }
  apply(app, config) {
    console.log(config);
    app.use(async (ctx, next) => {
      const isApi = /^\/api\//.test(ctx.url);
      if (!isApi) {
        const userAgent = ctx.headers['user-agent'];
        const isWeChat = /MicroMessenger/i.test(userAgent);
        if (!isWeChat) {
          const codeUrl = wxpay.getAuthorizeURL('https://xiaozhenggms.cn');
          ctx.response.redirect(codeUrl);
        }
      }
      await next();
    })
  }
}

registerPlugin(Info);