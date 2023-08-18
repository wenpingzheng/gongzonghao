import Router from 'koa-router';

// API
import token from '../controller/apis/token';

// HTML
import home from '../controller/html/home';

const router = new Router();

// 路由 - 页面
router.get('/', home.show);

// 路由 - 接口
router.get('/api/gettoken', token.getToken);

export default router;
