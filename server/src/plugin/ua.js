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
      const { t = 'prod' } = ctx.query;
      const isTest = t === 'test';
      const isApi = /^\/api\//.test(ctx.url);
      const isAuth = /^\/auth/.test(ctx.url);
      const isJsapi = /^\/jsapi/.test(ctx.url);
      if (!isTest && !isApi && !isAuth && !isJsapi) {
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