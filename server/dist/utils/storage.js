"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Db = void 0;
var _leancloudStorage = _interopRequireDefault(require("leancloud-storage"));
var _config = _interopRequireDefault(require("../../config/config.json"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } // Created by WpZheng
// add  => ({ key1: value1, key2: value2 }) - 添加
// find => ({ key, value }) - 查找
// update => (objectId, { key: value }) - 更新
var {
  appId,
  appKey,
  serverURL
} = _config.default.storage;

// 初始化
_leancloudStorage.default.init({
  appId,
  appKey,
  serverURL
});
class Db {
  constructor(props) {
    var {
      dbname
    } = props;
    this.dbname = dbname;
    this.dbSet = new _leancloudStorage.default.Object(dbname);
    this.dbGet = new _leancloudStorage.default.Query(dbname);
    return this;
  }

  // 存储数据
  save(dbObject, props) {
    return _asyncToGenerator(function* () {
      var dbsKeys = Object.keys(props);
      if (dbsKeys.length) {
        dbsKeys.forEach(a => {
          dbObject.set(a, props[a]);
        });
      }
      yield dbObject.save();
    })();
  }

  // 添加数据
  add() {
    var _arguments = arguments,
      _this = this;
    return _asyncToGenerator(function* () {
      var dbs = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : {};
      var {
        dbSet
      } = _this;
      try {
        yield _this.save(dbSet, dbs);
      } catch (error) {
        console.log("\u4FDD\u5B58\u6570\u636E\u51FA\u73B0\u9519\u8BEF\uFF1A".concat(error));
      }
    })();
  }

  // 更新数据
  update(objectId) {
    var _arguments2 = arguments,
      _this2 = this;
    return _asyncToGenerator(function* () {
      var updateProps = _arguments2.length > 1 && _arguments2[1] !== undefined ? _arguments2[1] : {};
      var {
        dbname
      } = _this2;
      try {
        var tmpDb = _leancloudStorage.default.Object.createWithoutData(dbname, objectId);
        yield _this2.save(tmpDb, updateProps);
      } catch (error) {
        console.log("\u66F4\u65B0\u6570\u636E\u51FA\u73B0\u9519\u8BEF\uFF1A".concat(error));
      }
    })();
  }

  // 查找数据
  find(key, value) {
    var _this3 = this;
    return _asyncToGenerator(function* () {
      var {
        dbGet
      } = _this3;
      try {
        dbGet.equalTo(key, value);
        var adata = yield dbGet.first();
        return adata.toJSON();
      } catch (error) {
        console.log("\u67E5\u627E\u6570\u636E\u51FA\u73B0\u9519\u8BEF\uFF1A".concat(error));
      }
    })();
  }
}
exports.Db = Db;
;