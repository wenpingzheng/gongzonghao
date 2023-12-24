// @ts-nocheck
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './styles/index.scss';

export default () => {
  const [orderinfo, setOrderInfo] = useState({});

  const getUrlParams = (url: string) => {
    let urlStr = url.split('?')[1];
    const urlSearchParams = new URLSearchParams(urlStr);
    const result = Object.fromEntries(urlSearchParams.entries());
    return result;
  };

  const handlePay = () => {
    const { kid = '', discountPrice = '' } = orderinfo;
    const params = getUrlParams(window.location.href);
    // console.log(params.code, '参数中的code');
    axios
      .get(`/api/wxpay?code=${params.code || ''}&kid=${kid}&discountPrice=${discountPrice}`)
      .then((result) => {
        // console.log(result, 'result-frontend');
        const {
          data: { code, data, openid },
        } = result;
        if (openid && !Cookies.get('openid')) {
          Cookies.set('openid', openid, { expires: 7 });
        }
        if (code === 0) {
          if (typeof window.WeixinJSBridge == 'undefined') {
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
      // console.log(JSON.stringify(data), 'data');
      window.WeixinJSBridge.invoke('getBrandWCPayRequest', data, (res: { err_msg: string }) => {
        // console.log(res, res.err_msg, JSON.stringify(res), 'json.string');
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          console.log('支付成功-frontend');
        }
      });
    };
  };

  useEffect(() => {
    try {
      const confirmData = window.DATA || {};
      setOrderInfo(confirmData);
    } catch (error) {
      console.log(`解析window对象错误：${error}`);
    }
  }, []);

  const isEmpty = Object.keys(orderinfo).length === 0;
  const { title = '', discountPrice = '' } = orderinfo;
  return (
    <div className='weui-area_confirm'>
      {isEmpty ? (
        <i className='weui-loading'></i>
      ) : (
        <>
          <button className='customize weui-btn weui-btn_primary'>{title}</button>
          <button className='customize weui-btn weui-btn_primary'>
            支付金额：<strong>{discountPrice}</strong> 元
          </button>
          <button onClick={handlePay} className='weui-btn weui-btn_primary'>
            确认支付
          </button>
        </>
      )}
    </div>
  );
};
