"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseXML = exports.formatMessage = exports.createTimestamp = exports.createNonceStr = void 0;
// Created by WpZheng

// 工具类函数

var xml2js = require('xml2js');

/**
 * @description 生成一个随机字符串
 * @returns string
 */
var createNonceStr = () => {
  return Math.random().toString(36).substring(2, 15);
};

/**
 * @description 生成一个时间戳字符串
 * @returns string
 */
exports.createNonceStr = createNonceStr;
var createTimestamp = () => {
  return parseInt(new Date().getTime() / 1000) + '';
};

/**
 * @description 解析XML数据
 * @param {xml} xml 
 * @returns object
 */
exports.createTimestamp = createTimestamp;
var parseXML = xml => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, {
      trim: true
    }, (error, content) => {
      if (error) {
        reject(error);
      } else {
        resolve(content);
      }
    });
  });
};

/**
 * @description 解析XML数据成对象
 * @param {object} result 
 * @returns object
 */
exports.parseXML = parseXML;
var formatMessage = result => {
  var message = {};
  if (typeof result === 'object') {
    var keys = Object.keys(result);
    keys.length && keys.forEach(key => {
      var item = result[key];
      if (!(item instanceof Array) || item.length === 0) {
        return false;
      }
      ;
      if (item.length === 1) {
        var val = item[0];
        if (typeof val === 'object') {
          message[key] = formatMessage(val);
        } else {
          message[key] = (val || '').trim();
        }
      } else {
        message[key] = [];
        item.forEach(aitem => {
          message[key].push(formatMessage(aitem));
        });
      }
    });
  }
  return message;
};
exports.formatMessage = formatMessage;