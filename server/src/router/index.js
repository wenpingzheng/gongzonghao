import Router from 'koa-router';

// API
import wx from '../controller/apis/wx';
import msg from '../controller/apis/msg';

// HTML
import home from '../controller/html/home';
import index from '../controller/html/index';
import gitLearn from '../controller/html/git-learn';
import course from '../controller/html/course';

const router = new Router();

// 路由 - 页面
router.get('/', index.show);
router.get('/pay/:id', index.pay);
router.get('/home', home.show);
router.get('/api/pay/:id', home.pay);
router.get('/api/wxpay', home.wxpay);
router.post('/api/notify/:id', home.notify);

// 课程推广 付费入口
router.get('/page/git-learn/:id', gitLearn.show);
router.get('/page/interview-hc/:id', course.show);

// 课程访问 入口
router.get('/ke/interview-hc/:id', course.learn);

// 路由 - 接口
router.get('/auth', wx.auth);
router.get('/jsapi', wx.getWxParams);
router.get('/api/createmenu', wx.createMenu);

// 路由 - POST
router.post('/auth', msg.reply);

export default router;
