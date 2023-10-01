"use strict";

var _koa = require("@wpzheng/koa");
var _router = _interopRequireDefault(require("./router"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import './plugin/info'; // 中间件

var server = new _koa.Server({
  configFile: './config/config.yaml'
});
server.setViewsDir(_path.default.join(__dirname, './views'));
server.addRouter(_router.default);
server.run();