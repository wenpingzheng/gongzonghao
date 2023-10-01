"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WechatOAuth = void 0;
// https://open.weixin.qq.com/connect/oauth2/authorize?appid=xx&redirect_uri=xxx&response_type=code&scope=snsapi_base&state=1#wechat_redirect

class WechatOAuth {
  constructor(opts) {
    this.appID = opts.appID;
    this.appSecret = opts.appSecret;
  }
  getAuthorizeURL() {}
}
exports.WechatOAuth = WechatOAuth;