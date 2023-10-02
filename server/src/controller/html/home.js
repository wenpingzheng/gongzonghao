import ejs from 'ejs';
import path from 'path';
import axios from 'axios';
import * as utils from '../../utils';
import config from '../../../config/config.json';

const { appId, appSecret, mchId, serialNo } = config;
const wxpay = new utils.WechatOAuth({ appId, appSecret});

export default {
  async show(ctx) {
    const html = await ejs.renderFile(path.join(__dirname, '../../../views/home.ejs'), {
      title: '个人页'
    });
    ctx.body = html;
  },
  async pay(ctx) {
    const codeUrl = wxpay.getAuthorizeURL();
    console.log('授权URL:', codeUrl);
    ctx.response.redirect(codeUrl);
  },
  async wxpay(ctx) {
    const { code } = ctx.query;
    const openUrl = wxpay.getCodeUrl(code);
    const { openid } = await axios.get(openUrl); // 过期时间2小时 access_token
    
    console.log(openid, 'openid======');
    // body参数
    const order = {
      appid: appId,
      mchid: mchId,
      description: '点击支付',
      out_trade_no: 'wzm20231002',
      amount: {
        total: 1,
      },
      payer: {
        openid: openid,
      },
      notify_url: 'https://xiaozhenggms.cn/api/wxpayed',
    }

    // Authorization
    const timestamp = Math.floor(new Date().getTime() / 1000);
    const nonce_str = utils.createNonceStr();
    const signature = utils.createSign("POST", "/v3/pay/transactions/jsapi", timestamp, nonce_str, order);
    const Authorization = `WECHATPAY2-SHA256-RSA2048 mchid="${mchId}",nonce_str="${nonce_str}",timestamp="${timestamp}",signature="${signature}",serial_no="${serialNo}"`;

    axios.post("", order, {
      headers: {
        Authorization: Authorization,
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    }).then((res) => {
      console.log(res, 'result======');
    }).catch((err) => {
      console.log(err);
    })

  },
  async wxpayed(ctx) {
    console.log('支付完成');
  }
}