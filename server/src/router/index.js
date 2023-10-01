import Router from 'koa-router';

// API
import wx from '../controller/apis/wx';
import msg from '../controller/apis/msg';

// HTML
import home from '../controller/html/home';
import index from '../controller/html/index';
import gitLearn from '../controller/html/git-learn';

const router = new Router();

// 路由 - 页面
router.get('/', index.show);
router.get('/pay', index.pay);
router.get('/home', home.show);
router.get('/wxpay', home.pay);

// 课程页 - GIT开发
router.get('/page/git-learn/1', gitLearn.show);

// 路由 - 接口
router.get('/auth', wx.auth);
router.get('/jsapi', wx.getWxParams);
router.get('/api/createmenu', wx.createMenu);

// 路由 - POST
router.post('/auth', msg.reply);

export default router;
