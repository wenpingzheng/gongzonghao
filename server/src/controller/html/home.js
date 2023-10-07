import ejs from 'ejs';
import path from 'path';
import axios from 'axios';
import * as utils from '../../utils';
import config from '../../../config/config.json';

const { appId, appSecret, mchId, serialNo, payKey } = config;
const wxpay = new utils.WechatOAuth({ appId, appSecret});

// 实例化数据库
const dbname = process.env.NODE_TLS_REJECT_UNAUTHORIZED === '0' ? 'db_Paylist' : 'Paylist';


export default {
  async show(ctx) {
    if (utils.isTestEnv(ctx)) {
      const html = await ejs.renderFile(path.join(__dirname, '../../../views/home.ejs'), {
        title: '好课推荐'
      });
      ctx.body = html;
    } else {
      const html = await ejs.renderFile(path.join(__dirname, '../../../views/404.ejs'), {
        title: '好课推荐'
      });
      ctx.body = html;
    }
  },
  async pay(ctx) {
    const codeUrl = wxpay.getAuthorizeURL('https://xiaozhenggms.cn/pay');
    ctx.response.redirect(codeUrl);
  },
  async wxpay(ctx) {
    const { code } = ctx.query;
    let openId = ctx.cookies.get('openid') || '';
    try {
      if (!openId) {
        const openUrl = wxpay.getCodeUrl(code);
        const { data: { openid } } = await axios.get(openUrl); // 过期时间2小时 access_token
        openId = openid;
      }
      // body参数
      const order = {
        appid: appId,
        mchid: mchId,
        description: '点击支付',
        out_trade_no: utils.createNonceStr(),
        amount: {
          total: 1,
        },
        payer: {
          openid: openId,
        },
        notify_url: 'https://xiaozhenggms.cn/api/notify',
      }

      // Authorization
      const timestamp = Math.floor(new Date().getTime() / 1000);
      const nonce_str = utils.createNonceStr();
      const signature = utils.createSign("POST", "/v3/pay/transactions/jsapi", timestamp, nonce_str, order);
      const Authorization = `WECHATPAY2-SHA256-RSA2048 mchid="${mchId}",nonce_str="${nonce_str}",timestamp="${timestamp}",signature="${signature}",serial_no="${serialNo}"`;
      const { data: { prepay_id } } = await axios.post("https://api.mch.weixin.qq.com/v3/pay/transactions/jsapi", order, {
        headers: {
          Authorization: Authorization,
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      });
      const prepayId = `prepay_id=${prepay_id}`;
      const data = {
        appId,
        timeStamp: String(timestamp),
        nonceStr: nonce_str,
        package: prepayId,
        signType: 'RSA',
      };
      data['paySign'] = utils.createPaySign(appId, timestamp, nonce_str, prepayId);
      ctx.body = {
        code: 0,
        msg: 'success',
        openid: openId,
        data: data
      }
    } catch (error) {
      console.log(error, 'wxpay api')
    }
  },
  async notify(ctx) {
    const data = ctx.request.body;
    const headers = ctx.request.headers;
    /**
    {
      id: '86fbfa81-a138-5335-8ea5-4556f628f2d4',
      create_time: '2023-10-03T11:26:31+08:00',
      resource_type: 'encrypt-resource',
      event_type: 'TRANSACTION.SUCCESS',
      summary: '支付成功',
      resource: {
        original_type: 'transaction',
        algorithm: 'AEAD_AES_256_GCM',
        ciphertext: 'erKMIbbO9C7M7Fu0vkdT9j+WE8Cnh70JsmnHqkiusTs+Vf/H5xUBzh4rEjjnsKCi/mrw15yvJvA/ZD/2MZuCBeWIqyQbbPnBPLD16hAJgSoVywfV3Z9E23zhj4FTAdFkudk4iuz+snU1HRkCQPBXrmdEC8Z64XCGHkkhCccz6sj09xACdgWnz6st+BhgyCmq3rJrb5SG2/92K7Firh3XiEvEiJCUmsj8S+fbPvY194TF4+Vp9XWIr+fD++9u5H+dzQNfsH+r28lh3NmhR6nxMw/8dHqq7cjZUFaaArXzGbt/Iyj0TJnkXix4bwwZUgQhZAoKb9uTXqk842pqzvL9KWLt2gbXf89U6/e5a6vOq3we2bU43+2fs+XzMIJP6RxpBXgrsZOS5TEqyGzL26Yy5qNEY8gT+hdis6E0yB7hsXDvc8c4JIaoc3rUc+eUbVsOrwwpLRAlb3wwFd9ZrA0PVx+kl0T11UuEI/1CYPOrkGnmF9BVFG8E13lfAKoUV0tNr3vRjwPul0uWYlTH033tGzmpRb2H9Ixq3WROHQbBVP2tF9BpChWBPEU=',
        associated_data: 'transaction',
        nonce: 'olNhEL1K7FdZ'
      }
    }
    */
    // 第一步：验证签名
    const verifysign = utils.verifySign(headers, JSON.stringify(data));
    console.log(verifysign, 'verifysign');
    if (!verifysign) {
      return '支付认证失败';
    }

    // 第二步：参数解密
    const nonce = data.resource.nonce;
    const associatedData = data.resource.associated_data;
    const ciphertext = data.resource.ciphertext;
    const callBackInfo = utils.aes256gcmDecrypt(nonce, associatedData, ciphertext, payKey);
    /**
    {"mchid":"1652277114","appid":"wx250422f548bb8d72","out_trade_no":"dpzvxl5eun","transaction_id":"4200001982202310037448450578","trade_type":"JSAPI","trade_state":"SUCCESS","trade_state_desc":"支付成功","bank_type":"OTHERS","attach":"","success_time":"2023-10-03T17:42:04+08:00","payer":{"openid":"o7h9p64v-B0HhtJ_jgZWgBZ4tmhg"},"amount":{"total":1,"payer_total":1,"currency":"CNY","payer_currency":"CNY"}}
     */
    // 第三步：存储支付信息
    const { out_trade_no: outTradeNo, transaction_id: transactionId, success_time: successTime, payer: { openid }, amount: { total }} = JSON.parse(callBackInfo);
    const dbClass = new utils.Db({ dbname });
    await dbClass.add({
      out_trade_no: outTradeNo,
      transaction_id: transactionId,
      openid,
      amount: total,
      time: successTime,
      details: JSON.stringify(callBackInfo),
    });
    ctx.body = callBackInfo;
  }
}