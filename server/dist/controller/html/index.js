"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ejs = _interopRequireDefault(require("ejs"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var _default = {
  show(ctx) {
    return _asyncToGenerator(function* () {
      var html = yield _ejs.default.renderFile(_path.default.join(__dirname, '../../../views/404.ejs'), {
        title: '首页'
      });
      // const html = await ejs.renderFile(path.join(__dirname, '../../../views/index.ejs'), {
      //   title: '首页'
      // });
      ctx.body = html;
    })();
  },
  pay(ctx) {
    return _asyncToGenerator(function* () {
      var html = yield _ejs.default.renderFile(_path.default.join(__dirname, '../../../views/404.ejs'), {
        title: '支付页'
      });
      // const html = await ejs.renderFile(path.join(__dirname, '../../../views/pay.ejs'), {
      //   title: '支付页'
      // });
      ctx.body = html;
    })();
  }
};
exports.default = _default;