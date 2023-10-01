"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wechat = void 0;
var _axios = _interopRequireDefault(require("axios"));
var utils = _interopRequireWildcard(require("../utils"));
var _wxauth = require("./wxauth");
var _config = _interopRequireDefault(require("../../config/config.json"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } // Created by WpZheng
// 公众号相关方法
var {
  apiDomain
} = _config.default;

// 菜单列表
var menuList = {
  button: [{
    name: '上课报名',
    type: 'view',
    url: 'https://xiaozhenggms.cn/'
  }, {
    name: '好课推荐',
    type: 'view',
    url: 'https://xiaozhenggms.cn/home'
  }, {
    name: '我的中心',
    sub_button: [{
      name: '资料下载',
      type: 'click',
      key: 'download'
    }, {
      name: '我的课程',
      type: 'view',
      url: 'https://xiaozhenggms.cn/page/git-learn/1'
    }]
  }]
};

// APIS
var api = {
  menu: {
    create: "".concat(apiDomain, "/menu/create?"),
    del: "".concat(apiDomain, "/menu/delete?")
  }
};
class Wechat {
  constructor(opts) {
    this.access_token = '';
  }
  createMenu() {
    var _this = this;
    return _asyncToGenerator(function* () {
      _this.access_token = yield (0, _wxauth.getWxToken)();
      // await this.deleteMenu();
      var res = yield utils.requestPost("".concat(api.menu.create, "access_token=").concat(_this.access_token), JSON.stringify(menuList));
      return res;
    })();
  }
  deleteMenu() {
    var _this2 = this;
    return _asyncToGenerator(function* () {
      yield _axios.default.get("".concat(api.menu.del, "access_token=").concat(_this2.access_token));
    })();
  }
}
exports.Wechat = Wechat;