
// Created by WpZheng

// 公众号授权方法

import axios from 'axios';
import sha1 from 'sha1';
import { Db } from './storage';
import { createNonceStr, createTimestamp } from './tools';
import config from '../../config/config.json';
const { appId, appSecret, apiDomain, apiUrl } = config;
const { accessTokenApi, accessTicketApi } = apiUrl;

// 实例化数据库
const dbname = process.env.NODE_TLS_REJECT_UNAUTHORIZED === '0' ? 'db_token' : 'Token';
const dbToken = new Db({ dbname });

/**
 * @description 获取微信access_token
 * @returns  {string}
 * 
 */
const loadWxToken = async () => {
  try {
    const tokenUrl = `${apiDomain}/${accessTokenApi}&appid=${appId}&secret=${appSecret}`;
    const tokenData = await axios.get(tokenUrl);
    const { data: { access_token } } = tokenData;
    if (access_token) {
      return access_token;
    } else {
      return '';
    }
  } catch (error) {
    console.log(`wxToken加载失败: ${error}`);
  }
}

/**
 * @description 获取微信ticket_data
 * @returns {string}
 * 
 */
const loadData = async () => {
  try {
    const accessToken = await loadWxToken();
    const ticketUrl = `${apiDomain}/${accessTicketApi}&access_token=${accessToken}`;
    const ticketData = await axios.get(ticketUrl);
    const { data: { errcode, ticket } } = ticketData;
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
 * @description 缓存ticket数据
 * @returns {string}
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
        if (ticket !== '') {
          const item = await dbToken.find('name', 'wx_ticket');
          await dbToken.update(item.objectId, { 'value': ticket });
        }
        return ticket;
      } else {
        // 返回ticket
        return value;
      }
    } else {
      // 获取 + 增加
      const ticket = await loadData();
      if (ticket !== '') {
        await dbToken.add({
          name: 'wx_ticket',
          value: ticket,
          expireTime: new Date().getTime()
        });
      }
      return ticket;
    }
  } catch (error) {
    console.log(`ticket获取出错：${error}`);
  }
}

export const getWxToken = async () => {
  try {
    // 获取已存数据
    const tokenData = await dbToken.find('name', 'wx_token');
    const { value, expireTime } = tokenData || {};
    if (value) {
      const subTime = new Date().getTime() - expireTime;
      // 过期时间 7200秒
      if (subTime > 7000000) {
        // 获取 + 更新
        const token = await loadWxToken();
        if (token !== '') {
          const item = await dbToken.find('name', 'wx_token');
          await dbToken.update(item.objectId, { 'value': token });
        }
        return token;
      } else {
        // 返回token
        return value;
      }
    } else {
      // 获取 + 增加
      const token = await loadWxToken();
      if (token !== '') {
        await dbToken.add({
          name: 'wx_token',
          value: token,
          expireTime: new Date().getTime()
        });
      }
      return token;
    }
  } catch (error) {
    console.log(`token获取出错：${error}`);
  }
}

/**
 * @description 参数拼成字符串
 * @returns {string}
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
 * @description 获取签名数据
 * @returns {object}
 * 
 */
export const getSignature = async (url) => {
  const jsApiTicket = await getTicket();
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