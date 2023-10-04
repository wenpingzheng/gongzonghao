"use strict";

var _koa = require("@wpzheng/koa");
var utils = _interopRequireWildcard(require("../utils"));
var _config = _interopRequireDefault(require("../../config/config.json"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var {
  appId,
  appSecret
} = _config.default;
var wxpay = new utils.WechatOAuth({
  appId,
  appSecret
});
class Info extends _koa.Plugin {
  constructor() {
    super('plugin', 'info');
  }
  apply(app, config) {
    console.log(config);
    app.use( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(function* (ctx, next) {
        var isApi = /^\/api\//.test(ctx.url);
        if (!isApi) {
          var userAgent = ctx.headers['user-agent'];
          var isWeChat = /MicroMessenger/i.test(userAgent);
          if (!isWeChat) {
            var codeUrl = wxpay.getAuthorizeURL('https://xiaozhenggms.cn');
            ctx.response.redirect(codeUrl);
          }
        }
        yield next();
      });
      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  }
}
(0, _koa.registerPlugin)(Info);