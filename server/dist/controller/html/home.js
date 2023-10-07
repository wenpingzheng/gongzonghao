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
  serialNo,
  payKey
} = _config.default;
var wxpay = new utils.WechatOAuth({
  appId,
  appSecret
});

// 实例化数据库
var dbname = process.env.NODE_TLS_REJECT_UNAUTHORIZED === '0' ? 'db_Paylist' : 'Paylist';
var _default = {
  show(ctx) {
    return _asyncToGenerator(function* () {
      if (utils.isTestEnv(ctx)) {
        var html = yield _ejs.default.renderFile(_path.default.join(__dirname, '../../../views/home.ejs'), {
          title: '好课推荐'
        });
        ctx.body = html;
      } else {
        var _html = yield _ejs.default.renderFile(_path.default.join(__dirname, '../../../views/404.ejs'), {
          title: '好课推荐'
        });
        ctx.body = _html;
      }
    })();
  },
  pay(ctx) {
    return _asyncToGenerator(function* () {
      var codeUrl = wxpay.getAuthorizeURL('https://xiaozhenggms.cn/pay');
      ctx.response.redirect(codeUrl);
    })();
  },
  wxpay(ctx) {
    return _asyncToGenerator(function* () {
      var {
        code
      } = ctx.query;
      var openId = ctx.cookies.get('openid') || '';
      try {
        if (!openId) {
          var openUrl = wxpay.getCodeUrl(code);
          var {
            data: {
              openid
            }
          } = yield _axios.default.get(openUrl); // 过期时间2小时 access_token
          openId = openid;
        }
        // body参数
        var order = {
          appid: appId,
          mchid: mchId,
          description: '点击支付',
          out_trade_no: utils.createNonceStr(),
          amount: {
            total: 1
          },
          payer: {
            openid: openId
          },
          notify_url: 'https://xiaozhenggms.cn/api/notify'
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
        var prepayId = "prepay_id=".concat(prepay_id);
        var data = {
          appId,
          timeStamp: String(timestamp),
          nonceStr: nonce_str,
          package: prepayId,
          signType: 'RSA'
        };
        data['paySign'] = utils.createPaySign(appId, timestamp, nonce_str, prepayId);
        ctx.body = {
          code: 0,
          msg: 'success',
          openid: openId,
          data: data
        };
      } catch (error) {
        console.log(error, 'wxpay api');
      }
    })();
  },
  notify(ctx) {
    return _asyncToGenerator(function* () {
      var data = ctx.request.body;
      var headers = ctx.request.headers;
      /**
      {
        id: '86fbfa81-a138-5335-8ea5-4556f628f2d4',
        create_time: '2023-10-03T11:26:31+08:00',
        resource_type: 'encrypt-resource',
        event_type: 'TRANSACTION.SUCCESS',
        summary: '支付成功',
        resource: {
          original_type: 'transaction',
          algorithm: 'AEAD_AES_256_GCM',
          ciphertext: 'erKMIbbO9C7M7Fu0vkdT9j+WE8Cnh70JsmnHqkiusTs+Vf/H5xUBzh4rEjjnsKCi/mrw15yvJvA/ZD/2MZuCBeWIqyQbbPnBPLD16hAJgSoVywfV3Z9E23zhj4FTAdFkudk4iuz+snU1HRkCQPBXrmdEC8Z64XCGHkkhCccz6sj09xACdgWnz6st+BhgyCmq3rJrb5SG2/92K7Firh3XiEvEiJCUmsj8S+fbPvY194TF4+Vp9XWIr+fD++9u5H+dzQNfsH+r28lh3NmhR6nxMw/8dHqq7cjZUFaaArXzGbt/Iyj0TJnkXix4bwwZUgQhZAoKb9uTXqk842pqzvL9KWLt2gbXf89U6/e5a6vOq3we2bU43+2fs+XzMIJP6RxpBXgrsZOS5TEqyGzL26Yy5qNEY8gT+hdis6E0yB7hsXDvc8c4JIaoc3rUc+eUbVsOrwwpLRAlb3wwFd9ZrA0PVx+kl0T11UuEI/1CYPOrkGnmF9BVFG8E13lfAKoUV0tNr3vRjwPul0uWYlTH033tGzmpRb2H9Ixq3WROHQbBVP2tF9BpChWBPEU=',
          associated_data: 'transaction',
          nonce: 'olNhEL1K7FdZ'
        }
      }
      */
      // 第一步：验证签名
      var verifysign = utils.verifySign(headers, JSON.stringify(data));
      console.log(verifysign, 'verifysign');
      if (!verifysign) {
        return '支付认证失败';
      }

      // 第二步：参数解密
      var nonce = data.resource.nonce;
      var associatedData = data.resource.associated_data;
      var ciphertext = data.resource.ciphertext;
      var callBackInfo = utils.aes256gcmDecrypt(nonce, associatedData, ciphertext, payKey);
      /**
      {"mchid":"1652277114","appid":"wx250422f548bb8d72","out_trade_no":"dpzvxl5eun","transaction_id":"4200001982202310037448450578","trade_type":"JSAPI","trade_state":"SUCCESS","trade_state_desc":"支付成功","bank_type":"OTHERS","attach":"","success_time":"2023-10-03T17:42:04+08:00","payer":{"openid":"o7h9p64v-B0HhtJ_jgZWgBZ4tmhg"},"amount":{"total":1,"payer_total":1,"currency":"CNY","payer_currency":"CNY"}}
       */
      // 第三步：存储支付信息
      var {
        out_trade_no: outTradeNo,
        transaction_id: transactionId,
        success_time: successTime,
        payer: {
          openid
        },
        amount: {
          total
        }
      } = JSON.parse(callBackInfo);
      var dbClass = new utils.Db({
        dbname
      });
      yield dbClass.add({
        out_trade_no: outTradeNo,
        transaction_id: transactionId,
        openid,
        amount: total,
        time: successTime,
        details: JSON.stringify(callBackInfo)
      });
      ctx.body = callBackInfo;
    })();
  }
};
exports.default = _default;