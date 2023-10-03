// @ts-nocheck
import React, { useEffect } from 'react';
import axios from 'axios';

export default () => {
  const getUrlParams = (url) => {
    let urlStr = url.split('?')[1];
    const urlSearchParams = new URLSearchParams(urlStr);
    const result = Object.fromEntries(urlSearchParams.entries());
    return result;
  };

  const handlePay = () => {
    const params = getUrlParams(window.location.href);
    console.log(params.code, '参数中的code');
    axios
      .get(`/api/wxpay?code=${params.code || ''}`)
      .then((result) => {
        console.log(result, 'result-frontend');
        const {
          data: { code, data },
        } = result;
        if (code === 0) {
          if (typeof WeixinJSBridge == 'undefined') {
            if (document.addEventListener) {
              document.addEventListener('WeixinJSBridgeReady', onBridgeReady(data), false);
            } else if (document.attachEvent) {
              document.attachEvent('WeixinJSBridgeReady', onBridgeReady(data));
              document.attachEvent('onWeixinJSBridgeReady', onBridgeReady(data));
            }
          } else {
            onBridgeReady(data);
          }
        }
      })
      .catch((error) => {
        console.log(error, 'fronend==error');
      });

    const onBridgeReady = (data: any) => {
      console.log(JSON.stringify(data), 'data');
      WeixinJSBridge.invoke('getBrandWCPayRequest', data, (res: { err_msg: string }) => {
        console.log(JSON.stringify(res), 'json.string');
        if (res.err_msg == 'get_brand_wcpay_request:ok') {
          alert('支付成功...');
        }
      });
    };
  };

  useEffect(() => {
    console.log('支付页面');
  }, []);
  return (
    <div>
      <button onClick={handlePay}>点我支付</button>
    </div>
  );
};
