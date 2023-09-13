import { Server } from '@wpzheng/koa';
import router from './router';
import path from 'path';
// import './plugin/info'; // 中间件

const server = new Server({
  configFile: './config/config.yaml',
});

server.setViewsDir(path.join(__dirname, './views'));
server.addRouter(router);
server.run();
