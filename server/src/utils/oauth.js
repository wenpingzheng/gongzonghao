
// https://open.weixin.qq.com/connect/oauth2/authorize?appid=xx&redirect_uri=xxx&response_type=code&scope=snsapi_base&state=1#wechat_redirect  - 获取code

import * as util from 'util';
const codeWeixinUrl = 'http://open.weixin.qq.com/connect/oauth2/authorize?appid=%s&redirect_uri=%s';

export class WechatOAuth {
  constructor(opts) {
    this.appId = opts.appId
    this.appSecret = opts.appSecret
  }

  getAuthorizeURL () {
    return `${util.format(codeWeixinUrl, this.appId, this.appSecret)}&response_type=code&scope=snsapi_base&state=1#wechat_redirect`;
  }

}