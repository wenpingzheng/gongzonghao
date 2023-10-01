"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WechatOAuth = void 0;
var util = _interopRequireWildcard(require("util"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// https://open.weixin.qq.com/connect/oauth2/authorize?appid=xx&redirect_uri=xxx&response_type=code&scope=snsapi_base&state=1#wechat_redirect  - 获取code

var codeWeixinUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=%s&redirect_uri=%s';
class WechatOAuth {
  constructor(opts) {
    this.appID = opts.appID;
    this.appSecret = opts.appSecret;
  }
  getAuthorizeURL() {
    return "".concat(util.format(codeWeixinUrl, this.appID, this.appSecret), "&response_type=code&scope=snsapi_base&state=1#wechat_redirect");
  }
}
exports.WechatOAuth = WechatOAuth;