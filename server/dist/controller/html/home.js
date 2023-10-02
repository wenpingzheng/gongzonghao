"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ejs = _interopRequireDefault(require("ejs"));
var _path = _interopRequireDefault(require("path"));
var _axios = _interopRequireDefault(require("axios"));
var utils = _interopRequireWildcard(require("../../utils"));
var _config = _interopRequireDefault(require("../../../config/config.json"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var {
  appId,
  appSecret,
  mchId,
  serialNo
} = _config.default;
var wxpay = new utils.WechatOAuth({
  appId,
  appSecret
});
var _default = {
  show(ctx) {
    return _asyncToGenerator(function* () {
      var html = yield _ejs.default.renderFile(_path.default.join(__dirname, '../../../views/home.ejs'), {
        title: '个人页'
      });
      ctx.body = html;
    })();
  },
  pay(ctx) {
    return _asyncToGenerator(function* () {
      var codeUrl = wxpay.getAuthorizeURL();
      console.log('授权URL:', codeUrl);
      ctx.response.redirect(codeUrl);
    })();
  },
  wxpay(ctx) {
    return _asyncToGenerator(function* () {
      var {
        code
      } = ctx.query;
      var openUrl = wxpay.getCodeUrl(code);
      var {
        data: {
          openid
        }
      } = yield _axios.default.get(openUrl); // 过期时间2小时 access_token

      // body参数
      var order = {
        appid: appId,
        mchid: mchId,
        description: '点击支付',
        out_trade_no: 'wzm20231002',
        amount: {
          total: 1
        },
        payer: {
          openid: openid
        },
        notify_url: 'https://xiaozhenggms.cn/api/wxpayed'
      };

      // Authorization
      var timestamp = Math.floor(new Date().getTime() / 1000);
      var nonce_str = utils.createNonceStr();
      var signature = utils.createSign("POST", "/v3/pay/transactions/jsapi", timestamp, nonce_str, order);
      var Authorization = "WECHATPAY2-SHA256-RSA2048 mchid=\"".concat(mchId, "\",nonce_str=\"").concat(nonce_str, "\",timestamp=\"").concat(timestamp, "\",signature=\"").concat(signature, "\",serial_no=\"").concat(serialNo, "\"");
      var {
        data: {
          prepay_id
        }
      } = yield _axios.default.post("https://api.mch.weixin.qq.com/v3/pay/transactions/jsapi", order, {
        headers: {
          Authorization: Authorization,
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });

      // console.log(prepay_id, '======prepay_id======');
      var prepayId = "prepay_id=".concat(prepay_id);
      var data = {
        appId,
        timeStamp: timestamp,
        nonceStr: nonce_str,
        package: prepayId,
        signType: 'RSA'
      };
      data['paySign'] = utils.createPaySign(appId, timestamp, nonce_str, prepayId);
      ctx.body = {
        code: 0,
        msg: 'success',
        data: data
      };
    })();
  },
  wxpayed(ctx) {
    return _asyncToGenerator(function* () {
      console.log('支付完成');
    })();
  }
};
exports.default = _default;