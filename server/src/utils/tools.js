
// Created by WpZheng

// 工具类函数

const fs = require('fs');
const crypto = require('crypto');
const xml2js = require('xml2js');

/**
 * @description 生成一个随机字符串
 * @returns string
 */
export const createNonceStr = () => {
  return Math.random().toString(36).substring(2, 15);
}

/**
 * @description 生成一个时间戳字符串
 * @returns string
 */
export const createTimestamp = () => {
  return parseInt(new Date().getTime() / 1000) + '';
}

/**
 * @description 解析XML数据
 * @param {xml} xml 
 * @returns object
 */
export const parseXML = (xml) => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, { trim: true }, (error, content) => {
      if (error) {
        reject(error);
      } else {
        resolve(content);
      }
    })
  })
}

/**
 * @description 解析XML数据成对象
 * @param {object} result 
 * @returns object
 */
export const formatMessage = (result) => {
  let message = {};
  if (typeof result === 'object') {
    const keys = Object.keys(result);
    keys.length && keys.forEach((key) => {
      const item  = result[key];
      if (!(item instanceof Array) || item.length === 0) {
        return false;
      };
      if (item.length === 1) {
        const val = item[0];
        if(typeof val === 'object') {
          message[key] = formatMessage(val);
        } else {
          message[key] = (val || '').trim();
        }
      } else {
        message[key] = [];
        item.forEach((aitem) => {
          message[key].push(formatMessage(aitem));
        })
      }
    })
  }
  return message;
}

/**
 * @description 微信支付签名生成
 * @param { string } method 请求方法
 * @param { string } url
 * @param { number } timestamp 时间戳 秒级
 * @param { string } nonce_str 随机字符串
 * @param { Object } order 主体信息
 *  
 */
export const createSign = (method, url, timestamp, nonce_str, order) => {
  const signStr = `${method}\n${url}\n${timestamp}\n${nonce_str}\n${JSON.stringify(order)}\n`;
  const cert = fs.readFileSync("./config/apiclient_key.pem", "utf-8");
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(signStr);
  return sign.sign(cert, "base64");
};

/**
 * 
 * @param {string} appId 
 * @param {string} timeStamp 
 * @param {string} nonceStr 
 * @param {string} packages 
 * @returns 
 */
export const createPaySign = (appId, timeStamp, nonceStr, packages) => {
  const signStr = `${appId}\n${timeStamp}\n${nonceStr}\n${packages}\n`;
  const cert = fs.readFileSync("./config/apiclient_key.pem", "utf-8");
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(signStr);
  return sign.sign(cert, "base64");
};

// 支付成功 回调信息
export const verifySign = (headers, body) => {
  try {
    const publicKey = fs.readFileSync("./config/public_key.pem");
    const timestamp = headers['wechatpay-timestamp'];
    const nonce = headers['wechatpay-nonce'];
    const signature = headers['wechatpay-signature'];
    const buildSignMessage = buildSignMessageFun([timestamp, nonce, body]);
    return crypto.createVerify('RSA-SHA256').update(buildSignMessage).verify(publicKey, signature, 'base64');
  } catch (error) {
    console.log(error, 'verifySign - error');
  }
}

// 支付成功 解密信息
export const aes256gcmDecrypt = (nonce, associatedData, ciphertext, key) => {
  try {
    const ciphertextBuffer = Buffer.from(ciphertext, 'base64');
    const authTag = ciphertextBuffer.slice(ciphertextBuffer.length - 16)
    const data = ciphertextBuffer.slice(0, ciphertextBuffer.length - 16)
    const decipherIv = crypto.createDecipheriv('aes-256-gcm', key, nonce)
    decipherIv.setAuthTag(Buffer.from(authTag))
    decipherIv.setAAD(Buffer.from(associatedData))
    const decryptStr = decipherIv.update(data, null, 'utf8')
    decipherIv.final()
    return decryptStr
  } catch (error) {
    console.log(error, 'aes256gcmDecrypt - error');
  }
}

const buildSignMessageFun = (data) => {
  if(!data || data.length <=0) {
    return null
  }
  let sign = '';
  data.forEach(item => {
    sign = sign.concat(item).concat('\n')
  })
  return sign;
}

export const isTestEnv = (ctx) => {
  const { t = 'prod' } = ctx.query;
  const isTest = t === 'test';
  return isTest;
}