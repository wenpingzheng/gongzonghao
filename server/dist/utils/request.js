"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestPost = exports.requestGet = void 0;
var _https = _interopRequireDefault(require("https"));
var _url = _interopRequireDefault(require("url"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); } // Created by WpZheng
// 数据请求方法
// POST请求方法
var requestPost = (url, data) => {
  return new Promise((resolve, reject) => {
    var urlData = _url.default.parse(url);
    var options = {
      hostname: urlData.hostname,
      path: urlData.path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data, 'utf-8')
      }
    };
    var req = _https.default.request(options, res => {
      var buffer = [],
        result = '';
      res.on('data', data => {
        buffer.push(data);
      });
      res.on('end', () => {
        result = Buffer.concat(buffer).toString('utf-8');
        resolve(result);
      });
    }).on('error', err => {
      console.log("request\uFF1A".concat(err));
      reject(err);
    });
    req.write(data);
    req.end();
  });
};

// GET请求方法
exports.requestPost = requestPost;
var requestGet = url => {
  return new Promise((resolve, reject) => {
    _https.default.get(url, res => {
      var buffer = [],
        result = '';
      res.on('data', data => {
        buffer.push(data);
      });
      res.on('end', () => {
        Buffer.concat(buffer).toString('utf-8'), _readOnlyError("result");
        resolve(result);
      });
    }).on('error', err => {
      reject(err);
    });
  });
};
exports.requestGet = requestGet;