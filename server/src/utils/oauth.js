
// https://open.weixin.qq.com/connect/oauth2/authorize?appid=xx&redirect_uri=xxx&response_type=code&scope=snsapi_base&state=1#wechat_redirect  - 获取code

import * as util from 'util';
const codeWeixinUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=%s&redirect_uri=%s';

export class WechatOAuth {
  constructor(opts) {
    this.appID = opts.appID
    this.appSecret = opts.appSecret
  }

  getAuthorizeURL () {
    return `${util.format(codeWeixinUrl, this.appID, this.appSecret)}&response_type=code&scope=snsapi_base&state=1#wechat_redirect`;
  }

}