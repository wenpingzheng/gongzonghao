"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sha = _interopRequireDefault(require("sha1"));
var _controller = require("@wpzheng/koa/lib/controller");
var _config = _interopRequireDefault(require("../../../config/config.json"));
var utils = _interopRequireWildcard(require("../../utils"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } // Created by WpZheng
// 实现WX相关的功能
var wx = new utils.Wechat();
var _default = {
  // 微信授权
  auth(ctx) {
    return _asyncToGenerator(function* () {
      if (ctx.method === 'GET') {
        var {
          signature,
          timestamp,
          nonce,
          echostr
        } = ctx.query;
        var token = _config.default.token;
        var array = [timestamp, nonce, token];
        array.sort();
        var str = array.join('');
        var resultStr = (0, _sha.default)(str);
        if (resultStr === signature) {
          ctx.set('Content-Type', 'text/plain');
          ctx.body = echostr;
        } else {
          (0, _controller.error)(ctx, 'Error');
        }
      }
    })();
  },
  // 获取微信参数
  getWxParams(ctx) {
    return _asyncToGenerator(function* () {
      var {
        url
      } = ctx.query;
      url = decodeURIComponent(url);
      var conf = yield utils.getSignature(url);
      ctx.body = conf;
    })();
  },
  // 创建微信菜单
  createMenu(ctx) {
    return _asyncToGenerator(function* () {
      var result = yield wx.createMenu();
      ctx.body = {
        code: 0,
        msg: 'success',
        data: result
      };
    })();
  }
};
exports.default = _default;