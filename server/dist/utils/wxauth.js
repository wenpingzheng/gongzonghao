"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWxToken = exports.getSignature = void 0;
var _axios = _interopRequireDefault(require("axios"));
var _sha = _interopRequireDefault(require("sha1"));
var _storage = require("./storage");
var _tools = require("./tools");
var _config = _interopRequireDefault(require("../../config/config.json"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } // Created by WpZheng
// 公众号授权方法
var {
  appId,
  appSecret,
  apiDomain,
  apiUrl
} = _config.default;
var {
  accessTokenApi,
  accessTicketApi
} = apiUrl;

// 实例化数据库
var dbname = process.env.NODE_TLS_REJECT_UNAUTHORIZED === '0' ? 'db_token' : 'Token';
var dbToken = new _storage.Db({
  dbname
});

/**
 * @description 获取微信access_token
 * @returns  {string}
 * 
 */
var loadWxToken = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
    try {
      var tokenUrl = "".concat(apiDomain, "/").concat(accessTokenApi, "&appid=").concat(appId, "&secret=").concat(appSecret);
      var tokenData = yield _axios.default.get(tokenUrl);
      var {
        data: {
          access_token
        }
      } = tokenData;
      if (access_token) {
        return access_token;
      } else {
        return '';
      }
    } catch (error) {
      console.log("wxToken\u52A0\u8F7D\u5931\u8D25: ".concat(error));
    }
  });
  return function loadWxToken() {
    return _ref.apply(this, arguments);
  };
}();

/**
 * @description 获取微信ticket_data
 * @returns {string}
 * 
 */
var loadData = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* () {
    try {
      var accessToken = yield loadWxToken();
      var ticketUrl = "".concat(apiDomain, "/").concat(accessTicketApi, "&access_token=").concat(accessToken);
      var ticketData = yield _axios.default.get(ticketUrl);
      var {
        data: {
          errcode,
          ticket
        }
      } = ticketData;
      if (errcode === 0) {
        return ticket;
      } else {
        return '';
      }
    } catch (error) {
      console.log("loadData\u52A0\u8F7D\u51FA\u9519\uFF1A".concat(error));
    }
  });
  return function loadData() {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * @description 缓存ticket数据
 * @returns {string}
 * 
 */
var getTicket = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* () {
    try {
      // 获取已存数据
      var ticketData = yield dbToken.find('name', 'wx_ticket');
      var {
        value,
        expireTime
      } = ticketData || {};
      if (value) {
        var subTime = new Date().getTime() - expireTime;
        // 过期时间 7200秒
        if (subTime > 7000000) {
          // 获取 + 更新
          var ticket = yield loadData();
          if (ticket !== '') {
            var item = yield dbToken.find('name', 'wx_ticket');
            yield dbToken.update(item.objectId, {
              'value': ticket
            });
          }
          return ticket;
        } else {
          // 返回ticket
          return value;
        }
      } else {
        // 获取 + 增加
        var _ticket = yield loadData();
        if (_ticket !== '') {
          yield dbToken.add({
            name: 'wx_ticket',
            value: _ticket,
            expireTime: new Date().getTime()
          });
        }
        return _ticket;
      }
    } catch (error) {
      console.log("ticket\u83B7\u53D6\u51FA\u9519\uFF1A".concat(error));
    }
  });
  return function getTicket() {
    return _ref3.apply(this, arguments);
  };
}();
var getWxToken = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* () {
    try {
      // 获取已存数据
      var tokenData = yield dbToken.find('name', 'wx_token');
      var {
        value,
        expireTime
      } = tokenData || {};
      if (value) {
        var subTime = new Date().getTime() - expireTime;
        // 过期时间 7200秒
        if (subTime > 7000000) {
          // 获取 + 更新
          var token = yield loadWxToken();
          if (token !== '') {
            var item = yield dbToken.find('name', 'wx_token');
            yield dbToken.update(item.objectId, {
              'value': token
            });
          }
          return token;
        } else {
          // 返回token
          return value;
        }
      } else {
        // 获取 + 增加
        var _token = yield loadWxToken();
        if (_token !== '') {
          yield dbToken.add({
            name: 'wx_token',
            value: _token,
            expireTime: new Date().getTime()
          });
        }
        return _token;
      }
    } catch (error) {
      console.log("token\u83B7\u53D6\u51FA\u9519\uFF1A".concat(error));
    }
  });
  return function getWxToken() {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * @description 参数拼成字符串
 * @returns {string}
 * 
 */
exports.getWxToken = getWxToken;
var row = obj => {
  var keys = Object.keys(obj);
  keys = keys.sort();
  var newObj = {};
  keys.forEach(key => {
    newObj[key.toLowerCase()] = obj[key];
  });
  var urlString = '';
  for (var k in newObj) {
    urlString += '&' + k + '=' + newObj[k];
  }
  urlString = urlString.substr(1);
  return urlString;
};

/**
 * @description 获取签名数据
 * @returns {object}
 * 
 */
var getSignature = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (url) {
    var jsApiTicket = yield getTicket();
    var obj = {
      jsapi_ticket: jsApiTicket,
      nonceStr: (0, _tools.createNonceStr)(),
      timestamp: (0, _tools.createTimestamp)(),
      url
    };
    var str = row(obj);
    var signature = (0, _sha.default)(str);
    obj.signature = signature;
    obj.appId = appId;
    return obj;
  });
  return function getSignature(_x) {
    return _ref5.apply(this, arguments);
  };
}();
exports.getSignature = getSignature;