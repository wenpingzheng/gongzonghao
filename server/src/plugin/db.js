import { Plugin, registerPlugin } from '@wpzheng/koa';

class Db extends Plugin {
  constructor() {
    super('plugin', 'db');
  }
  apply(app, config) {
    console.log(config, 'config');
    app.context.db = '';
  }
}

registerPlugin(Db);