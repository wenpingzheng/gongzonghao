
// https://open.weixin.qq.com/connect/oauth2/authorize?appid=xx&redirect_uri=xxx&response_type=code&scope=snsapi_base&state=1#wechat_redirect  - 获取code

// https://api.weixin.qq.com/sns/oauth2/access_token?appid=&secret=&code=CODE&grant_type=authorization_code - 获取openid
import * as urlencode from 'urlencode';
import * as util from 'util';
const codeWeixinUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=%s&redirect_uri=%s';
const openApiUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=%s&secret=%s&code=%s';

export class WechatOAuth {
  constructor(opts) {
    this.appId = opts.appId
    this.appSecret = opts.appSecret
  }

  getAuthorizeURL () {
    return `${util.format(codeWeixinUrl, this.appId, urlencode.encode('https://xiaozhenggms.cn/api/wxpay'))}&response_type=code&scope=snsapi_base&state=1#wechat_redirect`;
  }

  getCodeUrl (code) {
    return `${util.format(openApiUrl, this.appId, this.appSecret, code)}&grant_type=authorization_code`
  }
}