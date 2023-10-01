"use strict";

var _koa = require("@wpzheng/koa");
class Info extends _koa.Plugin {
  constructor() {
    super('plugin', 'info');
  }
  apply(app, config) {
    app.use((ctx, next) => {
      console.log(ctx.method, 'ctx.method==');
      if (ctx.method === 'GET') {} else {
        var data = ctx.request.body;
        console.log(data, 'info=====');
      }
      next();
    });
  }
}
(0, _koa.registerPlugin)(Info);