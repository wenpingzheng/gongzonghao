import Router from 'koa-router';

// API
import token from '../controller/apis/token';
import wx from '../controller/apis/wx';

// HTML
import index from '../controller/html/index';
import home from '../controller/html/home';

const router = new Router();

// 路由 - 页面
router.get('/', index.show);
router.get('/home', home.show)

// 路由 - 接口
router.get('/api/gettoken', token.getToken);
router.get('/auth', wx.auth);
router.get('/jsapi', wx.getTicket);

export default router;
