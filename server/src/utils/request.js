
// Created by WpZheng

// 数据请求方法


import https from 'https';
// import util from 'util';
import utilUrl from 'url';

export const requestPost = (url, data) => {
  return new Promise((resolve, reject) => {
    const urlData = utilUrl.parse(url);
    const options = {
      hostname: urlData.hostname,
      path: urlData.path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data, 'utf-8'),
      },
    };
    const req = https.request(options, (res) => {
      let buffer = [], result = '';
      res.on('data', (data) => {
        buffer.push(data);
      })
      res.on('end', () => {
        result = Buffer.concat(buffer).toString('utf-8');
        resolve(result);
      })
    }).on('error', (err) => {
      console.log(`request：${err}`);
      reject(err);
    });
    req.write(data);
    req.end();
  })
}