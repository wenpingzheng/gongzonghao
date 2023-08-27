
import axios from 'axios';
import sha1 from 'sha1';
import { Db } from './storage';
import { createNonceStr, createTimestamp } from './tools';
import config from '../../config/config.json';
const { appId, appSecret, apiDomain, apiUrl } = config;
const { accessTokenApi, accessTicketApi } = apiUrl;

// 实例化数据库
const dbname = process.env.NODE_TLS_REJECT_UNAUTHORIZED === 0 ? 'db_token' : 'Token';
const dbToken = new Db({ dbname });

/**
 * 获取微信access_token 和 ticket_data
 * @returns { string }
 * 
 */
const loadData = async () => {
  try {
    const tokenUrl = `${apiDomain}/${accessTokenApi}&appid=${appId}&secret=${appSecret}`;
    const tokenData = await axios.get(tokenUrl);
    const accessToken = tokenData.data.access_token;
    const ticketUrl = `${apiDomain}/${accessTicketApi}&access_token=${accessToken}`;
    const ticketData = await axios.get(ticketUrl);
    console.log(ticketData.data, 'ticketData.data');
    const { data: { errcode, ticket } } = ticketData
    if (errcode === 0) {
      return ticket;
    } else {
      return '';
    }
  } catch (error) {
    console.log(`loadData加载出错：${error}`);
  }
}

/**
 * 缓存ticket数据
 * @returns { string }
 * 
 */
const getTicket = async () => {
  try {
    // 获取已存数据
    const ticketData = await dbToken.find('name', 'wx_ticket');
    const { value, expireTime } = ticketData || {};
    if (value) {
      const subTime = new Date().getTime() - expireTime;
      // 过期时间 7200秒
      if (subTime > 7000000) {
        // 获取 + 更新
        const ticket = await loadData();
        const item = await dbToken.find('name', 'wx_ticket');
        await dbToken.update(item.objectId, { 'value': ticket });
        return ticket;
      } else {
        // 返回ticket
        return value;
      }
    } else {
      // 获取 + 增加
      const ticket = await loadData();
      await dbToken.add({
        name: 'wx_ticket',
        value: ticket,
        expireTime: new Date().getTime()
      });
      return ticket;
    }
  } catch (error) {
    console.log(`ticket获取出错：${error}`);
  }
}

/**
 * 参数拼成字符串
 * @returns { string }
 * 
 */
const row = (obj) => {
  let keys = Object.keys(obj);
  keys = keys.sort();
  const newObj = {};
  keys.forEach((key) => {
    newObj[key.toLowerCase()] = obj[key]
  })
  let urlString = '';
  for(const k in newObj) {
    urlString += '&' + k + '=' + newObj[k]
  }
  urlString = urlString.substr(1);
  return urlString;
}

/**
 * 获取签名数据
 * @returns { object }
 * 
 */
export const getSignature = async (url) => {
  const jsApiTicket = await getTicket();
  console.log(jsApiTicket, 'jsApiTicket');
  const obj = {
    jsapi_ticket: jsApiTicket,
    nonceStr: createNonceStr(),
    timestamp: createTimestamp(),
    url,
  }
  const str = row(obj);
  const signature = sha1(str);
  obj.signature = signature;
  obj.appId = appId;
  return obj;
}