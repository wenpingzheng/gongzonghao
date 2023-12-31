"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ejs = _interopRequireDefault(require("ejs"));
var _path = _interopRequireDefault(require("path"));
var utils = _interopRequireWildcard(require("../../utils"));
var _course = _interopRequireDefault(require("../../../config/course.json"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var _default = {
  show(ctx) {
    return _asyncToGenerator(function* () {
      if (utils.isTestEnv(ctx)) {
        var html = yield _ejs.default.renderFile(_path.default.join(__dirname, '../../../views/index.ejs'), {
          title: '上课报名'
        });
        ctx.body = html;
      } else {
        var _html = yield _ejs.default.renderFile(_path.default.join(__dirname, '../../../views/404.ejs'), {
          title: '上课报名'
        });
        ctx.body = _html;
      }
    })();
  },
  pay(ctx) {
    return _asyncToGenerator(function* () {
      // 课程ID
      var kid = ctx.params.id;
      // if (utils.isTestEnv(ctx)) {
      var html = yield _ejs.default.renderFile(_path.default.join(__dirname, '../../../views/pay.ejs'), {
        data: {
          kid,
          title: (_course.default === null || _course.default === void 0 ? void 0 : _course.default[kid]['title']) || '',
          discountPrice: (_course.default === null || _course.default === void 0 ? void 0 : _course.default[kid]['discountPrice']) || ''
        }
      });
      ctx.body = html;
      // } else {
      //   const html = await ejs.renderFile(path.join(__dirname, '../../../views/404.ejs'), {
      //     title: '好课推荐'
      //   });
      //   ctx.body = html;
      // }
    })();
  }
};
exports.default = _default;