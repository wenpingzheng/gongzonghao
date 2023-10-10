"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ejs = _interopRequireDefault(require("ejs"));
var _path = _interopRequireDefault(require("path"));
var utils = _interopRequireWildcard(require("../../utils"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } // Created by WpZheng
// 实现公众号响应事件
var _default = {
  reply(ctx) {
    return _asyncToGenerator(function* () {
      var reportMsg = '';
      if (ctx.method === 'POST') {
        var data = ctx.request.body;
        var content = yield utils.parseXML(data);
        var result = utils.formatMessage(content.xml);
        if (result.MsgType === 'event') {
          if (result.Event === 'subscribe') {
            var html = yield _ejs.default.renderFile(_path.default.join(__dirname, '../../../views/wx.ejs'), _objectSpread(_objectSpread({}, result), {}, {
              title: '前端面试题下载链接',
              url: 'https://pan.baidu.com/s/1olBN-qPvDVX8reUn_0jfig?pwd=uq8f',
              ftitle: '前端基本功学习资源',
              furl: 'https://pan.baidu.com/s/1iAk7_o2ZwO-rnA_eVLvHUQ?pwd=r1s7',
              time: new Date().getTime()
            }));
            reportMsg = html;
          }
          // 点击响应
          if (result.Event === 'CLICK') {
            if (result.EventKey === 'download') {
              // 下载响应
              var _html = yield _ejs.default.renderFile(_path.default.join(__dirname, '../../../views/wx.ejs'), _objectSpread(_objectSpread({}, result), {}, {
                title: '前端面试题下载链接',
                url: 'https://pan.baidu.com/s/1olBN-qPvDVX8reUn_0jfig?pwd=uq8f',
                ftitle: '前端基本功学习资源',
                furl: 'https://pan.baidu.com/s/1iAk7_o2ZwO-rnA_eVLvHUQ?pwd=r1s7',
                time: new Date().getTime()
              }));
              reportMsg = _html;
            }
          }
        }
      }
      ctx.body = reportMsg;
    })();
  }
};
exports.default = _default;