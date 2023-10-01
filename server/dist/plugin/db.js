"use strict";

var _koa = require("@wpzheng/koa");
class Db extends _koa.Plugin {
  constructor() {
    super('plugin', 'db');
  }
  apply(app, config) {
    console.log(config, 'config');
    app.context.db = '';
  }
}
(0, _koa.registerPlugin)(Db);