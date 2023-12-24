"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _koaRouter = _interopRequireDefault(require("koa-router"));
var _wx = _interopRequireDefault(require("../controller/apis/wx"));
var _msg = _interopRequireDefault(require("../controller/apis/msg"));
var _home = _interopRequireDefault(require("../controller/html/home"));
var _index = _interopRequireDefault(require("../controller/html/index"));
var _gitLearn = _interopRequireDefault(require("../controller/html/git-learn"));
var _course = _interopRequireDefault(require("../controller/html/course"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// API

// HTML

var router = new _koaRouter.default();

// 路由 - 页面
router.get('/', _index.default.show);
router.get('/pay/:id', _index.default.pay);
router.get('/home', _home.default.show);
router.get('/api/pay/:id', _home.default.pay);
router.get('/api/wxpay', _home.default.wxpay);
router.post('/api/notify/:id', _home.default.notify);

// 课程页 - GIT开发
router.get('/page/git-learn/:id', _gitLearn.default.show);
router.get('/page/interview-hc/:id', _course.default.show);

// 路由 - 接口
router.get('/auth', _wx.default.auth);
router.get('/jsapi', _wx.default.getWxParams);
router.get('/api/createmenu', _wx.default.createMenu);

// 路由 - POST
router.post('/auth', _msg.default.reply);
var _default = router;
exports.default = _default;