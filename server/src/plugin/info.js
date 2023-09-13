import { Plugin, registerPlugin } from '@wpzheng/koa';

class Info extends Plugin {
  constructor() {
    super('plugin', 'info');
  }
  apply(app, config) {
    app.use((ctx, next) => {
      console.log(ctx.method, 'ctx.method==');
      if (ctx.method === 'GET') {
        
      } else {
        const data = ctx.request.body;
        console.log(data, 'info=====')
      }
      next();
    })
  }
}

registerPlugin(Info);